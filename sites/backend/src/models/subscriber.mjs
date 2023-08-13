import { hash } from '../utils/crypto.mjs'
import { log } from '../utils/log.mjs'
import { clean, i18nUrl } from '../utils/index.mjs'
import { decorateModel } from '../utils/model-decorator.mjs'

/*
 * This model handles all user updates
 */
export function SubscriberModel(tools) {
  return decorateModel(this, tools, {
    name: 'subscriber',
    encryptedFields: ['email'],
  })
}

/*
 * Creates a new subscriber - Takes user input so we need to validate it
 * This is an unauthenticated route
 *
 * @param {body} object - The request body
 * @returns {SubscriberModal} object - The SubscriberModel
 */
SubscriberModel.prototype.guardedCreate = async function ({ body }) {
  /*
   * Is email set and a string?
   */
  if (!body.email || typeof body.email !== 'string') return this.setResponse(400, 'emailMissing')

  /*
   * Is language set and a known language?
   */
  if (!body.language || !this.config.languages.includes(body.language.toLowerCase()))
    return this.setResponse(400, 'languageMissing')

  /*
   * Clean (lowercase + trim) the email address and hash it
   */
  const email = clean(body.email)
  const ehash = hash(email)

  /*
   * Lowecase the language
   */
  const language = body.language.toLowerCase()

  /*
   * Check whether this is a unit test
   */
  const isTest = this.isTest(body)

  /*
   * Attempt to read existing subscriber record for this email address
   */
  let newSubscriber = false
  await this.read({ ehash })

  /*
   * If no record can be found, create a new subscriber record.
   */
  if (!this.record) await this.createRecord({ ehash, email, language, active: false })

  /*
   * Construct the various URLs for the outgoing email
   */
  const actionUrl = i18nUrl(
    `/newsletter/${this.record.active ? 'un' : ''}subscribe/${this.record.id}/${ehash}`
  )

  /*
   * Send out confirmation email unless it's a test and we don't want to send test emails
   */
  if (!isTest || this.config.use.tests.email) {
    const template = newSubscriber ? 'nlsub' : this.record.active ? 'nlsubact' : 'nlsubinact'
    await this.mailer.send({
      template,
      language,
      to: email,
      replacements: {
        actionUrl,
        whyUrl: i18nUrl(body.language, `/docs/faq/email/why-${template}`),
        supportUrl: i18nUrl(body.language, `/patrons/join`),
      },
    })
  }

  /*
   * Prepare the return data
   */
  const returnData = { language, email }
  if (isTest) {
    returnData.id = this.record.id
    returnData.ehash = ehash
  }

  /*
   * Return 200 and the data
   */
  return this.setResponse200({ data: returnData })
}

/*
 * Confirms a pending subscription
 * This is an unauthenticated route
 *
 * @param {body} object - The request body
 * @returns {SubscriberModal} object - The SubscriberModel
 */
SubscriberModel.prototype.subscribeConfirm = async function ({ body }) {
  /*
   * Validate input and load subscription record
   */
  await this.verifySubscription(body)

  /*
   * If a status code is already set, do not continue
   */
  if (this.response?.status) return this

  /*
   * Update the status if the subscription is not active
   */
  if (this.record.active !== true) await this.update({ active: true })

  /*
   * Return 200
   */
  return this.setResponse200()
}

/*
 * Confirms a pending unsubscription
 * This is an unauthenticated route
 *
 * @param {body} object - The request body
 * @returns {SubscriberModal} object - The SubscriberModel
 */
SubscriberModel.prototype.unsubscribeConfirm = async function ({ body }) {
  /*
   * Validate input and load subscription record
   */
  await this.verifySubscription(body)

  /*
   * If a status code is already set, do not continue
   */
  if (this.response?.status) return this

  /*
   * Remove the record
   */
  await this.delete({ id: this.record.id })

  /*
   * Return 204
   */
  return this.setResponse(204)
}

/*
 * A helper method to validate input and load the subscription record
 *
 * @param {body} object - The request body
 * @returns {SubscriberModal} object - The SubscriberModel
 */
SubscriberModel.prototype.verifySubscription = async function (body) {
  /*
   * Get the id and ehash from the body
   */
  const { id, ehash } = body

  /*
   * Is id set?
   */
  if (!id) return this.setResponse(400, 'idMissing')

  /*
   * Is ehash set?
   */
  if (!ehash) return this.setResponse(400, 'ehashMissing')

  /*
   * Find the subscription record
   */
  await this.read({ ehash })

  /*
   * If it is not found, return 404
   */
  if (!this.record) return this.setResponse(404, 'subscriberNotFound')

  return this
}

/*
 *
 * Anything below this comment is migration code for the v2 => v3 migration
 * and can be safely removed after the migration is done
 */

/*
 * This is a special route not available for API users
 */
SubscriberModel.prototype.import = async function (list) {
  let created = 0
  for (const sub of list) {
    const email = clean(sub)
    const ehash = hash(email)
    await this.read({ ehash })

    if (!this.record) {
      const data = await this.cloak({
        ehash,
        email,
        language: 'en',
        active: true,
      })
      try {
        this.record = await this.prisma.subscriber.create({ data })
        created++
      } catch (err) {
        log.warn(err, 'Could not create subscriber record')
        return this.setResponse(500, 'createSubscriberFailed')
      }
    }
  }

  return this.setResponse(200, 'success', {
    total: list.length,
    imported: created,
  })
}
