import { ImportController } from '../controllers/import.mjs'

const Import = new ImportController()

export function importsRoutes(tools) {
  const { app } = tools

  /*
   * All these routes use hard-coded credentials because they should never be used
   * outside the v2-v3 migration which is handled by joost
   */
  // Import newsletter subscriptions
  app.post('/import/subscribers', (req, res) => Import.subscribers(req, res, tools))
}
