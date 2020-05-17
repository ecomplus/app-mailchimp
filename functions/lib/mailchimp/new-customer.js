/* eslint-disable promise/always-return */
/* eslint-disable promise/no-nesting */
// mailchimp api client
const Mailchimp = require('./client')

// Create or Update customers
module.exports = (customerBody, storeId, configObj, queue = 1) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const mailchimp = new Mailchimp(configObj.mc_api_key)

      const customerId = customerBody._id
      const data = {
        id: customerId,
        email_address: customerBody.main_email,
        opt_in_status: false,
        first_name: customerBody.display_name
      }

      if (customerBody.name) {
        const { name } = customerBody
        data.first_name = name.given_name || customerBody.display_name
        data.last_name = name.middle_name || name.family_name || ""
      }

      if (customerBody.orders_count) {
        data.orders_count = customerBody.orders_count
      }

      if (customerBody.total_spent) {
        data.total_spent = customerBody.total_spent
      }

      mailchimp.get({
        path: `/ecommerce/stores/${storeId}/customers/${customerId}`,
      })

        .then(resp => {
          // exist just update
          mailchimp.patch({
            path: `/ecommerce/stores/${storeId}/customers/${customerId}`,
            data
          }).then(resp => {
            console.log(`Update customer ${customerBody._id} | #${storeId}`)
            return resolve(resp)
          })
            .catch(reject)
        })

        .catch(error => {
          // not found
          // not exist
          // create new customer
          if (error.response) {
            const { response } = error
            if (response.status && response.status === 404) {
              mailchimp.post({
                path: `/ecommerce/stores/${storeId}/customers`,
                data
              }).then(resp => {
                console.log(`Create new customer ${customerBody._id} | #${storeId}`)
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
    }, queue * 300) // preventing 429 statusCode :$
  })
}