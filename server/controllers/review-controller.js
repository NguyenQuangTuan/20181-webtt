const async = require('async')
const lodash = require('lodash')

module.exports = class ReviewController {
  constructor(review_service, user_service) {
    this.review_service = review_service
    this.user_service = user_service

    this.get_review = this.get_review.bind(this)
  }

  get_review(req, res, next) {
    let { post_id } = req.query
    let offset = req.options.offset || req.options.skip || 0

    async.waterfall([
      cb => {
        this.review_service.find_all(post_id, offset, 10, (err, reviews) => {
          return cb(err, reviews)
        })
      },
      (reviews, cb) => {
        if (reviews.length == 0) {
          return cb(null, reviews)
        }
        else {
          Promise.all(
            reviews.map(async review => {
              return new Promise((resolve, reject) => {
                async.parallel({
                  user: (cb2) => {
                    let { user_id } = review
                    this.user_service.find_one(user_id, (err, user) => {
                      return cb2(err, user)
                    })
                  },
                  sub_reviews: (cb2) => {
                    let { review_id } = review
                    this.review_service.find_all_sub_revirew(post_id, review_id, 0, 100, (err, sub_reviews) => {
                      if (err) return cb2(err)
                      else {
                        Promise.all(
                          sub_reviews.map(async s_r => {
                            return new Promise((resolve, reject) => {
                              this.user_service.find_one(user_id, (err, user) => {
                                if (err) reject(err)
                                else {
                                  s_r = Object.assign(s_r, { user })
                                  resolve(s_r)
                                }
                              })
                            })
                          })
                        )
                          .then(sub_reviews => {
                            return cb2(null, sub_reviews)
                          })
                          .catch(err => {
                            return cb2(err)
                          })
                      }
                    })
                  }
                }, (err, result) => {
                  if (err) reject(err)
                  else {
                    let { user, sub_reviews } = result
                    review = Object.async(review, { user, sub_reviews })
                    resolve(review)
                  }
                })
              })
            })
          )
            .then(reviews => {
              return cb(null, reviews)
            })
            .catch(err => {
              return cb(err)
            })
        }
      }
    ], (err, reviews) => {
      if (err) {
        res.reviews = []
        next()
      }
      else {
        res.reviews = reviews
        next()
      }
    })
  }
}