/* eslint-disable promise/no-nesting */
// read configured E-Com Plus app data
const getAppData = require('../../lib/store-api/get-app-data')
const Mailchimp = require('../../lib/mailchimp/client')
const newList = require('../../lib/mailchimp/new-list')

exports.post = ({ appSdk }, req, res) => {
  const storeId = parseInt(req.get('X-Store-Id') || req.store_id, 10)

  getAppData({ appSdk, storeId }, true)

    .then(configObj => {

      if (!configObj.mc_api_key) {
        const error = new Error('Missing mc_api_key in application.data')
        error.code = 'Unauthorized'
        throw error
      }

      // eslint-disable-next-line promise/catch-or-return
      return appSdk
        .apiRequest(storeId, '/stores/me')
        .then(({ response }) => ({ response, configObj }))
    })

    .then(async ({ response, configObj }) => {
      const store = response.data
      const mailchimp = new Mailchimp(configObj.mc_api_key)

      let listId = configObj.mc_store_list

      // if list default is not setted
      // create new list
      if (!listId) {
        try {
          // todo
          const list = await newList()
          listId = list.id
        } catch (error) {
          console.log('Create list error', error.message)
          throw error
        }
      }

      return mailchimp.post({
        path: '/ecommerce/stores',
        data: {
          id: String(storeId),
          list_id: listId, // todo,
          name: store.name,
          platform: 'E-Com Plus',
          domain: store.domain,
          is_syncing: true, // https://mailchimp.com/developer/guides/getting-started-with-ecommerce/#Syncing_an_E-Commerce_Store
          email_address: store.financial_email,
          currency_code: 'BRL', // todo
          money_format: 'R$', // todo
          primary_locale: 'pt-br', // todo
          phone: store.contact_phone,
          address: {
            company: store.corporate_name,
            address1: store.address,
            city: '',
            state: '',
            zip: '',
            country: ''
          }
        }
      })
    })

    .then(resp => res.send(resp.data))

    .catch(error => {
      console.log(error)
      const message = error.message
      let info = null
      let status = 500
      if (error.response) {
        const { response } = error
        if (response.data) {
          info = response.data
        }

        if (response.status) {
          status = response.status
        }
      }

      return res.status(status).send({
        status,
        message,
        info
      })
    })
}

exports.get = ({ appSdk }, req, res) => {
  const storeId = parseInt(req.get('X-Store-Id') || req.store_id, 10)
  // get app configured options
  getAppData({ appSdk, storeId }, true)

    .then(configObj => {

      if (!configObj.mc_api_key) {
        const error = new Error('Missing mc_api_key in application.data')
        error.code = 'Unauthorized'
        throw error
      }

      const mailchimp = new Mailchimp(configObj.mc_api_key)
      return mailchimp.get({
        path: '/ecommerce/stores'
      })
    })

    .then(({ data }) => {
      console.log('Return list stores', JSON.stringify(data))
      const resp = {
        total: data.total_items,
        results: data.stores
      }
      return res.send(resp)
    })

    .catch(error => {
      const { message, response } = error
      const status = error.code || response.status
      return res.status(status).send({
        error,
        message
      })
    })
}
