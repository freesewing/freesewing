import { ApikeyController } from '../controllers/apikey.mjs'

const Apikey = new ApikeyController()
const jwt = ['jwt', { session: false }]
const bsc = ['basic', { session: false }]

export function apikeyRoutes(tools) {
  const { app, passport } = tools

  // Create Apikey
  app.post('/apikey/jwt', passport.authenticate(...jwt), (req, res) =>
    Apikey.create(req, res, tools)
  )
  app.post('/apikey/key', passport.authenticate(...bsc), (req, res) =>
    Apikey.create(req, res, tools)
  )

  // Read Apikey
  app.get('/apikey/:id/jwt', passport.authenticate(...jwt), (req, res) =>
    Apikey.read(req, res, tools)
  )
  app.get('/apikey/:id/key', passport.authenticate(...bsc), (req, res) =>
    Apikey.read(req, res, tools)
  )

  // Read current Apikey
  app.get('/whoami/key', passport.authenticate(...bsc), (req, res) =>
    Apikey.whoami(req, res, tools)
  )
}
