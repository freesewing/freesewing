import { hash } from '../utils/crypto.mjs'
import { clean, i18nUrl } from '../utils/index.mjs'
import { decorateModel } from '../utils/model-decorator.mjs'

/*
 * This model handles all user updates
 */
export function SubscriberModel(tools) {
  return decorateModel(this, tools, {
    name: 'subscriber',
    encryptedFields: ['email'],
    models: ['user'],
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
    body.language,
    `/newsletter/${this.record.active ? 'un' : ''}subscribe?id=${this.record.id}&check=${ehash}`
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
 * Unsubscribe a user
 * This is an unauthenticated route (has to for newsletter subscribers might not be users)
 *
 * @param {body} object - The request body
 * @returns {SubscriberModal} object - The SubscriberModel
 */
SubscriberModel.prototype.unsubscribe = async function ({ params }) {
  /*
   * Is ehash set?
   */
  if (!params.ehash) return this.setResponse(400, 'ehashMissing')

  const { ehash } = params

  /*
   * Find the subscription record
   */
  await this.read({ ehash })

  /*
   * If found, remove the record
   */
  if (this.record) {
    await this.delete({ id: this.record.id })

    return this.setResponse(204)
  } else {
    /*
     * If not, perhaps it's an account ehash rather than subscriber ehash
     */
    await this.User.read({ ehash })
    if (this.User.record) {
      await this.User.update({ newsletter: false })

      return this.setResponse(204)
    }
  }

  /*
   * Return 404
   */
  return this.setResponse(404)
}

/*
 * One-click unsubscribe a user
 * This is an unauthenticated route (has to for newsletter subscribers might not be users)
 *
 * @param {body} object - The request body
 * @returns {SubscriberModal} object - The SubscriberModel
 */
SubscriberModel.prototype.ocunsub = async function ({ params }) {
  const { ehash } = params

  /*
   * Find the subscription record
   */
  await this.read({ ehash })

  /*
   * If found, remove the record
   */
  if (this.record) {
    await this.delete({ id: this.record.id })

    return true
  } else {
    /*
     * If not, perhaps it's an account ehash rather than subscriber ehash
     */
    await this.User.read({ ehash })
    if (this.User.record) {
      await this.User.update({ newsletter: false })

      return true
    }
  }

  return false
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
 * Searches for subscribers
 *
 * @param {body} object - The request body
 * @returns {UserModel} object - The UserModel
 */
SubscriberModel.prototype.search = async function (q = {}) {
  /*
   * Find subscribers based on passed query
   */
  let subscribers
  try {
    subscribers = await this.prisma.subscriber.findMany({
      where: q,
    })
  } catch (err) {
    console.log(err)
    subscribers = []
  }

  return subscribers
}
