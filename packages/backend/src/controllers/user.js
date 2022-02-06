import { User, Confirmation, Person, Pattern } from '../models'
import {
  log,
  email,
  ehash,
  newHandle,
  uniqueHandle,
} from '../utils'
import jwt from 'jsonwebtoken'
import config from '../config'
import path from 'path'
import fs from 'fs'
import Zip from 'jszip'
import rimraf from 'rimraf'

function UserController() {}

UserController.prototype.login = function(req, res) {
  if (!req.body || !req.body.username) return res.sendStatus(400)
  User.findOne(
    {
      $or: [
        { username: req.body.username.toLowerCase().trim() },
        { username: req.body.username.trim() },
        { ehash: ehash(req.body.username) }
      ]
    },
    (err, user) => {
      if (err) return res.sendStatus(400)
      if (user === null) return res.sendStatus(401)
      user.verifyPassword(req.body.password, (err, valid) => {
        if (err) return res.sendStatus(400)
        else if (valid) {
          if (user.status !== 'active') return res.sendStatus(403)
          else {
            log.info('login', { user, req })
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
                return user.updateLoginTime(() =>
                  res.send({ account, people, patterns, token })
                )
              })
            })
          }
        } else {
          log.warning('wrongPassword', { user, req })
          return res.sendStatus(401)
        }
      })
    }
  )
}

// For people who have forgotten their password, or password-less logins
UserController.prototype.confirmationLogin = function(req, res) {
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
            return user.updateLoginTime(() =>
              res.send({ account, people, patterns, token })
            )
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
      user.save(function(err) {
        if (err) return res.sendStatus(400)
        Confirmation.findByIdAndDelete(req.body.id, (err, confirmation) => {
          return res.send({ account, people: {}, patterns: {}, token })
        })
      })
    })
  })
}

UserController.prototype.readAccount = (req, res) => {
  if (!req.user._id) return res.sendStatus(400)
  User.findById(req.user._id, (err, user) => {
    if (user !== null) {
      log.info('ping', { user, req })
      const people = {}
      Person.find({ user: user.handle }, (err, personList) => {
        if (err) return res.sendStatus(400)
        for (let person of personList) people[person.handle] = person.info()
        const patterns = {}
        Pattern.find({ user: user.handle }, (err, patternList) => {
          if (err) return res.sendStatus(400)
          for (let pattern of patternList) patterns[pattern.handle] = pattern.export()
          return res.send({ account: user.account(), people, patterns })
        })
      })
    } else {
      return res.sendStatus(400)
    }
  })
}

UserController.prototype.readProfile = (req, res) => {
  User.findOne({ username: req.params.username }, (err, user) => {
    if (err) return res.sendStatus(404)
    if (user === null) return res.sendStatus(404)
    else res.send(user.profile())
  })
}

UserController.prototype.update = (req, res) => {
  var async = 0
  if (!req.user._id) return res.sendStatus(400)
  User.findById(req.user._id, async (err, user) => {
    if (err || user === null) {
      return res.sendStatus(400)
    }
    let data = req.body

    if (typeof data.settings !== 'undefined') {
      user.settings = {
        ...user.settings,
        ...data.settings
      }
      return saveAndReturnAccount(res, user)
    } else if (data.newsletter === true || data.newsletter === false) {
      user.newsletter = data.newsletter
      if (data.newsletter === true) email.newsletterWelcome(user.email, user.ehash)

      return saveAndReturnAccount(res, user)
    } else if (typeof data.bio === 'string') {
      user.bio = data.bio
      return saveAndReturnAccount(res, user)
    } else if (typeof data.social === 'object') {
      if (typeof data.social.github === 'string') user.social.github = data.social.github
      if (typeof data.social.twitter === 'string') user.social.twitter = data.social.twitter
      if (typeof data.social.instagram === 'string') user.social.instagram = data.social.instagram
      return saveAndReturnAccount(res, user)
    } else if (typeof data.consent === 'object') {
      user.consent = {
        ...user.consent,
        ...data.consent
      }
      return saveAndReturnAccount(res, user)
    } else if (typeof data.avatar !== 'undefined') {
      // Catch people submitting without uploading an avatar
      if (data.avatar) user.saveAvatar(data.avatar)
      return saveAndReturnAccount(res, user)
    } else if (typeof data.password === 'string') {
      user.password = data.password
      return saveAndReturnAccount(res, user)
    } else if (typeof data.username === 'string') {
      User.findOne({ username: data.username }, (err, userExists) => {
        if (userExists !== null && data.username !== user.username)
          return res.status(400).send('usernameTaken')
        else {
          user.username = data.username
          return saveAndReturnAccount(res, user)
        }
      })
    }
    // Email change requires confirmation
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
              current: user.email
            }
          }
        })
        confirmation.save(function(err) {
          if (err) return res.sendStatus(500)
          log.info('emailchangeRequest', {
            newEmail: req.body.email,
            confirmation: confirmation._id
          })
          email.emailchange(req.body.email, user.email, user.settings.language, confirmation._id)
          return saveAndReturnAccount(res, user)
        })
      }
    }
  })
}

function saveAndReturnAccount(res, user) {
  user.save(function(err, updatedUser) {
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

// // Signup flow
UserController.prototype.signup = (req, res) => {
  if (!req.body) return res.sendStatus(400)
  if (!req.body.email) return res.status(400).send('emailMissing')
  if (!req.body.password) return res.status(400).send('passwordMissing')
  if (!req.body.language) return res.status(400).send('languageMissing')
  User.findOne(
    {
      ehash: ehash(req.body.email)
    },
    (err, user) => {
      if (err) return res.sendStatus(500)
      if (user !== null) return res.status(400).send('userExists')
      else {
        let handle = uniqueHandle()
        let username = 'user-' + handle
        let user = new User({
          email: req.body.email,
          initial: req.body.email,
          ehash: ehash(req.body.email),
          handle,
          username,
          password: req.body.password,
          settings: { language: req.body.language },
          status: 'pending',
          picture: handle + '.svg',
          time: {
            created: new Date()
          }
        })
        user.save(function(err) {
          if (err) {
            log.error('accountCreationFailed', user)
            console.log(err)
            return res.sendStatus(500)
          }
          log.info('accountCreated', { handle: user.handle })
          user.createAvatar(handle)
          let confirmation = new Confirmation({
            type: 'signup',
            data: {
              language: req.body.language,
              email: req.body.email,
              password: req.body.password,
              handle
            }
          })
          confirmation.save(function(err) {
            if (err) return res.sendStatus(500)
            log.info('signupRequest', { email: req.body.email, confirmation: confirmation._id })
            email.signup(req.body.email, req.body.language, confirmation._id)
            return res.sendStatus(200)
          })
        })
      }
    }
  )
}

// // Re-send activation email
UserController.prototype.resend = (req, res) => {
  if (!req.body) return res.sendStatus(400)
  if (!req.body.email) return res.status(400).send('emailMissing')
  if (!req.body.language) return res.status(400).send('languageMissing')
  User.findOne(
    {
      ehash: ehash(req.body.email)
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
            handle: user.handle
          }
        })
        confirmation.save(function(err) {
          if (err) return res.sendStatus(500)
          log.info('resendActivationRequest', { email: req.body.email, confirmation: confirmation._id })
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
        { ehash: ehash(req.body.username) }
      ]
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
          handle: user.handle
        }
      })
      confirmation.save(function(err) {
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
        user.save(function(err) {
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
        8: []
      }
      for (let key of Object.keys(users)) {
        let user = users[key].profile()
        patrons[user.patron].push({
          handle: user.handle,
          username: user.username,
          bio: user.bio,
          picture: user.picture,
          social: user.social,
          pictureUris: user.pictureUris
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
    zip.file('account.json', JSON.stringify(user.export(), null, 2))
    loadAvatar(user).then(avatar => {
      if (avatar) zip.file(user.picture, data)
      zip
        .generateAsync({
          type: 'uint8array',
          comment: 'freesewing.org',
          streamFiles: true
        })
        .then(function(data) {
          let file = path.join(dir, 'export.zip')
          fs.writeFile(file, data, err => {
            log.info('dataExport', { user, req })
            return res.send({ export: uri(file) })
          })
        })
    })
  })
}

const loadAvatar = async user => {
  if (user.picture)
    await fs.readFile(path.join(user.storagePath(), user.picture), (err, data) => data)
  else return false
}

/** restrict processing of data, aka freeze account */
UserController.prototype.restrict = (req, res) => {
  if (!req.user._id) return res.sendStatus(400)
  User.findById(req.user._id, (err, user) => {
    if (user === null) return res.sendStatus(400)
    user.status = 'frozen'
    user.save(function(err) {
      if (err) {
        log.error('accountFreezeFailed', user)
        return res.sendStatus(500)
      }
      return res.sendStatus(200)
    })
  })
}

/** Remove account */
UserController.prototype.remove = (req, res) => {
  if (!req.user._id) return res.sendStatus(400)
  User.findById(req.user._id, (err, user) => {
    if (user === null) return res.sendStatus(400)
    rimraf(user.storagePath(), err => {
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

const getToken = account => {
  return jwt.sign(
    {
      _id: account._id,
      handle: account.handle,
      role: account.role,
      aud: config.jwt.audience,
      iss: config.jwt.issuer
    },
    config.jwt.secretOrKey
  )
}

const createTempDir = () => {
  let path = temporaryStoragePath(newHandle(10))
  fs.mkdir(path, { recursive: true }, err => {
    if (err) {
      log.error('mkdirFailed', err)
      path = false
    }
  })

  return path
}

const uri = path => config.static + path.substring(config.storage.length)

export default UserController
