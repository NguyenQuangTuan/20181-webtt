const unirest = require('unirest')
// const { api_url } = require('../config/index')
let api_url = 'http://localhost:8081'

module.exports = class ProductService {
  constructor() {
    this.signup = this.signup.bind(this)
    this.login = this.login.bind(this)
    this.checkuser = this.checkuser.bind(this)
  }

  signup(body, callback) {
    let { email, password, full_name, avatar_url = null } = body
    let url = `${api_url}/oauth/signup`
    let req = unirest.post(url)
      .type('json')
      .send({ email, password, full_name, avatar_url })

    req.end(res => {
      return callback(res.error, res.body)
    })
  }

  login(body, callback) {
    let { email, password } = body
    let url = `${api_url}/oauth/login`
    let req = unirest.post(url)
      .type('json')
      .send({ email, password })

    req.end(res => {
      return callback(res.error, res.body)
    })
  }

  checkuser(authorization, callback) {
    let url = `${api_url}/oauth/checkuser`
    let req = unirest.get(url)
      .headers({ authorization })

    req.end(res => {
      return callback(res.error, res.body.result)
    })
  }
}
