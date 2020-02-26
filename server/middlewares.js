const bodyParser = require('body-parser').json({ extended: false })
const cookieParser = require('cookie-parser')()
const logger = require('morgan')('dev')
const cors = require('cors')()

module.exports = {
  bodyParser,
  cookieParser,
  logger,
  cors
}
