import Controller from '../controllers/user'

const User = new Controller()

export default (app, passport) => {
  // account
  app.post('/account', User.create)
  app.get('/account', passport.authenticate('jwt', { session: false }), User.readAccount) // Read account (own data)
  app.put('/account', passport.authenticate('jwt', { session: false }), User.update) // Update
  app.delete('/account', passport.authenticate('jwt', { session: false }), User.remove)
  app.get('/account/export', passport.authenticate('jwt', { session: false }), User.export)
  app.get('/account/restrict', passport.authenticate('jwt', { session: false }), User.restrict)
  app.post('/account/recover', User.resetPassword)
  app.post(
    '/account/change/email',
    passport.authenticate('jwt', { session: false }),
    User.confirmChangedEmail
  )

  // Sign up & log in
  app.post('/signup', User.signup)
  app.post('/resend', User.resend)
  app.post('/login', User.login)
  app.post('/confirm/login', User.confirmationLogin)

  // Users
  app.get('/patrons', User.patronList)
  app.get('/users/:username', User.readProfile) // Read profile (other user's data)
  app.post(
    '/available/username',
    passport.authenticate('jwt', { session: false }),
    User.isUsernameAvailable
  )
}
