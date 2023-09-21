import { BookmarksController } from '../controllers/bookmarks.mjs'

const Bookmarks = new BookmarksController()
const jwt = ['jwt', { session: false }]
const bsc = ['basic', { session: false }]

export function bookmarksRoutes(tools) {
  const { app, passport } = tools

  // Create a bookmark
  app.post('/bookmarks/jwt', passport.authenticate(...jwt), (req, res) =>
    Bookmarks.create(req, res, tools)
  )
  app.post('/bookmarks/key', passport.authenticate(...bsc), (req, res) =>
    Bookmarks.create(req, res, tools)
  )

  // Read a bookmark
  app.get('/bookmarks/:id/jwt', passport.authenticate(...jwt), (req, res) =>
    Bookmarks.read(req, res, tools)
  )
  app.get('/bookmarks/:id/key', passport.authenticate(...bsc), (req, res) =>
    Bookmarks.read(req, res, tools)
  )

  // Get a list of bookmarks for the user
  app.get('/bookmarks/jwt', passport.authenticate(...jwt), (req, res) =>
    Bookmarks.list(req, res, tools)
  )
  app.get('/bookmarks/key', passport.authenticate(...bsc), (req, res) =>
    Bookmarks.list(req, res, tools)
  )

  // Update a bookmark
  app.patch('/bookmarks/:id/jwt', passport.authenticate(...jwt), (req, res) =>
    Bookmarks.update(req, res, tools)
  )
  app.patch('/bookmarks/:id/key', passport.authenticate(...bsc), (req, res) =>
    Bookmarks.update(req, res, tools)
  )

  // Delete a bookmark
  app.delete('/bookmarks/:id/jwt', passport.authenticate(...jwt), (req, res) =>
    Bookmarks.delete(req, res, tools)
  )
  app.delete('/bookmarks/:id/key', passport.authenticate(...bsc), (req, res) =>
    Bookmarks.delete(req, res, tools)
  )
}
