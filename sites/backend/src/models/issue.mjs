import { decorateModel } from '../utils/model-decorator.mjs'
import { createIssue } from '../utils/github.mjs'

/*
 * This model handles all flows (typically that involves sending out emails)
 */
export function IssueModel(tools) {
  return decorateModel(this, tools, {
    name: 'flow',
    models: ['user'],
  })
}

/*
 * Create an issue
 *
 * @param {body} object - The request body
 * @returns {IssueModel} object - The IssueModel
 */
IssueModel.prototype.create = async function ({ body }) {
  /*
   * Is issue creation enabled
   */
  if (!this.config.use.github) return this.setResponse(400, 'notEnabled')

  /*
   * Do we have a POST body?
   */
  if (Object.keys(body).length < 1) return this.setResponse(400, 'postBodyMissing')

  /*
   * Is title set?
   */
  if (!body.title) return this.setResponse(400, 'titleMissing')

  /*
   * Is body set?
   */
  if (!body.body) return this.setResponse(400, 'bodyMissing')

  /*
   * Create the issue
   */
  const issue = await createIssue(body)

  return issue ? this.setResponse201({ issue }) : this.setResponse(400)
}
