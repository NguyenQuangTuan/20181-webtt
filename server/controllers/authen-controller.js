module.exports = class AuthenService {
  constructor(authen_service) {
    this.authen_service = authen_service

    this.signup = this.signup.bind(this)
    this.login = this.login.bind(this)
    this.checkuser = this.checkuser.bind(this)
  }

  signup(req, res, next) {
    let { body } = req
    this.authen_service.signup(body, (err, authen_obj) => {
      if (err) next(err)
      else {
        res.token = authen_obj.access_token
        next()
      }
    })
  }

  login(req, res, next) {
    let { body } = req
    this.authen_service.login(body, (err, authen_obj) => {
      if (err) next(err)
      else {
        res.token = authen_obj.access_token
        next()
      }
    })
  }

  checkuser(req, res, next) {
    let authorization = res.token
    this.authen_service.checkuser(authorization, (err, result) => {
      if (err) {
        res.token_valid = false
        next()
      }
      else {
        res.token_valid = true
        next()
      }
    })
  }
}