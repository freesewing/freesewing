import { i18nUrl } from '../utils/index.mjs'
import { decorateModel } from '../utils/model-decorator.mjs'

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
