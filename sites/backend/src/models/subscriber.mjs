import { hash } from '../utils/crypto.mjs'
import { log } from '../utils/log.mjs'
import { clean, i18nUrl } from '../utils/index.mjs'

export function SubscriberModel(tools) {
  this.config = tools.config
  this.prisma = tools.prisma
  this.mailer = tools.email
  this.decrypt = tools.decrypt
  this.encrypt = tools.encrypt
  this.encryptedFields = ['email']
  this.clear = {} // For holding decrypted data

  return this
}

SubscriberModel.prototype.guardedCreate = async function ({ body }) {
  if (!body.email || typeof body.email !== 'string') return this.setResponse(400, 'emailMissing')
  if (!body.language || !this.config.languages.includes(body.language.toLowerCase()))
    return this.setResponse(400, 'languageMissing')

  // Clean up email address and hash it
  const email = clean(body.email)
  const language = body.language.toLowerCase()
  const ehash = hash(email)

  log.info(`New newsletter subscriber: ${email}`)

  // Check whether this is a unit test
  const isTest = this.isTest(body)

  // Check to see if this email address is already subscribed.
  let newSubscriber = false
  await this.read({ ehash })

  if (!this.record) {
    // No record found. Create subscriber record.
    newSubscriber = true
    const data = await this.cloak({ ehash, email, language, active: false })
    try {
      this.record = await this.prisma.subscriber.create({ data })
    } catch (err) {
      log.warn(err, 'Could not create subscriber record')
      return this.setResponse(500, 'createSubscriberFailed')
    }
  }

  // Construct the various URLs
  const actionUrl = i18nUrl(
    `/newsletter/${this.record.active ? 'un' : ''}subscribe/${this.record.id}/${ehash}`
  )

  // Send out confirmation email unless it's a test and we don't want to send test emails
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

  const returnData = { language, email }
  if (isTest) {
    returnData.id = this.record.id
    returnData.ehash = ehash
  }

  return this.setResponse(200, 'success', { data: returnData })
}

SubscriberModel.prototype.subscribeConfirm = async function ({ body }) {
  const { id, ehash } = body
  if (!id) return this.setResponse(400, 'idMissing')
  if (!ehash) return this.setResponse(400, 'ehashMissing')

  // Find subscription
  await this.read({ ehash })

  if (!this.record) {
    // Subscriber not found
    return this.setResponse(404, 'subscriberNotFound')
  }

  if (this.record.status !== true) {
    // Update username
    try {
      await this.unguardedUpdate({ active: true })
    } catch (err) {
      log.warn(err, 'Could not update active state after subscribe confirmation')
      return this.setResponse(500, 'subscriberActivationFailed')
    }
  }

  return this.setResponse(200, 'success')
}

SubscriberModel.prototype.unsubscribeConfirm = async function ({ body }) {
  const { id, ehash } = body
  if (!id) return this.setResponse(400, 'idMissing')
  if (!ehash) return this.setResponse(400, 'ehashMissing')

  // Find subscription
  await this.read({ ehash })

  if (this.record) {
    // Remove record
    try {
      await this.unguardedDelete()
    } catch (err) {
      log.warn(err, 'Could not remove subscriber')
      return this.setResponse(500, 'subscriberRemovalFailed')
    }
  }

  return this.setResponse(200, 'success')
}

/*
 * Updates the subscriber data
 * Used when we create the data ourselves so we know it's safe
 */
SubscriberModel.prototype.unguardedUpdate = async function (data) {
  try {
    this.record = await this.prisma.subscriber.update({
      where: { id: this.record.id },
      data,
    })
  } catch (err) {
    log.warn(err, 'Could not update subscriber record')
    process.exit()
    return this.setResponse(500, 'updateSubscriberFailed')
  }
  await this.reveal()

  return this.setResponse(200)
}

/*
 * Removes the subscriber record
 * Used when we call for removal ourselves so we know it's safe
 */
SubscriberModel.prototype.unguardedDelete = async function () {
  await this.prisma.subscriber.delete({ where: { id: this.record.id } })
  this.record = null
  this.clear = null

  return this.subscriberExists()
}

/*
 * Loads a subscriber from the database based on the where clause you pass it
 *
 * Stores result in this.record
 */
SubscriberModel.prototype.read = async function (where) {
  try {
    this.record = await this.prisma.subscriber.findUnique({ where })
  } catch (err) {
    log.warn({ err, where }, 'Could not read subscriber')
  }

  this.reveal()

  return this.subscriberExists()
}

/*
 * Checks this.record and sets a boolean to indicate whether
 * the subscription exists or not
 *
 * Stores result in this.exists
 */
SubscriberModel.prototype.subscriberExists = function () {
  this.exists = this.record ? true : false

  return this
}

/*
 * Loads a measurements set from the database based on the where clause you pass it
 * In addition prepares it for returning the set data
 *
 * Stores result in this.record
 */
SubscriberModel.prototype.guardedRead = async function ({ params, user }) {
  if (!this.rbac.readSome(user)) return this.setResponse(403, 'insufficientAccessLevel')
  if (user.iss && user.status < 1) return this.setResponse(403, 'accountStatusLacking')

  await this.read({ id: parseInt(params.id) })
  if (!this.record) return this.setResponse(404)
  if (this.record.userId !== user.uid && !this.rbac.bughunter(user)) {
    return this.setResponse(403, 'insufficientAccessLevel')
  }

  return this.setResponse(200, false, {
    result: 'success',
    set: this.asSet(),
  })
}

/*
 * Helper method to decrypt at-rest data
 */
SubscriberModel.prototype.reveal = async function () {
  this.clear = {}
  if (this.record) {
    for (const field of this.encryptedFields) {
      try {
        this.clear[field] = this.decrypt(this.record[field])
      } catch (err) {
        console.log(err)
      }
    }
  }

  return this
}

/*
 * Helper method to encrypt at-rest data
 */
SubscriberModel.prototype.cloak = function (data) {
  for (const field of this.encryptedFields) {
    if (typeof data[field] !== 'undefined') {
      data[field] = this.encrypt(data[field])
    }
  }

  return data
}

/*
 * Removes the subscriber - No questions asked
 */
SubscriberModel.prototype.unguardedDelete = async function () {
  await this.prisma.subscriber.delete({ where: { id: this.record.id } })
  this.record = null
  this.clear = null

  return this.subscriberExists()
}

/*
 * Helper method to set the response code, result, and body
 *
 * Will be used by this.sendResponse()
 */
SubscriberModel.prototype.setResponse = function (
  status = 200,
  error = false,
  data = {},
  rawData = false
) {
  this.response = {
    status,
    body: rawData
      ? data
      : {
          result: 'success',
          ...data,
        },
  }
  if (status > 201) {
    this.response.body.error = error
    this.response.body.result = 'error'
    this.error = true
  } else this.error = false

  return this.subscriberExists()
}

/*
 * Helper method to send response (as JSON)
 */
SubscriberModel.prototype.sendResponse = async function (res) {
  return res.status(this.response.status).send(this.response.body)
}

/*
 * Update method to determine whether this request is part of a (unit) test
 */
SubscriberModel.prototype.isTest = function (body) {
  // Disalowing tests in prodution is hard-coded to protect people from themselves
  if (this.config.env === 'production' && !this.config.tests.production) return false
  if (!body.test) return false
  if (body.email && !body.email.split('@').pop() === this.config.tests.domain) return false

  return true
}

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
