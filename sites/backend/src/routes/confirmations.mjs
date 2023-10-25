import { ConfirmationsController } from '../controllers/confirmations.mjs'

const Confirmations = new ConfirmationsController()

const jwt = ['jwt', { session: false }]
const bsc = ['basic', { session: false }]

export function confirmationsRoutes(tools) {
  const { app, passport } = tools

  /*
   * Confirmations cannot be created through the API
   * They are created internally, and the only endpoint it this one that
   * lets you read a confirmation if you know it's ID and check value
   */
  app.get('/confirmations/:id/:check', (req, res) => Confirmations.read(req, res, tools))

  /*
   * Actuallllyyyy.... there's also these endpoints that load suggested sets/packs if you
   * have curator role or higher
   */
  app.get('/suggested-sets/jwt', passport.authenticate(...jwt), (req, res) =>
    Confirmations.getSuggested(req, res, tools, 'sugset')
  )
  app.get('/suggested-sets/key', passport.authenticate(...bsc), (req, res) =>
    Confirmations.getSuggested(req, res, tools, 'sugset')
  )

  app.get('/suggested-packs/jwt', passport.authenticate(...jwt), (req, res) =>
    Confirmations.getSuggested(req, res, tools, 'sugpack')
  )
  app.get('/suggested-packs/key', passport.authenticate(...bsc), (req, res) =>
    Confirmations.getSuggested(req, res, tools, 'sugpack')
  )

  /*
   * This removes suggestes set/packs
   */
  app.delete('/suggested-sets/:id/jwt', passport.authenticate(...jwt), (req, res) =>
    Confirmations.removeSuggested(req, res, tools, 'sugset')
  )
  app.delete('/suggested-sets/:id/key', passport.authenticate(...bsc), (req, res) =>
    Confirmations.removeSuggested(req, res, tools, 'sugset')
  )

  app.delete('/suggested-packs/:id/jwt', passport.authenticate(...jwt), (req, res) =>
    Confirmations.removeSuggested(req, res, tools, 'sugpack')
  )
  app.delete('/suggested-packs/:id/key', passport.authenticate(...bsc), (req, res) =>
    Confirmations.removeSuggested(req, res, tools, 'sugpack')
  )
}
