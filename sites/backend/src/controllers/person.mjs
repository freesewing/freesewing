import { PersonModel } from '../models/person.mjs'

export function PersonController() {}

/*
 * Create a person for the authenticated user
 *
 * See: https://freesewing.dev/reference/backend/api
 */
PersonController.prototype.create = async (req, res, tools) => {
  const Person = new PersonModel(tools)
  await Person.create(req)

  return Person.sendResponse(res)
}

/*
 * Read a person
 *
 * See: https://freesewing.dev/reference/backend/api
 */
PersonController.prototype.read = async (req, res, tools) => {
  //const Person = new PersonModel(tools)
  //await Person.read({ id: req.params.id })
  //return Person.sendResponse(res)
}

/*
 * Update a person
 *
 * See: https://freesewing.dev/reference/backend/api
 */
PersonController.prototype.update = async (req, res, tools) => {
  //const Person = new PersonModel(tools)
  //await Person.update(req)
  //return Person.sendResponse(res)
}

/*
 * Remove a person
 *
 * See: https://freesewing.dev/reference/backend/api
 */
PersonController.prototype.delete = async (req, res, tools) => {
  //const Person = new PersonModel(tools)
  //await Person.remove(req)
  //return Person.sendResponse(res)
}
