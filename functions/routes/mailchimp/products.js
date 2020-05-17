/* eslint-disable promise/always-return */
/* eslint-disable promise/no-nesting */
// read configured E-Com Plus app data
const getAppData = require('../../lib/store-api/get-app-data')
const createOrUpdate = require('../../lib/mailchimp/new-product')

exports.post = ({ appSdk }, req, res) => {
  const storeId = parseInt(req.get('X-Store-Id') || req.query.store_id, 10)
  getAppData({ appSdk, storeId })

    .then(configObj => {

      if (!configObj.mc_api_key) {
        const error = new Error('Missing mc_api_key in application.data')
        error.code = 'Unauthorized'
        throw error
      }

      return appSdk
        .apiRequest(storeId, '/products.json')
        .then(({ response }) => ({ response, configObj }))
    })

    .then(async ({ response, configObj }) => {
      res.status(200)

      const { result } = response.data
      if (result.length) {
        const store = await appSdk
          .apiRequest(storeId, '/stores/me.json')
          .then(({ response }) => response.data)

        let promises = []
        for (let i = 0; i < result.length; i++) {
          const product = result[i];
          const promise = createOrUpdate(product, store, storeId, configObj, appSdk)
          promises.push(promise)
        }

        // const promises = result.map(product => createOrUpdate(product, store, configObj))
        Promise
          .all(promises)
          .then(resp => {
            console.log('THEN')
            console.log(resp)
          })
          .catch(err => {
            console.log(err)
            if (err.response) {
              const { response } = err
              if (response.data) {
                console.error('[x] MailchimpRequestErr: ', response.data.detail)
              }
            }
          })
      }

      return res.end()
    })

    .catch(error => {
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
