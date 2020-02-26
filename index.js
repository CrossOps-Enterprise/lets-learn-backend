const PORT = process.env.PORT || 1337
const { name, version } = require('./package.json')
const chalk = require('chalk')
const emoji = require('node-emoji')

require('./server')({ port: PORT }, () => {
  console.log(
    chalk.yellow.bold(`${emoji.get('rocket')} ${name} ${version} listening on port ${PORT}`)
  )
})
