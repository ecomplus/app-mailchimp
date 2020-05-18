/* eslint-disable promise/no-nesting */
// read configured E-Com Plus app data
const getAppData = require('../../lib/store-api/get-app-data')
const Mailchimp = require('../../lib/mailchimp/client')
const newList = require('../../lib/mailchimp/new-list')

exports.post = ({ appSdk }, req, res) => {
  const storeId = parseInt(req.get('X-Store-Id') || req.store_id, 10)

  getAppData({ appSdk, storeId })

    .then(configObj => {

      if (!configObj.mc_api_key) {
        const error = new Error('Missing mc_api_key in application.data')
        error.code = 401
        error.name = 'Unauthorized'
        throw error
      }

      return configObj
    })

    .then(configObj => newList(storeId, configObj, appSdk))

    .then(resp => res.send(resp))

    .catch(error => {
      const message = error.message
      let info = null
      let status = 500
      if (error.response) {
        const { response } = error
        if (response.data) {
          info = response.data
        }

        if (response.status) {
          status = response.status
        }
      }

      return res.status(status).send({
        status,
        message,
        info
      })
    })
}

exports.get = ({ appSdk }, req, res) => {
  const storeId = parseInt(req.get('X-Store-Id') || req.store_id, 10)
  // get app configured options
  getAppData({ appSdk, storeId }, true)

    .then(configObj => {

      if (!configObj.mc_api_key) {
        const error = new Error('Missing mc_api_key in application.data')
        error.code = 401
        error.name = 'Unauthorized'
        throw error
      }

      const mailchimp = new Mailchimp(configObj.mc_api_key)
      return mailchimp.get({
        path: '/lists'
      })
    })

    .then(({ data }) => {
      const resp = {
        total: data.total_items,
        results: data.lists
      }
      return res.send(resp)
    })

    .catch(error => {
      const { message, response } = error
      const status = error.code || response.status
      return res.status(status).send({
        error,
        message
      })
    })
}
