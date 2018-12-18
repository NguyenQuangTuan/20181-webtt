const async = require('async')
const moment = require('moment')
moment.locale('vi')

module.exports = class ReviewController {
  constructor(review_service, user_service) {
    this.review_service = review_service
    this.user_service = user_service

    this.get_review = this.get_review.bind(this)
    this.create = this.create.bind(this)
    this.create_sub_review = this.create_sub_review.bind(this)
  }

  get_review(req, res, next) {
    let { post_id } = req.params
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
                              this.user_service.find_one(s_r.user_id, (err, user) => {
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
                            sub_reviews = sub_reviews.map(sub_review => {
                              sub_review.time = moment(sub_review.created_at, "YYYY-MM-DDThh:mm:ss.000Z").fromNow();
                              return sub_review;
                            })
                            return cb2(null, sub_reviews)
                          })
                      }
                    })
                  }
                }, (err, result) => {
                  if (err) reject(err)
                  else {
                    let { user, sub_reviews } = result
                    review = Object.assign(review, { user, sub_reviews })
                    resolve(review)
                  }
                })
              })
            })
          )
            .then(reviews => {
              reviews = reviews.map(review => {
                review.time = moment(review.created_at, "YYYY-MM-DDThh:mm:ss.000Z").fromNow();
                return review;
              })
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

  create(req, res, next) {
    let authorization = res.token
    let { review, post_id } = req.body;
    this.review_service.create(authorization, post_id, review, (err, review) => {
      if (err) next(err)
      else {
        res.review = review
        next()
      }
    })
  }

  create_sub_review(req, res, next) {
    let authorization = res.token
    let { review_id, post_id, sub_review } = req.body;
    console.log({ review_id, post_id, sub_review })
    this.review_service.create_sub_review(authorization, post_id, review_id, sub_review,
      (err, sub_review) => {
        if (err) next(err)
        else {
          res.sub_review = sub_review
          next()
        }
      })
  }
}