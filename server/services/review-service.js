const unirest = require('unirest')
const { api_url } = require('../config/index')

module.exports = class ProductService {
  constructor() {
    this.retrieve_all = this.retrieve_all.bind(this)
    this.create = this.create.bind(this)
  }

  retrieve_all(post_id, offset = 0, limit = 10, callback) {

    let url = `${api_url}/posts/${post_id}/reviews`
    let req = unirest.get(url)
      .query(offset, limit)

    req.end(res => {
      return callback(res.error, res.body.products)
    })
  }

  create(authorization, post_id, post, callback) {
    let url = `${api_url}/posts/${post_id}/reviews`
    let req = unirest.post(url)
      .headers({ authorization })
      .type('json')
      .send({ post })

    req.end(res => {
      return callback(res.error, res.body.created)
    })
  }
}
