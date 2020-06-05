/* eslint-disable promise/always-return */
/* eslint-disable promise/no-nesting */
const { randomObjectId } = require('@ecomplus/utils')
const Mailchimp = require('./client')

// Create or Update products
module.exports = (productBody, storeData, storeId, configObj, appSdk) => {
  return new Promise((resolve, reject) => {
    const mailchimp = new Mailchimp(configObj.mc_api_key)

    appSdk
      .apiRequest(storeId, `/products/${productBody._id}.json`)
      .then(({ response }) => {
        // ecomplus product
        const product = response.data
        // mailchimp product model
        const { name, sku, variations, pictures } = product
        const { homepage } = storeData
        const data = {
          title: name,
          url: `${homepage}/${sku}`,
          description: product.short_description || name,
          images: [],
          published_at_foreign: new Date(),
          variants: []
        }

        // product img
        if (pictures && pictures.length) {
          pictures.forEach(({ _id, normal }) => {
            if (normal && normal.url) {
              data.images.push({
                id: randomObjectId(),
                url: normal.url
              })

              // save first image has default
              if (!data.image_url) {
                data.image_url = normal.url
              }
            }
          })
        }

        // variations?
        if (variations && variations.length) {
          variations.forEach(variation => {
            data.variants.push({
              id: variation._id,
              title: variation.name,
              url: (variation.sku ? `${homepage}/${variation.sku}` : `${homepage}/${product.sku}`),
              sku: variation.sku,
              price: variation.price || product.price,
              inventory_quantity: variation.quantity || 0,
              image_url: data.image_url
            })
          })
        } else {
          // variations is required
          data.variants.push({
            id: product._id,
            title: product.name,
            url: `${homepage}/${product.sku}`,
            sku: product.sku,
            price: product.price || product.price,
            inventory_quantity: product.quantity || 0,
            image_url: data.image_url
          })
        }

        // find product in mailchimp
        mailchimp.get({
          path: `/ecommerce/stores/${configObj.mc_store_id}/products/${productBody._id}`
        })

          .then(({ data }) => {
            // exist, just update
            return mailchimp.patch({
              path: `/ecommerce/stores/${configObj.mc_store_id}/products/${productBody._id}`,
              data
            })
          })

          .then(({ data }) => {
            //const resp = `Update product ${productBody._id} | #${storeId}`
            //console.log(resp)
            return resolve(data)
          })

          .catch(error => {
            // not found
            // create new product
            if (error.response) {
              const { response } = error
              if (response.status && response.status === 404) {
                data.id = productBody._id
                mailchimp.post({
                  path: `/ecommerce/stores/${configObj.mc_store_id}/products`,
                  data
                }).then(resp => {
                  //console.log(`Create new product ${productBody._id} | #${storeId}`)
                  return resolve(resp)
                }).catch(reject)
              } else {
                reject(response)
              }
            } else {
              reject(error)
            }
          })
      })

      .catch(error => {
        if (error.response) {
          console.error(error.response)
          const { response } = error
          if (response.status > 400 && response.status < 500) {
            const { data } = response
            console.error('! MailchimpErr: ', data.detail)
            if (data.errors) {
              console.log(JSON.stringify(data.errors))
            }
          }
        }
        reject(error)
      })
  })
}