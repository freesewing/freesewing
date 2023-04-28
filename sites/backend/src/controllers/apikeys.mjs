import { ApikeyModel } from '../models/apikey.mjs'
import { UserModel } from '../models/user.mjs'

export function ApikeysController() {}

/*
 * Create API key
 *
 * This is the endpoint that handles creation of API keys/tokens
 * See: https://freesewing.dev/reference/backend/api/apikey
 */
ApikeysController.prototype.create = async (req, res, tools) => {
  const Apikey = new ApikeyModel(tools)
  await Apikey.create(req)

  return Apikey.sendResponse(res)
}

/*
 * List API keys
 *
 * This is the endpoint that handles listing of API keys/tokens
 * See: https://freesewing.dev/reference/backend/api/apikey
 */
ApikeysController.prototype.list = async (req, res, tools) => {
  const Apikey = new ApikeyModel(tools)
  const apikeys = await Apikey.userApikeys(req.user.uid)

  if (apikeys) Apikey.setResponse(200, 'success', { apikeys })
  else Apikey.setResponse(404, 'notFound')

  return Apikey.sendResponse(res)
}

/*
 * Read API key
 *
 * This is the endpoint that handles creation of API keys/tokens
 * See: https://freesewing.dev/reference/backend/api/apikey
 */
ApikeysController.prototype.read = async (req, res, tools) => {
  const Apikey = new ApikeyModel(tools)
  await Apikey.guardedRead(req)

  return Apikey.sendResponse(res)
}

/*
 * Read current API key (whoami)
 *
 * This is the endpoint that handles reading of the API keys/token used in this
 * request
 * See: https://freesewing.dev/reference/backend/api/apikey
 */
ApikeysController.prototype.whoami = async (req, res, tools) => {
  const User = new UserModel(tools)
  const Apikey = new ApikeyModel(tools)

  // Load user making the call
  await User.loadAuthenticatedUser(req.user)

  const key = User.authenticatedUser.apikeys.filter((key) => key.id === req.user.id)

  if (key.length === 1)
    Apikey.setResponse(200, 'success', {
      apikey: {
        key: key[0].id,
        level: key[0].level,
        expiresAt: key[0].expiresAt,
        name: key[0].name,
        userId: key[0].userId,
      },
    })
  else Apikey.setResponse(404, 'notFound')

  return Apikey.sendResponse(res)
}

/*
 * Remove API key
 *
 * This is the endpoint that handles removal of API keys/tokens
 * See: https://freesewing.dev/reference/backend/api/apikey
 */
ApikeysController.prototype.delete = async (req, res, tools) => {
  const Apikey = new ApikeyModel(tools)
  await Apikey.guardedDelete(req)

  return Apikey.sendResponse(res)
}
