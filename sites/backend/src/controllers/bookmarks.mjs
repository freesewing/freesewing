import { BookmarkModel } from '../models/bookmark.mjs'

export function BookmarksController() {}

/*
 * Create a bookmark for the authenticated user
 * See: https://freesewing.dev/reference/backend/api
 */
BookmarksController.prototype.create = async (req, res, tools) => {
  const Bookmark = new BookmarkModel(tools)
  await Bookmark.guardedCreate(req)

  return Bookmark.sendResponse(res)
}

/*
 * Read a bookmark
 * See: https://freesewing.dev/reference/backend/api
 */
BookmarksController.prototype.read = async (req, res, tools) => {
  const Bookmark = new BookmarkModel(tools)
  await Bookmark.guardedRead(req)

  return Bookmark.sendResponse(res)
}

/*
 * Get a list of bookmarks
 * See: https://freesewing.dev/reference/backend/api
 */
BookmarksController.prototype.list = async (req, res, tools) => {
  const Bookmark = new BookmarkModel(tools)
  const bookmarks = await Bookmark.userBookmarks(req.user.uid)

  if (bookmarks) Bookmark.setResponse(200, 'success', { bookmarks })
  else Bookmark.setResponse(404, 'notFound')

  return Bookmark.sendResponse(res)
}

/*
 * Update a bookmark
 * See: https://freesewing.dev/reference/backend/api
 */
BookmarksController.prototype.update = async (req, res, tools) => {
  const Bookmark = new BookmarkModel(tools)
  await Bookmark.guardedUpdate(req)

  return Bookmark.sendResponse(res)
}

/*
 * Remove a bookmark
 * See: https://freesewing.dev/reference/backend/api
 */
BookmarksController.prototype.delete = async (req, res, tools) => {
  const Bookmark = new BookmarkModel(tools)
  await Bookmark.guardedDelete(req)

  return Bookmark.sendResponse(res)
}
