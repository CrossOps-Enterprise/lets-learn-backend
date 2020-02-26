require('dotenv').config()

const { DOMAIN, AUDIENCE } = process.env

exports.config = {
  auth: {
    domain: DOMAIN || 'https://github.com/umairx97',
    audience: AUDIENCE || ''
  }
}
