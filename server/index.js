const http = require('http')
const app = require('express')()
const middleware = require('./middlewares')
const { ApolloServer } = require('apollo-server-express')
const { mergeTypes, mergeResolvers } = require('merge-graphql-schemas')

const homeController = require('./controllers/home.controller')
const { health } = require('./controllers/health.controller')

const httpServer = http.createServer(app)

// Creating App Unified Structure
app.models = {}
app.graphql = {}
app.graphql.typeDefs = []
app.graphql.resolvers = []

require('./graphql')(app)

// Creating Apollo server with all type definitions and resolvers
const typeDefs = app.graphql.typeDefs
const resolvers = app.graphql.resolvers

const GqlServer = new ApolloServer({
  playground: process.env.NODE_ENV !== 'production',
  typeDefs: mergeTypes(typeDefs),
  resolvers: mergeResolvers(resolvers)
})



app.use(middleware.bodyParser)
app.use(middleware.cookieParser)

app.use(middleware.cors)
app.use(middleware.appLogger)

app.get('/', homeController.home)
app.get('/health', health)

GqlServer.applyMiddleware({ app })
GqlServer.installSubscriptionHandlers(httpServer)
app.use(middleware.handleError)
app.use(middleware.notFound)

module.exports = (opts = {}, cb) => {
  const port = opts.port || 1337
  return httpServer.listen(port, cb)
}
