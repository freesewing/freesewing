import { log } from '../utils/log.mjs'

export function ConfirmationModel(tools) {
  this.config = tools.config
  this.prisma = tools.prisma
  this.decrypt = tools.decrypt
  this.encrypt = tools.encrypt
  this.encryptedFields = ['data']
  this.clear = {} // For holding decrypted data

  return this
}

ConfirmationModel.prototype.unguardedRead = async function (where) {
  this.record = await this.prisma.confirmation.findUnique({ where })
  await this.reveal()

  return this
}

ConfirmationModel.prototype.read = async function (where) {
  this.record = await this.prisma.confirmation.findUnique({
    where,
    include: {
      user: true,
    },
  })
  this.clear.data = this.record?.data ? this.decrypt(this.record.data) : {}

  return this.setExists()
}

ConfirmationModel.prototype.setExists = function () {
  this.exists = this.record ? true : false

  return this
}

ConfirmationModel.prototype.setResponse = function (status = 200, error = false, data = {}) {
  this.response = {
    status,
    body: {
      result: 'success',
      ...data,
    },
  }
  if (status === 201) this.response.body.result = 'created'
  else if (status > 204) {
    this.response.body.error = error
    this.response.body.result = 'error'
    this.error = true
  } else this.error = false

  return this.setExists()
}

ConfirmationModel.prototype.sendResponse = async function (res) {
  return res.status(this.response.status).send(this.response.body)
}

ConfirmationModel.prototype.guardedRead = async function ({ params }) {
  if (typeof params.id === 'undefined') return this.setResponse(404)
  if (typeof params.check === 'undefined') return this.setResponse(404)

  await this.unguardedRead({ id: params.id })
  if (!this.record) return this.setResponse(404)

  if (this.clear.data.check === params.check)
    return this.setResponse(200, 'success', {
      confirmation: {
        id: this.record.id,
        check: this.clear.data.check,
      },
    })

  return this.setResponse(404)
}

ConfirmationModel.prototype.create = async function (data = {}) {
  try {
    this.record = await this.prisma.confirmation.create({
      data: { ...data, data: this.encrypt(data.data) },
    })
  } catch (err) {
    log.warn(err, 'Could not create confirmation record')
    return this.setResponse(500, 'createConfirmationFailed')
  }
  log.info({ confirmation: this.record.id }, 'Confirmation created')

  return this.setResponse(201)
}

ConfirmationModel.prototype.unguardedDelete = async function () {
  await this.prisma.confirmation.delete({ where: { id: this.record.id } })
  this.record = null
  this.clear = null

  return this.setExists()
}

/*
 * Helper method to decrypt at-rest data
 */
ConfirmationModel.prototype.reveal = async function () {
  this.clear = {}
  if (this.record) {
    for (const field of this.encryptedFields) {
      this.clear[field] = this.decrypt(this.record[field])
    }
  }
  return this
}
