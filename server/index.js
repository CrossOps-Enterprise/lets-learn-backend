const app = require('express')()
const middleware = require('./middlewares')
const homeController = require('./controllers/home.controller')

app.use(middleware.bodyParser)
app.use(middleware.cookieParser)
app.use(middleware.cors)
app.use(middleware.logger)

app.get('/', homeController.home)

module.exports = (opts = {}, cb) => {
  const port = opts.port || 3000
  return app.listen(port, cb)
}
