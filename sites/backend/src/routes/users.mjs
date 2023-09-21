import { UsersController } from '../controllers/users.mjs'

const Users = new UsersController()
const jwt = ['jwt', { session: false }]
const guest = ['jwt-guest', { session: false }]
const bsc = ['basic', { session: false }]

export function usersRoutes(tools) {
  const { app, passport } = tools

  // Sign Up
  app.post('/signup', (req, res) => Users.signup(req, res, tools))

  // Init Oauth with GitHub or Google
  app.post('/signin/oauth/init', (req, res) => Users.oauthInit(req, res, tools))

  // Sign in (or sign up) with Oauth via GitHub or Google
  app.post('/signin/oauth', (req, res) => Users.oauthSignIn(req, res, tools))

  // Confirm account
  app.post('/confirm/signup/:id', (req, res) => Users.confirm(req, res, tools))

  // Sign In
  app.post('/signin', (req, res) => Users.signin(req, res, tools))

  // Send sign-in link (aka magic link)
  app.post('/signinlink', (req, res) => Users.signinlink(req, res, tools))

  // Login via sign-in link (aka magic link)
  app.post('/signinlink/:id/:check', (req, res) => Users.signinvialink(req, res, tools))

  // Read current jwt This gets special treatment as it is a route that we allow
  // even when the account status or consent would normally prohibit access.
  // This way, we can return info to the frontend that allows us to better inform
  // the user then merely returning 401
  app.get('/whoami/jwt', passport.authenticate(...guest), (req, res) =>
    Users.whoami(req, res, tools)
  )

  // Read the accound data
  app.get('/account/jwt', passport.authenticate(...jwt), (req, res) =>
    Users.whoami(req, res, tools)
  )
  app.get('/account/key', passport.authenticate(...bsc), (req, res) =>
    Users.whoami(req, res, tools)
  )

  // Update account
  app.patch('/account/jwt', passport.authenticate(...jwt), (req, res) =>
    Users.update(req, res, tools)
  )
  app.patch('/account/key', passport.authenticate(...bsc), (req, res) =>
    Users.update(req, res, tools)
  )

  // Update consent specifically (jwt-guest)
  app.patch('/consent/jwt', passport.authenticate(...guest), (req, res) =>
    Users.updateConsent(req, res, tools)
  )

  // Enable MFA (totp)
  app.post('/account/mfa/jwt', passport.authenticate(...jwt), (req, res) =>
    Users.updateMfa(req, res, tools)
  )
  app.post('/account/mfa/key', passport.authenticate(...bsc), (req, res) =>
    Users.updateMfa(req, res, tools)
  )

  // Check whether a username is available
  app.post('/available/username/jwt', passport.authenticate(...jwt), (req, res) =>
    Users.isUsernameAvailable(req, res, tools)
  )
  app.post('/available/username/key', passport.authenticate(...bsc), (req, res) =>
    Users.isUsernameAvailable(req, res, tools)
  )

  // Load full user data
  app.get('/users/:id/jwt', passport.authenticate(...jwt), (req, res) =>
    Users.allData(req, res, tools)
  )
  app.get('/users/:id/key', passport.authenticate(...bsc), (req, res) =>
    Users.allData(req, res, tools)
  )

  // Load a user profile
  app.get('/users/:id', (req, res) => Users.profile(req, res, tools))

  // Load a user profile card
  app.get('/users/:id/card', (req, res) => Users.profileCard(req, res, tools))

  // Export account data
  app.get('/account/export/jwt', passport.authenticate(...jwt), (req, res) =>
    Users.exportAccount(req, res, tools)
  )
  app.get('/account/export/key', passport.authenticate(...bsc), (req, res) =>
    Users.exportAccount(req, res, tools)
  )

  // Restrict processing of account data
  app.get('/account/restrict/jwt', passport.authenticate(...jwt), (req, res) =>
    Users.restrictAccount(req, res, tools)
  )
  app.get('/account/restrict/key', passport.authenticate(...bsc), (req, res) =>
    Users.restrictAccount(req, res, tools)
  )

  // Remove account
  app.delete('/account/jwt', passport.authenticate(...jwt), (req, res) =>
    Users.removeAccount(req, res, tools)
  )
  app.delete('/account/key', passport.authenticate(...bsc), (req, res) =>
    Users.removeAccount(req, res, tools)
  )

  /*

  // Remove account
  app.delete(
    '/account',
    passport.authenticate(...jwt),
    (req, res) => User.remove(req, res, params)
  )

  // Export account data
  app.get(
    '/account/export',
    passport.authenticate(...jwt),
    (req, res) => User.export(req, res, params)
  )

  // Restrict processing of account data
  app.get(
    '/account/restrict',
    passport.authenticate(...jwt),
    (req, res) => User.restrict(req, res, params)
  )

  // Recover account / Reset password
  app.post(
    '/account/recover',
    (req, res) => User.resetPassword(req, res, params)
  )

  // Update email address
  app.post(
    '/account/change/email',
    passport.authenticate(...jwt),
    (req, res) => User.confirmChangedEmail(req, res, params)
  )

  // Re-send account confirmation
  app.post(
    '/resend',
    (req, res) => User.resend(req, res, params)
  )


  // Get list of patrons
  app.get(
    '/patrons',
    (req, res) => User.patronList(req, res, params)
  )

  // Read profile (other user's data)
  app.get(
    '/users/:username',
    (req, res) => User.readProfile(req, res, params)
  )

  */
}
