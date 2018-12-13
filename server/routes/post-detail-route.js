const authen_middleware = require('../middlewares/authen-middleware')

module.exports = (app, authen_controller, user_controller, post_detail_controller) => {
  app.get('/posts/:post_id',
    authen_middleware.get_token,
    authen_controller.checkuser,
    (req, res, next) => {
      if (!res.token_valid) {
        return res.redirect('/login')
      }
      else next()
    },
    user_controller.get_me,
    // Other handle
    post_detail_controller.get_post,
    (req, res, next) => {
      let { user } = res
      let { post } = res
      res.render('post/detail-post', {
        title: 'Share.com',
        user, post
      })
    }
  )
}