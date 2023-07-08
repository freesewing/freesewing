import { PatternsController } from '../controllers/patterns.mjs'

const Patterns = new PatternsController()
const jwt = ['jwt', { session: false }]
const bsc = ['basic', { session: false }]

export function patternsRoutes(tools) {
  const { app, passport } = tools

  // Get patterns for the authenticate user
  app.get('/patterns/jwt', passport.authenticate(...jwt), (req, res) =>
    Patterns.list(req, res, tools)
  )
  app.get('/patterns/key', passport.authenticate(...bsc), (req, res) =>
    Patterns.list(req, res, tools)
  )

  // Create pattern
  app.post('/patterns/jwt', passport.authenticate(...jwt), (req, res) =>
    Patterns.create(req, res, tools)
  )
  app.post('/patterns/key', passport.authenticate(...bsc), (req, res) =>
    Patterns.create(req, res, tools)
  )

  // Clone pattern
  app.post('/patterns/:id/clone/jwt', passport.authenticate(...jwt), (req, res) =>
    Patterns.clone(req, res, tools)
  )
  app.post('/patterns/:id/clone/key', passport.authenticate(...bsc), (req, res) =>
    Patterns.clone(req, res, tools)
  )

  // Read pattern
  app.get('/patterns/:id/jwt', passport.authenticate(...jwt), (req, res) =>
    Patterns.read(req, res, tools)
  )
  app.get('/patterns/:id/key', passport.authenticate(...bsc), (req, res) =>
    Patterns.read(req, res, tools)
  )

  // Update pattern
  app.patch('/patterns/:id/jwt', passport.authenticate(...jwt), (req, res) =>
    Patterns.update(req, res, tools)
  )
  app.patch('/patterns/:id/key', passport.authenticate(...bsc), (req, res) =>
    Patterns.update(req, res, tools)
  )

  // Delete pattern
  app.delete('/patterns/:id/jwt', passport.authenticate(...jwt), (req, res) =>
    Patterns.delete(req, res, tools)
  )
  app.delete('/patterns/:id/key', passport.authenticate(...bsc), (req, res) =>
    Patterns.delete(req, res, tools)
  )

  // Read a public pattern as JSON or YAML (no auth needed, but will only work for public patterns)
  app.get('/patterns/:id.json', (req, res) => Patterns.readPublic(req, res, tools, 'json'))
  app.get('/patterns/:id.yaml', (req, res) => Patterns.readPublic(req, res, tools, 'yaml'))
}
