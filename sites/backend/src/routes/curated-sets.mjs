import { CuratedSetsController } from '../controllers/curated-sets.mjs'

const CuratedSets = new CuratedSetsController()
const jwt = ['jwt', { session: false }]
const bsc = ['basic', { session: false }]

export function curatedSetsRoutes(tools) {
  const { app, passport } = tools

  // Read a curated measurements set (no need to authenticate for this)
  app.get('/curated-sets/:id.json', (req, res) => CuratedSets.read(req, res, tools, 'json'))
  app.get('/curated-sets/:id.yaml', (req, res) => CuratedSets.read(req, res, tools, 'yaml'))
  app.get('/curated-sets/:id', (req, res) => CuratedSets.read(req, res, tools))

  // Get a list of all curated measurments sets (no need to authenticate for this)
  app.get('/curated-sets.json', (req, res) => CuratedSets.list(req, res, tools, 'json'))
  app.get('/curated-sets.yaml', (req, res) => CuratedSets.list(req, res, tools, 'yaml'))
  app.get('/curated-sets', (req, res) => CuratedSets.list(req, res, tools))

  // Create a curated measurements set
  app.post('/curated-sets/jwt', passport.authenticate(...jwt), (req, res) =>
    CuratedSets.create(req, res, tools)
  )
  app.post('/curated-sets/key', passport.authenticate(...bsc), (req, res) =>
    CuratedSets.create(req, res, tools)
  )

  // Clone a curated measurements set
  app.post('/curated-sets/:id/clone/jwt', passport.authenticate(...jwt), (req, res) =>
    CuratedSets.clone(req, res, tools)
  )
  app.post('/curated-sets/:id/clone/key', passport.authenticate(...bsc), (req, res) =>
    CuratedSets.clone(req, res, tools)
  )

  // Update a curated measurements set
  app.patch('/curated-sets/:id/jwt', passport.authenticate(...jwt), (req, res) =>
    CuratedSets.update(req, res, tools)
  )
  app.patch('/curated-sets/:id/key', passport.authenticate(...bsc), (req, res) =>
    CuratedSets.update(req, res, tools)
  )

  // Delete a curated measurements set
  app.delete('/curated-sets/:id/jwt', passport.authenticate(...jwt), (req, res) =>
    CuratedSets.delete(req, res, tools)
  )
  app.delete('/curated-sets/:id/key', passport.authenticate(...bsc), (req, res) =>
    CuratedSets.delete(req, res, tools)
  )
}
