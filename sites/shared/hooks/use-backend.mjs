//  __SDEFILE__ - This file is a dependency for the stand-alone environment
import axios from 'axios'
import { freeSewingConfig } from 'shared/config/freesewing.config.mjs'
import { useAccount } from 'shared/hooks/use-account.mjs'
import { useMemo } from 'react'

/*
 * Helper methods to interact with the FreeSewing backend
 */
const apiHandler = axios.create({
  baseURL: freeSewingConfig.backend,
  timeout: 6660,
})

const auth = (token) =>
  token ? { headers: { Authorization: 'Bearer ' + token } } : { headers: {} }

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
  put: async (uri, data = null, config = {}) => {
    let result
    try {
      result = await apiHandler.put(uri, data, config)
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

  // Unpack axios errors
  if (response?.name === 'AxiosError')
    return {
      success: false,
      status: response.response?.status,
      data: response.response?.data,
      error: response.message,
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
 * backend.oauthInit: Init Oauth flow for oauth provider
 */
Backend.prototype.oauthInit = async function ({ provider, language }) {
  return responseHandler(await api.post('/signin/oauth/init', { provider, language }))
}

/*
 * backend.oauthSignIn: User sign in via oauth provider
 */
Backend.prototype.oauthSignIn = async function ({ state, code, provider }) {
  return responseHandler(await api.post('/signin/oauth', { state, code, provider }))
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
 * Update consent (uses the jwt-guest middleware)
 */
Backend.prototype.updateConsent = async function (consent) {
  return responseHandler(await api.patch(`/consent/jwt`, { consent }, this.auth))
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
  return responseHandler(await api.post(`/account/mfa/jwt`, { ...data, mfa: false }, this.auth))
}

/*
 * Reload account
 */
Backend.prototype.reloadAccount = async function () {
  return responseHandler(await api.get(`/whoami/jwt`, this.auth))
}

/*
 * Export account data
 */
Backend.prototype.exportAccount = async function () {
  return responseHandler(await api.get(`/account/export/jwt`, this.auth))
}

/*
 * Restrict processing of account data
 */
Backend.prototype.restrictAccount = async function () {
  return responseHandler(await api.get(`/account/restrict/jwt`, this.auth))
}

/*
 * Remove account
 */
Backend.prototype.restrictAccount = async function () {
  return responseHandler(await api.delete(`/account/jwt`, this.auth))
}

/*
 * Load all user data
 */
Backend.prototype.getUserData = async function (uid) {
  return responseHandler(await api.get(`/users/${uid}/jwt`, this.auth))
}

/*
 * Load user profile
 */
Backend.prototype.getProfile = async function (uid) {
  return responseHandler(await api.get(`/users/${uid}`))
}

/*
 * Load user count
 */
Backend.prototype.getUserCount = async function () {
  return responseHandler(await api.get(`/info/users`))
}

/*
 * Load stats
 */
Backend.prototype.getStats = async function () {
  return responseHandler(await api.get(`/info/stats`))
}

/*
 * Create bookmark
 */
Backend.prototype.createBookmark = async function (data) {
  return responseHandler(await api.post(`/bookmarks/jwt`, data, this.auth), 201)
}

/*
 * Get bookmark
 */
Backend.prototype.getBookmark = async function (id) {
  return responseHandler(await api.get(`/bookmarks/${id}/jwt`, this.auth))
}
/*
 * Get bookmarks
 */
Backend.prototype.getBookmarks = async function () {
  return responseHandler(await api.get(`/bookmarks/jwt`, this.auth))
}

/*
 * Remove bookmark
 */
Backend.prototype.removeBookmark = async function (id) {
  const response = await api.delete(`/bookmarks/${id}/jwt`, this.auth)

  return response && response.status === 204 ? true : false
}

/*
 * Create API key
 */
Backend.prototype.createApikey = async function (data) {
  return responseHandler(await api.post(`/apikeys/jwt`, data, this.auth), 201)
}

/*
 * Get API key
 */
Backend.prototype.getApikey = async function (id) {
  return responseHandler(await api.get(`/apikeys/${id}/jwt`, this.auth))
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
 * Get public measurements set
 */
Backend.prototype.getPublicSet = async function (id) {
  return responseHandler(await api.get(`/sets/${id}.json`))
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
 * Get measurements sets suggested for curation
 */
Backend.prototype.getSuggestedSets = async function () {
  return responseHandler(await api.get(`/suggested-sets/jwt`, this.auth))
}

/*
 * Get option packs suggested for curation
 */
Backend.prototype.getSuggestedPacks = async function () {
  return responseHandler(await api.get(`/suggested-packs/jwt`, this.auth))
}

/*
 * Remove suggested measurements set
 */
Backend.prototype.removeSuggestedMeasurementsSet = async function (id) {
  const response = await api.delete(`/suggested-sets/${id}/jwt`, this.auth)

  return response && response.status === 204 ? true : false
}

/*
 * Get curated measurements set
 */
Backend.prototype.getCuratedSet = async function (id) {
  return responseHandler(await api.get(`/curated-sets/${id}`))
}

/*
 * Generic update curated measurements set method
 */
Backend.prototype.updateCuratedSet = async function (id, data) {
  return responseHandler(await api.patch(`/curated-sets/${id}/jwt`, data, this.auth))
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
 * Get public pattern
 */
Backend.prototype.getPublicPattern = async function (id) {
  return responseHandler(await api.get(`/patterns/${id}.json`))
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

/*
 * Create GitHub discussion
 */
Backend.prototype.createDiscussion = async function (data) {
  return responseHandler(await api.post(`/discussions`, data), 201)
}

/*
 * Check whether a slug is available
 */
Backend.prototype.isSlugAvailable = async function ({ slug, type }) {
  const response = await api.get(`/slugs/${type}/${slug}/jwt`, this.auth)

  // 404 means username is available, which is success in this case
  return response.status === 200
    ? { success: false, available: false, response }
    : { success: true, data: false, available: true, response }
}

/*
 * Create showcase/blog post (pull request)
 */
Backend.prototype.createPost = async function (type, data) {
  return responseHandler(await api.post(`/flows/pr/${type}/jwt`, data, this.auth), 201)
}

/*
 * Send translation invite
 */
Backend.prototype.sendTranslatorInvite = async function (language) {
  return responseHandler(await api.post(`/flows/translator-invite/jwt`, { language }, this.auth))
}

/*
 * Send language suggestion
 */
Backend.prototype.sendLanguageSuggestion = async function (data) {
  return responseHandler(await api.post(`/flows/language-suggestion/jwt`, data, this.auth))
}

/*
 * Subscribe to newsletter
 */
Backend.prototype.newsletterSubscribe = async function ({ email, language }) {
  return responseHandler(await api.post('/subscriber', { email, language }))
}

/*
 * Confirm newsletter subscribe
 */
Backend.prototype.confirmNewsletterSubscribe = async function ({ id, ehash }) {
  return responseHandler(await api.put('/subscriber', { id, ehash }))
}

/*
 * Newsletter unsubscribe
 */
Backend.prototype.newsletterUnsubscribe = async function (ehash) {
  return responseHandler(await api.delete(`/subscriber/${ehash}`))
}

/*
 * Upload an image
 */
Backend.prototype.uploadImage = async function (body) {
  return responseHandler(await api.post('/images/jwt', body, this.auth))
}

/*
 * Upload an image anonymously
 */
Backend.prototype.uploadAnonImage = async function (body) {
  return responseHandler(await api.post('/images', body))
}

/*
 * Remove an (uploaded) image
 */
Backend.prototype.removeImage = async function (id) {
  return responseHandler(await api.delete(`/images/${id}/jwt`, this.auth))
}

/*
 * Suggest a measurements set for curation
 */
Backend.prototype.suggestCset = async function (data) {
  return responseHandler(await api.post(`/curated-sets/suggest/jwt`, data, this.auth))
}

/*
 * Suggest an option pack
 */
Backend.prototype.suggestOpack = async function (data) {
  return responseHandler(await api.post(`/option-packs/suggest/jwt`, data, this.auth))
}

/*
 * Create a curated set from a suggested set
 */
Backend.prototype.csetFromSuggestedSet = async function (id) {
  return responseHandler(await api.post(`/curated-sets/from/${id}/jwt`, {}, this.auth))
}

/*
 * Ping backend to see if current token is still valid
 */
Backend.prototype.ping = async function () {
  return responseHandler(await api.get(`/whoami/jwt`, this.auth))
}

/*
 * Search user (admin method)
 */
Backend.prototype.adminSearchUsers = async function (q) {
  return responseHandler(await api.post('/admin/search/users/jwt', { q }, this.auth))
}

/*
 * Load user (admin method)
 */
Backend.prototype.adminLoadUser = async function (id) {
  return responseHandler(await api.get(`/admin/user/${id}/jwt`, this.auth))
}

/*
 * Update user (admin method)
 */
Backend.prototype.adminUpdateUser = async function ({ id, data }) {
  return responseHandler(await api.patch(`/admin/user/${id}/jwt`, data, this.auth))
}

/*
 * Impersonate user (admin method)
 */
Backend.prototype.adminImpersonateUser = async function (id) {
  return responseHandler(await api.get(`/admin/impersonate/${id}/jwt`, this.auth))
}

/*
 * Load newsletter subscribers (admin method)
 */
Backend.prototype.adminLoadSubscribers = async function () {
  console.log(this.auth)
  return responseHandler(await api.get(`/admin/subscribers/jwt`, this.auth))
}

/*
 * Verify an admin account while impersonating another user
 */
Backend.prototype.adminPing = async function (token) {
  return responseHandler(await api.get(`/whoami/jwt`, auth(token)))
}

/*
 * backend.img: Generate a social media image
 */
Backend.prototype.img = async function (data) {
  return responseHandler(await api.post('/img', data, { responseType: 'arraybuffer' }))
}

export function useBackend() {
  const { token } = useAccount()

  /*
   * This backend object is what we'll end up returning
   */
  const backend = useMemo(() => new Backend(auth(token)), [token])

  return backend
}
