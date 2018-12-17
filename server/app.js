const express = require('express')
const path = require('path')
const logger = require('morgan')
const cors = require('cors')
const cookie_parser = require('cookie-parser')
const body_parser = require('body-parser')
const query_handler = require('express-api-queryhandler')
const app = express()

// view engine setup
app.set('views', path.join(__dirname, '../client/views/pages'))
app.set('view engine', 'ejs')

app.use(query_handler.filter())
app.use(query_handler.fields())
app.use(query_handler.pagination({ limit: 100 }))
app.use(query_handler.sort())

app.use(cors())
app.use(logger('dev'))
app.use(body_parser.json())
app.use(body_parser.urlencoded({ extended: false }))
app.use(cookie_parser())
app.use(express.static(path.join(__dirname, '../client/public')))

// require('./middlewares/middleware')(app)

// Services
const PostService = require('./services/post-service')
const AuthenService = require('./services/authen-service')
const UserService = require('./services/user-service')
const FavoriteService = require('./services/favorite-service')
const TagService = require('./services/tag-service')
const ReviewService = require('./services/review-service')
const NotificationService = require('./services/notification-service')

const post_service = new PostService()
const authen_service = new AuthenService()
const user_service = new UserService()
const favorite_service = new FavoriteService()
const tag_service = new TagService()
const review_service = new ReviewService()
const notification_service = new NotificationService()

// Controllers
const HomeController = require('./controllers/home-controller')
const PostDetailController = require('./controllers/post-detail-controller')
const NotificationController = require('./controllers/notification-controller')

const home_controller = new HomeController(post_service, user_service, favorite_service)
const notification_controller = new NotificationController(notification_service)
const post_detail_controller = new PostDetailController(post_service, user_service)

// no page
const AuthenController = require('./controllers/authen-controller')
const TagController = require('./controllers/tag-controller')
const UserController = require('./controllers/user-controller')
const ReviewController = require('./controllers/review-controller')
const PostController = require('./controllers/post-controller')
const SearchController = require('./controllers/search-controller')

const authen_controller = new AuthenController(authen_service)
const tag_controller = new TagController(tag_service)
const user_controller = new UserController(user_service)
const review_controller = new ReviewController(review_service, user_service)
const post_controller = new PostController(post_service)
const search_controller = new SearchController(post_service, user_service)

// Routes
require('./routes/home-route')(app, home_controller, authen_controller, tag_controller, user_controller, notification_controller)
require('./routes/post-route')(app, authen_controller, user_controller, post_detail_controller, review_controller, tag_controller, notification_controller)
require('./routes/authen-route')(app, authen_controller, notification_controller)
require('./routes/user-route')(app, authen_controller, user_controller, post_controller, notification_controller)
require('./routes/notification-route')(app, notification_controller)
require('./routes/header-route')(app, search_controller, authen_controller, notification_controller, user_controller, tag_controller)

// Locals
require('./locals/locals')(app.locals)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = (req.app.get('env') === 'development' || req.app.get('env') === 'local') ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
