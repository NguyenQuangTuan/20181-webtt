const config = require('../config/index')

module.exports = {
  get_token: (req, res, next) => {
    let token = req.cookies.wtt_token || ''
    res.token = token
    next()
  },

  set_token: (req, res, next) => {
    let token = res.token || ''
    if (token)
      res.cookie(
        'wtt_token',
        token,
        {
          maxAge: config.authen.token_expires_in,
          httpOnly: true
        })

    next()
  },

  remove_token: (req, res, next) => {
    res.clearCookie("wtt_token");
    next()
  }
}
