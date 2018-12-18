const authen_middleware = require('../middlewares/authen-middleware')

module.exports = (app, authen_controller,
  user_controller,
  post_detail_controller,
  review_controller,
  tag_controller,
  notification_controller) => {


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
    notification_controller.find_by_page,
    notification_controller.get_unseen_number,
    (req, res, next) => {
      let { user } = res
      let { tags } = res
      let { notifications, noti_count } = res
      res.render('post/new-post', {
        title: 'New Post',
        user, tags, notifications, noti_count
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
    notification_controller.find_by_page,
    notification_controller.get_unseen_number,
    post_detail_controller.get_post,
    post_detail_controller.check_like,
    review_controller.get_review,
    (req, res, next) => {
      let { notifications, noti_count } = res
      let { user } = res
      let { post } = res
      let { reviews } = res
      let { is_liked } = res
      res.render('post/detail-post', {
        title: post.title,
        user, post, notifications, noti_count, reviews, is_liked
      })
    }
  )

  app.post('/posts',
    authen_middleware.get_token,
    post_detail_controller.create,
    (req, res) => {
      return res.status(200).send(res.post)
    }
  )

  app.put('/favorites',
    authen_middleware.get_token,
    post_detail_controller.like,
    (req, res) => {
      return res.status(200).send(res.updated)
    }
  )
}