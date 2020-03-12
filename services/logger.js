const { createLogger, format, transports } = require('winston')
const { combine, timestamp, printf, colorize } = format
const path = require('path')

const myFormat = printf(({ level, message, timestamp }) => {
  return `${level}: ${message} ${timestamp} `
})

const logger = createLogger({

  transports: [
    new transports.Console({
      format: combine(
        colorize(),
        timestamp(),
        myFormat
      )
    }),
    new transports.File({
      filename: path.join(__dirname, '../logs/app.log'),
      format: combine(
        timestamp(),
        myFormat
      )
    })
  ]
})

module.exports = logger
