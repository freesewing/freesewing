import chalk from 'chalk'
// Load environment variables
import dotenv from 'dotenv'
import { asJson } from './utils/index.mjs'
import { randomString } from './utils/crypto.mjs'
import { measurements } from '../../../config/measurements.mjs'
import get from 'lodash.get'
import { readFileSync, writeFileSync } from 'node:fs'
import { postConfig } from '../local-config.mjs'
import { roles } from '../../../config/roles.mjs'
dotenv.config()

/*
 * Make this easy to update
 */
const languages = ['en', 'de', 'es', 'fr', 'nl', 'uk']

/*
 * Allow these 2 to be imported
 */
export const port = process.env.BACKEND_PORT || 3000
export const api = process.env.BACKEND_URL || `http://localhost:${port}`

/*
 * Generate/Check encryption key only once
 */
const encryptionKey = process.env.BACKEND_ENC_KEY
  ? process.env.BACKEND_ENC_KEY
  : randomEncryptionKey()

/*
 * All environment variables are strings
 * This is a helper method to turn them into a boolean
 */
const envToBool = (input = 'no') => {
  if (['yes', '1', 'true'].includes(input.toLowerCase())) return true
  return false
}

/*
 * Save ourselves some typing
 */
const crowdinProject = 'https://translate.freesewing.org/project/freesewing/'

/*
 * Construct config object
 */
const baseConfig = {
  // Environment
  env: process.env.NODE_ENV || 'development',
  // Maintainer contact
  maintainer: 'joost@freesewing.org',
  // Instance
  instance: process.env.BACKEND_INSTANCE || Date.now(),
  // Feature flags
  use: {
    github: envToBool(process.env.BACKEND_ENABLE_GITHUB),
    oauth: {
      github: envToBool(process.env.BACKEND_ENABLE_OAUTH_GITHUB),
      google: envToBool(process.env.BACKEND_ENABLE_OAUTH_GOOGLE),
    },
    cloudflareImages: envToBool(process.env.BACKEND_ENABLE_CLOUDFLARE_IMAGES),
    forwardmx: envToBool(process.env.BACKEND_ENABLE_FORWARDMX),
    ses: envToBool(process.env.BACKEND_ENABLE_AWS_SES),
    tests: {
      base: envToBool(process.env.BACKEND_ENABLE_TESTS),
      email: envToBool(process.env.BACKEND_ENABLE_TESTS_EMAIL),
      cloudflareImages: envToBool(process.env.BACKEND_ENABLE_TESTS_CLOUDFLARE_IMAGES),
      forwardmx: envToBool(process.env.BACKEND_ENABLE_TESTS_FORWARDMX),
    },
    import: envToBool(process.env.BACKEND_ENABLE_IMPORT),
  },
  // Config
  api,
  apikeys: {
    levels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    expiryMaxSeconds: 365 * 24 * 3600,
  },
  avatars: {
    user: process.env.BACKEND_AVATAR_USER || 'default-avatar',
    set: process.env.BACKEND_AVATAR_SET || 'default-avatar',
    cset: process.env.BACKEND_AVATAR_CSET || 'default-avatar',
    pattern: process.env.BACKEND_AVATAR_PATTERN || 'default-avatar',
    opack: process.env.BACKEND_AVATAR_OPACK || 'default-avatar',
  },
  db: {
    url: process.env.BACKEND_DB_URL || './db.sqlite',
  },
  bookmarks: {
    types: ['set', 'cset', 'pattern', 'design', 'doc', 'custom'],
  },
  encryption: {
    key: encryptionKey,
  },
  enums: {
    user: {
      consent: [0, 1, 2, 3],
      control: [1, 2, 3, 4, 5],
      language: languages,
      compare: [true, false],
      imperial: [true, false],
      newsletter: [true, false],
    },
  },
  exports: {
    dir: process.env.BACKEND_EXPORTS_DIR || '/tmp',
    url: process.env.BACKEND_EXPORTS_URL || 'https://static3.freesewing.org/export/',
  },
  crowdin: {
    invites: {
      nl: crowdinProject + 'invite?h=' + process.env.BACKEND_CROWDIN_INVITE_NL,
      fr: crowdinProject + 'invite?h=' + process.env.BACKEND_CROWDIN_INVITE_FR,
      de: crowdinProject + 'invite?h=' + process.env.BACKEND_CROWDIN_INVITE_DE,
      es: crowdinProject + 'invite?h=' + process.env.BACKEND_CROWDIN_INVITE_ES,
      uk: crowdinProject + 'invite?h=' + process.env.BACKEND_CROWDIN_INVITE_UK,
    },
  },
  img: {
    sites: ['org', 'dev', 'social'],
    templates: {
      folder: ['..', '..', 'artwork', 'img'],
      sizes: {
        square: 2000,
        tall: 1080,
        wide: 2400,
      },
      chars: {
        wide: {
          title_1: 24,
          title_2: 26,
          title_3: 26,
          intro: 58,
        },
        square: {
          title_1: 20,
          title_2: 20,
          title_3: 20,
          intro: 52,
        },
        tall: {
          title_1: 20,
          title_2: 20,
          title_3: 20,
          title_4: 20,
          title_5: 20,
          intro: 52,
        },
      },
    },
  },
  jwt: {
    secretOrKey: encryptionKey,
    issuer: api,
    expiresIn: process.env.BACKEND_JWT_EXPIRY || '7d',
  },
  languages,
  translations: languages.filter((lang) => lang !== 'en'),
  measies: measurements,
  mfa: {
    service: process.env.BACKEND_MFA_SERVICE || 'FreeSewing',
  },
  port,
  roles,
  tests: {
    domain: process.env.BACKEND_TEST_DOMAIN || 'freesewing.dev',
    production: envToBool(process.env.BACKEND_ALLOW_TESTS_IN_PRODUCTION),
  },
  website: {
    domain: process.env.BACKEND_WEBSITE_DOMAIN || 'freesewing.org',
    scheme: process.env.BACKEND_WEBSITE_SCHEME || 'https',
  },
  oauth: {},
}

/*
 * Config behind feature flags
 */

// Github config
if (baseConfig.use.github)
  baseConfig.github = {
    token: process.env.BACKEND_GITHUB_TOKEN,
    api: 'https://api.github.com',
    repoId: 'R_kgDOCFgrqQ',
    forumCategoryId: 'DIC_kwDOCFgrqc4B9zXs',
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

// Cloudflare Images config
if (baseConfig.use.cloudflareImages) {
  const account = process.env.BACKEND_CLOUDFLARE_ACCOUNT || 'fixmeSetCloudflareAccountId'
  baseConfig.cloudflareImages = {
    account,
    api: `https://api.cloudflare.com/client/v4/accounts/${account}/images/v1`,
    token: process.env.BACKEND_CLOUDFLARE_IMAGES_TOKEN || 'fixmeSetCloudflareToken',
    import: envToBool(process.env.BACKEND_IMPORT_CLOUDFLARE_IMAGES),
    useInTests: baseConfig.use.tests.cloudflareImages,
  }
}

// FowardMx config
if (baseConfig.use.fowardmx)
  baseConfig.forwardmx = {
    key: process.env.BACKEND_FORWARDMX_KEY || 'fixmeSetFowardMxApiKey',
    useInTests: baseConfig.use.tests.fowardmx,
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
if (baseConfig.use.oauth?.github) {
  baseConfig.oauth.github = {
    clientId: process.env.BACKEND_OAUTH_GITHUB_CLIENT_ID,
    clientSecret: process.env.BACKEND_OAUTH_GITHUB_CLIENT_SECRET,
    tokenUri: 'https://github.com/login/oauth/access_token',
    dataUri: 'https://api.github.com/user',
    emailUri: 'https://api.github.com/user/emails',
    redirectUri: `${
      process.env.BACKEND_OAUTH_GITHUB_CALLBACK_SITE
        ? process.env.BACKEND_OAUTH_GITHUB_CALLBACK_SITE
        : 'https://freesewing.org'
    }/signin/callback/github`,
  }
  baseConfig.oauth.github.url = (state) =>
    '' +
    'https://github.com/login/oauth/authorize?client_id=' +
    baseConfig.oauth.github.clientId +
    '&redirect_uri=' +
    baseConfig.oauth.github.redirectUri +
    `&scope=read:user user:email&state=${state}`
}

// Oauth config for Google as a provider
if (baseConfig.use.oauth?.google) {
  baseConfig.oauth.google = {
    clientId: process.env.BACKEND_OAUTH_GOOGLE_CLIENT_ID,
    clientSecret: process.env.BACKEND_OAUTH_GOOGLE_CLIENT_SECRET,
    tokenUri: 'https://oauth2.googleapis.com/token',
    dataUri: 'https://people.googleapis.com/v1/people/me?personFields=emailAddresses,names,photos',
    redirectUri: `${
      process.env.BACKEND_OAUTH_GOOGLE_CALLBACK_SITE
        ? process.env.BACKEND_OAUTH_GOOGLE_CALLBACK_SITE
        : 'https://freesewing.org'
    }/signin/callback/google`,
  }
  baseConfig.oauth.google.url = (state) =>
    '' +
    'https://accounts.google.com/o/oauth2/v2/auth' +
    '?response_type=code' +
    '&client_id=' +
    baseConfig.oauth.google.clientId +
    '&redirect_uri=' +
    baseConfig.oauth.google.redirectUri +
    '&scope=' +
    'https://www.googleapis.com/auth/userinfo.profile' +
    ' ' +
    'https://www.googleapis.com/auth/userinfo.email' +
    '&access_type=online' +
    '&state=' +
    state
}

// Load local config
const config = postConfig(baseConfig)

// Exporting this stand-alone config
export const cloudflareImages = config.cloudflareImages || {}
export const forwardmx = config.forwardmx || {}
export const website = config.website
export const github = config.github
export const instance = config.instance
export const exports = config.exports
export const oauth = config.oauth
export const imgConfig = config.img

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
  BACKEND_ENABLE_CLOUDFLARE_IMAGES: 'optional',
  BACKEND_ENABLE_GITHUB: 'optional',
  BACKEND_ENABLE_OAUTH_GITHUB: 'optional',
  BACKEND_ENABLE_OAUTH_GOOGLE: 'optional',
  BACKEND_ENABLE_PAYMENTS: 'optional',
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
// Vars for Cloudflare Images integration
if (envToBool(process.env.BACKEND_USE_CLOUDFLARE_IMAGES)) {
  vars.BACKEND_CLOUDFLARE_IMAGES_TOKEN = 'requiredSecret'
  vars.BACKEND_TEST_CLOUDFLARE_IMAGES = 'optional'
}
// Vars for Github integration
if (envToBool(process.env.BACKEND_ENABLE_GITHUB)) {
  vars.BACKEND_GITHUB_TOKEN = 'requiredSecret'
  vars.BACKEND_GITHUB_USER = 'optional'
  vars.BACKEND_GITHUB_USER_NAME = 'optional'
  vars.BACKEND_GITHUB_USER_EMAIL = 'optional'
  vars.BACKEND_GITHUB_NOTIFY_DEFAULT_USER = 'optional'
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
    if (config.cloudflareImages)
      dump.cloudflareImages = {
        ...config.cloudflareImages,
        token:
          config.cloudflareImages.token.slice(0, 4) +
          '**redacted**' +
          config.cloudflareImages.token.slice(-4),
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
    key = readFileSync(filename, 'utf-8').trim()
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
