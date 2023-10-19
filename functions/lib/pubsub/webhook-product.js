const getAppData = require('./../../lib/store-api/get-app-data')
const updateAppData = require('./../../lib/store-api/update-app-data')
const createOrUpdate = require('./../../lib/mailchimp/new-product')

module.exports = async (
    { 
        result, 
        store, 
        storeId, 
        configObj, 
        appSdk 
    },
    context
) => {
  console.log('>> Exec Event ', context.eventId)
  return appSdk.getAuth(storeId)
    .then(async (auth) => {
        const appClient = { appSdk, storeId, auth }
        if (!configObj.mc_api_key || !configObj.mc_store_id) {
            const error = new Error('mc_api_key or mc_store_id not setted, check your application config.')
            error.code = 'Unauthorized'
            throw error
        }
        for (let i = 0; i < result.length; i++) {
            try {
                console.log('Sending:', result.length, 'index:', i)
                const response = await createOrUpdate(result[i], store, storeId, configObj, appSdk)
                console.log(`Product ${result[i]._id} sync successfully | #${storeId}`, response.data)
            } catch (err) {
                console.error(`Product ${result[i]._id} sync failed | #${storeId}`, err)
            }
        } 
    })
    .catch((err) => {
      if (err.appWithoutAuth) {
        console.error(err)
      } else {
        throw err
      }
    })
}
