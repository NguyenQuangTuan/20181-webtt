const unirest = require('unirest')

module.exports = class ReviewController {
  constructor() {
    this.retrieve_all = this.retrieve_all.bind(this)
  }

  retrieve_all(condition, select = null, offset = 0, limit = 20, sort = '-created_at', callback) {
    let url = `${api_url}/products`

    let req = unirest.get(url)
      .req.query({
        fields: select,
        offset, limit, sort
      })

    req.end(res => callback(res.error, res.body.banners))
  }
}