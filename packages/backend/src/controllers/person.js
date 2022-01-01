import { User, Person } from '../models'
import { log } from '../utils'

function PersonController() {}

// CRUD basics
PersonController.prototype.create = function(req, res) {
  if (!req.body) return res.sendStatus(400)
  if (!req.user._id) return res.sendStatus(400)
  User.findById(req.user._id, (err, user) => {
    if (err || user === null) return res.sendStatus(400)
    let handle = uniqueHandle()
    let person = new Person({
      handle,
      user: user.handle,
      name: req.body.name,
      units: req.body.units,
      breasts: req.body.breasts,
      picture: handle + '.svg',
      created: new Date()
    })
    person.createAvatar()
    person.save(function(err) {
      if (err) return res.sendStatus(400)
      log.info('personCreated', { handle: handle })
      return res.send({ person: person.info() })
    })
  })
}

PersonController.prototype.read = function(req, res) {
  if (!req.body) return res.sendStatus(400)
  if (!req.user._id) return res.sendStatus(400)
  User.findById(req.user._id, (err, user) => {
    if (err || user === null) return res.sendStatus(400)
    Person.findOne({ handle: req.params.handle }, (err, person) => {
      if (err) return res.sendStatus(400)
      if (person === null) return res.sendStatus(404)
      return res.send({ person: person.info() })
    })
  })
}

PersonController.prototype.update = (req, res) => {
  var async = 0
  if (!req.user._id) return res.sendStatus(400)
  User.findById(req.user._id, async (err, user) => {
    if (err || user === null) return res.sendStatus(400)
    Person.findOne({ handle: req.params.handle }, (err, person) => {
      if (err || person === null) return res.sendStatus(400)
      let data = req.body
      if (typeof data.name === 'string') person.name = data.name
      if (typeof data.notes === 'string') person.notes = data.notes
      if (typeof data.units === 'string') person.units = data.units
      if (typeof data.breasts === 'string') person.breasts = data.breasts === 'true' ? true : false
      if (typeof data.measurements !== 'undefined')
        person.measurements = {
          ...person.measurements,
          ...data.measurements
        }
      if (typeof data.picture !== 'undefined') person.saveAvatar(data.picture)

      return saveAndReturnPerson(res, person)
    })
  })
}

PersonController.prototype.delete = (req, res) => {
  if (!req.user._id) return res.sendStatus(400)
  User.findById(req.user._id, async (err, user) => {
    if (err || user === null) return res.sendStatus(400)
    Person.deleteOne({ handle: req.params.handle, user: user.handle }, err => {
      if (err) return res.sendStatus(400)
      else return res.sendStatus(204)
    })
  })
}

// Clone
PersonController.prototype.clone = function(req, res) {}

function saveAndReturnPerson(res, person) {
  person.save(function(err, updatedPerson) {
    if (err) {
      log.error('personUpdateFailed', updatedPerson)
      return res.sendStatus(500)
    }

    return res.send({ person: updatedPerson.info() })
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
    Person.findOne({ handle: handle }, (err, person) => {
      if (person !== null) exists = true
    })
  } while (exists !== false)

  return handle
}

export default PersonController
