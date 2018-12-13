const authen_middleware = require('../middlewares/authen-middleware')


module.exports = (app, authen_controller, notification_controller) => {
  app.get('/login',
    authen_middleware.get_token,
    authen_controller.checkuser,
    (req, res) => {
      if (res.token_valid) {
        return res.redirect('/home')
      }
      else {
        return res.render('login', {
          title: 'Login | Web Tiên Tiến'
        })
      }
    }
  )

  app.get('/signup',
    authen_middleware.get_token,
    authen_controller.checkuser,
    (req, res) => {
      if (res.token_valid) {
        return res.redirect('/home')
      }
      else {
        return res.render('login', {
          title: 'Login | Web Tiên Tiến'
        })
      }
    }
  )

  app.post('/login',
    authen_controller.login,
    authen_middleware.set_token,
    notification_controller.save_refresh_token,
    (req, res) => {
      return res.status(200).send(true)
    }
  )

  app.post('/signup',
    authen_controller.signup,
    authen_middleware.set_token,
    notification_controller.save_refresh_token,
    (req, res) => {
      return res.status(200).send(true)
    }
  )

  app.post('/logout',
    notification_controller.remove_refresh_token,
    authen_middleware.remove_token,
    (req, res) => {
      return res.status(200).send(true)
    }
  )
}
