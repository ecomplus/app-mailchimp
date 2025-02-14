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
        const { name, variations, pictures } = product
        let { homepage } = storeData
        if (!homepage) {
          homepage = `https://${storeData.domain}`
        }
        const data = {
          title: name,
          url: `${homepage}/${product.slug}`,
          description: product.short_description || name,
          images: [],
          published_at_foreign: new Date(),
          variants: [],
          image_url: ''
        }

        // product img
        if (pictures && pictures.length) {
          pictures.forEach(({ normal, zoom }) => {
            if (zoom && zoom.url) {
              data.images.push({
                id: randomObjectId(),
                url: zoom.url
              })

              // save first image has default
              if (data.image_url === '') {
                data.image_url = zoom.url
              }
            } else if (normal && normal.url) {
              data.images.push({
                id: randomObjectId(),
                url: normal.url
              })

              // save first image has default
              if (data.image_url === '') {
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
              url: `${homepage}/${product.slug}?variation_id=${variation._id}`,
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
            url: `${homepage}/${product.slug}`,
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

          .then((response) => {
            // exist, just update
            console.log('editando', productBody._id)
            return mailchimp.patch({
              path: `/ecommerce/stores/${configObj.mc_store_id}/products/${productBody._id}`,
              data
            })
          })

          .then((response) => {
            return resolve(response.data)
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
                  return resolve(resp)
                }).catch(erro => {
                  if (erro.response) {
                    console.log('erro na criação')
                    console.log(erro.response.status, erro.response.title, erro.response.detail)
                  }
                  reject(erro)
                })
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
              console.error(JSON.stringify(data.errors))
            }
          }
        }
        reject(error)
      })
  })
}
