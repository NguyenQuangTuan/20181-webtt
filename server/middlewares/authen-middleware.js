const jwt = require('jsonwebtoken')
const config = require('../config/index')

module.exports = {
  get_authentication: (req, res, next) => {
    let token = req.cookies.jetfri_admin_token || ''
    jwt.verify(token, config.authen.secret, (err, decoded) => {
      if (err) res.body = { admin: null }
      else res.body = { admin: { ...decoded } }
      next()
    })
  },

  set_authentication: (req, res, next) => {
    if (res.body.admin)
      res.cookie('jetfri_admin_token',
        jwt.sign(Object.assign({}, res.body.admin, { role: 'ADMIN' }), config.authen.secret, {
          expiresIn: config.authen.token_expires_in
        }), {
          maxAge: config.authen.token_expires_in,
          httpOnly: true
        })

    next()
  },

  remove_authentication: (req, res, next) => {
    res.clearCookie("jetfri_admin_token");
    next()
  }
}
