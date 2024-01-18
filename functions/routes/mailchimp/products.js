/* eslint-disable no-loop-func */
/* eslint-disable promise/always-return */
/* eslint-disable promise/no-nesting */
// read configured E-Com Plus app data
const getAppData = require('../../lib/store-api/get-app-data')
const PubSub = require('@google-cloud/pubsub').PubSub
const getPubSubTopic = require('../../lib/pubsub/create-topic').getPubSubTopic

/* const chunk = (cards) => {
  var chunkArray = [];
  for(var i = 0; i < cards.length; i += 20) {
      chunkArray.push(cards.slice(i, i+20));
  }
  return chunkArray;
} */

const sendMessageTopic = async (eventName, json) => {
  const topicName = getPubSubTopic(eventName)
    const messageId = await new PubSub()
      .topic(topicName)
      .publishMessage({ json })

    console.log('>> MessageId: ', messageId, ' Topic: ', topicName)

  return Promise.resolve(200)
}

//const createOrUpdate = require('../../lib/mailchimp/new-product')

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
        return sendMessageTopic('produto', { result, store, storeId, configObj })
          .then(() => {
            return res.sendStatus(200)
          })
          .catch(err => {
            err.storeId = storeId
            console.error(err)
            return res.sendStatus(502)
          })

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
