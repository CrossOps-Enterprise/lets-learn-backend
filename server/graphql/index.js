module.exports = (app) => {
  // Schemas
  require('./User/schemas')(app)

  // Resolvers
  require('./User/resolvers')(app)
}
