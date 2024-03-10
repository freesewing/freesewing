import { decorateModel } from '../utils/model-decorator.mjs'

/*
 * This model handles all admin routes
 *
 * @param {tools} object - A set of tools loaded in src/index.js
 * @returns {AdminModel} object - The AdminModel
 */
export function AdminModel(tools) {
  /*
   * See utils/model-decorator.mjs for details
   */
  return decorateModel(this, tools, {
    name: 'admin',
    models: ['user', 'subscriber', 'pattern', 'set'],
  })
}

/*
 * Searches for users
 *
 * @param {body} object - The request body
 * @param {user} object - The user object as provided by the auth middleware
 * @returns {AdminModel} object - The ApikeyModel
 */
AdminModel.prototype.searchUsers = async function ({ body, user }) {
  /*
   * Enforce RBAC
   */
  if (!this.rbac.support(user)) return this.setResponse(403, 'insufficientAccessLevel')

  /*
   * Attempt to read the record from the database
   */
  const users = await this.User.search(body.q)

  return this.setResponse200({ users })
}

/*
 * Loads a user
 *
 * @param {params} object - The request (URL) parameters
 * @param {user} object - The user object as provided by the auth middleware
 * @returns {AdminModel} object - The ApikeyModel
 */
AdminModel.prototype.loadUser = async function ({ params, user }) {
  /*
   * Enforce RBAC
   */
  if (!this.rbac.support(user)) return this.setResponse(403, 'insufficientAccessLevel')

  /*
   * Is id set?
   */
  if (!params.id) return this.setResponse(403, 'idMissing')

  /*
   * Attempt to load the user from the database
   */
  await this.User.read(
    { id: Number(params.id) }
    //{ patterns: true, sets: true, apikeys: true, bookmarks: true }
  )

  /*
   * If the user cannot be found, return 404
   */
  if (!this.User.record) return this.setResponse(404)

  /*
   * Also fetch patterns and sets
   */
  const patterns = await this.Pattern.userPatterns(this.User.record.id)
  const sets = await this.Set.userSets(this.User.record.id)

  /*
   * Return 200 and user data
   */
  return this.setResponse200({ user: this.User.asAccount(), patterns, sets })
}

/*
 * Updates the user data
 * This only handles things that the user cannot update themselves
 * (like role and so on)
 * For all other updates, admins should impersonate the user and then
 * update as a regular user would.
 *
 * @param {body} object - The request body
 * @param {params} object - The (URL) request parameters.
 * @param {user} object - The user as loaded by auth middleware
 * @returns {AdminModel} object - The AdminModel
 */
AdminModel.prototype.updateUser = async function ({ params, body, user }) {
  /*
   * Enforce RBAC
   */
  if (!this.rbac.admin(user)) return this.setResponse(403, 'insufficientAccessLevel')

  /*
   * Is id set?
   */
  if (!params.id) return this.setResponse(403, 'idMissing')

  /*
   * Attempt to load the user from the database
   */
  await this.User.read({ id: Number(params.id) })

  /*
   * If the user cannot be found, return 404
   */
  if (!this.User.record) return this.setResponse(404)

  /*
   * Create data to update the record
   */
  const data = {}

  /*
   * Update role?
   */
  if (body.role && Object.keys(this.config.roles.levels).includes(body.role)) data.role = body.role

  /*
   * Update status? (reminder: 1 = active, -2 = administratively disabled)
   */
  if (body.status && [0, 1, -1, -2].includes(Number(body.status))) data.status = Number(body.status)

  /*
   * Disable MFA?
   */
  if (typeof body.mfaEnabled !== 'undefined' && body.mfaEnabled === false) {
    data.mfaEnabled = false
    data.mfaSecret = ''
  }

  /*
   * Now update the database record
   */
  await this.User.update(data)

  /*
   * Return 200 and the user data
   */
  return this.setResponse200({ user: this.User.asAccount() })
}

/*
 * Impersonates a user
 * This logs an admin in as another user
 *
 * @param {params} object - The (URL) request parameters.
 * @param {user} object - The user as loaded by auth middleware
 * @returns {AdminModel} object - The AdminModel
 */
AdminModel.prototype.impersonateUser = async function ({ params, user }) {
  /*
   * Enforce RBAC
   */
  if (!this.rbac.admin(user)) return this.setResponse(403, 'insufficientAccessLevel')

  /*
   * Is id set?
   */
  if (!params.id) return this.setResponse(403, 'idMissing')

  /*
   * Attempt to load the user from the database
   */
  await this.User.read({ id: Number(params.id) })

  /*
   * If the user cannot be found, return 404
   */
  if (!this.User.record) return this.setResponse(404)

  /*
   * Return 200, token, and data
   */
  return this.User.signInOk()
}

/*
 * Loads (the emails of) all newsletter subscribers
 *
 * @param {user} object - The user as loaded by auth middleware
 * @returns {AdminModel} object - The AdminModel
 */
AdminModel.prototype.getSubscribers = async function ({ user }) {
  /*
   * Enforce RBAC
   */
  if (!this.rbac.support(user)) return this.setResponse(403, 'insufficientAccessLevel')

  const all = {}

  /*
   * Load all subscribers from the database
   */
  const subscribers = await this.Subscriber.search()

  /*
   * Load all subscribed users from the database
   */
  let users
  try {
    users = await this.prisma.user.findMany({ where: { newsletter: true } })
  } catch (err) {
    console.log(err)
  }

  for (const sub of [...subscribers, ...users]) {
    const email = await this.decrypt(sub.email)
    if (typeof all[sub.language] === 'undefined') all[sub.language] = []
    all[sub.language].push({ email, ehash: sub.ehash })
  }

  /*
   * Return 200, and subscriber list
   */
  return this.setResponse200({ subscribers: all })
}
