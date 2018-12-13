const async = require('async')
const lodash = require('lodash')
module.exports = class HomeController {
  constructor(post_service, user_service, favorite_service) {
    this.post_service = post_service
    this.user_service = user_service
    this.favorite_service = favorite_service

    this.get_list_posts = this.get_list_posts.bind(this)
  }

  get_list_posts(req, res, next) {
    let offset = req.options.offset || req.options.skip || 0
    async.parallel({
      bv_hay: cb => {
        async.waterfall([
          cb2 => {
            this.post_service.find_all({}, null, offset, 10, { total_like: -1 }, (err, posts) => {
              if (err) return cb2(null, [])
              else return cb2(null, posts)
            })
          },
          (posts, cb2) => {
            if (posts.length == 0) return cb2(null, [])
            let user_ids = posts.map(post => post.user_id)
            this.user_service.find_all(user_ids, null, 0, null, {}, (err, users) => {
              if (err) return cb2(null, [])

              // handle posts
              posts = posts.map(post => {
                let index = lodash.findLastIndex(users)
                if (index == -1) return Object.async(post, { user: null })
                else return Object.assign(post, { user: users[index] })
              })

              return cb2(null, posts)
            })
          }
        ], (err, posts) => {
          return cb(err, posts)
        })
      },
      bv_moi: cb => {
        async.waterfall([
          cb2 => {
            this.post_service.find_all({}, null, offset, 10, { created_at: -1 }, (err, posts) => {
              if (err) return cb2(null, [])
              else return cb2(null, posts)
            })
          },
          (posts, cb2) => {
            if (posts.length == 0) return cb2(null, [])
            let user_ids = posts.map(post => post.user_id)
            this.user_service.find_all(user_ids, null, 0, null, {}, (err, users) => {
              if (err) return cb2(null, [])

              // handle posts
              posts = posts.map(post => {
                let index = lodash.findLastIndex(users)
                if (index == -1) return Object.async(post, { user: null })
                else return Object.assign(post, { user: users[index] })
              })

              return cb2(null, posts)
            })
          }
        ], (err, posts) => {
          return cb(err, posts)
        })
      },
      bv_yt: cb => {
        async.waterfall([
          cb2 => {
            let { token = '' } = res
            this.favorite_service.find_one(token, (err, post_ids) => {
              return cb2(err, post_ids)
            })
          },
          (post_ids, cb2) => {
            if (post_ids.length == 0) return cb2(null, [])
            this.post_service.find_all({ post_ids }, null, offset, 10, {}, (err, posts) => {
              if (err) return cb2(null, [])
              else return cb2(null, posts)
            })
          },
          (posts, cb2) => {
            if (posts.length == 0) return cb2(null, [])
            let user_ids = posts.map(post => post.user_id)
            this.user_service.find_all(user_ids, null, 0, null, {}, (err, users) => {
              if (err) return cb2(null, [])

              // handle posts
              posts = posts.map(post => {
                let index = lodash.findLastIndex(users)
                if (index == -1) return Object.async(post, { user: null })
                else return Object.assign(post, { user: users[index] })
              })

              return cb2(null, posts)
            })
          }
        ], (err, posts) => {
          return cb(err, posts)
        })
      }
    }, (err, result) => {
      if (err) return next(err)
      else {
        res.bv_hay = result.bv_hay
        res.bv_moi = result.bv_moi
        res.bv_yt = result.bv_yt
        next()
      }
    })
  }
}
