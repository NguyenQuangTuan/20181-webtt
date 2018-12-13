const unirest = require('unirest')
const { api_url } = require('../config/index')

module.exports = class TagService {
  constructor() {
    this.find_all = this.find_all.bind(this)
  }

  find_all(callback) {
    let url = `${api_url}/tags`
    let req = unirest.get(url)

    req.end(res => {
      return callback(res.error, res.body.tags)
    })
  }
}