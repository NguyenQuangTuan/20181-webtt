const unirest = require('unirest')
const { api_url } = require('../config/index')

module.exports = class ProductService {
  constructor() {
    this.find_all = this.find_all.bind(this)
    this.create = this.create.bind(this)
    this.find_all_sub_revirew = this.find_all_sub_revirew.bind(this)
    this.create_sub_review = this.create_sub_review.bind(this)
  }

  find_all(post_id, offset = 0, limit = 10, callback) {

    let url = `${api_url}/posts/${post_id}/reviews`
    let req = unirest.get(url)
      .query(offset, limit)

    req.end(res => {
      return callback(res.error, res.body.reviews)
    })
  }

  create(authorization, post_id, review, callback) {
    let url = `${api_url}/posts/${post_id}/reviews`
    let req = unirest.post(url)
      .headers({ authorization })
      .type('json')
      .send({ review })

    req.end(res => {
      return callback(res.error, res.body.review)
    })
  }

  find_all_sub_revirew(post_id, review_id, offset = 0, limit = 10, callback) {

    let url = `${api_url}/posts/${post_id}/reviews/${review_id}/subreviews`
    let req = unirest.get(url)
      .query(offset, limit)
    req.end(res => {
      return callback(res.error, res.body.sub_reviews)
    })
  }

  create_sub_review(authorization, post_id, review_id, sub_review, callback) {
    let url = `${api_url}/posts/${post_id}/reviews/${review_id}/subreviews`
    let req = unirest.post(url)
      .headers({ authorization })
      .type('json')
      .send({ sub_review })

    req.end(res => {
      return callback(res.error, res.body.sub_review)
    })
  }
}
