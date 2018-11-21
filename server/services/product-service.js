const unirest = require('unirest')
const { api_url } = require('../config/index')

module.exports = class ProductService {
  constructor() {
    this.retrieve_all = this.retrieve_all.bind(this)
    this.retrieve_one = this.retrieve_one.bind(this)
  }

  retrieve_all(select = null, offset = 0, limit = 10, callback) {
    let url = `${api_url}/products`
    let req = unirest.get(url)
      .query({
        fields: select,
        offset, limit
      })

    req.end(res => {
      return callback(res.error, res.body.products)
    })
  }

  retrieve_one(product_id) {
    let url = `${api_url}/products/${product_id}`
    let req = unirest.get(url)

    req.end(res => {
      return callback(res.error, res.body.product)
    })
  }
}
