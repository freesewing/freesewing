import { hash, hashPassword, randomString, verifyPassword } from '../utils/crypto.mjs'
import { clean, asJson } from '../utils/index.mjs'
import { log } from '../utils/log.mjs'
import { ApikeyModel } from '../models/apikey.mjs'
import { UserModel } from '../models/user.mjs'

export function ApikeyController() {}

/*
 * Create API key
 *
 * This is the endpoint that handles creation of API keys/tokens
 * See: https://freesewing.dev/reference/backend/api/apikey
 */
ApikeyController.prototype.create = async (req, res, tools) => {
  const Apikey = new ApikeyModel(tools)
  await Apikey.create(req)

  return Apikey.sendResponse(res)
}

/*
 * Read API key
 *
 * This is the endpoint that handles creation of API keys/tokens
 * See: https://freesewing.dev/reference/backend/api/apikey
 */
ApikeyController.prototype.read = async (req, res, tools) => {
  const Apikey = new ApikeyModel(tools)
  await Apikey.readIfAllowed({ id: req.params.id }, req.user)

  return Apikey.sendResponse(res)
}

/*
 * Read current API key (whoami)
 *
 * This is the endpoint that handles reading of the API keys/token used in this
 * request
 * See: https://freesewing.dev/reference/backend/api/apikey
 */
ApikeyController.prototype.whoami = async (req, res, tools) => {
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
