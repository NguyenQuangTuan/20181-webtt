const async = require('async')
const lodash = require('lodash')

module.exports = class PostDetail {
  constructor(post_service) {
    this.post_service = post_service

    this.get_post = this.get_post.bind(this)
  }

  get_post(req, res, next) {
    let { post_id } = req.params
    async.waterfall([
      cb => {
        this.post_service.find_one(post_id, (err, post) => {
          return cb(err, post)
        })
      },
      (post, cb) => {
        
      }
    ])

  }
}