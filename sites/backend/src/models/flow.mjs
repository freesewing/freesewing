import { i18nUrl } from '../utils/index.mjs'
import { decorateModel } from '../utils/model-decorator.mjs'
import { ensureImage, replaceImage, removeImage } from '../utils/cloudflare-images.mjs'

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
 * @returns {FlowModel} object - The FlowModel
 */
FlowModel.prototype.uploadImage = async function ({ body, user }) {
  /*
   * Enforce RBAC
   */
  if (!this.rbac.readSome(user)) return this.setResponse(403, 'insufficientAccessLevel')

  /*
   * Do we have a POST body?
   */
  if (Object.keys(body).length < 1) return this.setResponse(400, 'postBodyMissing')

  /*
   * Is img set?
   */
  if (!body.img) return this.setResponse(400, 'imgMissing')

  /*
   * Is type set and valid?
   */
  if (!body.type) return this.setResponse(400, 'typeMissing')
  if (!['blog', 'showcase'].includes(body.type)) return this.setResponse(400, 'typeInvalid')

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
   * Upload the image
   */
  const id = `${body.type}-${body.slug}${
    body.subId && body.subId !== 'main' ? '-' + body.subId : ''
  }`
  const b64 = body.img
  const metadata = { uploadedBy: user.uid }
  /*
   * You need to be a curator to overwrite (replace) an image.
   * Regular users can only update new images, not overwrite images.
   * If not, any user could overwrite any showcase image.
   */
  const imgId = this.rbac.curator(user)
    ? await replaceImage({ b64, id, metadata })
    : await ensureImage({ b64, id, metadata })

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
