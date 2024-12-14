import { useMemo } from 'react'
import { backend } from '@freesewing/react/config/freesewing'
import { RestClient } from '@freesewing/react/lib/RestClient'
import { useAccount } from '@freesewing/react/hooks/useAccount'

/**
 * The useBackend hook
 *
 * This hook provides access to the FreeSewing backend
 */
export function useBackend() {
  /*
   * Load the token via the useAccount hook
   */
  const { token } = useAccount()

  /*
   * Memoize this call for efficiency
   */
  const backend = useMemo(() => new Backend(token), [token])

  /*
   * This backend object rovides the following methods:
   *
   *  - backend.adminSearchUsers
   *  - backend.adminLoadUser
   *  - backend.adminUpdateUser
   *  - backend.adminImpersonateUser
   *  - backend.adminLoadSubscribers
   *  - backend.adminPing
   *  - backend.acceptCset
   *  - backend.confirmMfa
   *  - backend.confirmSignup
   *  - backend.createApikey
   *  - backend.createBookmark
   *  - backend.createSocialImage
   *  - backend.createDiscussion
   *  - backend.createIssue
   *  - backend.createPattern
   *  - backend.createPostPr
   *  - backend.createSet
   *  - backend.disableMfa
   *  - backend.enableMfa
   *  - backend.exportAccount
   *  - backend.getApikey
   *  - backend.getApikeys
   *  - backend.getBookmark
   *  - backend.getBookmarks
   *  - backend.getConfirmation
   *  - backend.getCuratedSet
   *  - backend.getCuratedSets
   *  - backend.getPattern
   *  - backend.getPatterns
   *  - backend.getPublicPattern
   *  - backend.getPublicSet
   *  - backend.getSet
   *  - backend.getSets
   *  - backend.getStats
   *  - backend.getSuggestedPacks
   *  - backend.getSuggestedSets
   *  - backend.getUserCount
   *  - backend.getUserData
   *  - backend.getUserProfile
   *  - backend.isPostSlugAvailable
   *  - backend.isUsernameAvailable
   *  - backend.newsletterConfirmSubscribe
   *  - backend.newsletterSubscribe
   *  - backend.newsletterUnsubscribe
   *  - backend.oauthInit
   *  - backend.oauthSignIn
   *  - backend.ping
   *  - backend.reloadAccount
   *  - backend.removeAccount
   *  - backend.removeApikey
   *  - backend.removeBookmark
   *  - backend.removeCuratedSet
   *  - backend.removeImage
   *  - backend.removePattern
   *  - backend.removeSet
   *  - backend.removeSuggestedSet
   *  - backend.restrictAccount
   *  - backend.signIn
   *  - backend.signInFromLink
   *  - backend.signUp
   *  - backend.suggestCset
   *  - backend.suggestOpack
   *  - backend.updateAccount
   *  - backend.updateCuratedSet
   *  - backend.updateConsent
   *  - backend.updatePattern
   *  - backend.updateSet
   *  - backend.uploadImage
   *  - backend.uploadImageAnon
   */
  return backend
}

/**
 * This helper function creates the authentication headers
 *
 * @param {string} token - The JSON Web Token to authenticate to the backend
 * @return {object} headers - An object holding headers for the REST API call
 */
function authenticationHeaders(token) {
  return token ? { Authorization: 'Bearer ' + token } : {}
}

/**
 * This creates a backend instance and stores the authentication data
 *
 * @param {string} token - The JWT token to use for authentication to the backend
 */
function Backend(token) {
  this.token = token
  this.headers = authenticationHeaders(token)
  this.restClient = new RestClient(backend, this.headers)
  this.get = this.restClient.get
  this.put = this.restClient.put
  this.post = this.restClient.post
}

/**
 * Admin: Search user
 *
 * @param {string} q - The search query
 * @return {array} result - The REST response, a [status, data] array
 */
Backend.prototype.adminSearchUsers = async function (q) {
  return await this.post('/admin/search/users/jwt', { q })
}

/*
 * Admin: Load user
 *
 * @param {number} id - The user ID to load
 * @return {array} result - The REST response, a [status, data] array
 */
Backend.prototype.adminLoadUser = async function (id) {
  return await this.get(`/admin/user/${id}/jwt`)
}

/**
 * Admin: Update user
 *
 * @param {object} data
 * @param {number} data.id - The user ID to update
 * @param {object} data.data - The data for the API request
 * @return {array} result - The REST response, a [status, data] array
 */
Backend.prototype.adminUpdateUser = async function ({ id, data }) {
  return await this.patch(`/admin/user/${id}/jwt`, data)
}

/**
 * Admin: Impersonate user
 *
 * @param {number} id - The user ID to impersonate
 * @return {array} result - The REST response, a [status, data] array
 */
Backend.prototype.adminImpersonateUser = async function (id) {
  return await this.get(`/admin/impersonate/${id}/jwt`)
}

/*
 * Load newsletter subscribers (admin method)
 */
Backend.prototype.adminLoadSubscribers = async function () {
  return await this.get(`/admin/subscribers/jwt`)
}

/*
 * Verify an admin account while impersonating another user
 */
Backend.prototype.adminPing = async function (token) {
  return await this.get(`/whoami/jwt`, { Authorization: `Bearer: ${token}` })
}
/*
 * Create a curated set from a suggested measurements set
 */
Backend.prototype.acceptCset = async function (id) {
  return await this.post(`/curated-sets/from/${id}/jwt`)
}

/*
 * Confirm MFA
 *
 * @param {object} data for the API call
 * @return {array} result - The REST response, a [status, data] array
 */
Backend.prototype.confirmMfa = async function (data) {
  return await this.post(`/account/mfa/jwt`, { ...data, mfa: true })
}

/*
 * Confirm a signup
 *
 * @param {object} data
 * @param {string} data.id - The confirmation ID
 * @param {string} data.consent - The consent data
 * @return {array} result - The REST response, a [status, data] array
 */
Backend.prototype.confirmSignup = async function ({ id, consent }) {
  return await this.post(`/confirm/signup/${id}`, { consent })
}

/**
 * Create API key
 *
 * @param {object} data - The data for the API call
 * @return {array} result - The REST response, a [status, data] array
 */
Backend.prototype.createApikey = async function (data) {
  return await this.post(`/apikeys/jwt`, data)
}

/**
 * Create bookmark
 *
 * @param {object} data - Data for the API call
 * @return {array} result - The REST response, a [status, data] array
 */
Backend.prototype.createBookmark = async function (data) {
  return await this.post(`/bookmarks/jwt`, data)
}

/**
 * Generate a social media image
 *
 * @param {object} data - Data for the API call
 * @return {array} result - The REST response, a [status, data] array
 */
Backend.prototype.createSocialImage = async function (data) {
  return await this.post('/img', data)
}

/**
 * Create GitHub discussion
 *
 * @param {object} data - Data for the API call
 * @return {array} result - The REST response, a [status, data] array
 */
Backend.prototype.createDiscussion = async function (data) {
  return await this.post(`/discussions`, data)
}

/**
 * Create GitHub issue
 *
 * @param {object} data - Data for the API call
 * @return {array} result - The REST response, a [status, data] array
 */
Backend.prototype.createIssue = async function (data) {
  return await this.post(`/issues`, data)
}

/**
 * Create pattern
 *
 * @param {object} data - Data for the API call
 * @return {array} result - The REST response, a [status, data] array
 */
Backend.prototype.createPattern = async function (data) {
  return await this.post(`/patterns/jwt`, data)
}

/**
 * Create a pull request for a showcase or blog post
 *
 * @param {object} data - Data for the API call
 * @return {array} result - The REST response, a [status, data] array
 */
Backend.prototype.createPostPr = async function (type, data) {
  return await this.post(`/flows/pr/${type}/jwt`, data)
}

/**
 * Create measurements set
 *
 * @param {object} data - Data for the API call
 * @return {array} result - The REST response, a [status, data] array
 */
Backend.prototype.createSet = async function (data) {
  return await this.post(`/sets/jwt`, data)
}

/**
 * Disable MFA for the current user
 *
 * @param {object} data for the API call
 * @return {array} result - The REST response, a [status, data] array
 */
Backend.prototype.disableMfa = async function (data) {
  return await this.post(`/account/mfa/jwt`, { ...data, mfa: false })
}

/**
 * Enable MFA for the current user
 *
 * @return {array} result - The REST response, a [status, data] array
 */
Backend.prototype.enableMfa = async function () {
  return await this.post(`/account/mfa/jwt`, { mfa: true })
}

/**
 * Export account data for the current user
 *
 * @return {array} result - The REST response, a [status, data] array
 */
Backend.prototype.exportAccount = async function () {
  return await this.get(`/account/export/jwt`)
}

/**
 * Get API key
 *
 * @param {string} id - The API Key ID
 * @return {array} result - The REST response, a [status, data] array
 */
Backend.prototype.getApikey = async function (id) {
  return await this.get(`/apikeys/${id}/jwt`)
}

/**
 * Get API keys for the current user
 */
Backend.prototype.getApikeys = async function () {
  return await this.get(`/apikeys/jwt`)
}

/**
 * Get bookmark
 *
 * @param {string} id - The bookmark ID
 * @return {array} result - The REST response, a [status, data] array
 */
Backend.prototype.getBookmark = async function (id) {
  return await this.get(`/bookmarks/${id}/jwt`)
}

/**
 * Get bookmarks (for the current user)
 */
Backend.prototype.getBookmarks = async function () {
  return await this.get(`/bookmarks/jwt`)
}

/**
 * Get data for a confirmation
 *
 * @param {object} data
 * @param {string} data.id - The confirmation ID
 * @param {string} data.check - The confirmation check value
 * @return {array} result - The REST response, a [status, data] array
 */
Backend.prototype.getConfirmation = async function ({ id, check }) {
  return await this.get(`/confirmations/${id}/${check}`)
}

/**
 * Get curated measurements set
 *
 * @param {number} id - The curated measurements set ID
 * @return {array} result - The REST response, a [status, data] array
 */
Backend.prototype.getCuratedSet = async function (id) {
  return await this.get(`/curated-sets/${id}`)
}

/**
 * Get curated measurements sets
 *
 * @return {array} result - The REST response, a [status, data] array
 */
Backend.prototype.getCuratedSets = async function () {
  return await this.get(`/curated-sets`)
}

/**
 * Get pattern
 *
 * @param {number} id - The pattern ID
 * @return {array} result - The REST response, a [status, data] array
 */
Backend.prototype.getPattern = async function (id) {
  return await this.get(`/patterns/${id}/jwt`)
}

/**
 * Get patterns for the current user
 *
 * @return {array} result - The REST response, a [status, data] array
 */
Backend.prototype.getPatterns = async function () {
  return await this.get(`/patterns/jwt`)
}

/**
 * Get public pattern
 *
 * @param {number} id - The pattern ID
 * @return {array} result - The REST response, a [status, data] array
 */
Backend.prototype.getPublicPattern = async function (id) {
  return await this.get(`/patterns/${id}.json`)
}

/**
 * Get public measurements set
 *
 * @param {number} id - The public measurements set ID
 * @return {array} result - The REST response, a [status, data] array
 */
Backend.prototype.getPublicSet = async function (id) {
  return await this.get(`/sets/${id}.json`)
}

/**
 * Get measurements set
 *
 * @param {number} id - The measurements set ID
 * @return {array} result - The REST response, a [status, data] array
 */
Backend.prototype.getSet = async function (id) {
  return await this.get(`/sets/${id}/jwt`)
}

/*
 * Get measurements sets for the current user
 *
 * @return {array} result - The REST response, a [status, data] array
 */
Backend.prototype.getSets = async function () {
  return await this.get(`/sets/jwt`)
}

/*
 * Get stats (info about how many users, patterns, and so on)
 *
 * @return {array} result - The REST response, a [status, data] array
 */
Backend.prototype.getStats = async function () {
  return await this.get(`/info/stats`)
}

/*
 * Get option packs suggested for curation
 *
 * @return {array} result - The REST response, a [status, data] array
 */
Backend.prototype.getSuggestedPacks = async function () {
  return await this.get(`/suggested-packs/jwt`)
}

/**
 * Get measurements sets suggested for curation
 *
 * @return {array} result - The REST response, a [status, data] array
 */
Backend.prototype.getSuggestedSets = async function () {
  return await this.get(`/suggested-sets/jwt`)
}

/**
 * Get user count (how many users FreeSewing has)
 *
 * @return {array} result - The REST response, a [status, data] array
 */
Backend.prototype.getUserCount = async function () {
  return await this.get(`/info/users`)
}

/**
 * Get user data
 *
 * @param {number} uid - The user ID
 * @return {array} result - The REST response, a [status, data] array
 */
Backend.prototype.getUserData = async function (uid) {
  return await this.get(`/users/${uid}/jwt`)
}

/**
 * Get user profile
 *
 * @param {number} uid - The user ID
 * @return {array} result - The REST response, a [status, data] array
 */
Backend.prototype.getUserProfile = async function (uid) {
  return await this.get(`/users/${uid}`)
}

/*
 * Check whether a slug for a blog or showcase post is available
 *
 * @param {object} data
 * @param {string} data.slug - The slug to check
 * @param {string} data.type - One of 'blog' or 'showcase'
 * @return {array} result - The REST response, a [status, data] array
 */
Backend.prototype.isPostSlugAvailable = async function ({ slug, type }) {
  const response = await this.get(`/slugs/${type}/${slug}/jwt`, this.auth)

  // 404 means username is available, which is success in this case
  return response[0] === 404
    ? { success: true, data: false, available: true, response }
    : { success: false, available: false, response }
}

/**
 * Checks whether a username is available
 *
 * @param {string} username - The username to check
 * @return {array} result - The REST response, a [status, data] array
 */
Backend.prototype.isUsernameAvailable = async function (username) {
  const response = await this.post(`/available/username/jwt`, { username })

  /*
   * Status 404 means username is available, which is success in this case
   */
  return response[0] === 404
    ? { success: true, data: false, available: true, response }
    : { success: false, available: false, response }
}

/**
/*
 * Confirm newsletter subscribe
 *
 * @param {object} data
 * @param {string} data.id - The confirmation ID
 * @param {string} data.ehash - The ehash value
 * @return {array} result - The REST response, a [status, data] array
 */
Backend.prototype.newsletterConfirmSubscribe = async function ({ id, ehash }) {
  return await this.put('/subscriber', { id, ehash })
}

/**
 * Subscribe to newsletter
 *
 * @param {string} email - The email to subscribe
 * @return {array} result - The REST response, a [status, data] array
 */
Backend.prototype.newsletterSubscribe = async function (email) {
  return await this.post('/subscriber', { email, language: 'en' })
}

/*
 * Newsletter unsubscribe
 *
 * @param {string} ehash - The ehash to unsubscribe
 * @return {array} result - The REST response, a [status, data] array
 */
Backend.prototype.newsletterUnsubscribe = async function (ehash) {
  return await this.delete(`/subscriber/${ehash}`)
}

/*
 * Init Oauth flow for oauth provider
 *
 * @param {object} data
 * @param {string} data.provider - ID of the OAuth provider
 * @return {array} result - The REST response, a [status, data] array
 */
Backend.prototype.oauthInit = async function (provider) {
  return await this.post('/signin/oauth/init', { provider })
}

/*
 * User sign in via oauth provider
 *
 * @param {object} data
 * @param {string} data.state - The Oath state
 * @param {code} data.code - The OAuth code
 * @param {string} data.provider - ID of the OAuth provider
 * @return {array} result - The REST response, a [status, data] array
 */
Backend.prototype.oauthSignIn = async function ({ state, code, provider }) {
  return await this.post('/signin/oauth', { state, code, provider })
}

/**
 * Ping backend to see if current token is still valid
 *
 * @return {array} result - The REST response, a [status, data] array
 */
Backend.prototype.ping = async function () {
  return await this.get(`/whoami/jwt`)
}

/**
 * Reload account - Useful for when local state gets out of sync
 *
 * @return {array} result - The REST response, a [status, data] array
 */
Backend.prototype.reloadAccount = async function () {
  return await this.get(`/whoami/jwt`)
}

/**
 * Remove account (the current logged in user)
 *
 * @return {array} result - The REST response, a [status, data] array
 */
Backend.prototype.removeAccount = async function () {
  return await this.delete(`/account/jwt`)
}

/**
 * Remove API key
 *
 * @return {array} result - The REST response, a [status, data] array
 */
Backend.prototype.removeApikey = async function (id) {
  return await this.delete(`/apikeys/${id}/jwt`, this.auth)
}

/*
 * Remove bookmark
 *
 * @param {string} id - The bookmark ID
 * @return {array} result - The REST response, a [status, data] array
 */
Backend.prototype.removeBookmark = async function (id) {
  return await this.delete(`/bookmarks/${id}/jwt`)
}

/**
 * Remove curated measurements set
 *
 * @return {array} result - The REST response, a [status, data] array
 */
Backend.prototype.removeCuratedSet = async function (id) {
  return await this.delete(`/curated-sets/${id}/jwt`)
}

/**
 * Remove an uploaded image
 *
 * @param {string} id - The image ID
 * @return {array} result - The REST response, a [status, data] array
 */
Backend.prototype.removeImage = async function (id) {
  return await this.delete(`/images/${id}/jwt`)
}

/**
 * Remove pattern
 *
 * @return {array} result - The REST response, a [status, data] array
 */
Backend.prototype.removePattern = async function (id) {
  return await this.delete(`/patterns/${id}/jwt`, this.auth)
}

/**
 * Remove measurements set
 *
 * @param {string} id - The measurements set ID
 * @return {array} result - The REST response, a [status, data] array
 */
Backend.prototype.removeSet = async function (id) {
  return await this.delete(`/sets/${id}/jwt`)
}

/*
 * Remove suggested measurements set
 */
Backend.prototype.removeSuggestedSet = async function (id) {
  return await this.delete(`/suggested-sets/${id}/jwt`)
}

/**
 * Restrict processing of account data
 *
 * @return {array} result - The REST response, a [status, data] array
 */
Backend.prototype.restrictAccount = async function () {
  return await this.get(`/account/restrict/jwt`)
}

/**
 * User signin/login
 *
 * @param {object} data
 * @param {string} data.username - The account username
 * @param {string} data.password - The account password
 * @param {string} data.token - The (optional) MFA token
 * @return {array} result - The REST response, a [status, data] array
 */
Backend.prototype.signIn = async function ({ username, password = false, token = false }) {
  return password === false
    ? await this.post('/signinlink', { username })
    : await this.post('/signin', { username, password, token })
}

/**
 * Trade in sign-in link id & check for JWT token
 *
 * @param {object} data
 * @param {string} data.id - The confirmation ID
 * @param {string} data.check - The confirmation check value
 * @return {array} result - The REST response, a [status, data] array
 */
Backend.prototype.signInFromLink = async function ({ id, check }) {
  return await this.post(`/signinlink/${id}/${check}`)
}

/**
 * User signup
 *
 * @param {object} data
 * @param {string} data.email - The Email address to sign up
 * @return {array} result - The REST response, a [status, data] array
 */
Backend.prototype.signUp = async function ({ email }) {
  return await this.post('/signup', { email })
}

/*
 * Suggest a measurements set for curation
 *
 * @param {object} data - Data for the API call
 * @return {array} result - The REST response, a [status, data] array
 */
Backend.prototype.suggestCset = async function (data) {
  return await this.post(`/curated-sets/suggest/jwt`, data)
}

/*
 * Suggest an option pack for curation
 *
 * @param {object} data - Data for the API call
 * @return {array} result - The REST response, a [status, data] array
 */
Backend.prototype.suggestOpack = async function (data) {
  return await this.post(`/option-packs/suggest/jwt`, data)
}

/**
 * Generic update account method
 *
 * @param {object} data - Data for the API call
 * @return {array} result - The REST response, a [status, data] array
 */
Backend.prototype.updateAccount = async function (data) {
  return await this.patch(`/account/jwt`, data)
}

/**
 * Generic update curated measurements set method
 *
 * @param {object} consent
 * @return {array} result - The REST response, a [status, data] array
 */
Backend.prototype.updateCuratedSet = async function (id, data) {
  return await this.patch(`/curated-sets/${id}/jwt`, data)
}

/**
 * Update consent (uses the jwt-guest middleware)
 *
 * @param {object} consent
 * @return {array} result - The REST response, a [status, data] array
 */
Backend.prototype.updateConsent = async function (consent) {
  return await this.patch(`/consent/jwt`, { consent })
}

/**
 * Generic update pattern set method
 *
 * @param {object} data - Data for the API call
 * @return {array} result - The REST response, a [status, data] array
 */
Backend.prototype.updatePattern = async function (id, data) {
  return await this.patch(`/patterns/${id}/jwt`, data)
}

/**
 * Generic update measurements set method
 *
 * @param {object} data - Data for the API call
 * @return {array} result - The REST response, a [status, data] array
 */
Backend.prototype.updateSet = async function (id, data) {
  return await this.patch(`/sets/${id}/jwt`, data)
}

/**
 * Upload an image
 *
 * @param {object} data - Data for the API call
 * @return {array} result - The REST response, a [status, data] array
 */
Backend.prototype.uploadImage = async function (data) {
  return await this.post('/images/jwt', data)
}

/**
 * Upload an image anonymously
 *
 * @param {object} data - Data for the API call
 * @return {array} result - The REST response, a [status, data] array
 */
Backend.prototype.uploadImageAnon = async function (data) {
  return await this.post('/images', data)
}
