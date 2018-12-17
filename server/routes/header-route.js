const authen_middleware = require('../middlewares/authen-middleware')

module.exports = (app, search_controller, authen_controller, notification_controller, user_controller, tag_controller) => {
  app.post('/autocomplete',
    search_controller.autocomplete,
    (req, res) => {
      return res.status(200).send(res.result)
    }
  )

  app.get('/search',
    authen_middleware.get_token,
    authen_controller.checkuser,
    (req, res, next) => {
      if (!res.token_valid) {
        return res.redirect('/login')
      }
      else next()
    },
    notification_controller.find_by_page,
    notification_controller.get_unseen_number,
    user_controller.get_me,
    // Other handle
    search_controller.search,
    tag_controller.find_all,
    (req, res) => {
      let { user } = res
      let { notifications, noti_count } = res
      let { posts, users } = res
      let { tags } = res
      res.render('search-page', {
        title: 'Share.com',
        user,
        notifications, noti_count,
        users, posts, tags
      })
    }
  )

  app.get('/searchtag',
    authen_middleware.get_token,
    authen_controller.checkuser,
    (req, res, next) => {
      if (!res.token_valid) {
        return res.redirect('/login')
      }
      else next()
    },
    notification_controller.find_by_page,
    notification_controller.get_unseen_number,
    user_controller.get_me,
    // Other handle
    search_controller.searchtag,
    tag_controller.find_all,
    (req, res) => {
      let { user } = res
      let { notifications, noti_count } = res
      let { posts, tag } = res
      let { tags } = res
      res.render('search-page', {
        title: 'Share.com',
        user,
        notifications, noti_count,
        posts, tags, tag
      })
    }
  )
}