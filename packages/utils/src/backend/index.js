import axios from 'axios'

function useBackend(baseURL, timeout = 10000) {
  // Configure Axios
  const api = axios.create({ baseURL, timeout })

  // Helper method for Authorization header
  const auth = (token) => ({
    headers: { Authorization: 'Bearer ' + token }
  })

  const backend = {}

  // Oauth
  backend.initOauth = (data) => api.post('/oauth/init', data) // Init Oauth (to get state)
  backend.providerLogin = (data) => api.post('/oauth/login', data) // Finalize Oauth login

  // Signup flow
  backend.signup = (email, password, language) => api.post('/signup', { email, password, language }) // Signup
  backend.confirm = (confirmId) => api.post('/account', { id: confirmId }) // Confirm
  backend.createAccount = (confirmId, consent) => api.post('/account', { id: confirmId, consent }) // Create account
  backend.resendActivationEmail = (email, language) => api.post('/resend', { email, language }) // Re-send activation email

  // Other non-authenticated calls
  backend.login = (username, password) => api.post('/login', { username, password }) // Login
  backend.confirmationLogin = (id) => api.post('/confirm/login', { id }) // Confirmation-based login
  backend.recoverAccount = (username) => api.post('/account/recover', { username: username }) // Ask for a password reset
  backend.loadPattern = (handle) => api.get('/pattern/' + handle) // Load pattern anonymously
  backend.loadPatrons = (handle) => api.get('/patrons') // Load patron list
  backend.newsletterSubscribe = (email) => api.post('/newsletter/subscribe', { email }) // Subscribe email to newsletter
  backend.newsletterUnsubscribe = (email) => api.post('/newsletter/unsubscribe', { email }) // Unsubscribe email from newsletter
  // Users
  backend.profile = (username, token) => api.get('/users/' + username, auth(token)) // Load user profile
  backend.account = (token) => api.get('/account', auth(token)) // Try to authenticate based on stored token
  backend.export = (token) => api.get('/account/export', auth(token)) // Export data
  backend.restrict = (token) => api.get('/account/restrict', auth(token)) // Restrict data processing (freeze account)
  backend.remove = (token) => api.delete('/account', auth(token)) // Remove account
  backend.saveAccount = (data, token) => api.put('/account', data, auth(token)) // Update account
  backend.availableUsername = (data, token) => api.post('/available/username', data, auth(token)) // Check is a username is available
  backend.setPassword = (data, token) => api.post('/set/password', data, auth(token)) // (re)set a new password

  // People
  backend.createPerson = (data, token) => api.post('/people', data, auth(token)) // Create person
  backend.savePerson = (handle, data, token) => api.put('/people/' + handle, data, auth(token)) // Update person
  backend.removePerson = (handle, token) => api.delete('/people/' + handle, auth(token)) // Remove person

  // Patterns
  backend.loadPattern = (handle, token) => api.get('/patterns/' + handle, auth(token)) // Load pattern
  backend.createPattern = (data, token) => api.post('/patterns', data, auth(token)) // Create pattern
  backend.removePattern = (handle, token) => api.delete('/patterns/' + handle, auth(token)) // Remove pattern
  backend.savePattern = (handle, data, token) => api.put('/patterns/' + handle, data, auth(token)) // Update pattern

  // Github
  backend.createGist = (data) => api.post('/github/gist', data) // Export pattern as Github gist
  backend.createIssue = (data) => api.post('/github/issue', data) // Create Github issue

  // Admin
  backend.adminSearch = (query, token) => api.post('/admin/search', { query }, auth(token)) // Search users as admin
  backend.adminSetPatronStatus = (data, token) => api.put('/admin/patron', data, auth(token)) // Set patron status for a user
  backend.adminSetRole = (data, token) => api.put('/admin/role', data, auth(token)) // Set role for a user
  backend.adminUnfreeze = (data, token) => api.put('/admin/unfreeze', data, auth(token)) // Unfreeze a user account
  backend.adminImpersonate = (data, token) => api.post('/admin/impersonate', data, auth(token)) // Impersonate a user
  backend.adminPatronList = (token) => api.get('/admin/patrons', auth(token)) // Get patron list
  backend.adminSubscriberList = (token) => api.get('/admin/subscribers', auth(token)) // Get patron list
  backend.adminStats = (token) => api.get('/admin/stats', auth(token)) // Get stats

  return backend
}

export default useBackend
