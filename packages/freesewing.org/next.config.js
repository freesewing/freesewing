const config = require('../freesewing.shared/config/next.config')
const i18n = require('./next-i18next.config')
console.log(i18n)

config.i18n = i18n.i18n

module.exports = config
