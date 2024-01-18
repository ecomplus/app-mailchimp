const auth = require('./create-auth')
const { getFirestore, Timestamp } = require('firebase-admin/firestore')

const firestoreColl = 'products_to_add'
module.exports = async () => {

  let documentRef, storeId, appData, store, result
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
    appData = info.configObj
    store = info.store
    result = info.result
    documentRef = require('firebase-admin')
        .firestore()
        .doc(`${firestoreColl}/${storeId}`)
  }
}
