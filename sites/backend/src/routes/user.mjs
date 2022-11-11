import { UserController } from '../controllers/user.mjs'

const User = new UserController()
const jwt = ['jwt', { session: false }]
const bsc = ['basic', { session: false }]

export function userRoutes(tools) {
  const { app, passport } = tools

  // Sign up
  app.post('/signup', (req, res) => User.signup(req, res, tools))

  // Confirm account
  app.post('/confirm/signup/:id', (req, res) => User.confirm(req, res, tools))

  // Login
  app.post('/login', (req, res) => User.login(req, res, tools))

  // Read current jwt

  app.get('/whoami/jwt', passport.authenticate(...jwt), (req, res) => User.whoami(req, res, tools))
  app.get('/account/jwt', passport.authenticate(...jwt), (req, res) => User.whoami(req, res, tools))
  app.get('/account/key', passport.authenticate(...bsc), (req, res) => User.whoami(req, res, tools))

  // Update account
  app.put('/account/jwt', passport.authenticate(...jwt), (req, res) => User.update(req, res, tools))
  app.put('/account/key', passport.authenticate(...bsc), (req, res) => User.update(req, res, tools))

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

  // Check whether a username is available
  app.post(
    '/available/username',
    passport.authenticate('jwt', { session: false }),
    (req, res) => User.isUsernameAvailable(req, res, params)
  )
  */
}
