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
 * Sign in (with username and password)
 *
 * This is the endpoint that provides traditional username/password sign in
 * See: https://freesewing.dev/reference/backend/api
 */
UsersController.prototype.signin = async function (req, res, tools) {
  const User = new UserModel(tools)
  await User.passwordSignIn(req)

  return User.sendResponse(res)
}

/*
 * Send a magic link to sign in
 *
 * This is the endpoint that provides sign in via magic link
 * See: https://freesewing.dev/reference/backend/api
 */
UsersController.prototype.signinlink = async function (req, res, tools) {
  const User = new UserModel(tools)
  await User.sendSigninlink(req)

  return User.sendResponse(res)
}

/*
 * Sign in (with a sign-in link)
 *
 * This is the endpoint that signs in a user via a sign-in link (aka magic link)
 * See: https://freesewing.dev/reference/backend/api
 */
UsersController.prototype.signinvialink = async function (req, res, tools) {
  const User = new UserModel(tools)
  await User.linkSignIn(req)

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
  const available = await User.isLusernameAvailable(req.body.username.toLowerCase())

  if (!available)
    User.setResponse(200, false, {
      result: 'success',
      username: req.body?.username,
      available: false,
    })
  else User.setResponse(404)

  return User.sendResponse(res)
}
