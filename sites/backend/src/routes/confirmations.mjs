import { ConfirmationsController } from '../controllers/confirmations.mjs'

const Confirmations = new ConfirmationsController()

export function confirmationsRoutes(tools) {
  /*
   * Confirmations cannot be created through the API
   * They are created internally, and the only endpoint it this one that
   * lets you read a confirmation if you know it's ID and check value
   */
  tools.app.get('/confirmations/:id/:check', (req, res) => Confirmations.read(req, res, tools))
}
