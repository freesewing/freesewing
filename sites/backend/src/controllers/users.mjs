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
 * Init Oauth flow with GitHub or Google
 *
 * This is the endpoint that starts the Oauth flow
 * See: https://freesewing.dev/reference/backend/api
 */
UsersController.prototype.oauthInit = async (req, res, tools) => {
  const User = new UserModel(tools)
  await User.oauthInit(req)

  return User.sendResponse(res)
}

/*
 * Sing In with Oauth via GitHub or Google
 *
 * This is the endpoint that finalizes the Oauth flow
 * Note that SignIn and SignUp are the same flow/endpoints
 * We will simply deal with the fact that the user does not exist,
 * and treat it as a sign up
 * See: https://freesewing.dev/reference/backend/api
 */
UsersController.prototype.oauthSignIn = async (req, res, tools) => {
  const User = new UserModel(tools)
  await User.oauthSignIn(req)

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
  await User.whoami({ id: req.user.uid }, req)

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
 * Updates the consent of the authenticated user (jwt-guest route)
 *
 * See: https://freesewing.dev/reference/backend/api
 */
UsersController.prototype.updateConsent = async (req, res, tools) => {
  const User = new UserModel(tools)
  await User.guardedRead({ id: req.user.uid }, req)
  await User.updateConsent(req)

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
 * Returns a user profile
 *
 * See: https://freesewing.dev/reference/backend/api
 */
UsersController.prototype.profile = async (req, res, tools) => {
  const User = new UserModel(tools)
  await User.profile(req)

  return User.sendResponse(res)
}

/*
 * Returns a user profile card
 *
 * See: https://freesewing.dev/reference/backend/api
 */
UsersController.prototype.profileCard = async (req, res, tools) => {
  const User = new UserModel(tools)
  await User.profileCard(req)

  return User.sendSvgResponse(res)
}

/*
 * Returns all user data
 *
 * See: https://freesewing.dev/reference/backend/api
 */
UsersController.prototype.allData = async (req, res, tools) => {
  const User = new UserModel(tools)
  await User.allData(req)

  return User.sendResponse(res)
}

/*
 * Exports all account data
 *
 * See: https://freesewing.dev/reference/backend/api
 */
UsersController.prototype.exportAccount = async (req, res, tools) => {
  const User = new UserModel(tools)
  await User.exportAccount(req)

  return User.sendResponse(res)
}

/*
 * Restricts processing of account data
 *
 * See: https://freesewing.dev/reference/backend/api
 */
UsersController.prototype.restrictAccount = async (req, res, tools) => {
  const User = new UserModel(tools)
  await User.restrictAccount(req)

  return User.sendResponse(res)
}

/*
 * Remove account
 *
 * See: https://freesewing.dev/reference/backend/api
 */
UsersController.prototype.removeAccount = async (req, res, tools) => {
  const User = new UserModel(tools)
  await User.removeAccount(req)

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
