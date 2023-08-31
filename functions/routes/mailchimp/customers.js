/* eslint-disable promise/always-return */
/* eslint-disable promise/no-nesting */
// read configured E-Com Plus app data
const getAppData = require('../../lib/store-api/get-app-data')
const createOrUpdate = require('../../lib/mailchimp/new-customer')

exports.post = ({ appSdk }, req, res) => {
  const storeId = parseInt(req.get('X-Store-Id') || req.query.store_id, 10)
  const customers = []
  getAppData({ appSdk, storeId }, true)

    .then(configObj => {
      if (!configObj.mc_api_key || !configObj.mc_store_id) {
        const error = new Error('mc_api_key or mc_store_id not setted, check your application config.')
        error.code = 'Unauthorized'
        throw error
      }

      const getAllCustomers = (offset = 0) => {
        appSdk.apiRequest(storeId, `/customers.json?limit=1000&offset=${offset}&fields=_id,email,name,display_name,orders_count,total_spent,main_email,accepts_marketing`)
        .then(({ response }) => {
          if (response && response.data && response.data.result && response.data.result.length) {
            customers.push(response.data.result)
            if (response.data.result.length < 1000) {
              return (customers, configObj)
            }
            getAllCustomers(offset + 1000)
          }
        })
      }
      getAllCustomers()

    })
    .then(async (customers, configObj) => {
      const result = customers
      if (result.length) {
        let promises = []
        for (let i = 0; i < result.length; i++) {
          const customer = result[i];
          try {
            await createOrUpdate(customer, storeId, configObj, i)
            console.log(`Customer ${result[i]._id} sync successfully | #${storeId}`)
          } catch (err) {
            console.error(`Customer ${result[i]._id} sync failed | #${storeId}`, err)
          }
/*           const promise = 
          .then(() => {
            console.log()
          })
          .catch(err => {
            
          })
          promises.push(promise) */
        }

        /* Promise
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
