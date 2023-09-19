/* eslint-disable promise/catch-or-return */
'use strict'
const { lineAddress } = require('@ecomplus/utils')
const Mailchimp = require('./client')
const parseTag = require('./parse-tag')

const financialStatus = (status) => {
  switch (status) {
    case 'paid':
    case 'authorized':
      return 'paid'
    case 'under_analysis':
    case 'pending':
    case 'partially_paid':
      return 'pending'
    case 'voided':
    case 'unauthorized':
      return 'cancelled'
    case 'in_dispute':
    case 'refunded':
    case 'partially_refunded':
      return 'refunded'
    default: 'pending'
      break;
  }
}

const tagStatus = (status) => {
  switch (status) {
    case 'paid':
      return 'closed_order'
    case 'pending':
      return 'open_order'
    case 'cancelled':
      return 'canceled_order'
    default: 'pending'
      break;
  }
}

module.exports = (orderId, storeId, appSdk, configObj) => {
  return new Promise((resolve, reject) => {
    const url = `orders/${orderId}.json`
    appSdk
      .apiRequest(storeId, url)
      .then(({ response }) => {
        const orderBody = response.data
        const statusCurrent = orderBody.financial_status && orderBody.financial_status.current
        const paymentStatus = financialStatus(statusCurrent)
        const tag = tagStatus(paymentStatus)
        const customer = orderBody.buyers && orderBody.buyers[0]
        const addressTo = orderBody.shipping_lines && orderBody.shipping_lines.length && orderBody.shipping_lines[0].to
        const data = {
          id: orderId,
          customer: {
            id: customer._id,
            email_address: customer.main_email,
            opt_in_status: true,
            first_name: customer.display_name,
            last_name: customer.name && customer.name.family_name
          },
          store_id: String(storeId),
          financial_status: financialStatus,
          currency_code: 'BRL',
          order_total: orderBody.amount && orderBody.amount.total,
          discount_total: orderBody.amount && orderBody.amount.discount,
          shipping_total: orderBody.amount && orderBody.amount.freight,
          order_url: orderBody.status_link || orderBody.checkout_link,
          lines: [],
          shipping_address: {
            name: addressTo.name,
            address1: lineAddress(addressTo),
            city: addressTo.city,
            province: addressTo.province_code,
            postal_code: addressTo.zip
          }
        }

        if (configObj.mc_campaign_order) {
          data.campaign_id = configObj.mc_campaign_order
        }

        const { items } = orderBody

        if (items.length) {
          items.forEach(item => {
            data.lines.push({
              id: item._id,
              product_id: item.product_id,
              quantity: item.quantity,
              price: item.final_price || item.price,
              product_variant_id: item.variation_id || item.product_id
            })
          })
        }

        const mailchimp = new Mailchimp(configObj.mc_api_key)

        mailchimp.get({
          path: `/ecommerce/stores/${storeId}/orders/${orderId}`,
        }).then(resp => {
          console.log('get order', resp.response)
          const promises = []
          promises.push(mailchimp.patch({
            path: `/ecommerce/stores/${storeId}/orders/${orderId}`,
            data
          }))
          const tagName = parseTag(tag, configObj.customer_tag)
          if (tagName) {
            promises.push(mailchimp.post({
              path: `/lists/${configObj.mc_store_list}/members/${md5(customer.main_email)}/tags`,
              data: {"tags": [{"name": tagName, "status": "active"}]}
            }))
          }
          return Promise.all(promises).then(response => {
            console.log(`Update order data: ${orderId} - ${storeId}`)
            return resolve(response)
          })
        })
        .catch(error => {
            // not found
            // not exist
            // create new order
            if (error.response) {
              const { response } = error
              if (response.status && response.status === 404) {
                const promises = []
                promises.push(mailchimp.post({
                  path: `/ecommerce/stores/${storeId}/orders`,
                  data
                }))
                const tagName = parseTag(tag, configObj.customer_tag)
                if (tagName) {
                  promises.push(mailchimp.post({
                    path: `/lists/${configObj.mc_store_list}/members/${md5(customer.main_email)}/tags`,
                    data: {"tags": [{"name": tagName, "status": "active"}]}
                  }))
                }
                return Promise.all(promises).then(resp => {
                  console.log(`Create new order ${orderBody._id} | #${storeId}`)
                  return resolve(resp)
                }).catch(err => { 
                  const { response } = err
                  if (storeId == 51292) {
                    console.log('Error at store #51292', response.status, response.detail, JSON.stringify(response.errors))
                  }
                  if (response.data && response.data.errors) {
                    console.error('[!] INFO order: ', storeId, JSON.stringify(response.data.errors, undefined, 2))
                  }
                  if (response.data && response.data.detail) {
                    console.error('[!] DETAIL order: ', storeId, response.data)
                  }
                  reject(err)
                })
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
