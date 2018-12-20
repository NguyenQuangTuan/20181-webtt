module.exports = class UserController {
  constructor(user_service) {
    this.user_service = user_service

    this.find_one = this.find_one.bind(this)
    this.get_me = this.get_me.bind(this)
    this.get_follows = this.get_follows.bind(this)
    this.get_follows_by_uid = this.get_follows_by_uid.bind(this)
    this.follow = this.follow.bind(this)
  }

  find_one(req, res, next) {
    let { user_id } = req.params
    this.user_service.find_one(user_id, (err, user) => {
      console.log(user)
      if (err) next(err)
      else {
        res.target_user = user
        next()
      }
    })
  }

  get_me(req, res, next) {
    let authorization = res.token

    this.user_service.get_me(authorization, (err, user) => {
      if (err) next(err)
      else {
        res.user = user
        next()
      }
    })
  }

  get_follows(req, res, next) {
    let authorization = res.token

    this.user_service.get_follows(authorization, (err, follows) => {
      if (err) next(err)
      else {
        res.follows = follows
        next()
      }
    })
  }
  
  get_follows_by_uid(req, res, next) {
    let {user_id} = req.params

    this.user_service.get_follows_by_uid(user_id, (err, follows) => {
      if (err) next(err)
      else {
        res.follows = follows
        next()
      }
    })
  }

  follow(req, res, next) {
    let authorization = res.token
    let follow_data = req.body;
    this.user_service.follow(authorization, follow_data, (err, follow) => {
      if (err) next(err)
      else {
        res.follow = follow
        next()
      }
    })
  }
}