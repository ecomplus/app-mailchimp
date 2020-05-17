/* eslint-disable promise/always-return */
/* eslint-disable promise/no-nesting */
// read configured E-Com Plus app data
const getAppData = require('../../lib/store-api/get-app-data')
const createOrUpdate = require('../../lib/mailchimp/new-customer')

exports.post = ({ appSdk }, req, res) => {
  const storeId = parseInt(req.get('X-Store-Id') || req.query.store_id, 10)
  getAppData({ appSdk, storeId })

    .then(configObj => {
      console.log(configObj)
      if (!configObj.mc_api_key) {
        const error = new Error('Missing mc_api_key in application.hidden_data')
        error.code = 'Unauthorized'
        throw error
      }

      const url = '/customers.json?limit=1000&offset=0' +
        '&fields=_id,email,name,display_name,orders_count,total_spent,main_email'
      return appSdk
        .apiRequest(storeId, url)
        .then(({ response }) => ({ response, configObj }))
    })

    .then(async ({ response, configObj }) => {
      res.status(200)

      const { result } = response.data
      if (result.length) {
        let promises = []
        for (let i = 0; i < result.length; i++) {
          const customers = result[i];
          const promise = createOrUpdate(customers, storeId, configObj, i)
          promises.push(promise)
        }

        Promise
          .all(promises)
          .then(resp => {
            console.log('THEN')
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
