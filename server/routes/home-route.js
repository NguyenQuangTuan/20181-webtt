const authen_middleware = require('../middlewares/authen-middleware')


module.exports = (app, home_controller, authen_controller, tag_controller, user_controller) => {
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
    tag_controller.find_all,
    user_controller.get_me,
    (req, res, next) => {
      let { bv_hay, bv_moi, bv_yt } = res
      let { tags } = res
      let { user } = res
      res.render('home', {
        title: 'Share.com',
        bv_hay, bv_moi, bv_yt, tags, user
      })
    }
  )
}
