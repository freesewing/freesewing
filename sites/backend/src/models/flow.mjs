import { i18nUrl } from '../utils/index.mjs'
import { decorateModel } from '../utils/model-decorator.mjs'
import { ensureImage, replaceImage, removeImage } from '../utils/cloudflare-images.mjs'
import {
  createIssue,
  createFile,
  createBranch,
  createPullRequest,
  getFileList,
  createDiscussion,
} from '../utils/github.mjs'

/*
 * This model handles all flows (typically that involves sending out emails)
 */
export function FlowModel(tools) {
  return decorateModel(this, tools, {
    name: 'flow',
    models: ['user'],
  })
}

/*
 * Send a translator invite
 *
 * @param {body} object - The request body
 * @param {user} object - The user as loaded by auth middleware
 * @returns {FlowModel} object - The FlowModel
 */
FlowModel.prototype.sendTranslatorInvite = async function ({ body, user }) {
  /*
   * Enforce RBAC
   */
  if (!this.rbac.readSome(user)) return this.setResponse(403, 'insufficientAccessLevel')

  /*
   * Do we have a POST body?
   */
  if (Object.keys(body).length < 1) return this.setResponse(400, 'postBodyMissing')

  /*
   * Is language set?
   */
  if (!body.language) return this.setResponse(400, 'languageMissing')

  /*
   * Is language a valid language?
   */
  if (!this.config.translations.includes(body.language))
    return this.setResponse(400, 'languageInvalid')

  /*
   * Load user record from database
   */
  await this.User.revealAuthenticatedUser(user)

  /*
   * Send the invite email
   */
  await this.mailer.send({
    template: 'transinvite',
    language: body.language,
    to: this.User.clear.email,
    replacements: {
      actionUrl: this.config.crowdin.invites[body.language],
      whyUrl: i18nUrl(body.language, `/docs/faq/email/why-transinvite`),
      supportUrl: i18nUrl(body.language, `/patrons/join`),
    },
  })

  /*
   * Return 200
   */
  return this.setResponse200({})
}

/*
 * Send a language suggestion to the maintainer
 *
 * @param {body} object - The request body
 * @param {user} object - The user as loaded by auth middleware
 * @returns {FlowModel} object - The FlowModel
 */
FlowModel.prototype.sendLanguageSuggestion = async function ({ body, user }) {
  /*
   * Enforce RBAC
   */
  if (!this.rbac.readSome(user)) return this.setResponse(403, 'insufficientAccessLevel')

  /*
   * Do we have a POST body?
   */
  if (Object.keys(body).length < 1) return this.setResponse(400, 'postBodyMissing')

  /*
   * Is language set?
   */
  if (!body.language) return this.setResponse(400, 'languageMissing')

  /*
   * Load user making the call
   */
  await this.User.revealAuthenticatedUser(user)

  /*
   * Send the invite email
   */
  await this.mailer.send({
    template: 'langsuggest',
    language: body.language,
    to: this.config.maintainer,
    subject: '[FreeSewing] New language suggested',
    replacements: {
      datadump: JSON.stringify(body, null, 2),
      userdump: JSON.stringify(this.User.clear, null, 2),
    },
  })

  /*
   * Return 200
   */
  return this.setResponse200({})
}

/*
 * Upload an image to cloudflare
 *
 * @param {body} object - The request body
 * @param {user} object - The user as loaded by auth middleware
 * @param {anon} boolean - True if it is an anonymous upload (no auth)
 * @returns {FlowModel} object - The FlowModel
 */
FlowModel.prototype.uploadImage = async function ({ body, user }, anon = false) {
  /*
   * Enforce RBAC
   */
  if (!anon && !this.rbac.readSome(user)) return this.setResponse(403, 'insufficientAccessLevel')

  /*
   * Do we have a POST body?
   */
  if (Object.keys(body).length < 1) return this.setResponse(400, 'postBodyMissing')

  /*
   * Is img or url set?
   */
  if (!body.img && !body.url) return this.setResponse(400, 'imgOrUrlMissing')

  /*
   * Is type set and valid?
   */
  if (!body.type) return this.setResponse(400, 'typeMissing')
  if (!['blog', 'showcase', 'support'].includes(body.type))
    return this.setResponse(400, 'typeInvalid')

  /*
   * Is subId set and valid?
   */
  if (!body.subId) return this.setResponse(400, 'subIdMissing')
  if (body.subId !== 'main' && ![1, 2, 3, 4, 5, 6, 7, 8, 9].includes(Number(body.subId)))
    return this.setResponse(400, 'subIdInvalid')

  /*
   * Is slug set?
   */
  if (!body.slug) return this.setResponse(400, 'slugMissing')

  /*
   * Prepare data for uploading the image
   */
  const data = {
    id: `${body.type}-${body.slug}${body.subId !== 'main' ? '-' + body.subId : ''}`,
    metadata: { uploadedBy: anon ? 'anonymous' : user.uid },
  }
  if (body.img) data.b64 = body.img
  else if (body.url) data.url = body.url

  /*
   * You need to be a curator to overwrite (replace) an image.
   * Regular users can only update new images, not overwrite images.
   * If not, any user could overwrite any showcase image.
   */
  const imgId =
    !anon && this.rbac.curator(user) ? await replaceImage(data) : await ensureImage(data)

  /*
   * Return 200 and the image ID
   */
  return this.setResponse200({ imgId })
}

/*
 * Remove an image from cloudflare
 *
 * @param {params} object - The request (URL) params
 * @param {user} object - The user as loaded by auth middleware
 * @returns {FlowModel} object - The FlowModel
 */
FlowModel.prototype.removeImage = async function ({ params, user }) {
  /*
   * Enforce RBAC
   */
  if (!this.rbac.curator(user)) return this.setResponse(403, 'insufficientAccessLevel')

  /*
   * Is id set?
   */
  if (!params.id) return this.setResponse(400, 'idMissing')

  /*
   * Remove the image
   */
  const gone = await removeImage(params.id)

  /*
   * Return 204
   */
  return gone ? this.setResponse(204) : this.setResponse(500, 'unableToRemoveImage')
}

/*
 * Create an issue
 *
 * @param {body} object - The request body
 * @returns {IssueModel} object - The IssueModel
 */
FlowModel.prototype.createIssue = async function ({ body }) {
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

  /*
   * Return 201
   */
  return issue ? this.setResponse201({ issue }) : this.setResponse(400)
}

/*
 * Create a discussion
 *
 * @param {body} object - The request body
 * @returns {IssueModel} object - The IssueModel
 */
FlowModel.prototype.createDiscussion = async function ({ body }) {
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
   * Create the discussion
   */
  const discussion = await createDiscussion(body)

  /*
   * Return 201
   */
  return discussion ? this.setResponse201({ discussion }) : this.setResponse(400)
}

const nonEnWarning = `

**Warning:** This was submitted by a non-English user.
Due to the way out translation software works, the original content
must alway be English. So it is possible this needs to be translated
to English prior to merging.
`

/*
 * Create a (GitHub) pull request for a new blog or showcase post
 *
 * @param {body} object - The request body
 * @param {user} object - The user as loaded by auth middleware
 * @param {type} string - One of blog or showcase
 * @returns {FlowModel} object - The FlowModel
 */
FlowModel.prototype.createPostPr = async function ({ body, user }, type) {
  /*
   * Is markdown set?
   */
  for (const field of ['markdown', 'slug', 'language']) {
    if (!body[field]) return this.setResponse(400, `${field}Missing`)
  }

  /*
   * Load user from the database
   */
  await this.User.read({ id: user.uid })

  /*
   * Create a new feature branch for this
   */
  const branchName = `${type}-${body.slug}`
  const branch = await createBranch({ name: branchName })

  /*
   * Create the file
   */
  const file = await createFile({
    path: `markdown/org/${type}/${body.slug}/en.md`,
    body: {
      message: `feat: New ${type} post ${body.slug} by ${this.User.record.username}${
        body.language !== 'en' ? nonEnWarning : ''
      }`,
      content: new Buffer.from(body.markdown).toString('base64'),
      branch: branchName,
      author: {
        name: this.User.clear.data?.githubUsername || this.config.github.bot.name,
        email: this.User.clear.data?.githubEmail || this.config.github.bot.email,
      },
    },
  })

  /*
   * New create the pull request
   */
  const pr = await createPullRequest({
    title: `feat: New ${type} post ${body.slug} by ${this.User.record.username}`,
    body: `Paging @joostdecock to check out this proposed ${type} post.${
      body.language !== 'en' ? nonEnWarning : ''
    }`,
    from: branchName,
    to: 'develop',
  })

  /*
   * Return 201
   */
  return pr ? this.setResponse201({ branch, file, pr }) : this.setResponse(400)
}

/*
 * Checks to see whether a slug is available
 *
 * @param {params} object - The request (URL) parameters
 * @param {user} object - The user as loaded by auth middleware
 * @param {type} object - The type to check (either 'blog' or 'showcase')
 * @returns {FlowModel} object - The FlowModel
 */
FlowModel.prototype.isSlugAvailable = async function ({ params }, type) {
  /*
   * Is slug set?
   */
  if (!params.slug) return this.setResponse(400, `slugMissing`)

  /*
   * Load the list of folders from github
   */
  const folders = (await getFileList(`markdown/org/${type}`)).map((folder) => folder.name)

  /*
   * Return  whether or not params.slug is already included in the list of slugs
   */
  return !folders.includes(params.slug)
}
