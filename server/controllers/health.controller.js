const { autoCatcher } = require('../../utils/auto-catch')

module.exports = autoCatcher({
  health
})

async function health (req, res) {
  // optional: add further things to check (e.g. connecting to dababase)
  const healthCheck = {
    uptime: process.uptime(),
    message: 'OK',
    status: 'UP',
    timestamp: Date.now()
  }
  res.json(healthCheck)
}
