import dotenv from 'dotenv'
import chai from 'chai'
import http from 'chai-http'
import { verifyConfig } from '../src/config.mjs'
import { randomString } from '../src/utils/crypto.mjs'
import { userTests } from './user.mjs'
import { apikeyTests } from './apikey.mjs'
import { setup } from './shared.mjs'

dotenv.config()

const config = verifyConfig()
const expect = chai.expect
chai.use(http)

// Account data
const store = {
  account: {
    email: `test_${randomString()}@${config.tests.domain}`,
    language: 'en',
    password: randomString(),
  },
}

// Run tests
const runTests = async (config, store, chai) => {
  await setup(config, store, chai)
  await userTests(config, store, chai)
  await apikeyTests(config, store, chai)
}

// Do the work
runTests(config, store, chai)
