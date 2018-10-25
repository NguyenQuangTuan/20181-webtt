module.exports = class ReviewController {
  constructor(review_service) {
    this.review_service = review_service

    this.get_all_reviews = this.get_all_reviews.bind(this)
  }

  get_all_reviews(req, res, next) {
    this.review_service.retrieve_all(condition, select, offset, limit, sort, (err, reviews) => {
      if (err) next(err)
      else {
        res.reviews = reviews
        next()
      }
    })
  }
}
