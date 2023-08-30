/* eslint-disable promise/catch-or-return */
'use strict'
const Mailchimp = require('./client')

module.exports = (cartId, storeId, appSdk, configObj) => {
  return new Promise((resolve, reject) => {
    const url = `carts/${cartId}.json`
    appSdk
      .apiRequest(storeId, url)
      .then(({ response }) => {
        const cartBody = response.data
        const customerId = cartBody.customers[0]

        const data = {
          id: cartId,
          customer: {
            id: customerId
          },
          checkout_url: cartBody.permalink || '/app/#/checkout/' + cartId,
          currency_code: 'BRL',
          order_total: cartBody.subtotal || 0,
          lines: []
        }

        const { items } = cartBody

        if (configObj.mc_campaign_cart) {
          data.campaign_id = configObj.mc_campaign_cart
        }

        if (items.length) {
          items.forEach(item => {
            data.lines.push({
              id: item._id,
              product_id: item.product_id,
              quantity: item.quantity,
              price: item.final_price || item.price,
              product_variant_id: item.variation_id || item.product_id
            })
            if (data.order_total === 0) {
              data.order_total += (item.final_price || item.price)
            }
          })
        }

        const mailchimp = new Mailchimp(configObj.mc_api_key)
        mailchimp.get({
          path: `/ecommerce/stores/${storeId}/carts/${cartId}`,
        }).then(resp => {
            if (cartBody.completed) {
              mailchimp.delete({
                path: `/ecommerce/stores/${storeId}/carts/${cartId}`,
              }).then(response => {
                console.log(`Deleted completed cart status: ${cartBody.completed} - ${cartId} - ${storeId}`)
                return resolve(response)
              })
            }
            return resolve(resp)
          })
          .catch(error => {
            // not found
            // not exist
            // create new cart
            if (error.response) {
              const { response } = error
              if (response.status && response.status === 404) {
                mailchimp.post({
                  path: `/ecommerce/stores/${storeId}/carts`,
                  data
                }).then(resp => {
                  console.log(`Create new cart ${cartBody._id} | #${storeId}`)
                  return resolve(resp)
                }).catch(reject)
              } else if (response.status && response.status === 400) {
                // email adress 
                reject(response)
              }
            } else {
              reject(error)
            }
          })
      })
      .then(resolve)
      .catch(reject)
  })
}
