const async = require('async')
const lodash = require('lodash')

module.exports = class PostDetailController {
  constructor(post_service, user_service) {
    this.post_service = post_service
    this.user_service = user_service

    this.get_post = this.get_post.bind(this)
    this.create = this.create.bind(this)
    this.like = this.like.bind(this)
    this.check_like = this.check_like.bind(this)
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
        let { user_id } = post
        this.user_service.find_one(user_id, (err, user) => {
          if (err) return cb(err)
          else {
            post = Object.assign(post, { user })
            return cb(null, post)
          }
        })
      }
    ], (err, post) => {
      if (err) next(err)
      else {
        res.post = post
        next()
      }
    })
  }

  create(req, res, next) {
    let authorization = res.token
    let post = req.body;
    this.post_service.create(authorization, post, (err, post) => {
      if (err) next(err)
      else {
        res.post = post
        next()
      }
    })
  }

  like(req, res, next) {
    let authorization = res.token
    let { post_id, like } = req.body;
    console.log({ post_id, like })
    this.post_service.like(authorization, { post_id, like }, (err, updated) => {
      console.log(updated);
      if (err) next(err)
      else {
        res.updated = updated
        next()
      }
    })
  }


  check_like(req, res, next) {
    let authorization = res.token
    let { post } = res
    if (!post) {
      res.is_liked = false;
      next();
      return
    }
    let { post_id } = post;
    this.post_service.check_like(authorization, post_id, (err, is_liked) => {
      console.log(is_liked);
      if (err) next(err)
      else {
        res.is_liked = is_liked
        next()
      }
    })
  }
}