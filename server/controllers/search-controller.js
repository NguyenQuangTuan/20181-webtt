const async = require('async')
const lodash = require('lodash')

module.exports = class SearchController {
  constructor(post_service, user_service) {
    this.post_service = post_service
    this.user_service = user_service

    this.autocomplete = this.autocomplete.bind(this)
    this.search = this.search.bind(this)
    this.searchtag = this.searchtag.bind(this)
  }

  autocomplete(req, res, next) {
    let { title } = req.body

    async.parallel({
      title: cb => {
        this.post_service.autocomplete({ title }, (err, posts) => {
          cb(err, posts)
        })
      },
      full_name: cb => {
        this.user_service.autocomplete({ full_name: title }, (err, users) => {
          cb(err, users)
        })
      }
    }, (err, result) => {
      if (err) {
        res.result = {
          title: {}, full_name: {}
        }
        next()
      }
      else {
        res.result = result
        // res.result = [{name: 'tuan'}, {name: 'loan'}, {name: 'loan, tuanl'}]
        next()
      }
    })
  }

  search(req, res, next) {
    let { title } = req.query

    async.parallel({
      posts: cb => {
        async.waterfall([
          cb2 => {
            this.post_service.find_all({ title }, null, 0, 5, {}, (err, posts) => {
              return cb2(err, posts)
            })
          },
          (posts, cb2) => {
            if (posts.length == 0) return cb2(null, [])
            let user_ids = posts.map(post => post.user_id)
            this.user_service.find_all({ user_ids }, null, 0, null, {}, (err, users) => {
              if (err) return cb2(null, [])
              posts = handle_posts(posts, users)
              return cb2(null, posts)
            })
          }
        ], (err, posts) => {
          if (err) return cb(null, [])
          else return cb(null, posts)
        })
      },
      users: cb => {
        this.user_service.find_all({ full_name: title }, null, 0, 5, {}, (err, users) => {
          if (err) return cb(null, [])
          else return cb(null, users)
        })
      }
    }, (err, result) => {
      if (err) {
        res.posts = []
        res.users = []
        next()
      }
      else {
        res.posts = result.posts
        res.users = result.users
        next()
      }
    })
  }

  searchtag(req, res, next) {
    let { tag } = req.query
    let tags = [tag]

    async.waterfall([
      cb => {
        this.post_service.find_all({ tags }, null, 0, 10, {}, (err, posts) => {
          return cb(err, posts)
        })
      },
      (posts, cb) => {
        if (posts.length == 0) return cb(null, [])
        let user_ids = posts.map(post => post.user_id)
        this.user_service.find_all({ user_ids }, null, 0, null, {}, (err, users) => {
          if (err) return cb(null, [])
          posts = handle_posts(posts, users)
          return cb(null, posts)
        })
      }
    ], (err, posts) => {
      if (err) {
        res.posts = []
        res.tag = tag
        next()
      }
      else {
        res.posts = posts
        res.tag = tag
        next()
      }
    })
  }
}

const handle_posts = (posts, users) => {
  // handle posts
  posts = posts.map(post => {
    let index = lodash.findLastIndex(users, { user_id: post.user_id })
    if (index == -1) return Objectasyn.c(post, { user: null })
    else return Object.assign(post, { user: users[index] })
  })

  return posts
}