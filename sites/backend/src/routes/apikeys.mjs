import { ApikeysController } from '../controllers/apikeys.mjs'

const Apikeys = new ApikeysController()
const jwt = ['jwt', { session: false }]
const bsc = ['basic', { session: false }]

export function apikeysRoutes(tools) {
  const { app, passport } = tools

  // Create Apikey
  app.post('/apikeys/jwt', passport.authenticate(...jwt), (req, res) =>
    Apikeys.create(req, res, tools)
  )
  app.post('/apikeys/key', passport.authenticate(...bsc), (req, res) =>
    Apikeys.create(req, res, tools)
  )

  // List Apikeys
  app.get('/apikeys/jwt', passport.authenticate(...jwt), (req, res) =>
    Apikeys.list(req, res, tools)
  )
  app.get('/apikeys/key', passport.authenticate(...bsc), (req, res) =>
    Apikeys.list(req, res, tools)
  )

  // Read Apikey
  app.get('/apikeys/:id/jwt', passport.authenticate(...jwt), (req, res) =>
    Apikeys.read(req, res, tools)
  )
  app.get('/apikeys/:id/key', passport.authenticate(...bsc), (req, res) =>
    Apikeys.read(req, res, tools)
  )

  // Read current Apikey
  app.get('/whoami/key', passport.authenticate(...bsc), (req, res) =>
    Apikeys.whoami(req, res, tools)
  )

  // Remove Apikey
  app.delete('/apikeys/:id/jwt', passport.authenticate(...jwt), (req, res) =>
    Apikeys.delete(req, res, tools)
  )
  app.delete('/apikeys/:id/key', passport.authenticate(...bsc), (req, res) =>
    Apikeys.delete(req, res, tools)
  )
}
