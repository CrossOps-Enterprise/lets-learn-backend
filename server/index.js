const app = require('express')()
const middleware = require('./middlewares')
const homeController = require('./controllers/home.controller')
const { health } = require('./controllers/health.controller')

app.use(middleware.bodyParser)
app.use(middleware.cookieParser)
app.use(middleware.cors)
app.use(middleware.appLogger)

app.get('/', homeController.home)
app.get('/health', health)

module.exports = (opts = {}, cb) => {
  const port = opts.port || 3000
  return app.listen(port, cb)
}
