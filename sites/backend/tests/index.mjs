import { userTests } from './user.mjs'
import { mfaTests } from './mfa.mjs'
import { accountTests } from './account.mjs'
import { apikeyTests } from './apikey.mjs'
import { setTests } from './set.mjs'
import { bookmarkTests } from './bookmark.mjs'
import { curatedSetTests } from './curated-set.mjs'
import { optionPackTests } from './option-pack.mjs'
import { patternTests } from './pattern.mjs'
import { subscriberTests } from './subscriber.mjs'
import { flowTests } from './flow.mjs'
import { setup } from './shared.mjs'

const runTests = async (...params) => {
  await userTests(...params)
  await mfaTests(...params)
  await apikeyTests(...params)
  await accountTests(...params)
  await setTests(...params)
  await bookmarkTests(...params)
  await curatedSetTests(...params)
  await optionPackTests(...params)
  await patternTests(...params)
  await subscriberTests(...params)
  await flowTests(...params)
}

// Load initial data required for tests
const { chai, config, expect, store } = await setup()

// Note run the tests using this data
runTests(chai, config, expect, store)
