/* eslint-disable promise/always-return */
/* eslint-disable promise/no-nesting */
// read configured E-Com Plus app data
const getAppData = require('../../lib/store-api/get-app-data')
const createOrUpdate = require('../../lib/mailchimp/new-customer')

exports.post = ({ appSdk }, req, res) => {
  const storeId = parseInt(req.get('X-Store-Id') || req.query.store_id, 10)
  getAppData({ appSdk, storeId }, true)

    .then(configObj => {
      if (!configObj.mc_api_key || !configObj.mc_store_id) {
        const error = new Error('mc_api_key or mc_store_id not setted, check your application config.')
        error.code = 'Unauthorized'
        throw error
      }

      const url = '/customers.json?limit=1000&offset=0' +
        '&fields=_id,email,name,display_name,orders_count,total_spent,main_email,accepts_marketing'
      return appSdk
        .apiRequest(storeId, url)
        .then(({ response }) => ({ response, configObj }))
    })

    .then(async ({ response, configObj }) => {
      const { result } = response.data
      if (result.length) {
        let promises = []
        for (let i = 0; i < result.length; i++) {
          const customers = result[i];
          const promise = createOrUpdate(customers, storeId, configObj, i)
          .then(() => {
            console.log(`Customer ${result[i]._id} sync successfully | #${storeId}`)
          })
          .catch(err => {
            console.error(`Customer ${result[i]._id} sync failed | #${storeId}`, err)
          })
          promises.push(promise)
        }

        Promise
          .all(promises)
          .then(resp => {
            console.log('send customers end')
            console.log(resp)
          })
          .catch(err => {
            if (err.response) {
              const { response } = err
              if (response.data) {
                console.error(`[X] #${storeId} | Customer error:`, response.data.detail)
              }
              if (response.data && response.data.errors) {
                console.error('[x] Details: ', JSON.stringify(response.data.errors, undefined, 2))
              }
            }
          })
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
