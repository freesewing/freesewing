import { PersonController } from '../controllers/person.mjs'

const Person = new PersonController()
const jwt = ['jwt', { session: false }]
const bsc = ['basic', { session: false }]

export function personRoutes(tools) {
  const { app, passport } = tools

  // Create person
  app.post('/people/jwt', passport.authenticate(...jwt), (req, res) =>
    Person.create(req, res, tools)
  )
  app.post('/people/key', passport.authenticate(...bsc), (req, res) =>
    Person.create(req, res, tools)
  )

  // Read person
  app.get('/people/:handle/jwt', passport.authenticate(...jwt), (req, res) =>
    Person.read(req, res, tools)
  )
  app.get('/people/:handle/jwt', passport.authenticate(...bsc), (req, res) =>
    Person.read(req, res, tools)
  )

  // Update person
  app.put('/people/:handle/jwt', passport.authenticate(...jwt), (req, res) =>
    Person.update(req, res, tools)
  )
  app.put('/people/:handle/key', passport.authenticate(...bsc), (req, res) =>
    Person.update(req, res, tools)
  )

  // Delete person
  app.delete('/people/:handle/jwt', passport.authenticate(...jwt), (req, res) =>
    Person.delete(req, res, tools)
  )
  app.delete('/people/:handle/key', passport.authenticate(...bsc), (req, res) =>
    Person.delete(req, res, tools)
  )
}
