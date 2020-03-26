const getAllUsers = `{
  getAllUsers{
    _id
  }
}`

const addUser = `mutation {
  addUser(email:"test@graphql.com" password:"1234567", username:"test"){
    email
  }
}`

module.exports = {
  getAllUsers,
  addUser
}
