module.exports = (app) => {
  const { PubSub } = require('apollo-server-express')
  const pubSub = new PubSub()

  const UserEvents = {
    USER_ADDED: 'USER_ADDED'
  }

  const resolvers = {

    Query: {
      getAllUsers: async (root, userObj, context) => {
        try {
          const users = [
            {
              _id: '2101-2015',
              username: 'umairx97',
              password: '123456',
              email: 'umairahmedbajwa97@gmail.com'
            },
            {
              _id: '2030-2015',
              username: 'asadikhlas',
              password: '123456',
              email: 'asadikhlas03@gmail.com'
            }
          ]
          if (!users.length) {
            throw new Error('No Users Found')
          }

          return users
        } catch (err) {
          return Error(err.message)
        }
      }
    },

    Mutation: {
      addUser: async (root, userObj, context) => {
        const { username, email, password } = userObj
        try {
          const newUser = { username, email, password }
          if (!newUser) {
            throw new Error('Cannot Save User')
          }

          pubSub.publish(UserEvents.USER_ADDED, { userAdded: newUser })
          return newUser
        } catch (err) {
          return Error(err.message)
        }
      }

    },

    Subscription: {
      userAdded: {
        subscribe: () => pubSub.asyncIterator(UserEvents.USER_ADDED)
      }
    }
  }

  app.graphql.resolvers.push([resolvers])
}
