/* eslint-disable promise/catch-or-return */
'use strict'

const md5 = require('md5')
const Mailchimp = require('./client')
const parseTag = require('./parse-tag')

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
              console.log('Cart exists', cartId)
                if (cartBody.completed) {
                  const promises = []
                  promises.push(mailchimp.delete({
                    path: `/ecommerce/stores/${storeId}/carts/${cartId}`,
                  }))
                  const tagName = parseTag('closed_cart', configObj.customer_tag)
                  if (tagName) {
                    promises.push(mailchimp.post({
                      path: `/lists/${configObj.mc_store_list}/members/${md5(customerData.main_email)}/tags`,
                      data: {"tags": [{"name": tagName, "status": "inactive"}]}
                    }))
                  }
                  return Promise.all(promises).then(response => {
                    console.log(`Deleted completed cart status: ${cartBody.completed} - ${cartId} - ${storeId}`)
                    return resolve(response)
                  }).catch(error =>{
                    console.log(error)
                    return reject(error)
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
                console.log(`#${storeId} error to get`, response.status, response.detail)
                if (response.status && response.status === 404 && !(cartBody.completed)) {
                  const promises = []
                  promises.push(mailchimp.post({
                    path: `/ecommerce/stores/${storeId}/carts`,
                    data
                  }))
                  const tagName = parseTag('open_cart', configObj.customer_tag)
                  if (tagName) {
                    promises.push(mailchimp.post({
                      path: `/lists/${configObj.mc_store_list}/members/${md5(customerData.main_email)}/tags`,
                      data: {"tags": [{"name": tagName, "status": "active"}]}
                    }))
                  }
                  return Promise.all(promises).then(resp => {
                    console.log('Created cart', cartBody._id, Array.isArray(resp) && resp.length && resp[0] && resp[0].status)
                    return resolve(resp)
                  }).catch(err => {
                    console.log(`#${storeId} error to create`, err.response.status, err.response.detail)
                    reject(err)
                  })
                } else if (response.status && response.status === 400) {
                    // email adress 
                    reject(response)
                } else {
                  console.log('Skipping completed cart', storeId, cartId, cartBody.completed)
                  reject(response)
                }
              } else {
                reject(error)
              }
            })
          })
        }
        return resolve(response)
      })
      .then(resolve)
      .catch(reject)
  })
}
