const express = require('express')
const path = require('path')
const logger = require('morgan')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const config = require('./config/config')

const app = express()

// view engine setup
app.set('views', path.join(__dirname, '../client/views/pages'))
app.set('view engine', 'ejs')

app.use(cors())
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use('/product_widgets', express.static(path.join(__dirname, '../client/public')))

// require('./middlewares/middleware')(app)

// Services
const ProductService = require('./services/product-service')

const product_service = new ProductService()

// Controllers
const ProductController = require('./controllers/product-controller')

const product_controller = new ProductController(product_service)

// Routes

require('./routes/product-route')(app, product_controller)

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
  res.locals.error = (req.app.get('env') === 'development'/*  || req.app.get('env') === 'local' */) ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
