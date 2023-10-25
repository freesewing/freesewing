import { log } from '../utils/log.mjs'
import { decorateModel } from '../utils/model-decorator.mjs'

/*
 * This model handles all bookmarks
 */
export function BookmarkModel(tools) {
  return decorateModel(this, tools, { name: 'bookmark' })
}

/*
 * Creates a bookmark - Uses user input so we need to validate it
 *
 * @params {body} object - The request body
 * @params {user} object - The user as provided by the auth middleware
 * @returns {BookmarkModel} object - The BookmarkModel
 */
BookmarkModel.prototype.guardedCreate = async function ({ body, user }) {
  /*
   * Enforce RBAC
   */
  if (!this.rbac.writeSome(user)) return this.BookmarkResponse(403, 'insufficientAccessLevel')

  /*
   * Do we have a POST body?
   */
  if (Object.keys(body).length < 1) return this.BookmarkResponse(400, 'postBodyMissing')

  /*
   * Is title and url set?
   */
  for (const field of ['title', 'url']) {
    if (!body[field] || typeof body[field] !== 'string' || body[field].length < 1)
      return this.setResponse(400, `${field}Missing`)
  }

  /*
   * Is type set and valid?
   */
  if (!body.type || !this.config.bookmarks.types.includes(body.type))
    return this.setResponse(400, body.type ? 'typeInvalid' : 'typeMissing')

  /*
   * Create the initial record
   */
  await this.createRecord({
    type: body.type,
    title: body.title,
    url: body.url,
    userId: user.uid,
  })

  //await this.read({ id: this.record.id })

  /*
   * Now return 201 and the data
   */
  return this.setResponse201({ bookmark: this.asBookmark() })
}

/*
 * Loads a bookmark from the database based on the where clause you pass it
 * In addition prepares it for returning the bookmark data
 *
 * @params {params} object - The request (URL) parameters
 * @params {user} object - The user as provided by the auth middleware
 * @returns {BookmarkModel} object - The BoolkmarkModel
 */
BookmarkModel.prototype.guardedRead = async function ({ params, user }) {
  /*
   * Enforce RBAC
   */
  if (!this.rbac.readSome(user)) return this.setResponse(403, 'insufficientAccessLevel')

  /*
   * Attempt to read the record from the database
   */
  await this.read({ id: parseInt(params.id) })

  /*
   * If it does not exist, send a 404
   */
  if (!this.record) return this.setResponse(404)

  /*
   * You cannot read other people's bookmarks
   */
  if (this.record.userId !== user.uid) return this.setResponse(403, 'insufficientAccessLevel')

  /*
   * Return 200 and send the bookmark data
   */
  return this.setResponse(200, false, {
    result: 'success',
    bookmark: this.asBookmark(),
  })
}

/*
 * Updates the bookmark data - Used when we pass through user-provided data
 * so we can't be certain it's safe
 *
 * @params {params} object - The request (URL) parameters
 * @params {body} object - The request body
 * @returns {BookmarkModel} object - The BookmarkModel
 */
BookmarkModel.prototype.guardedUpdate = async function ({ params, body, user }) {
  /*
   * Enforce RBAC
   */
  if (!this.rbac.writeSome(user)) return this.setResponse(403, 'insufficientAccessLevel')

  /*
   * Attempt to read record from database
   */
  await this.read({ id: parseInt(params.id) })

  /*
   * You cannot update other user's bookmarks
   */
  if (this.record.userId !== user.uid) return this.setResponse(403, 'insufficientAccessLevel')

  /*
   * Prepare data to update the record
   */
  const data = {}

  /*
   * title & url are all you can update (you cannot update the type)
   */
  for (const field of ['title', 'url']) {
    if (body[field] && typeof body[field] === 'string' && body[field].length > 0)
      data[field] = body[field]
  }

  /*
   * Now update the database record
   */
  await this.update(data)

  /*
   * Return 200 and the record data
   */
  return this.setResponse200({ bookmark: this.asBookmark() })
}

/*
 * Removes the bookmark
 *
 * @params {params} object - The request (URL) parameters
 * @params {user} object - The user as provided by the auth middleware
 * @returns {BookmarkModel} object - The BookmarkModel
 */
BookmarkModel.prototype.guardedDelete = async function ({ params, user }) {
  /*
   * Enforce RBAC
   */
  if (!this.rbac.writeSome(user)) return this.setResponse(403, 'insufficientAccessLevel')

  /*
   * Attempt to read the record from the database
   */
  await this.read({ id: parseInt(params.id) })

  /*
   * You cannot remove other user's data
   */
  if (this.record.userId !== user.uid) return this.setResponse(403, 'insufficientAccessLevel')

  /*
   * Delete the record
   */
  await this.delete()

  /*
   * Return 204
   */
  return this.setResponse(204, false)
}

/*
 * Returns a list of bookmarks for the user making the API call
 */
BookmarkModel.prototype.userBookmarks = async function (uid) {
  if (!uid) return false
  let bookmarks
  try {
    bookmarks = await this.prisma.bookmark.findMany({ where: { userId: uid } })
  } catch (err) {
    log.warn(`Failed to search bookmarks for user ${uid}: ${err}`)
  }
  const list = []
  for (const bookmark of bookmarks) list.push(bookmark)

  return list
}

/*
 * Returns record data
 */
BookmarkModel.prototype.asBookmark = function () {
  return { ...this.record }
}
