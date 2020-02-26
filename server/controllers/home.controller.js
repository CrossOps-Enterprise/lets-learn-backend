const { autoCatcher } = require('../../utils/auto-catch')
const { version, name } = require('../../package.json')

module.exports = autoCatcher({
  home
})

function home (req, res) {
  res.json({ success: true, version, name })
}
