const unirest = require('unirest')
const { api_url } = require('../config/index')

module.exports = class ProductService {
  constructor() {
    this.find_one = this.find_one.bind(this)
    this.update = this.update.bind(this)
  }

  find_one(authorization, callback) {

    let url = `${api_url}/favorites`
    let req = unirest.get(url)
      .headers({ authorization })

    req.end(res => {
      return callback(res.error, res.body.post_ids)
    })
  }

  update(authorization, post_id, like, callback) {
    let url = `${api_url}/favorites`
    let req = unirest.put(url)
      .headers({ authorization })
      .type('json')
      .send({ post_id, like })

    req.end(res => {
      return callback(res.error, res.body.updated)
    })
  }
}
