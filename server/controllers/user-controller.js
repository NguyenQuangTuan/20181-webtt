module.exports = class UserController {
  constructor(user_service) {
    this.user_service = user_service

    this.find_one = this.find_one.bind(this)
    this.get_me = this.get_me.bind(this)
  }

  find_one(req, res, next) {
    let { user_id } = req
    this.user_service.find_one(user_id, (err, user) => {
      if (err) next(err)
      else {
        res.user = user
        next()
      }
    })
  }

  get_me(req, res, next) {
    let authorization = res.token

    this.user_service.get_me(authorization, (err, tags) => {
      if (err) {
        res.tags = []
        next()
      }
      else {
        res.tags = tags
        next()
      }
    })
  }
}