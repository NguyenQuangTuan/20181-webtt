const authen_middleware = require('../middlewares/authen-middleware')


module.exports = (app, home_controller, authen_controller) => {
  app.get('/home',
    authen_middleware.get_token,
    authen_controller.checkuser,
    (req, res, next) => {
      if (!res.token_valid) {
        return res.redirect('/login')
      }
      else next()
    },
    home_controller.get_list_posts,
    (req, res, next) => {
      res.render('home', {
        title: 'Kipalog',
        posts
      })
    }
  )
}
