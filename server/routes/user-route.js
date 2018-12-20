const authen_middleware = require('../middlewares/authen-middleware')

module.exports = (app, authen_controller, user_controller, post_controller, notification_controller, follow_controller) => {
  app.get('/mypage',
    authen_middleware.get_token,
    authen_controller.checkuser,
    (req, res, next) => {
      if (!res.token_valid) {
        return res.redirect('/login')
      }
      else next()
    },
    user_controller.get_me,
    user_controller.get_follows,
    // Other handle
    notification_controller.find_by_page,
    notification_controller.get_unseen_number,
    post_controller.find_by_user,
    (req, res, next) => {

      let { notifications, noti_count, user, posts, follows } = res
      let target_user = user
      res.render('user-page', {
        title: 'Mypage',
        posts, user, notifications, noti_count, follows, target_user
      })
    }
  )

  app.get('/users/:user_id',
    authen_middleware.get_token,
    authen_controller.checkuser,
    (req, res, next) => {
      if (!res.token_valid) {
        return res.redirect('/login')
      }
      else next()
    },
    user_controller.get_me,
    user_controller.find_one,
    user_controller.get_follows_by_uid,
    // Other handle
    notification_controller.find_by_page,
    notification_controller.get_unseen_number,
    post_controller.find_by_user,
    (req, res, next) => {
      let { notifications, noti_count, user, posts, follows, target_user } = res
      console.log(target_user)
      console.log(follows)
      let is_following = follows.indexOf(user.user_id)>=0?'Following':'Follow'
      res.render('user-page', {
        title: target_user.full_name,
        posts, user, notifications, noti_count, follows, target_user, is_following
      })
    }
  )

  app.put('/follows',
    authen_middleware.get_token,
    user_controller.follow,
    (req, res) => {
      console.log(res)
      return res.status(200).send(res.follow)
    }
  )
}