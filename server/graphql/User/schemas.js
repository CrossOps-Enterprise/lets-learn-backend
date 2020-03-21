module.exports = (app) => {
  const { gql } = require('apollo-server-express')

  const typeDefs = gql`
  
    type User {
        _id: ID
        email: String!
        username: String!
        password: String!
    }


    type Query {
        getAllUsers: [User]
    }

    type Mutation {
        addUser(
            email: String!
            password: String!
            username: String!
        ):User
    }

    type Subscription {
        userAdded: User
    }
`

  app.graphql.typeDefs.push(typeDefs)
}
