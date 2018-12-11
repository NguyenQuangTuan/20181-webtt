const post = 
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
  }
  

module.exports = (app) => {
  app.get('/posts/detail',
    (req, res, next) => {
      res.render('post/detail-post', {
        title: 'Detail',
        post
      })
    }
  )
}