const admin = require('firebase-admin')
const { setup } = require('@ecomplus/application-sdk')

const getAppSdk = () => {
  return new Promise(resolve => {
    setup(null, true, admin.firestore())
      .then(appSdk => resolve(appSdk))
  })
}

module.exports = async (
    { 
        result, 
        store, 
        storeId, 
        configObj,
    },
    context
) => {
  console.log('>> Exec Event ', context.eventId)
  const appSdk = await getAppSdk(admin)

  return appSdk.getAuth(storeId)
    .then(async (auth) => {
        const appClient = { appSdk, storeId, auth }
        if (!configObj.mc_api_key || !configObj.mc_store_id) {
            const error = new Error('mc_api_key or mc_store_id not setted, check your application config.')
            error.code = 'Unauthorized'
            throw error
        }
        const documentRef = admin.firestore().doc(`products_to_add/${storeId}`)
        await documentRef.set({
          storeId,
          result,
          store,
          configObj,
          queuedAt: admin.firestore.Timestamp.now()
        })
        console.log('saving in firestore list of products', documentRef, result.length)
        /* for (let i = 0; i < result.length; i++) {
            try {
                console.log('Sending:', result.length, 'index:', i)
                const response = await createOrUpdate(result[i], store, storeId, configObj, appSdk)
                console.log(`Product ${result[i]._id} sync successfully | #${storeId}`, response.data && response.data.id)
            } catch (err) {
                console.error(`Product ${result[i]._id} sync failed | #${storeId}`, err)
            }
        } */ 
    })
    .catch((err) => {
      if (err.appWithoutAuth) {
        console.error(err)
      } else {
        throw err
      }
    })
    .then(() => {
      console.log('>> End Event ', context.eventId)
    })
}
