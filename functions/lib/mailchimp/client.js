'use strict'
const axios = require('axios')

class Mailchimp {
  constructor (apiKey) {
    if (!/.+-.+/.test(apiKey)) {
      throw new Error('Missing or invalid apiKey: ' + apiKey)
    }

    this.request = axios.create({
      baseURL: `https://${apiKey.split('-')[1]}.api.mailchimp.com/3.0`,
      auth: {
        username: 'user',
        password: apiKey
      },
      headers: {
        'User-Agent': 'e-com.plus app-mailchimp'
      }
    })
  }

  get ({ path }) {
    return this.request({
      method: 'get',
      url: path
    })
  }

  post ({ path, data }) {
    return this.request({
      method: 'post',
      url: path,
      data
    })
  }

  patch ({ path, data }) {
    return this.request({
      method: 'patch',
      url: path,
      data
    })
  }

  delete ({ path }) {
    return this.request({
      method: 'delete',
      url: path
    })
  }
}

module.exports = Mailchimp
