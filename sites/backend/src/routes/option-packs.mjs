import { OptionPacksController } from '../controllers/option-packs.mjs'

const OptionPacks = new OptionPacksController()
const jwt = ['jwt', { session: false }]
const bsc = ['basic', { session: false }]

export function optionPacksRoutes(tools) {
  const { app, passport } = tools

  // Read an option pack (no need to authenticate for this)
  app.get('/option-packs/:id.json', (req, res) => OptionPacks.read(req, res, tools, 'json'))
  app.get('/option-packs/:id.yaml', (req, res) => OptionPacks.read(req, res, tools, 'yaml'))
  app.get('/option-packs/:id', (req, res) => OptionPacks.read(req, res, tools))

  // Get a list of all option packs (no need to authenticate for this)
  app.get('/option-packs.json', (req, res) => OptionPacks.list(req, res, tools, 'json'))
  app.get('/option-packs.yaml', (req, res) => OptionPacks.list(req, res, tools, 'yaml'))
  app.get('/option-packs', (req, res) => OptionPacks.list(req, res, tools))

  // Get a list of all option packs for a given design (no need to authenticate for this)
  app.get('/option-packs/:design.json', (req, res) => OptionPacks.list(req, res, tools, 'json'))
  app.get('/option-packs/:design.yaml', (req, res) => OptionPacks.list(req, res, tools, 'yaml'))
  app.get('/option-packs/:design', (req, res) => OptionPacks.list(req, res, tools))

  // Create an option pack
  app.post('/option-packs/jwt', passport.authenticate(...jwt), (req, res) =>
    OptionPacks.create(req, res, tools)
  )
  app.post('/option-packs/key', passport.authenticate(...bsc), (req, res) =>
    OptionPacks.create(req, res, tools)
  )

  // Update an option pack
  app.patch('/option-packs/:id/jwt', passport.authenticate(...jwt), (req, res) =>
    OptionPacks.update(req, res, tools)
  )
  app.patch('/option-packs/:id/key', passport.authenticate(...bsc), (req, res) =>
    OptionPacks.update(req, res, tools)
  )

  // Delete an option pack
  app.delete('/option-packs/:id/jwt', passport.authenticate(...jwt), (req, res) =>
    OptionPacks.delete(req, res, tools)
  )
  app.delete('/option-packs/:id/key', passport.authenticate(...bsc), (req, res) =>
    OptionPacks.delete(req, res, tools)
  )

  // Suggest an option pack
  app.post('/option-packs/suggest/jwt', passport.authenticate(...jwt), (req, res) =>
    OptionPacks.suggest(req, res, tools)
  )
  app.post('/option-packs/suggest/key', passport.authenticate(...bsc), (req, res) =>
    OptionPacks.suggest(req, res, tools)
  )
}
