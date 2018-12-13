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

module.exports = (app, notification_controller) => {
  app.get('/mypage/:user_id',
    notification_controller.find_by_page,
    notification_controller.get_unseen_number,

    (req, res, next) => {
      let { notifications,noti_count } = res
      res.render('user-page', {
        title: 'Mypage',
        posts, notifications,noti_count
      })
    }
  )
}