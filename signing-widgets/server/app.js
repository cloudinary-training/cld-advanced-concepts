require('dotenv').config()
const createError = require('http-errors')
const express = require('express')
const path = require('path')

const mlRouter = require('./routes/ml')
const uploadRouter = require('./routes/upload')
const signmedialibRouter = require('./routes/signml')
const signuploadRouter = require('./routes/signupload')

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

// index route renders the media library component
app.use('/ml', mlRouter)
// upload route renders the upload library component
app.use('/upload', uploadRouter)

// media lib signing API
app.use('/api/signml', signmedialibRouter)

// upload signing API
app.use('/api/signupload', signuploadRouter)

// static files
app.use(express.static('public'))

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

// module.exports = app
const port = process.env.PORT || 3000

app.listen(port, () => console.info(`Server is up on http://localhost:${port}`))
