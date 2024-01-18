const admin = require('firebase-admin')
const { setup } = require('@ecomplus/application-sdk')
const { getFirestore } = require('firebase-admin/firestore')

const createOrUpdate = require('../mailchimp/new-product')

const getAppSdk = () => {
  return new Promise(resolve => {
    setup(null, true, admin.firestore())
      .then(appSdk => resolve(appSdk))
  })
}

const firestoreColl = 'products_to_add'
module.exports = async () => {
  const appSdk = await getAppSdk(admin)
  let documentRef, storeId, configObj, store, result
  if (firestoreColl) {
    const db = getFirestore()
    const d = new Date(new Date().getTime() - 9000)
    const documentSnapshot = await db.collection(firestoreColl)
      .where('queuedAt', '<=', d)
      .orderBy('queuedAt')
      .limit(1)
      .get()
    const info = documentSnapshot.docs && documentSnapshot.docs[0] && documentSnapshot.docs[0].data()
    storeId = info.storeId
    configObj = info.configObj
    store = info.store
    result = info.result
    documentRef = require('firebase-admin')
      .firestore()
      .doc(`${firestoreColl}/${storeId}`)
      return appSdk.getAuth(storeId)
      .then(async (auth) => {
          if (!configObj.mc_api_key || !configObj.mc_store_id) {
              const error = new Error('mc_api_key or mc_store_id not setted, check your application config.')
              error.code = 'Unauthorized'
              throw error
          }
          if (result && result.length) {
            const products = result.slice(0, 15)
            for (let i = 0; i < products.length; i++) {
              try {
                  console.log('Sending:', products.length, result.length, 'index:', i)
                  const response = await createOrUpdate(products[i], store, storeId, configObj, appSdk)
                  console.log(`Product ${products[i]._id} sync successfully | #${storeId}`, response.data)
                  result.splice(i, 1)
                  await documentRef.set({
                    storeId,
                    result,
                    store,
                    configObj,
                    queuedAt: admin.firestore.Timestamp.now()
                  })
                  console.log(`#${storeId} saving in firestore list of products after create or update`, documentRef, result.length) 
              } catch (err) {
                  console.error(`Product ${products[i]._id} sync failed | #${storeId}`, err)
              }
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
      .then(() => {
        console.log('>> End Event exportation')
      })
  }
}
