import { AdminModel } from '../models/admin.mjs'

export function AdminController() {}

/*
 * Search user
 */
AdminController.prototype.searchUsers = async (req, res, tools) => {
  const Admin = new AdminModel(tools)
  await Admin.searchUsers(req)

  return Admin.sendResponse(res)
}

/*
 * Load  user
 */
AdminController.prototype.loadUser = async (req, res, tools) => {
  const Admin = new AdminModel(tools)
  await Admin.loadUser(req)

  return Admin.sendResponse(res)
}

/*
 * Update user
 */
AdminController.prototype.updateUser = async (req, res, tools) => {
  const Admin = new AdminModel(tools)
  await Admin.updateUser(req)

  return Admin.sendResponse(res)
}

/*
 * Update user
 */
AdminController.prototype.impersonateUser = async (req, res, tools) => {
  const Admin = new AdminModel(tools)
  await Admin.impersonateUser(req)

  return Admin.User.sendResponse(res)
}
