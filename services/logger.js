const { createLogger, format, transports } = require('winston')
const { combine, timestamp, printf, colorize } = format
const path = require('path')

const myFormat = printf(({ level, message, timestamp }) => {
  return `${level}: ${message} ${timestamp} `
})

const logger = createLogger({
  format: combine(
    colorize(),
    timestamp(),
    myFormat
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: path.join(__dirname, '../logs/app.log') })
  ]
})

module.exports = logger
