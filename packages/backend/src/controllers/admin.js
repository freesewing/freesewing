import { User, Person, Pattern, Newsletter } from '../models'
import jwt from 'jsonwebtoken'
import config from '../config'
import { ehash } from '../utils'

function AdminController() {}


AdminController.prototype.search = function(req, res) {
  if (!req.user._id) return res.sendStatus(400)
  User.findById(req.user._id, (err, admin) => {
    if (err || admin === null) return res.sendStatus(400)
    if (admin.role !== 'admin') return res.sendStatus(403)
    User.find({
      $or: [
        { handle: { $regex: `.*${req.body.query}.*` } },
        { username: { $regex: `.*${req.body.query}.*` } },
        { ehash: ehash(req.body.query) },
      ]
    })
    .sort('username')
    .exec((err, users) => {
      if (err) return res.sendStatus(400)
      Person.find({ handle: { $regex: `.*${req.body.query}.*` } })
      .sort('handle')
      .exec((err, people) => {
        if (err) return res.sendStatus(400)
        if (users === null && people === null) return res.sendStatus(404)
        return res.send({
          users: users.map(user => user.adminProfile()),
          people: people.map(person => person.info()),
        })
      })
    })
  })
}

AdminController.prototype.setPatronStatus = function(req, res) {
  if (!req.user._id) return res.sendStatus(400)
  User.findById(req.user._id, (err, admin) => {
    if (err || admin === null) return res.sendStatus(400)
    if (admin.role !== 'admin') return res.sendStatus(403)
    User.findOne({ handle: req.body.handle }, (err, user) => {
      if (err) return res.sendStatus(400)
      if (user === null) return res.sendStatus(404)
      user.patron = req.body.patron
      return saveAndReturnAccount(res, user)
    })
  })
}

AdminController.prototype.setRole = function(req, res) {
  if (!req.user._id) return res.sendStatus(400)
  User.findById(req.user._id, (err, admin) => {
    if (err || admin === null) return res.sendStatus(400)
    if (admin.role !== 'admin') return res.sendStatus(403)
    User.findOne({ handle: req.body.handle }, (err, user) => {
      if (err) return res.sendStatus(400)
      if (user === null) return res.sendStatus(404)
      user.role = req.body.role
      return saveAndReturnAccount(res, user)
    })
  })
}

AdminController.prototype.unfreeze = function(req, res) {
  if (!req.user._id) return res.sendStatus(400)
  User.findById(req.user._id, (err, admin) => {
    if (err || admin === null) return res.sendStatus(400)
    if (admin.role !== 'admin') return res.sendStatus(403)
    User.findOne({ handle: req.body.handle }, (err, user) => {
      if (err) return res.sendStatus(400)
      if (user === null) return res.sendStatus(404)
      user.status = 'active'
      return saveAndReturnAccount(res, user)
    })
  })
}

AdminController.prototype.impersonate = function(req, res) {
  if (!req.user._id) return res.sendStatus(400)
  User.findById(req.user._id, (err, admin) => {
    if (err || admin === null) return res.sendStatus(400)
    if (admin.role !== 'admin') return res.sendStatus(403)
    User.findOne({ handle: req.body.handle }, (err, user) => {
      if (err) return res.sendStatus(400)
      if (user === null) return res.sendStatus(404)
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
    })
  })
}

AdminController.prototype.patronList = function(req, res) {
  if (!req.user._id) return res.sendStatus(400)
  User.findById(req.user._id, (err, admin) => {
    if (err || admin === null) return res.sendStatus(400)
    if (admin.role !== 'admin') return res.sendStatus(403)
    User.find({ patron: { $gt: 0 } }, (err, patronList) => {
      if (err) return res.sendStatus(500)
      return res.send(patronList)
    })
  })
}

AdminController.prototype.subscriberList = function(req, res) {
  if (!req.user._id) return res.sendStatus(400)
  User.findById(req.user._id, (err, admin) => {
    if (err || admin === null) return res.sendStatus(400)
    if (admin.role !== 'admin') return res.sendStatus(403)
    User.find({newsletter: true}, (err, subscribedUsers) => {
      if (err) return res.sendStatus(500)
      let subscribers = subscribedUsers.map(user => ({
        ehash: user.ehash,
        email: user.email
      }))
      Newsletter.find({}, (err, subs) => {
        if (err) return res.sendStatus(500)
        return res.send(subscribers.concat(subs))
      })
    })
  })
}

AdminController.prototype.stats = function(req, res) {
  if (!req.user._id) return res.sendStatus(400)
  User.findById(req.user._id, (err, admin) => {
    if (err || admin === null) return res.sendStatus(400)
    if (admin.role !== 'admin') return res.sendStatus(403)
    User.find({ "consent.profile": true }, (err, users) => {
      if (err) return res.sendStatus(500)
      Person.find({}, (err, people) => {
        if (err) return res.sendStatus(500)
        Pattern.find({}, (err, patterns) => {
          return res.send({
            users: users.length,
            people: people.length,
            patterns: patterns.length,
          })
        })
      })
    })
  })
}

function saveAndReturnAccount(res, user) {
  user.save(function(err, updatedUser) {
    if (err) {
      return res.sendStatus(500)
    } else return res.send({ account: updatedUser.account() })
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

export default AdminController
