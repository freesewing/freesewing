import axios from 'axios'
import { freeSewingConfig } from 'shared/config/freesewing.config.mjs'
import { useMemo } from 'react'

/*
 * Helper methods to interact with the FreeSewing backend
 */
const apiHandler = axios.create({
  baseURL: freeSewingConfig.backend,
  timeout: 3000,
})

/*
 * This api object handles async code for different HTTP methods
 */
const api = {
  get: async (uri, config = {}) => {
    let result
    try {
      result = await apiHandler.get(uri, config)
      return result
    } catch (err) {
      return err
    }
  },
  post: async (uri, data = null, config = {}) => {
    let result
    try {
      result = await apiHandler.post(uri, data, config)
      return result
    } catch (err) {
      return err
    }
  },
  patch: async (uri, data = null, config = {}) => {
    let result
    try {
      result = await apiHandler.patch(uri, data, config)
      return result
    } catch (err) {
      return err
    }
  },
  delete: async (uri, config = {}) => {
    let result
    try {
      result = await apiHandler.delete(uri, config)
      return result
    } catch (err) {
      return err
    }
  },
}

/*
 * Helper method to handle the response and verify that it was successful
 */
const responseHandler = (response, expectedStatus = 200, expectData = true) => {
  if (response && response.status === expectedStatus) {
    if (!expectData || response.data) {
      return { success: true, data: response.data, response }
    }
    return { success: true, response }
  }

  return { success: false, response }
}

function Backend(auth) {
  this.auth = auth
}

/*
 * backend.signUp: User signup
 */
Backend.prototype.signUp = async function ({ email, language }) {
  return responseHandler(await api.post('/signup', { email, language }), 201)
}

/*
 * Backend.prototype.loadConfirmation: Load a confirmation
 */
Backend.prototype.loadConfirmation = async function ({ id, check }) {
  return responseHandler(await api.get(`/confirmations/${id}/${check}`))
}
/*
 * Backend.prototype.confirmSignup: Confirm a signup
 */
Backend.prototype.confirmSignup = async function ({ id, consent }) {
  return responseHandler(await api.post(`/confirm/signup/${id}`, { consent }))
}

/*
 * Backend.prototype.signIn: User signin/login
 */
Backend.prototype.signIn = async function ({ username, password = false, token = false }) {
  return password === false
    ? responseHandler(await api.post('/signinlink', { username }))
    : responseHandler(await api.post('/signin', { username, password, token }))
}

/*
 * Backend.prototype.signInFromLink: Trade in sign-in link id & check for JWT token
 */
Backend.prototype.signInFromLink = async function ({ id, check }) {
  return responseHandler(await api.post(`/signinlink/${id}/${check}`))
}

/*
 * Generic update account method
 */
Backend.prototype.updateAccount = async function (data) {
  return responseHandler(await api.patch(`/account/jwt`, data, this.auth))
}

/*
 * Checks whether a username is available
 */
Backend.prototype.isUsernameAvailable = async function (username) {
  const response = await api.post(`/available/username/jwt`, { username }, this.auth)

  // 404 means username is available, which is success in this case
  return response.status === 404
    ? { success: true, data: false, available: true, response }
    : { success: false, available: false, response }
}

/*
 * Remove account method
 */
Backend.prototype.removeAccount = async function () {
  return responseHandler(await api.delete(`/account/jwt`, this.auth))
}
/*
 * Enable MFA
 */
Backend.prototype.enableMfa = async function () {
  return responseHandler(await api.post(`/account/mfa/jwt`, { mfa: true }, this.auth))
}

/*
 * Confirm MFA
 */
Backend.prototype.confirmMfa = async function (data) {
  return responseHandler(await api.post(`/account/mfa/jwt`, { ...data, mfa: true }, this.auth))
}

/*
 * Disable MFA
 */
Backend.prototype.disableMfa = async function (data) {
  return responseHandler(
    await await api.post(`/account/mfa/jwt`, { ...data, mfa: false }, this.auth)
  )
}

/*
 * Reload account
 */
Backend.prototype.reloadAccount = async function () {
  return responseHandler(await await api.get(`/whoami/jwt`, this.auth))
}
/*
 * Create API key
 */
Backend.prototype.createApikey = async function (data) {
  return responseHandler(await api.post(`/apikeys/jwt`, data, this.auth), 201)
}

/*
 * Get API keys
 */
Backend.prototype.getApikeys = async function () {
  return responseHandler(await api.get(`/apikeys/jwt`, this.auth))
}

/*
 * Remove API key
 */
Backend.prototype.removeApikey = async function (id) {
  const response = await api.delete(`/apikeys/${id}/jwt`, this.auth)

  return response && response.status === 204 ? true : false
}

/*
 * Get measurements sets
 */
Backend.prototype.getSets = async function () {
  return responseHandler(await api.get(`/sets/jwt`, this.auth))
}

/*
 * Get measurements set
 */
Backend.prototype.getSet = async function (id) {
  return responseHandler(await api.get(`/sets/${id}/jwt`, this.auth))
}

/*
 * Create measurements set
 */
Backend.prototype.createSet = async function (data) {
  return responseHandler(await api.post(`/sets/jwt`, data, this.auth), 201)
}

/*
 * Remove measurements set
 */
Backend.prototype.removeSet = async function (id) {
  const response = await api.delete(`/sets/${id}/jwt`, this.auth)

  return response && response.status === 204 ? true : false
}

/*
 * Generic update measurements set method
 */
Backend.prototype.updateSet = async function (id, data) {
  return responseHandler(await api.patch(`/sets/${id}/jwt`, data, this.auth))
}

/*
 * Get curated measurements sets
 */
Backend.prototype.getCuratedSets = async function () {
  return responseHandler(await api.get(`/curated-sets`))
}

/*
 * Get curated measurements set
 */
Backend.prototype.getCuratedSet = async function (id) {
  return responseHandler(await api.get(`/curated-sets/${id}`))
}

/*
 * Remove curated measurements set
 */
Backend.prototype.removeCuratedMeasurementsSet = async function (id) {
  const response = await api.delete(`/curated-sets/${id}/jwt`, this.auth)

  return response && response.status === 204 ? true : false
}

/*
 * Get pattern
 */
Backend.prototype.getPattern = async function (id) {
  return responseHandler(await api.get(`/patterns/${id}/jwt`, this.auth))
}

/*
 * Get patterns
 */
Backend.prototype.getPatterns = async function () {
  return responseHandler(await api.get(`/patterns/jwt`, this.auth))
}

/*
 * Create pattern
 */
Backend.prototype.createPattern = async function (data) {
  return responseHandler(await api.post(`/patterns/jwt`, data, this.auth), 201)
}

/*
 * Remove pattern
 */
Backend.prototype.removePattern = async function (id) {
  const response = await api.delete(`/patterns/${id}/jwt`, this.auth)

  return response && response.status === 204 ? true : false
}

/*
 * Generic update pattern set method
 */
Backend.prototype.updatePattern = async function (id, data) {
  return responseHandler(await api.patch(`/patterns/${id}/jwt`, data, this.auth))
}

/*
 * Create GitHub issue
 */
Backend.prototype.createIssue = async function (data) {
  return responseHandler(await api.post(`/issues`, data), 201)
}

export function useBackend(token = false) {
  /*
   * This backend object is what we'll end up returning
   */
  const backend = useMemo(() => {
    /*
     * Set up authentication headers
     */
    const auth = token ? { headers: { Authorization: 'Bearer ' + token } } : {}

    return new Backend(auth)
  }, [token])

  return backend
}
