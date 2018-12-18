const authen_middleware = require('../middlewares/authen-middleware')

module.exports = (app,
  review_controller) => {

  app.post('/reviews',
    authen_middleware.get_token,
    review_controller.create,
    (req, res) => {
      console.log(res)
      return res.status(200).send(res.review)
    }
  )

  app.post('/subreviews',
    authen_middleware.get_token,
    review_controller.create_sub_review,
    (req, res) => {
      console.log(res)
      return res.status(200).send(res.sub_review)
    }
  )

}
                
