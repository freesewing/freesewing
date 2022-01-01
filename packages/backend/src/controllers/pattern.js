import { User, Pattern } from '../models'
import { log } from '../utils'

function PatternController() {}

// CRUD basics
PatternController.prototype.create = (req, res) => {
  if (!req.body) return res.sendStatus(400)
  if (!req.user._id) return res.sendStatus(400)
  User.findById(req.user._id, (err, user) => {
    if (err || user === null) return res.sendStatus(403)
    let handle = uniqueHandle()
    let pattern = new Pattern({
      handle,
      user: user.handle,
      person: req.body.person,
      name: req.body.name,
      notes: req.body.notes,
      data: req.body.data,
      created: new Date()
    })
    pattern.save(function(err) {
      if (err) {
        log.error('patternCreationFailed', user)
        console.log(err)
        return res.sendStatus(500)
      }
      log.info('patternCreated', { handle: pattern.handle })
      return res.send(pattern.anonymize())
    })
  })
}

PatternController.prototype.read = (req, res) => {
  Pattern.findOne({ handle: req.params.handle }, (err, pattern) => {
    if (err) return res.sendStatus(400)
    if (pattern === null) return res.sendStatus(404)
    return res.send(pattern.anonymize())
  })
}

PatternController.prototype.update = (req, res) => {
  if (!req.user._id) return res.sendStatus(400)
  User.findById(req.user._id, async (err, user) => {
    if (err || user === null) return res.sendStatus(400)
    Pattern.findOne({ handle: req.params.handle }, (err, pattern) => {
      if (err || pattern === null) return res.sendStatus(400)
      if (typeof req.body.name === 'string') pattern.name = req.body.name
      if (typeof req.body.notes === 'string') pattern.notes = req.body.notes
      return saveAndReturnPattern(res, pattern)
    })
  })
}

PatternController.prototype.delete = (req, res) => {
  if (!req.user._id) return res.sendStatus(400)
  User.findById(req.user._id, async (err, user) => {
    if (err || user === null) return res.sendStatus(400)
    Pattern.deleteOne({ handle: req.params.handle, user: user.handle }, err => {
      if (err) return res.sendStatus(400)
      else return res.sendStatus(204)
    })
  })
}

// Delete multiple
PatternController.prototype.deleteMultiple = function(req, res) {
  if (!req.body) return res.sendStatus(400)
  if (!req.body.patterns) return res.sendStatus(400)
  if (!req.user._id) return res.sendStatus(400)
  User.findById(req.user._id, (err, user) => {
    if (err || user === null) return res.sendStatus(400)
    let patterns = req.body.patterns
    if (patterns.length < 1) return res.sendStatus(400)
    let handles = []
    for (let handle of patterns) handles.push({ handle })
    Pattern.deleteMany(
      {
        user: user.handle,
        $or: handles
      },
      err => {
        if (err) return res.sendStatus(500)
        const patterns = {}
        Patterns.find({ user: user.handle }, (err, patternList) => {
          if (err) return res.sendStatus(400)
          for (let pattern of patternList) patterns[pattern.handle] = pattern
          res.send({ patterns })
        })
      }
    )
  })
}

function saveAndReturnPattern(res, pattern) {
  pattern.save(function(err, updatedPattern) {
    if (err) {
      log.error('patternUpdateFailed', updatedPattern)
      return res.sendStatus(500)
    }
    return res.send(updatedPattern.info())
  })
}

const newHandle = (length = 5) => {
  let handle = ''
  let possible = 'abcdefghijklmnopqrstuvwxyz'
  for (let i = 0; i < length; i++)
    handle += possible.charAt(Math.floor(Math.random() * possible.length))

  return handle
}

const uniqueHandle = () => {
  let handle, exists
  do {
    exists = false
    handle = newHandle()
    Pattern.findOne({ handle: handle }, (err, pattern) => {
      if (pattern !== null) exists = true
    })
  } while (exists !== false)

  return handle
}

export default PatternController
