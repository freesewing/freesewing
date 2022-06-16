require('dotenv').config()
const config = require('./config.js')
const chai = require('chai')

chai.use(require('chai-http'))
const should = chai.should()
const backend = config.backend

const EMAIL = process.env.SEND_TEST_EMAILS === '1' ? true : false
const store = {}

const userTests = require('./user.test.js')
const userTestsEmail = require('./user.all.test.js')
const personTests = require('./person.test.js')
const patternTests = require('./pattern.test.js')
const oauthTests = require('./oauth.test.js')

if (!EMAIL) {
  // Set credentials to run the tests
  store.en = config.user
  store.de = config.user
  store.es = config.user
  store.nl = config.user
  store.fr = config.user
}

if (EMAIL) userTestsEmail(store, config, chai)
userTests(store, config, chai)
personTests(store, config, chai)
patternTests(store, config, chai)
oauthTests(store, config, chai)
