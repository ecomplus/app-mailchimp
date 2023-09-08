/* eslint-disable no-loop-func */
/* eslint-disable promise/always-return */
/* eslint-disable promise/no-nesting */
// read configured E-Com Plus app data
const getAppData = require('../../lib/store-api/get-app-data')
const createOrUpdate = require('../../lib/mailchimp/new-product')

exports.post = ({ appSdk }, req, res) => {
  const storeId = parseInt(req.get('X-Store-Id') || req.query.store_id, 10)
  getAppData({ appSdk, storeId }, true)
    .then(configObj => {
      if (!configObj.mc_api_key || !configObj.mc_store_id) {
        const error = new Error('mc_api_key or mc_store_id not setted, check your application config.')
        error.code = 'Unauthorized'
        throw error
      }

      return appSdk
        .apiRequest(storeId, '/products.json')
        .then(({ response }) => ({ response, configObj }))
    })

    .then(async ({ response, configObj }) => {
      const { result } = response.data
      if (result.length) {
        const store = await appSdk
          .apiRequest(storeId, '/stores/me.json')
          .then(({ response }) => response.data)

        // const promises = []
        for (let i = 0; i < result.length; i++) {
          try {
            console.log('Sending:', result.length)
            const response = await createOrUpdate(result[i], store, storeId, configObj, appSdk)
            console.log(`Product ${result[i]._id} sync successfully | #${storeId}`, response.data)
          } catch (err) {
            console.error(`Product ${result[i]._id} sync failed | #${storeId}`, err)
          }
        }

        /* Promise
          .all(promises)
          .then(resp => {
            console.log('Sync end for ', storeId)
          })
          .catch(err => {
            console.log(err)
            if (err.response) {
              const { response } = err
              if (response.data) {
                console.error('[x] MailchimpRequestErr: ', response.data.detail)
              }
            }
          }) */
      }

      return res.status(200).end()
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
