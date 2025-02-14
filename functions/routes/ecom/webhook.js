/* eslint-disable promise/no-nesting */
/* eslint-disable no-case-declarations */
// read configured E-Com Plus app data
const getAppData = require('./../../lib/store-api/get-app-data')

const SKIP_TRIGGER_NAME = 'SkipTrigger'
const ECHO_SUCCESS = 'SUCCESS'
const ECHO_SKIP = 'SKIP'
const ECHO_API_ERROR = 'STORE_API_ERR'
const newCart = require('../../lib/mailchimp/new-carts')
const newOrder = require('../../lib/mailchimp/new-order')
const newProduct = require('../../lib/mailchimp/new-product')
const newCustomer = require('../../lib/mailchimp/new-customer')

exports.post = ({ appSdk }, req, res) => {
  // receiving notification from Store API
  const { storeId } = req

  /**
   * Treat E-Com Plus trigger body here
   * Ref.: https://developers.e-com.plus/docs/api/#/store/triggers/
   */
  const trigger = req.body

  // get app configured options
  getAppData({ appSdk, storeId }, true)

    .then(appData => {
      if (!appData.mc_api_key) {
        const err = new Error('Mailchimp ApiKey not setted, skip trigger.')
        err.name = SKIP_TRIGGER_NAME
        throw err
      }

      const { resource } = trigger
      let promise = Promise.resolve()
      console.log('Log trigger:', trigger.inserted_id || trigger.resource_id, resource)
      switch (resource) {
        case 'carts':
          const cartId = trigger.inserted_id || trigger.resource_id
          if (cartId) {
            promise = newCart(cartId, storeId, appSdk, appData)
          }
          break
        case 'orders':
          const orderId = trigger.inserted_id || trigger.resource_id
          if (orderId) {
            console.log(`Sending order ${orderId} for #${storeId}`)
            promise = newOrder(orderId, storeId, appSdk, appData)
          }
          break
        case 'products':
          const productId = trigger.inserted_id || trigger.resource_id
          if (productId) {
            console.log(`Sending product ${productId} for #${storeId}`)
            promise = appSdk
              .apiRequest(storeId, '/stores/me')
              .then(({ response }) => {
                const storeData = response.data
                const productBody = Object.assign({ _id: productId }, trigger.body)
                return newProduct(productBody, storeData, storeId, appData, appSdk)
              })
          }
          break
        case 'customers':
          // const customerBody = Object.assign({ _id: trigger.inserted_id }, trigger.body)
          // promise = newCustomer(customerBody, storeId, appData)
          promise = appSdk
            .apiRequest(storeId, `/customers/${trigger.inserted_id}.json`)
            .then(({ response }) => {
              const customerData = response.data
              return newCustomer(customerData, storeId, appData)
            })
          break
        default:
      }

      return promise
    })

    .then(() => {
      console.log(`Trigger in ${trigger.resource} for #${storeId} successful`)
      return res.send(ECHO_SUCCESS)
    })

    .catch(err => {
      if (err.name === SKIP_TRIGGER_NAME) {
        // trigger ignored by app configuration
        res.send(ECHO_SKIP)
      } else {
        // request to Store API with error response
        // return error status code
        console.error(`[X] Trigger in ${trigger.resource} for #${storeId} failed`, err)
        const { response } = err
        if (response.data && response.data.errors) {
          console.error('[!] INFO: ', JSON.stringify(response.data.errors, undefined, 2))
        }

        if (response.data && response.data.detail) {
          console.error('[!] DETAIL: ', response.data)
        }

        res.status(500)
        const { message } = err
        res.send({
          error: ECHO_API_ERROR,
          message
        })
      }
    })
}
