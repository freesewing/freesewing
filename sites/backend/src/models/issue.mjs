import fetch from 'node-fetch'
import { UserModel } from './user.mjs'

export function IssueModel(tools) {
  this.config = tools.config
  this.prisma = tools.prisma
  this.User = new UserModel(tools)
  this.token = tools.config.github.token

  return this
}

IssueModel.prototype.setResponse = function (status = 200, error = false, data = {}) {
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

  return this
}

IssueModel.prototype.sendResponse = async function (res) {
  return res.status(this.response.status).send(this.response.body)
}

IssueModel.prototype.unguardedDelete = async function () {
  await this.prisma.apikey.delete({ where: { id: this.record.id } })
  this.record = null
  this.clear = null

  return this.setExists()
}

IssueModel.prototype.create = async function ({ body }) {
  if (!this.token) return this.setResponse(400, 'notEnabled')
  if (Object.keys(body).length < 1) return this.setResponse(400, 'postBodyMissing')
  if (!body.title) return this.setResponse(400, 'titleMissing')
  if (!body.body) return this.setResponse(400, 'bodyMissing')

  const apiUrl = `https://api.github.com/repos/freesewing/freesewing/issues`
  let response
  try {
    response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.token}`,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    if (response.status === 201) response = await response.json()
    else {
      console.log(response)
      response = false
    }
  } catch (error) {
    console.error('An error occurred while creating a GitHub issue:', error.message)
    response = false
  }

  return response ? this.setResponse(201, 'created', { issue: response }) : this.setResponse(400)
}
