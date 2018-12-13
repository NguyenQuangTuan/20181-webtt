const authen_middleware = require('../middlewares/authen-middleware')

const posts = [
  {
    "post_id": "yxK3wIP5w",
    "title": "Đinh Thị Thu Huyền",
    "content": "<p>Leather Adhesives Card Case&nbsp;is made of high quality leather bringing business vintage look. It is convenient to carry some cards, cash ans earphone and other little stuff.</p><p>Fit for any smartphone.</p>",
    "short_content": "Leather Adhesives Card Case is made of high quality leather bringing business vintage look. It is convenient to carry some cards, cash ans earphon ...",
    "user_id": "AxGWTE909",
    "rating_average": 0,
    "total_review": 0,
    "tags": [
      "default"
    ],
    "created_at": "2018-11-26T06:18:16.857+00:00",
    "updated_at": "2018-11-26T06:18:16.859+00:00"
  },
  {
    "post_id": "zp6KBu34M",
    "title": "Đinh Thị Thu Huyền",
    "content": "<p>Leather Adhesives Card Case&nbsp;is made of high quality leather bringing business vintage look. It is convenient to carry some cards, cash ans earphone and other little stuff.</p><p>Fit for any smartphone.</p>",
    "short_content": "Leather Adhesives Card Case is made of high quality leather bringing business vintage look. It is convenient to carry some cards, cash ans earphon ...",
    "user_id": "AxGWTE909",
    "rating_average": 0,
    "total_review": 0,
    "tags": [
      "default"
    ],
    "created_at": "2018-11-26T06:19:41.720+00:00",
    "updated_at": "2018-11-26T06:19:41.721+00:00"
  },
  {
    "post_id": "wx9k-4hqy",
    "title": "Nguyen Quang Tuan",
    "content": "<p>Leather Adhesives Card Case&nbsp;is made of high quality leather bringing business vintage look. It is convenient to carry some cards, cash ans earphone and other little stuff.</p><p>Fit for any smartphone.</p>",
    "short_content": "Leather Adhesives Card Case is made of high quality leather bringing business vintage look. It is convenient to carry some cards, cash ans earphon ...",
    "user_id": "AxGWTE909",
    "rating_average": 0,
    "total_review": 0,
    "tags": [
      "default"
    ],
    "created_at": "2018-11-26T16:07:17.020+00:00",
    "updated_at": "2018-11-26T16:07:17.020+00:00"
  },
  {
    "post_id": "rzF5gpU6C",
    "title": "Đinh Thị Thu Huyền",
    "content": "<p>Leather Adhesives Card Case&nbsp;is made of high quality leather bringing business vintage look. It is convenient to carry some cards, cash ans earphone and other little stuff.</p><p>Fit for any smartphone.</p>",
    "short_content": "Leather Adhesives Card Case is made of high quality leather bringing business vintage look. It is convenient to carry some cards, cash ans earphon ...",
    "user_id": "AxGWTE909",
    "rating_average": 0,
    "total_review": 0,
    "tags": [
      "default"
    ],
    "created_at": "2018-11-26T06:39:51.995+00:00",
    "updated_at": "2018-11-26T06:39:51.996+00:00"
  },
  {
    "post_id": "c_N4NvoT1",
    "title": "Đinh Thị Thu Huyền",
    "content": "<p>Leather Adhesives Card Case&nbsp;is made of high quality leather bringing business vintage look. It is convenient to carry some cards, cash ans earphone and other little stuff.</p><p>Fit for any smartphone.</p>",
    "short_content": "Leather Adhesives Card Case is made of high quality leather bringing business vintage look. It is convenient to carry some cards, cash ans earphon ...",
    "user_id": "AxGWTE909",
    "rating_average": 0,
    "total_review": 0,
    "tags": [
      "default"
    ],
    "created_at": "2018-11-26T16:04:46.072+00:00",
    "updated_at": "2018-11-26T16:04:46.074+00:00"
  },
  {
    "post_id": "DIlFM0vIz",
    "title": "Nguyen Quang Tuan",
    "content": "<p>Leather Adhesives Card Case&nbsp;is made of high quality leather bringing business vintage look. It is convenient to carry some cards, cash ans earphone and other little stuff.</p><p>Fit for any smartphone.</p>",
    "short_content": "Leather Adhesives Card Case is made of high quality leather bringing business vintage look. It is convenient to carry some cards, cash ans earphon ...",
    "user_id": "AxGWTE909",
    "rating_average": 0,
    "total_review": 0,
    "tags": [
      "default"
    ],
    "created_at": "2018-11-26T16:07:05.861+00:00",
    "updated_at": "2018-11-26T16:07:05.861+00:00"
  },
]

module.exports = (app, authen_controller, user_controller, post_controller, notification_controller) => {
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
    user_controller.get_follows,
    // Other handle
    notification_controller.find_by_page,
    notification_controller.get_unseen_number,
    post_controller.find_by_user,
    (req, res, next) => {
      let { notifications, noti_count, user, posts, follows, target_user } = res
      console.log(target_user)
      res.render('user-page', {
        title: 'Mypage',
        posts, user, notifications, noti_count, follows, target_user
      })
    }
  )
}