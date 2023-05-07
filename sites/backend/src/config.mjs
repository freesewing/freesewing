import chalk from 'chalk'
// Load environment variables
import dotenv from 'dotenv'
import { asJson } from './utils/index.mjs'
import { randomString } from './utils/crypto.mjs'
import { measurements } from './measurements.mjs'
import get from 'lodash.get'
import { readFileSync, writeFileSync } from 'node:fs'
import { postConfig } from '../local-config.mjs'
dotenv.config()

// Allow these 2 to be imported
export const port = process.env.BACKEND_PORT || 3000
export const api = process.env.BACKEND_URL || `http://localhost:${port}`

// Generate/Check encryption key only once
const encryptionKey = process.env.BACKEND_ENC_KEY
  ? process.env.BACKEND_ENC_KEY
  : randomEncryptionKey()

// All environment variables are strings
// This is a helper method to turn them into a boolean
const envToBool = (input = 'no') => {
  if (['yes', '1', 'true'].includes(input.toLowerCase())) return true
  return false
}

// Construct config object
const baseConfig = {
  // Environment
  env: process.env.NODE_ENV || 'development',
  // Feature flags
  use: {
    github: envToBool(process.env.BACKEND_ENABLE_GITHUB),
    oauth: {
      github: envToBool(process.env.BACKEND_ENABLE_OAUTH_GITHUB),
      google: envToBool(process.env.BACKEND_ENABLE_OAUTH_GOOGLE),
    },
    sanity: envToBool(process.env.BACKEND_ENABLE_SANITY),
    ses: envToBool(process.env.BACKEND_ENABLE_AWS_SES),
    tests: {
      base: envToBool(process.env.BACKEND_ENABLE_TESTS),
      email: envToBool(process.env.BACKEND_ENABLE_TESTS_EMAIL),
      sanity: envToBool(process.env.BACKEND_ENABLE_TESTS_SANITY),
    },
  },
  // Config
  api,
  apikeys: {
    levels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    expiryMaxSeconds: 365 * 24 * 3600,
  },
  avatars: {
    user: process.env.BACKEND_AVATAR_USER || 'https://freesewing.org/avatar.svg',
    set: process.env.BACKEND_AVATAR_SET || 'https://freesewing.org/avatar.svg',
    pattern: process.env.BACKEND_AVATAR_PATTERN || 'https://freesewing.org/avatar.svg',
  },
  db: {
    url: process.env.BACKEND_DB_URL || './db.sqlite',
  },
  encryption: {
    key: encryptionKey,
  },
  jwt: {
    secretOrKey: encryptionKey,
    issuer: process.env.BACKEND_JWT_ISSUER || 'freesewing.org',
    audience: process.env.BACKEND_JWT_ISSUER || 'freesewing.org',
    expiresIn: process.env.BACKEND_JWT_EXPIRY || '7d',
  },
  languages: ['en', 'de', 'es', 'fr', 'nl'],
  measies: measurements,
  mfa: {
    service: process.env.BACKEND_MFA_SERVICE || 'FreeSewing',
  },
  port,
  roles: {
    levels: {
      readNone: 0,
      readSome: 1,
      readOnly: 2,
      writeSome: 3,
      user: 4,
      curator: 5,
      bughunter: 6,
      support: 8,
      admin: 9,
    },
    base: 'user',
  },
  tests: {
    domain: process.env.BACKEND_TEST_DOMAIN || 'freesewing.dev',
    production: envToBool(process.env.BACKEND_ALLOW_TESTS_IN_PRODUCTION),
  },
  website: {
    domain: process.env.BACKEND_WEBSITE_DOMAIN || 'freesewing.org',
    scheme: process.env.BACKEND_WEBSITE_SCHEME || 'https',
  },
  oauth: {},
  github: {},
}

/*
 * Config behind feature flags
 */

// Github config
if (baseConfig.use.github)
  baseConfig.github = {
    token: process.env.BACKEND_GITHUB_TOKEN,
    api: 'https://api.github.com',
    bot: {
      user: process.env.BACKEND_GITHUB_USER || 'freesewing-robot',
      name: process.env.BACKEND_GITHUB_USER_NAME || 'Freesewing bot',
      email: process.env.BACKEND_GITHUB_USER_EMAIL || 'bot@freesewing.org',
    },
    notify: {
      specific: {
        albert: ['woutervdub'],
        bee: ['bobgeorgethe3rd'],
        benjamin: ['woutervdub'],
        cornelius: ['woutervdub'],
        diana: ['alfalyr'],
        holmes: ['alfalyr'],
        hortensia: ['woutervdub'],
        lunetius: ['starfetch'],
        penelope: ['woutervdub'],
        tiberius: ['starfetch'],
        sandy: ['alfalyr'],
        ursula: ['nataliasayang'],
        yuri: ['biou', 'hellgy'],
        walburga: ['starfetch'],
        waralee: ['woutervdub'],
      },
      dflt: [process.env.BACKEND_GITHUB_NOTIFY_DEFAULT_USER || 'joostdecock'],
    },
  }

// Sanity config
if (baseConfig.use.sanity)
  baseConfig.sanity = {
    project: process.env.SANITY_PROJECT,
    dataset: process.env.SANITY_DATASET || 'production',
    token: process.env.SANITY_TOKEN || 'fixmeSetSanityToken',
    version: process.env.SANITY_VERSION || 'v2022-10-31',
    api: `https://${process.env.SANITY_PROJECT || 'missing-project-id'}.api.sanity.io/${
      process.env.SANITY_VERSION || 'v2022-10-31'
    }`,
  }

// AWS SES config (for sending out emails)
if (baseConfig.use.ses)
  baseConfig.aws = {
    ses: {
      region: process.env.BACKEND_AWS_SES_REGION || 'us-east-1',
      from: process.env.BACKEND_AWS_SES_FROM || 'FreeSewing <info@freesewing.org>',
      replyTo: process.env.BACKEND_AWS_SES_REPLY_TO
        ? JSON.parse(process.env.BACKEND_AWS_SES_REPLY_TO)
        : ['FreeSewing <info@freesewing.org>'],
      feedback: process.env.BACKEND_AWS_SES_FEEDBACK,
      cc: process.env.BACKEND_AWS_SES_CC ? JSON.parse(process.env.BACKEND_AWS_SES_CC) : [],
      bcc: process.env.BACKEND_AWS_SES_BCC
        ? JSON.parse(process.env.BACKEND_AWS_SES_BCC)
        : ['FreeSewing records <records@freesewing.org>'],
    },
  }

// Oauth config for Github as a provider
if (baseConfig.use.oauth?.github)
  baseConfig.oauth.github = {
    clientId: process.env.BACKEND_OAUTH_GITHUB_CLIENT_ID,
    clientSecret: process.env.BACKEND_OAUTH_GITHUB_CLIENT_SECRET,
    tokenUri: 'https://github.com/login/oauth/access_token',
    dataUri: 'https://api.github.com/user',
    emailUri: 'https://api.github.com/user/emails',
  }

// Oauth config for Google as a provider
if (baseConfig.use.oauth?.google)
  baseConfig.oauth.google = {
    clientId: process.env.BACKEND_OAUTH_GOOGLE_CLIENT_ID,
    clientSecret: process.env.BACKEND_OAUTH_GOOGLE_CLIENT_SECRET,
    tokenUri: 'https://oauth2.googleapis.com/token',
    dataUri: 'https://people.googleapis.com/v1/people/me?personFields=emailAddresses,names,photos',
  }

// Load local config
const config = postConfig(baseConfig)

// Exporting this stand-alone config
export const sanity = config.sanity || {}
export const website = config.website

const vars = {
  BACKEND_DB_URL: ['required', 'db.url'],
  BACKEND_PORT: 'optional',
  BACKEND_WEBSITE_DOMAIN: 'optional',
  BACKEND_WEBSITE_SCHEME: 'optional',
  BACKEND_ENC_KEY: ['requiredSecret', 'encryption.key'],
  BACKEND_JWT_ISSUER: 'optional',
  BACKEND_JWT_EXPIRY: 'optional',
  // Feature flags
  BACKEND_ENABLE_AWS_SES: 'optional',
  BACKEND_ENABLE_SANITY: 'optional',
  BACKEND_ENABLE_GITHUB: 'optional',
  BACKEND_ENABLE_OAUTH_GITHUB: 'optional',
  BACKEND_ENABLE_OAUTH_GOOGLE: 'optional',
  BACKEND_ENABLE_TESTS: 'optional',
  BACKEND_ALLOW_TESTS_IN_PRODUCTION: 'optional',
  BACKEND_ENABLE_DUMP_CONFIG_AT_STARTUP: 'optional',
}

// Vars for AWS SES integration
if (envToBool(process.env.BACKEND_ENABLE_AWS_SES)) {
  vars.AWS_ACCESS_KEY_ID = 'required'
  vars.AWS_SECRET_ACCESS_KEY = 'requiredSecret'
  vars.BACKEND_AWS_SES_REGION = 'optional'
  vars.BACKEND_AWS_SES_FROM = 'optional'
  vars.BACKEND_AWS_SES_REPLY_TO = 'optional'
  vars.BACKEND_AWS_SES_FEEDBACK = 'optional'
  vars.BACKEND_AWS_SES_CC = 'optional'
  vars.BACKEND_AWS_SES_BCC = 'optional'
}
// Vars for Sanity integration
if (envToBool(process.env.BACKEND_USE_SANITY)) {
  vars.SANITY_PROJECT = 'required'
  vars.SANITY_TOKEN = 'requiredSecret'
  vars.SANITY_VERSION = 'optional'
  vars.BACKEND_TEST_SANITY = 'optional'
}
// Vars for Github integration
if (envToBool(process.env.BACKEND_ENABLE_GITHUB)) {
  vars.BACKEND_GITHUB_TOKEN = 'requiredSecret'
  vars.BACKEND_GITHUB_USER = 'required'
  vars.BACKEND_GITHUB_USER_NAME = 'required'
  vars.BACKEND_GITHUB_USER_EMAIL = 'required'
  vars.BACKEND_GITHUB_NOTIFY_DEFAULT_USER = 'required'
}
// Vars for Oauth via Github integration
if (envToBool(process.env.BACKEND_ENABLE_OAUTH_GITHUB)) {
  vars.BACKEND_OAUTH_GITHUB_CLIENT_ID = 'required'
  vars.BACKEND_OAUTH_GITHUB_CLIENT_SECRET = 'requiredSecret'
}
// Vars for Oauth via Google integration
if (envToBool(process.env.BACKEND_ENABLE_OAUTH_GOOGLE)) {
  vars.BACKEND_OAUTH_GOOGLE_CLIENT_ID = 'required'
  vars.BACKEND_OAUTH_GOOGLE_CLIENT_SECRET = 'requiredSecret'
}
// Vars for (unit) tests
if (envToBool(process.env.BACKEND_ENABLE_TESTS)) {
  vars.BACKEND_TEST_DOMAIN = 'optional'
  vars.BACKEND_ENABLE_TESTS_EMAIL = 'optional'
}

/*
 * This method is how you load the config.
 *
 * It will verify whether whether everyting is setup correctly
 * which is not a given since there's a number of environment
 * variables that need to be set for this backend to function.
 */
export function verifyConfig(silent = false) {
  const emptyString = (input) => {
    if (typeof input === 'string' && input.length > 0) return false
    return true
  }
  const errors = []
  const ok = []

  for (let [key, type] of Object.entries(vars)) {
    let configPath = false
    let val
    if (Array.isArray(type)) [type, configPath] = type
    if (['required', 'requiredSecret'].includes(type)) {
      if (typeof process.env[key] === 'undefined' || emptyString(process.env[key])) {
        // Allow falling back to defaults for required config
        if (configPath) val = get(config, configPath)
        if (typeof val === 'undefined') errors.push(key)
      }
      if (type === 'requiredSecret')
        ok.push(`🔒 ${chalk.yellow(key)}: ` + chalk.grey('***redacted***'))
      else ok.push(`✅ ${chalk.green(key)}: ${chalk.grey(val)}`)
    } else {
      if (typeof process.env[key] !== 'undefined' && !emptyString(process.env[key])) {
        ok.push(`✅ ${chalk.green(key)}: ${chalk.grey(process.env[key])}`)
      }
    }
  }

  if (!silent) {
    for (const o of ok) console.log(o)
    for (const e of errors) {
      console.log(
        chalk.redBright('Error:'),
        'Required environment variable',
        chalk.redBright(e),
        "is missing. The backend won't start without it.",
        '\n',
        chalk.yellow('See: '),
        chalk.yellow.bold('https://freesewing.dev/reference/backend'),
        '\n'
      )
    }
  }

  if (errors.length > 0) {
    console.log(chalk.redBright('Invalid configuration. Stopping here...'))
    return process.exit(1)
  }

  if (envToBool(process.env.BACKEND_ENABLE_DUMP_CONFIG_AT_STARTUP)) {
    const dump = {
      ...config,
      encryption: {
        ...config.encryption,
        key: config.encryption.key.slice(0, 4) + '**redacted**' + config.encryption.key.slice(-4),
      },
      jwt: {
        secretOrKey:
          config.jwt.secretOrKey.slice(0, 4) + '**redacted**' + config.jwt.secretOrKey.slice(-4),
      },
    }
    if (config.sanity)
      dump.sanity = {
        ...config.sanity,
        token: config.sanity.token.slice(0, 4) + '**redacted**' + config.sanity.token.slice(-4),
      }
    console.log(chalk.cyan.bold('Dumping configuration:\n'), asJson(dump, null, 2))
  }

  return config
}

/*
 * Generates a random key
 *
 * This is a convenience method, typically used in a scenario where people want
 * to kick the tires by spinning up a Docker container running this backend.
 * The backend won't start without a valid encryption key. So rather than add
 * this roadblock to such users, it will auto-generate an encryption key and
 * write it to disk.
 */
function randomEncryptionKey() {
  const filename = 'encryption.key'
  console.log(chalk.yellow('⚠️  No encryption key provided'))
  let key = false
  try {
    console.log(chalk.dim('Checking for prior auto-generated encryption key'))
    key = readFileSync(filename, 'utf-8')
  } catch (err) {
    console.log(chalk.dim('No prior auto-generated encryption key found.'))
  }
  if (key) {
    console.log(chalk.green('✅ Prior encryption key found.'))
  } else {
    console.log(chalk.green('✅ Generating new random encryption key'))
    key = randomString(64)
    writeFileSync(filename, key)
  }

  return key
}
