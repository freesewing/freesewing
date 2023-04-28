import { SetsController } from '../controllers/sets.mjs'

const Sets = new SetsController()
const jwt = ['jwt', { session: false }]
const bsc = ['basic', { session: false }]

export function setsRoutes(tools) {
  const { app, passport } = tools

  // Create a measurments set
  app.post('/sets/jwt', passport.authenticate(...jwt), (req, res) => Sets.create(req, res, tools))
  app.post('/sets/key', passport.authenticate(...bsc), (req, res) => Sets.create(req, res, tools))

  // Clone a measurements set
  app.post('/sets/:id/clone/jwt', passport.authenticate(...jwt), (req, res) =>
    Sets.clone(req, res, tools)
  )
  app.post('/sets/:id/clone/key', passport.authenticate(...bsc), (req, res) =>
    Sets.clone(req, res, tools)
  )

  // Read a measurments set
  app.get('/sets/:id/jwt', passport.authenticate(...jwt), (req, res) => Sets.read(req, res, tools))
  app.get('/sets/:id/key', passport.authenticate(...bsc), (req, res) => Sets.read(req, res, tools))

  // Update a measurements set
  app.patch('/sets/:id/jwt', passport.authenticate(...jwt), (req, res) =>
    Sets.update(req, res, tools)
  )
  app.patch('/sets/:id/key', passport.authenticate(...bsc), (req, res) =>
    Sets.update(req, res, tools)
  )

  // Delete a measurements set
  app.delete('/sets/:id/jwt', passport.authenticate(...jwt), (req, res) =>
    Sets.delete(req, res, tools)
  )
  app.delete('/sets/:id/key', passport.authenticate(...bsc), (req, res) =>
    Sets.delete(req, res, tools)
  )
}
