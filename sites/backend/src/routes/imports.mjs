import { ImportsController } from '../controllers/imports.mjs'

const Import = new ImportsController()

export function importsRoutes(tools) {
  const { app } = tools

  /*
   * All these routes use hard-coded credentials because they should never be used
   * outside the v2-v3 migration which is handled by joost
   */

  // Import newsletter subscriptions
  app.post('/import/subscribers', (req, res) => Import.subscribers(req, res, tools))

  // Import users
  app.post('/import/user', (req, res) => Import.user(req, res, tools))

  // Migrate user
  app.post('/migrate', (req, res) => Import.migrate(req, res, tools))
}
