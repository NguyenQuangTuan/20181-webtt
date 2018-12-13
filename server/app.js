const express = require('express')
const path = require('path')
const logger = require('morgan')
const cors = require('cors')
const cookie_parser = require('cookie-parser')
const body_parser = require('body-parser')

const app = express()

// view engine setup
app.set('views', path.join(__dirname, '../client/views/pages'))
app.set('view engine', 'ejs')

app.use(cors())
app.use(logger('dev'))
app.use(body_parser.json())
app.use(body_parser.urlencoded({ extended: false }))
app.use(cookie_parser())
app.use(express.static(path.join(__dirname, '../client/public')))

// require('./middlewares/middleware')(app)

// Services
// const ProductService = require('./services/product-service')
const AuthenService = require('./services/authen-service')

// const product_service = new ProductService()
const authen_service = new AuthenService()
// Controllers
// const HomeController = require('./controllers/home-controller')
const AuthenController = require('./controllers/authen-controller')

// const home_controller = new HomeController(product_service)
const authen_controller = new AuthenController(authen_service)

// Routes
require('./routes/home-route')(app)
require('./routes/post-route')(app)
require('./routes/detail-route')(app)
require('./routes/authen-route')(app, authen_controller)
require('./routes/user-route')(app)
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
