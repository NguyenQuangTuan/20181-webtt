const authen_middleware = require('../middlewares/authen-middleware')

module.exports = (app,
  notification_controller) => {
  app.post('/notifications/markSeenAll',
    authen_middleware.get_token,
    notification_controller.mark_seen_all,
    (req, res) => {
      return res.status(200).send(true)
    }
  )


}