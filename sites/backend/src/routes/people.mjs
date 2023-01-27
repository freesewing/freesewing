import { PeopleController } from '../controllers/people.mjs'

const People = new PeopleController()
const jwt = ['jwt', { session: false }]
const bsc = ['basic', { session: false }]

export function peopleRoutes(tools) {
  const { app, passport } = tools

  // Create person
  app.post('/people/jwt', passport.authenticate(...jwt), (req, res) =>
    People.create(req, res, tools)
  )
  app.post('/people/key', passport.authenticate(...bsc), (req, res) =>
    People.create(req, res, tools)
  )

  // Clone person
  app.post('/people/:id/clone/jwt', passport.authenticate(...jwt), (req, res) =>
    People.clone(req, res, tools)
  )
  app.post('/people/:id/clone/key', passport.authenticate(...bsc), (req, res) =>
    People.clone(req, res, tools)
  )

  // Read person
  app.get('/people/:id/jwt', passport.authenticate(...jwt), (req, res) =>
    People.read(req, res, tools)
  )
  app.get('/people/:id/key', passport.authenticate(...bsc), (req, res) =>
    People.read(req, res, tools)
  )

  // Update person
  app.patch('/people/:id/jwt', passport.authenticate(...jwt), (req, res) =>
    People.update(req, res, tools)
  )
  app.patch('/people/:id/key', passport.authenticate(...bsc), (req, res) =>
    People.update(req, res, tools)
  )

  // Delete person
  app.delete('/people/:id/jwt', passport.authenticate(...jwt), (req, res) =>
    People.delete(req, res, tools)
  )
  app.delete('/people/:id/key', passport.authenticate(...bsc), (req, res) =>
    People.delete(req, res, tools)
  )
}
