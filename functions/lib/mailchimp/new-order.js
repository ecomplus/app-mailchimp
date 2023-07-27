/* eslint-disable promise/catch-or-return */
'use strict'
const { lineAddress } = require('@ecomplus/utils')
const Mailchimp = require('./client')

const financialStatus = (status) => {
  switch (status.current) {
    case 'paid':
    case 'authorized':
      return 'paid'
      break;
    case 'under_analysis':
    case 'pending':
    case 'partially_paid':
      return 'pending'
      break;
    case 'voided':
    case 'unauthorized':
      return 'cancelled'
      break;
    case 'in_dispute':
    case 'refunded':
    case 'partially_refunded':
      return 'refunded'
      break;
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
        const customer = orderBody.buyers[0]

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
          financial_status: financialStatus(orderBody.financial_status),
          currency_code: 'BRL',
          order_total: orderBody.amount && orderBody.amount.total,
          discount_total: orderBody.amount && orderBody.amount.discount,
          shipping_total: orderBody.amount && orderBody.amount.freight,
          lines: [],
          shipping_address: {
            name: addressTo.name,
            address1: lineAddress(addressTo),
            city: addressTo.city,
            province: addressTo.province_code,
            postal_code: addressTo.zip
          }
        }

        const { items } = orderBody

        if (items.length) {
          items.forEach(item => {
            data.lines.push({
              id: item._id,
              product_id: item.product_id,
              quantity: item.quantity,
              price: item.final_price || item.price,
              product_variant_id: item.variation_id
            })

          })
        }

        const mailchimp = new Mailchimp(configObj.mc_api_key)
        return mailchimp.post({
          path: `/ecommerce/stores/${storeId}/orders`,
          data
        })
      })
      .then(resolve)
      .catch(reject)
  })
}
