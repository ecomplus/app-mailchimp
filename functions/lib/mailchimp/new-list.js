/* eslint-disable promise/catch-or-return */
/* eslint-disable promise/always-return */
/* eslint-disable promise/no-nesting */
'use strict'
const Mailchimp = require('./client')

module.exports = (storeId, configObj, appSdk) => {
  return appSdk
    .apiRequest(storeId, '/stores/me')
    .then(({ response }) => {
      const store = response.data
      const mailchimp = new Mailchimp(configObj.mc_api_key)
      return { store, mailchimp }
    })

    .then(({ store, mailchimp }) => {
      return mailchimp.post({
        path: '/lists',
        data: {
          name: 'E-Com Plus ShopSync',
          contact: {
            company: store.corporate_name,
            address1: store.address,
            city: '',
            state: '',
            zip: '',
            country: ''
          },
          permission_reminder: store.name,
          campaign_defaults: {
            from_name: store.name,
            from_email: store.financial_email,
            language: 'Português', // todo en/pt-br
            subject: store.name
          },
          email_type_option: false,
          visibility: 'pub',
          double_optin: false
        }
      }).then(({ data }) => data)
    })
}