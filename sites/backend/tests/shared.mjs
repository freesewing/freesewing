import dotenv from 'dotenv'
import axios from 'axios'
import chai from 'chai'
import http from 'chai-http'
import { verifyConfig } from '../src/config.mjs'
import { randomString } from '../src/utils/crypto.mjs'
import {
  cisFemaleAdult34 as her,
  cisMaleAdult42 as him,
} from '../../../packages/models/src/index.mjs'

dotenv.config()

const config = verifyConfig(true)
const expect = chai.expect
chai.use(http)
const sets = { her, him }

export const setup = async () => {
  // Initial store contents
  const store = {
    chai,
    expect,
    config,
    account: {
      email: `test_${randomString()}@${config.tests.domain}`,
      language: 'en',
      password: randomString(),
      sets: {},
    },
    altaccount: {
      email: `test_${randomString()}@${config.tests.domain}`,
      language: 'en',
      password: randomString(),
      sets: {},
    },
    icons: {
      user: '🧑 ',
      mfa: '🔒 ',
      jwt: '🎫 ',
      key: '🎟️  ',
      set: '🧕 ',
      pattern: '👕 ',
    },
    randomString,
  }
  store.icon = (icon1, icon2 = false) => store.icons[icon1] + (icon2 ? store.icons[icon2] : '')

  for (const acc of ['account', 'altaccount']) {
    // Get confirmation ID
    let result
    try {
      result = await axios.post(`${store.config.api}/signup`, {
        email: store[acc].email,
        language: store[acc].language,
        unittest: true,
      })
    } catch (err) {
      console.log('Failed at first setup request', err)
      process.exit()
    }
    store[acc].confirmation = result.data.confirmation

    // Confirm account
    try {
      result = await axios.post(`${store.config.api}/confirm/signup/${store[acc].confirmation}`, {
        consent: 1,
      })
    } catch (err) {
      console.log('Failed at account confirmation request', err)
      process.exit()
    }
    store[acc].token = result.data.token
    store[acc].username = result.data.account.username
    store[acc].id = result.data.account.id

    // Create API key
    try {
      result = await axios.post(
        `${store.config.api}/apikeys/jwt`,
        {
          name: 'Test API key',
          level: 4,
          expiresIn: 60,
        },
        {
          headers: {
            authorization: `Bearer ${store[acc].token}`,
          },
        }
      )
    } catch (err) {
      console.log('Failed at API key creation request', err)
      process.exit()
    }
    store[acc].apikey = result.data.apikey

    // Create sets key
    for (const name in sets) {
      try {
        result = await axios.post(
          `${store.config.api}/sets/jwt`,
          {
            name: `This is ${name} name`,
            notes: `These are ${name} notes`,
            measies: sets[name],
          },
          {
            headers: {
              authorization: `Bearer ${store[acc].token}`,
            },
          }
        )
      } catch (err) {
        console.log('Failed at API key creation request', err)
        process.exit()
      }
      store[acc].sets[name] = result.data.set
    }
  }

  return { chai, config, expect, store }
}

export const teardown = async function (/*store*/) {
  //console.log(store)
}
