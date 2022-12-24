import { UserModel } from '../models/user.mjs'

export function UsersController() {}

/*
 * Signup
 *
 * This is the endpoint that handles account signups
 * See: https://freesewing.dev/reference/backend/api
 */
UsersController.prototype.signup = async (req, res, tools) => {
  const User = new UserModel(tools)
  await User.guardedCreate(req)

  return User.sendResponse(res)
}

/*
 * Confirm account (after signup)
 *
 * This is the endpoint that fully unlocks the account if the user gives their consent
 * See: https://freesewing.dev/reference/backend/api
 */
UsersController.prototype.confirm = async (req, res, tools) => {
  const User = new UserModel(tools)
  await User.confirm(req)

  return User.sendResponse(res)
}

/*
 * Login (with username and password)
 *
 * This is the endpoint that provides traditional username/password login
 * See: https://freesewing.dev/reference/backend/api
 */
UsersController.prototype.login = async function (req, res, tools) {
  const User = new UserModel(tools)
  await User.passwordLogin(req)

  return User.sendResponse(res)
}

/*
 * Returns the account of the authenticated user (with JWT)
 *
 * See: https://freesewing.dev/reference/backend/api
 */
UsersController.prototype.whoami = async (req, res, tools) => {
  const User = new UserModel(tools)
  await User.guardedRead({ id: req.user.uid }, req)

  return User.sendResponse(res)
}

/*
 * Updates the account of the authenticated user
 *
 * See: https://freesewing.dev/reference/backend/api
 */
UsersController.prototype.update = async (req, res, tools) => {
  const User = new UserModel(tools)
  await User.guardedRead({ id: req.user.uid }, req)
  await User.guardedUpdate(req)

  return User.sendResponse(res)
}

/*
 * Updates the MFA setting of the authenticated user
 *
 * See: https://freesewing.dev/reference/backend/api
 */
UsersController.prototype.updateMfa = async (req, res, tools) => {
  const User = new UserModel(tools)
  await User.guardedRead({ id: req.user.uid }, req)
  await User.guardedMfaUpdate(req)

  return User.sendResponse(res)
}

/*
 * Checks whether a submitted username is available
 *
 * See: https://freesewing.dev/reference/backend/api
 */
UsersController.prototype.isUsernameAvailable = async (req, res, tools) => {
  const User = new UserModel(tools)
  await User.find(req.body)

  if (User.exists)
    User.setResponse(200, false, {
      result: 'success',
      username: req.body?.username,
      available: false,
    })
  else User.setResponse(404)

  return User.sendResponse(res)
}
