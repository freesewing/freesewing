import { ImportModel } from '../models/import.mjs'

export function ImportsController() {}

/*
 * Imports newsletters subscribers in v2 format
 */
ImportsController.prototype.subscribers = async (req, res, tools) => {
  /*
   * This is a special route that uses hard-coded credentials
   */
  console.log(req.body)

  const Import = new ImportModel(tools)
  //await Flow.sendTranslatorInvite(req)

  return Import.sendResponse(res)
}
