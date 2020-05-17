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
          checkout_url: '/app/#/checkout/' + cartId,
          currency_code: 'BRL',
          order_total: 0,
          lines: []
        }

        const { items } = cartBody

        if (items.length) {
          items.forEach(item => {
            data.lines.push({
              id: item._id,
              product_id: item.product_id,
              quantity: item.quantity,
              price: item.final_price || item.price,
              product_variant_id: item.product_id
            })

            data.order_total += (item.final_price || item.price)
          })
        }

        const mailchimp = new Mailchimp(configObj.mc_api_key)
        return mailchimp.post({
          path: `/ecommerce/stores/${storeId}/carts`,
          data
        })
      })
      .then(resolve)
      .catch(reject)
  })
}
