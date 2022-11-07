import jwt from 'jsonwebtoken'
import axios from 'axios'
import { hash, hashPassword, randomString, verifyPassword } from '../utils/crypto.mjs'
import { clean, asJson } from '../utils/index.mjs'
import { getUserAvatar } from '../utils/sanity.mjs'
import { log } from '../utils/log.mjs'
import set from 'lodash.set'
import { UserModel } from '../models/user.mjs'

/*
 * Prisma is not an ORM and we can't attach methods to the model
 * So here's a bunch of helper methods that expect a user object
 * as input
 */
const asAccount = (user, decrypt) => ({
  id: user.id,
  consent: user.consent,
  createdAt: user.createdAt,
  data: user.data,
  email: decrypt(user.email),
  initial: decrypt(user.initial),
  lastLogin: user.lastLogin,
  newsletter: user.newsletter,
  patron: user.patron,
  role: user.role,
  status: user.status,
  updatedAt: user.updatedAt,
  username: user.username,
  lusername: user.lusername,
})

const getToken = (user, config) =>
  jwt.sign(
    {
      _id: user.id,
      username: user.username,
      role: user.role,
      status: user.status,
      aud: config.jwt.audience,
      iss: config.jwt.issuer,
    },
    config.jwt.secretOrKey,
    { expiresIn: config.jwt.expiresIn }
  )

const isUsernameAvailable = async (username, prisma) => {
  const user = await prisme.user.findUnique({
    where: {
      lusername: username.toLowerCase(),
    },
  })

  if (user === null) return true
  return false
}

// We'll send this result unless it goes ok
const result = 'error'

export function UserController() {}

/*
 * Signup
 *
 * This is the endpoint that handles account signups
 * See: https://freesewing.dev/reference/backend/api
 */
UserController.prototype.signup = async (req, res, tools) => {
  const User = new UserModel(tools)
  await User.create(req)

  return User.sendResponse(res)
}

/*
 * Confirm account (after signup)
 *
 * This is the endpoint that fully unlocks the account if the user gives their consent
 * See: https://freesewing.dev/reference/backend/api
 */
UserController.prototype.confirm = async (req, res, tools) => {
  const User = new UserModel(tools)
  await User.confirm(req)

  return User.sendResponse(res)
}

/*
 * Login (with username and password)
 *
 * This is the endpoint that provides traditional username/password login
 * See: https://freesewing.dev/reference/backend/api
 */
UserController.prototype.login = async function (req, res, tools) {
  const User = new UserModel(tools)
  await User.passwordLogin(req)

  return User.sendResponse(res)
}

UserController.prototype.whoami = async (req, res, tools) => {
  if (!req.user?._id) return res.status(400).send({ error: 'bearerMissing', result })

  // Destructure what we need from tools
  const { prisma, decrypt } = tools

  // Retrieve user account
  let account
  try {
    account = await prisma.user.findUnique({
      where: {
        id: req.user._id,
      },
    })
  } catch (err) {
    log.warn(err, `Could not lookup user id ${req.user._id} from token data`)
    return res.status(404).send({ error: 'failedToRetrieveUserIdFromTokenData', result })
  }
  if (!account) {
    log.warn(err, `Could not find user id ${req.user._id} from token data`)
    return res.status(404).send({ error: 'failedToLoadUserFromTokenData', result })
  }

  // Return account data
  return res.status(200).send({
    result: 'success',
    account: asAccount({ ...account }, decrypt),
  })
}

UserController.prototype.update = async (req, res, tools) => {
  console.log('update please')

  // Destructure what we need from tools
  const { prisma, decrypt } = tools

  // Retrieve user account
  let account
  try {
    account = await prisma.user.findUnique({
      where: {
        id: req.user._id,
      },
    })
  } catch (err) {
    log.warn(err, `Could not lookup user id ${req.user._id} from token data`)
    return res.status(404).send({ error: 'failedToRetrieveUserIdFromTokenData', result })
  }
  if (!account) {
    log.warn(err, `Could not find user id ${req.user._id} from token data`)
    return res.status(404).send({ error: 'failedToLoadUserFromTokenData', result })
  }

  // Account loaded - Handle various updates
  const data = {}
  // Username
  if (req.body.username) {
    if (!isUsernameAvailable(req.body.username, prisma)) {
      return res.status(400).send({ error: 'usernameTaken', result })
    }
    data.username = req.body.username
    data.lusername = data.username.toLowerCase()
  }
  // Newsletter
  if (req.body.newsletter === false) data.newsletter = false
  if (req.body.newsletter === true) data.newsletter = true
  // Consent
  if (typeof req.body.consent !== 'undefined') data.consent = req.body.consent
  // Bio
  if (typeof req.body.bio === 'string') userData.bio = req.body.bio
  // Password
  if (typeof req.body.password === 'string')
    userData.password = asJson(hashPassword(req.body.password))
  // Data
  const userData = JSON.parse(account.data)
  const uhash = hash(account.data)
  if (typeof req.body.language === 'string') set(userData, 'settings.language', req.body.language)
  if (typeof req.body.units === 'string') set(userData, 'settings.units', req.body.units)
  if (typeof req.body.github === 'string') set(userData, 'settings.social.github', req.body.github)
  if (typeof req.body.twitter === 'string')
    set(userData, 'settings.social.twitter', req.body.twitter)
  if (typeof req.body.instagram === 'string')
    set(userData, 'settings.social.instagram', req.body.instagram)
  // Did data change?
  if (uhash !== hash(userData)) data.data = JSON.stringify(userData)

  // Commit
  prisma.user.update({
    where: { id: account.id },
    data,
  })

  // Email change requires confirmation
  if (typeof req.body.email === 'string') {
    const currentEmail = decrypt(account.email)
    if (req.body.email !== currentEmail) {
      if (req.body.confirmation) {
        // Find confirmation
        let confirmation
        try {
          prisma.confirmation.findUnique({
            where: { id: req.body.confirmation },
          })
        } catch (err) {
          log.warn(err, `Failed to find confirmation for email change`)
          return res.status(500).send({ error: 'failedToFindEmailChangeConfirmation', result })
        }
        if (!confirmation) {
          log.warn(err, `Missing confirmation for email change`)
          return res.status(400).send({ error: 'missingEmailChangeConfirmation', result })
        }
      } else {
        // Create confirmation
        let confirmation
        try {
          confirmation = prisma.confirmation.create({
            data: {
              type: 'emailchange',
              data: encrypt({
                language: userData.settings.language || 'en',
                email: {
                  new: req.body.email,
                  current: currentEmail,
                },
              }),
            },
          })
        } catch (err) {
          log.warn(err, `Failed to create confirmation for email change`)
          return res.status(500).send({ error: 'failedToCreateEmailChangeConfirmation', result })
        }
        // Send out confirmation email
        let sent
        try {
          sent = await email.send(
            req.body.email,
            currentEmail,
            ...emailTemplate.emailchange(
              req.body.email,
              currentEmail,
              userData.settings.language,
              confirmation.id
            )
          )
        } catch (err) {
          log.warn(err, 'Unable to send email')
          return res.status(500).send({ error: 'failedToSendEmailChangeConfirmationEmail', result })
        }
      }
    }
  }
  // Now handle the
  /*
    else if (typeof data.email === 'string' && data.email !== user.email) {
      if (typeof data.confirmation === 'string') {
        Confirmation.findById(req.body.confirmation, (err, confirmation) => {
          if (err) return res.sendStatus(400)
          if (confirmation === null) return res.sendStatus(401)
          if (confirmation.data.email.new === req.body.email) {
            user.ehash = ehash(req.body.email)
            user.email = req.body.email
            return saveAndReturnAccount(res, user)
          } else return res.sendStatus(400)
        })
      } else {
        let confirmation = new Confirmation({
          type: 'emailchange',
          data: {
            handle: user.handle,
            language: user.settings.language,
            email: {
              new: req.body.email,
              current: user.email,
            },
          },
        })
        confirmation.save(function (err) {
          if (err) return res.sendStatus(500)
          log.info('emailchangeRequest', {
            newEmail: req.body.email,
            confirmation: confirmation._id,
          })
          email.emailchange(req.body.email, user.email, user.settings.language, confirmation._id)
          return saveAndReturnAccount(res, user)
        })
      }
    }
  })
  */
  return res.status(200).send({})
}

/*

// For people who have forgotten their password, or password-less logins
UserController.prototype.confirmationLogin = function (req, res) {
  if (!req.body || !req.body.id) return res.sendStatus(400)
  Confirmation.findById(req.body.id, (err, confirmation) => {
    if (err) return res.sendStatus(400)
    if (confirmation === null) return res.sendStatus(401)
    User.findOne({ handle: confirmation.data.handle }, (err, user) => {
      if (err) return res.sendStatus(400)
      if (user === null) {
        return res.sendStatus(401)
      }
      if (user.status !== 'active') return res.sendStatus(403)
      else {
        log.info('confirmationLogin', { user, req })
        let account = user.account()
        let token = getToken(account)
        let people = {}
        Person.find({ user: user.handle }, (err, personList) => {
          if (err) return res.sendStatus(400)
          for (let person of personList) people[person.handle] = person.info()
          let patterns = {}
          Pattern.find({ user: user.handle }, (err, patternList) => {
            if (err) return res.sendStatus(400)
            for (let pattern of patternList) patterns[pattern.handle] = pattern
            return user.updateLoginTime(() => res.send({ account, people, patterns, token }))
          })
        })
      }
    })
  })
}

// CRUD basics

// Note that the user is already crearted (in signup)
// we just need to active the account
UserController.prototype.create = (req, res) => {
  if (!req.body) return res.sendStatus(400)
  if (!req.body.consent || !req.body.consent.profile) return res.status(400).send('consentRequired')
  Confirmation.findById(req.body.id, (err, confirmation) => {
    if (err) return res.sendStatus(400)
    if (confirmation === null) return res.sendStatus(401)
    User.findOne({ handle: confirmation.data.handle }, (err, user) => {
      if (err) return res.sendStatus(400)
      if (user === null) return res.sendStatus(401)
      user.status = 'active'
      user.consent = req.body.consent
      user.time.login = new Date()
      log.info('accountActivated', { handle: user.handle })
      let account = user.account()
      let token = getToken(account)
      user.save(function (err) {
        if (err) return res.sendStatus(400)
        Confirmation.findByIdAndDelete(req.body.id, (err, confirmation) => {
          return res.send({ account, people: {}, patterns: {}, token })
        })
      })
    })
  })
}

UserController.prototype.readProfile = (req, res) => {
  User.findOne({ username: req.params.username }, (err, user) => {
    if (err) return res.sendStatus(404)
    if (user === null) return res.sendStatus(404)
    else res.send(user.profile())
  })
}

function saveAndReturnAccount(res, user) {
  user.save(function (err, updatedUser) {
    if (err) {
      log.error('accountUpdateFailed', err)
      return res.sendStatus(500)
    } else return res.send({ account: updatedUser.account() })
  })
}

function temporaryStoragePath(dir) {
  return path.join(config.storage, 'tmp', dir)
}

UserController.prototype.isUsernameAvailable = (req, res) => {
  if (!req.user._id) return res.sendStatus(400)
  let username = req.body.username.toLowerCase().trim()
  if (username === '') return res.sendStatus(400)
  User.findOne({ username: username }, (err, user) => {
    if (err) return res.sendStatus(400)
    if (user === null) return res.sendStatus(200)
    if (user._id + '' === req.user._id) return res.sendStatus(200)
    else return res.sendStatus(400)
  })
}

// // Re-send activation email
UserController.prototype.resend = (req, res) => {
  if (!req.body) return res.sendStatus(400)
  if (!req.body.email) return res.status(400).send('emailMissing')
  if (!req.body.language) return res.status(400).send('languageMissing')
  User.findOne(
    {
      ehash: ehash(req.body.email),
    },
    (err, user) => {
      if (err) return res.sendStatus(500)
      if (user === null) return res.status(404).send('noSuchUser')
      else {
        let confirmation = new Confirmation({
          type: 'signup',
          data: {
            language: req.body.language,
            email: user.email,
            handle: user.handle,
          },
        })
        confirmation.save(function (err) {
          if (err) return res.sendStatus(500)
          log.info('resendActivationRequest', {
            email: req.body.email,
            confirmation: confirmation._id,
          })
          email.signup(req.body.email, req.body.language, confirmation._id)
          return res.sendStatus(200)
        })
      }
    }
  )
}

UserController.prototype.resetPassword = (req, res) => {
  if (!req.body) return res.sendStatus(400)
  User.findOne(
    {
      $or: [
        { username: req.body.username.toLowerCase().trim() },
        { ehash: ehash(req.body.username) },
      ],
    },
    (err, user) => {
      if (err) {
        console.log(err)
        return res.sendStatus(400)
      }
      if (user === null) return res.sendStatus(401)
      let confirmation = new Confirmation({
        type: 'passwordreset',
        data: {
          handle: user.handle,
        },
      })
      confirmation.save(function (err) {
        if (err) return res.sendStatus(500)
        log.info('passwordresetRequest', { user: user.handle, confirmation: confirmation._id })
        email.passwordreset(user.email, user.settings.language, confirmation._id)
        return res.sendStatus(200)
      })
    }
  )
}

UserController.prototype.setPassword = (req, res) => {
  if (!req.body) return res.sendStatus(400)
  Confirmation.findById(req.body.confirmation, (err, confirmation) => {
    if (err) return res.sendStatus(400)
    if (confirmation === null) return res.sendStatus(401)
    User.findOne({ handle: req.body.handle }, (err, user) => {
      if (err) return res.sendStatus(400)
      if (user === null) return res.sendStatus(401)
      if (confirmation.type === 'passwordreset' && confirmation.data.handle === user.handle) {
        user.password = req.body.password
        user.save(function (err) {
          log.info('passwordSet', { user, req })
          let account = user.account()
          let token = getToken(account)
          return user.updateLoginTime(() => res.send({ account, token }))
        })
      } else return res.sendStatus(401)
    })
  })

  return
}

UserController.prototype.confirmChangedEmail = (req, res) => {
  if (!req.body || !req.body.id || !req.user._id) return res.sendStatus(400)
  Confirmation.findById(req.body.id, (err, confirmation) => {
    if (err || confirmation === null) return res.sendStatus(401)
    User.findById(req.user._id, async (err, user) => {
      if (err || confirmation.data.handle !== user.handle) return res.sendStatus(401)
      user.ehash = ehash(confirmation.data.email.new)
      user.email = confirmation.data.email.new
      return saveAndReturnAccount(res, user)
    })
  })
}

// // Other
UserController.prototype.patronList = (req, res) => {
  User.find({ patron: { $gte: 2 } })
    .sort('username')
    .exec((err, users) => {
      if (err || users === null) return res.sendStatus(400)
      let patrons = {
        2: [],
        4: [],
        8: [],
      }
      for (let key of Object.keys(users)) {
        let user = users[key].profile()
        patrons[user.patron].push({
          handle: user.handle,
          username: user.username,
          bio: user.bio,
          picture: user.picture,
          social: user.social,
          pictureUris: user.pictureUris,
        })
      }
      return res.send(patrons)
    })
}

UserController.prototype.export = (req, res) => {
  if (!req.user._id) return res.sendStatus(400)
  User.findById(req.user._id, (err, user) => {
    if (user === null) return res.sendStatus(400)
    let dir = createTempDir()
    if (!dir) return res.sendStatus(500)
    let zip = new Zip()
    zip.file('account.json', asJson(user.export(), null, 2))
    loadAvatar(user).then((avatar) => {
      if (avatar) zip.file(user.picture, data)
      zip
        .generateAsync({
          type: 'uint8array',
          comment: 'freesewing.org',
          streamFiles: true,
        })
        .then(function (data) {
          let file = path.join(dir, 'export.zip')
          fs.writeFile(file, data, (err) => {
            log.info('dataExport', { user, req })
            return res.send({ export: uri(file) })
          })
        })
    })
  })
}

const loadAvatar = async (user) => {
  if (user.picture)
    await fs.readFile(path.join(user.storagePath(), user.picture), (err, data) => data)
  else return false
}

// restrict processing of data, aka freeze account
UserController.prototype.restrict = (req, res) => {
  if (!req.user._id) return res.sendStatus(400)
  User.findById(req.user._id, (err, user) => {
    if (user === null) return res.sendStatus(400)
    user.status = 'frozen'
    user.save(function (err) {
      if (err) {
        log.error('accountFreezeFailed', user)
        return res.sendStatus(500)
      }
      return res.sendStatus(200)
    })
  })
}

// Remove account
UserController.prototype.remove = (req, res) => {
  if (!req.user._id) return res.sendStatus(400)
  User.findById(req.user._id, (err, user) => {
    if (user === null) return res.sendStatus(400)
    rimraf(user.storagePath(), (err) => {
      if (err) {
        console.log('rimraf', err)
        log.error('accountRemovalFailed', { err, user, req })
        return res.sendStatus(500)
      }
      user.remove((err, usr) => {
        if (err !== null) {
          log.error('accountRemovalFailed', { err, user, req })
          return res.sendStatus(500)
        } else return res.sendStatus(200)
      })
    })
  })
}

const getToken = (account) => {
  return jwt.sign(
    {
      _id: account._id,
      handle: account.handle,
      role: account.role,
      aud: config.jwt.audience,
      iss: config.jwt.issuer,
    },
    config.jwt.secretOrKey
  )
}

const createTempDir = () => {
  let path = temporaryStoragePath(newHandle(10))
  fs.mkdir(path, { recursive: true }, (err) => {
    if (err) {
      log.error('mkdirFailed', err)
      path = false
    }
  })

  return path
}

const uri = (path) => config.static + path.substring(config.storage.length)

*/
