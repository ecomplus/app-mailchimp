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
        const customerId = cartBody.customers && cartBody.customers.length && cartBody.customers[0]
        if (customerId) {
          appSdk.apiRequest(storeId, `/customers/${customerId}.json`)
          .then(({ response }) => {
            const customerData = response.data
            const data = {
              id: cartId,
              customer: {
                id: customerId,
                email_address: customerData.main_email,
                opt_in_status: (customerData.accepts_marketing) || true,
              },
              checkout_url: cartBody.permalink || '/app/#/checkout/' + cartId,
              currency_code: 'BRL',
              order_total: cartBody.subtotal || 0,
              lines: []
            }

            if (customerData.name) {
              const { name } = customerData
              data.customer.first_name = name.given_name || customerData.display_name
              data.customer.last_name = name.middle_name || name.family_name
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
                if (response.status && response.status === 404 && !cartBody.completed) {
                  mailchimp.post({
                    path: `/ecommerce/stores/${storeId}/carts`,
                    data
                  }).then(resp => {
                      console.log(`Create new cart ${cartBody._id} | #${storeId}`)
                      return resolve(resp)
                  }).catch(err => {
                      const { response } = err
                      if (response.data && response.data.errors) {
                        console.error('[!] INFO cart: ', JSON.stringify(response.data.errors, undefined, 2))
                      }
                      if (response.data && response.data.detail) {
                        console.error('[!] DETAIL cart: ', response.data)
                      }
                      reject(err)
                    })
                } else if (response.status && response.status === 400) {
                    // email adress 
                    reject(response)
                }
                console.log('Skipping completed cart', storeId, cartId, cartBody.completed)
                reject(response)
              } else {
                reject(error)
              }
            })
          })
        }
        resolve(response)
      })
      .then(resolve)
      .catch(reject)
  })
}
