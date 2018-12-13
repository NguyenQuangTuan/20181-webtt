const authen_middleware = require('../middlewares/authen-middleware')

module.exports = (app, authen_controller, user_controller, post_detail_controller, review_controller, tag_controller) => {
  app.get('/posts/new',
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
    tag_controller.find_all,
    (req, res, next) => {
      let { user } = res
      let { tags } = res
      res.render('post/new-post', {
        title: 'New Post',
      })
    }
  )

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
    review_controller.get_review,
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