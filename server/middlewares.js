const bodyParser = require('body-parser').json({ extended: false })
const cookieParser = require('cookie-parser')()
const cors = require('cors')()
const logger = require('../services/logger')

module.exports = {
  bodyParser,
  cookieParser,
  appLogger,
  cors
}

function appLogger (req, res, next) {
  req.appLogger = logger
  logger.info(`${req.hostname} ${req.path} ${req.method} ${req.header('user-agent')} `)
  next()
}
