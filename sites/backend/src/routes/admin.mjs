import { AdminController } from '../controllers/admin.mjs'

const Admin = new AdminController()
const jwt = ['jwt', { session: false }]
const bsc = ['basic', { session: false }]

export function adminRoutes(tools) {
  const { app, passport } = tools

  // Search users
  app.post('/admin/search/users/jwt', passport.authenticate(...jwt), (req, res) =>
    Admin.searchUsers(req, res, tools)
  )
  app.post('/admin/search/users/key', passport.authenticate(...bsc), (req, res) =>
    Admin.searchUsers(req, res, tools)
  )

  // Load user
  app.get('/admin/user/:id/jwt', passport.authenticate(...jwt), (req, res) =>
    Admin.loadUser(req, res, tools)
  )
  app.get('/admin/user/:id/key', passport.authenticate(...bsc), (req, res) =>
    Admin.loadUser(req, res, tools)
  )

  // Update user
  app.patch('/admin/user/:id/jwt', passport.authenticate(...jwt), (req, res) =>
    Admin.updateUser(req, res, tools)
  )
  app.patch('/admin/user/:id/key', passport.authenticate(...bsc), (req, res) =>
    Admin.updateUser(req, res, tools)
  )

  // Impersonate user
  app.get('/admin/impersonate/:id/jwt', passport.authenticate(...jwt), (req, res) =>
    Admin.impersonateUser(req, res, tools)
  )
}
