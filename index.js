const PORT = process.env.PORT || 1337
const { name, version } = require('./package.json')
const chalk = require('chalk')
const emoji = require('node-emoji')
const greet = require('@crossops-enterprise/gh-package')

require('./server')({ port: PORT }, () => {
  greet()
  console.log(
    chalk.yellow.bold(`${emoji.get('rocket')} ${name} ${version} listening on port ${PORT}`)
  )
  console.log(
    chalk.yellow.bold(`${emoji.get('rocket')} GraphQL Endpoint: http://localhost:${PORT}/graphql `)
  )
})
