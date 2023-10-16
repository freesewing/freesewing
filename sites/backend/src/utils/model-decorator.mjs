import { log } from '../utils/log.mjs'
import yaml from 'js-yaml'
import { hashPassword } from '../utils/crypto.mjs'
import { asJson, capitalize } from '../utils/index.mjs'
/*
 * Models will be attached on-demand
 */
import { ApikeyModel } from '../models/apikey.mjs'
import { ConfirmationModel } from '../models/confirmation.mjs'
import { CuratedSetModel } from '../models/curated-set.mjs'
import { OptionPackModel } from '../models/option-pack.mjs'
import { FlowModel } from '../models/flow.mjs'
import { PatternModel } from '../models/pattern.mjs'
import { SetModel } from '../models/set.mjs'
import { SubscriberModel } from '../models/subscriber.mjs'
import { UserModel } from '../models/user.mjs'

/*
 * This adds a bunch of stuff to a model that is common
 * between various models, and thus abstracted here
 */
export function decorateModel(Model, tools, modelConfig) {
  /*
   * Make config available
   */
  Model.config = tools.config

  /*
   * Set the name
   */
  Model.name = modelConfig.name

  /*
   * Attach all tooling
   */
  Model.prisma = tools.prisma
  Model.decrypt = tools.decrypt
  Model.encrypt = tools.encrypt
  Model.mfa = tools.mfa
  Model.rbac = tools.rbac
  Model.mailer = tools.email

  /*
   * Set encrypted fields based on config
   */
  Model.encryptedFields = modelConfig.encryptedFields || []

  /*
   * Set JSON fields based on config
   */
  Model.jsonFields = modelConfig.jsonFields || []

  /*
   * Create object to hold decrypted data
   */
  Model.clear = {}

  /*
   * Make various helper models available, as configured
   */
  if (modelConfig.models && Array.isArray(modelConfig.models)) {
    if (modelConfig.models.includes('apikey')) Model.Apikey = new ApikeyModel(tools)
    if (modelConfig.models.includes('confirmation'))
      Model.Confirmation = new ConfirmationModel(tools)
    if (modelConfig.models.includes('cset')) Model.CuratedSet = new CuratedSetModel(tools)
    if (modelConfig.models.includes('opack')) Model.OptionPack = new OptionPackModel(tools)
    if (modelConfig.models.includes('flow')) Model.Flow = new FlowModel(tools)
    if (modelConfig.models.includes('pattern')) Model.Pattern = new PatternModel(tools)
    if (modelConfig.models.includes('set')) Model.Set = new SetModel(tools)
    if (modelConfig.models.includes('subscriber')) Model.Subscriber = new SubscriberModel(tools)
    if (modelConfig.models.includes('user')) Model.User = new UserModel(tools)
  }

  /*
   * Loads a model instance from the database based on the where clause you pass it
   *
   * Stores result in this.record
   */
  Model.read = async function (where, include = {}) {
    if ((where.id && typeof where.id === 'number' && isNaN(where.id)) || where.id === null) {
      return this.recordExists()
    }
    try {
      this.record = await this.prisma[modelConfig.name].findUnique({ where, include })
    } catch (err) {
      log.warn({ err, where }, `Could not read ${modelConfig.name}`)
      return this.recordExists()
    }

    await this.reveal()

    return this.recordExists()
  }

  /*
   * Helper method to decrypt at-rest data
   */
  Model.reveal = async function () {
    this.clear = {}
    if (this.record) {
      for (const field of this.encryptedFields) {
        this.clear[field] = await this.decrypt(this.record[field])
      }
    }

    /*
     * Handle nested records with JSON fields
     */
    if (this.record) {
      for (const field of this.jsonFields) {
        //this.record[field] = JSON.parse(this.record[field])
        if (
          this.encryptedFields &&
          this.encryptedFields.includes(field) &&
          typeof this.clear[field] === 'string'
        ) {
          try {
            this.clear[field] = JSON.parse(this.clear[field])
          } catch (err) {
            console.log({ err, val: this.clear[field] })
          }
        } else {
          this.record[field] = JSON.parse(this.record[field])
        }
      }
    }

    /*
     * Handle nested set
     */
    if (this.record?.set) this.record.set = this.Set.revealSet(this.record.set)

    return this
  }

  /*
   * Helper method to encrypt at-rest data
   */
  Model.cloak = function (data) {
    /*
     * Encrypt data
     */
    for (const field of this.encryptedFields) {
      if (typeof data[field] !== 'undefined') {
        if (this.jsonFields && this.jsonFields.includes(field)) {
          data[field] = this.encrypt(JSON.stringify(data[field]))
        } else {
          data[field] = this.encrypt(data[field])
        }
      }
    }

    /*
     * Password needs to be hashed too
     */
    if (data.password && typeof data.password === 'string') {
      data.password = asJson(hashPassword(data.password))
    }

    return data
  }

  /*
   * Checks this.record and sets a boolean to indicate whether
   * the record exists or not
   *
   * Stores result in this.exists
   */
  Model.recordExists = function () {
    this.exists = this.record ? true : false

    return this
  }

  /*
   * Creates a record based on the model data
   * Used when we create the data ourselves so we know it's safe
   */
  Model.createRecord = async function (data) {
    try {
      const cloaked = await this.cloak(data)
      this.record = await this.prisma[modelConfig.name].create({ data: cloaked })
    } catch (err) {
      /*
       * Some error occured. Log warning and return 500
       */
      log.warn(err, `Could not create ${modelConfig.name}`)
      return this.setResponse(500, `create${capitalize(modelConfig.name)}Failed`)
    }

    return this.recordExists()
  }

  /*
   * Updates the model data
   * Used when we create the data ourselves so we know it's safe
   */
  Model.update = async function (data, include = {}) {
    try {
      const cloaked = await this.cloak(data)
      this.record = await this.prisma[modelConfig.name].update({
        where: { id: this.record.id },
        include,
        data: cloaked,
      })
    } catch (err) {
      log.warn(err, `Could not update ${modelConfig.name} record`)
      return this.setResponse(500, 'updateUserFailed')
    }
    await this.reveal()

    return this.setResponse(200)
  }

  /*
   * Deletes the model data
   */
  Model.delete = async function () {
    await this.prisma[modelConfig.name].delete({ where: { id: this.record.id } })
    this.record = null
    this.clear = null

    return this.recordExists()
  }

  /*
   * Helper method to set the response code, result, and body
   *
   * Will be used by this.sendResponse()
   */
  Model.setResponse = function (status = 200, result = 'success', data = {}, raw = false) {
    this.response = {
      status,
      body: raw ? data : { result, ...data },
    }
    if (status > 201) {
      this.response.body.error = result
      this.response.body.result = 'error'
      this.error = true
    } else this.error = false
    if (status === 404) this.response.body = null

    return this.recordExists()
  }

  /*
   * Helper method to set response code 200, as it's so common
   */
  Model.setResponse200 = function (data = {}, raw = false) {
    return this.setResponse(200, 'success', data, raw)
  }

  /*
   * Helper method to set response code 201, as it's so common
   */
  Model.setResponse201 = function (data = {}) {
    return this.setResponse(201, 'created', data)
  }

  /*
   * Helper method to send response
   */
  Model.sendResponse = async function (res) {
    return res.status(this.response.status).send(this.response.body)
  }

  /*
   * Helper method to send response as YAML
   */
  Model.sendYamlResponse = async function (res) {
    let body
    try {
      body = yaml.dump(this.response.body)
    } catch (err) {
      console.log(err)
    }
    return res.status(this.response.status).type('yaml').send(body)
  }

  /*
   * Helper method to send response as SVG
   */
  Model.sendSvgResponse = async function (res) {
    res.setHeader('Content-Type', 'image/svg+xml')
    return res.status(this.response.status).type('svg').send(this.response.body)
  }

  /*
   * Helper method to sanitize measurments
   */
  Model.sanitizeMeasurements = function (input) {
    const measies = {}
    if (typeof input !== 'object') return input
    for (const [m, val] of Object.entries(input)) {
      if (this.config.measies.includes(m) && typeof val === 'number' && val > 0) measies[m] = val
    }

    return measies
  }

  /*
   * Helper method to determine whether this request is part of a (unit) test
   */
  Model.isTest = function (body) {
    /*
     * Test in production need to be explicitly allowed
     */
    if (this.config.env === 'production' && !this.config.tests.production) return false

    /*
     * If there's not test in the body, it's not a test
     */
    if (!body.test) return false

    /*
     * If the authenticated user does not use the configured test domain for email, it's not a test
     */
    if (this.clear?.email && !this.clear.email.split('@').pop() === this.config.tests.domain)
      return false

    /*
     * If the email used in the POST body does not use the configured test domain for email, it's not a test
     */
    if (body.email && !body.email.split('@').pop() === this.config.tests.domain) return false

    /*
     * Looks like it's a test
     */
    return true
  }

  /*
   * Helper method to troubleshoot requests by outputting timing data
   */
  Model.time = function (key) {
    if (this.timer)
      log.info(`Timer split [${key ? key : modelConfig.name}] ${Date.now() - this.timer}ms`)
    else {
      this.timer = Date.now()
      log.info(`Timer start [${key ? key : modelConfig.name}] 0ms`)
    }

    return this
  }

  return Model
}
