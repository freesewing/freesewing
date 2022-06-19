import Controller from '../controllers/admin'

const Admin = new Controller()

export default (app, passport) => {
  // Users
  app.post(
    '/admin/search',
    passport.authenticate('jwt', { session: false }),
    Admin.search
  )
  app.put(
    '/admin/patron',
    passport.authenticate('jwt', { session: false }),
    Admin.setPatronStatus
  )
  app.put(
    '/admin/role',
    passport.authenticate('jwt', { session: false }),
    Admin.setRole
  )
  app.post('/admin/impersonate', passport.authenticate('jwt', { session: false }), Admin.impersonate)
  app.put('/admin/unfreeze', passport.authenticate('jwt', { session: false }), Admin.unfreeze)
  app.get('/admin/patrons', passport.authenticate('jwt', { session: false }), Admin.patronList)
  app.get('/admin/subscribers', passport.authenticate('jwt', { session: false }), Admin.subscriberList)
  app.get('/admin/stats', passport.authenticate('jwt', { session: false }), Admin.stats)
}
