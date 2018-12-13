const unirest = require('unirest')
const { api_url } = require('../config/index')

module.exports = class ProductService {
  constructor() {
    this.retrieve_all = this.retrieve_all.bind(this)
    this.retrieve_one = this.retrieve_one.bind(this)
    this.create = this.create.bind(this)
  }

  retrieve_all(condition = {}, select = null, offset = 0, limit = 10, callback) {
    let { post_ids, title, content, user_id, rating_average, tags } = condition
    let query = {}
    let list = Object.assign({}, { post_ids, title, content, user_id, rating_average, tags })
    let list_key = Object.keys(list)
    list_key.map(key => {
      if (list[key]) Object.assign(query, { [key]: list[key] })
    })

    let url = `${api_url}/posts`
    let req = unirest.get(url)
      .query(Object.assign({}, query, { fields: select, offset, limit }))

    req.end(res => {
      return callback(res.error, res.body.products)
    })
  }

  retrieve_one(post_id, callback) {
    let url = `${api_url}/posts/${post_id}`
    let req = unirest.get(url)

    req.end(res => {
      return callback(res.error, res.body.post)
    })
  }

  create(authorization, post, callback) {
    let url = `${api_url}/posts/`
    let req = unirest.post(url)
      .headers({ authorization })
      .type('json')
      .send({ post })

    req.end(res => {
      return callback(res.error, res.body.created)
    })
  }
}
