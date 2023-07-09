import { log } from '../utils/log.mjs'
import { UserModel } from './user.mjs'
import { i18nUrl } from '../utils/index.mjs'

export function FlowModel(tools) {
  this.config = tools.config
  this.mailer = tools.email
  this.rbac = tools.rbac
  this.User = new UserModel(tools)

  return this
}

/*
 * Send a translator invite
 */
FlowModel.prototype.sendTranslatorInvite = async function ({ body, user }) {
  if (!this.rbac.readSome(user)) return this.setResponse(403, 'insufficientAccessLevel')
  if (Object.keys(body).length < 1) return this.setResponse(400, 'postBodyMissing')
  if (!body.language) return this.setResponse(400, 'languageMissing')
  if (!this.config.translations.includes(body.language))
    return this.setResponse(400, 'languageInvalid')

  // Load user making the call
  await this.User.revealAuthenticatedUser(user)

  // Send the invite email
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

  return this.setResponse(200, 'sent', {})
}

/*
 * Send a language suggestion to the maintainer
 */
FlowModel.prototype.sendLanguageSuggestion = async function ({ body, user }) {
  if (!this.rbac.readSome(user)) return this.setResponse(403, 'insufficientAccessLevel')
  if (Object.keys(body).length < 1) return this.setResponse(400, 'postBodyMissing')
  if (!body.language) return this.setResponse(400, 'languageMissing')

  // Load user making the call
  await this.User.revealAuthenticatedUser(user)

  // Send the invite email
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

  return this.setResponse(200, 'sent', {})
}

/*
 * Helper method to set the response code, result, and body
 *
 * Will be used by this.sendResponse()
 */
FlowModel.prototype.setResponse = function (status = 200, error = false, data = {}) {
  this.response = {
    status,
    body: {
      result: 'success',
      ...data,
    },
  }
  if (status > 201) {
    this.response.body.error = error
    this.response.body.result = 'error'
    this.error = true
  } else this.error = false
  if (status === 404) this.response.body = null

  return this
}

/*
 * Helper method to send response
 */
FlowModel.prototype.sendResponse = async function (res) {
  return res.status(this.response.status).send(this.response.body)
}
