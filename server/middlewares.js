const bodyParser = require('body-parser').json({ extended: false })
const cookieParser = require('cookie-parser')()
const { STATUS_CODES } = require('http')
const cors = require('cors')()
const logger = require('../services/logger')

module.exports = {
  bodyParser,
  cookieParser,
  appLogger,
  cors,
  handleError,
  notFound
}

function appLogger (req, res, next) {
  req.appLogger = logger
  logger.info(`${req.hostname} ${req.path} ${req.method} ${req.header('user-agent')} `)
  next()
}

function handleError (err, req, res, next) {
  if (res.headersSent) return next(err)

  const statusCode = err.status || err.statusCode || err.code || 500
  const errorMessage = STATUS_CODES[statusCode] || 'Internal Error'

  res.status(statusCode).json({ error: errorMessage })
}

function notFound (req, res) {
  res.status(404).json({ error: 'Not Found' })
}
