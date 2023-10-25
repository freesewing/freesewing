import { OptionPackModel } from '../models/option-pack.mjs'

export function OptionPacksController() {}

/*
 * Create an option pack
 * See: https://freesewing.dev/reference/backend/api
 */
OptionPacksController.prototype.create = async (req, res, tools) => {
  const OptionPack = new OptionPackModel(tools)
  await OptionPack.guardedCreate(req)

  return OptionPack.sendResponse(res)
}

/*
 * Read an option pack
 * See: https://freesewing.dev/reference/backend/api
 */
OptionPacksController.prototype.read = async (req, res, tools, format = false) => {
  const OptionPack = new OptionPackModel(tools)
  await OptionPack.guardedRead(req, format)

  return format === 'yaml' ? OptionPack.sendYamlResponse(res) : OptionPack.sendResponse(res)
}

/*
 * Get a list of option packs
 * See: https://freesewing.dev/reference/backend/api
 */
OptionPacksController.prototype.list = async (req, res, tools, format = false) => {
  const OptionPack = new OptionPackModel(tools)
  const optionPacks = await OptionPack.allOptionPacks()

  if (optionPacks) {
    if (!format) OptionPack.setResponse(200, 'success', { optionPacks })
    else OptionPack.setResponse(200, 'success', optionPacks, true)
  } else OptionPack.setResponse(404, 'notFound')

  return format === 'yaml' && optionPacks
    ? OptionPack.sendYamlResponse(res)
    : OptionPack.sendResponse(res)
}

/*
 * Update an option pack
 * See: https://freesewing.dev/reference/backend/api
 */
OptionPacksController.prototype.update = async (req, res, tools) => {
  const OptionPack = new OptionPackModel(tools)
  await OptionPack.guardedUpdate(req)

  return OptionPack.sendResponse(res)
}

/*
 * Remove an option pack
 * See: https://freesewing.dev/reference/backend/api
 */
OptionPacksController.prototype.delete = async (req, res, tools) => {
  const OptionPack = new OptionPackModel(tools)
  await OptionPack.guardedDelete(req)

  return OptionPack.sendResponse(res)
}

/*
 * Suggest an option pack
 * See: https://freesewing.dev/reference/backend/api
 */
OptionPacksController.prototype.suggest = async (req, res, tools) => {
  const OptionPack = new OptionPackModel(tools)
  await OptionPack.suggest(req)

  return OptionPack.sendResponse(res)
}
