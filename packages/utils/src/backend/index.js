import axios from 'axios'

function useBackend(baseURL, timeout = 10000) {
  // Configure Axios
  const api = axios.create({ baseURL, timeout })

  // Helper method for Authorization header
  const auth = token => ({
    headers: { Authorization: 'Bearer ' + token }
  })

  const backend = {}

  // Oauth
  backend.initOauth = data => api.post('/oauth/init', data) // Init Oauth (to get state)
  backend.providerLogin = data => api.post('/oauth/login', data) // Finalize Oauth login

  // Signup flow
  backend.signup = (email, password, language) => api.post('/signup', { email, password, language }) // Signup
  backend.confirm = confirmId => api.post('/account', { id: confirmId }) // Confirm
  backend.createAccount = (confirmId, consent) => api.post('/account', { id: confirmId, consent }) // Create account

  // Other non-authenticated calls
  backend.login = (username, password) => api.post('/login', { username, password }) // Login
  backend.confirmationLogin = id => api.post('/confirm/login', { id }) // Confirmation-based login
  backend.recoverAccount = username => api.post('/account/recover', { username: username }) // Ask for a password reset
  backend.loadGist = handle => api.get('/gist/' + handle) // Load recipe/gist anonymously
  backend.loadPatrons = handle => api.get('/patrons') // Load patron list

  // Users
  backend.profile = (username, token) => api.get('/users/' + username, auth(token)) // Load user profile
  backend.account = token => api.get('/account', auth(token)) // Try to authenticate based on stored token
  backend.export = token => api.get('/account/export', auth(token)) // Export data
  backend.restrict = token => api.get('/account/restrict', auth(token)) // Restrict data processing (freeze account)
  backend.remove = token => api.delete('/account', auth(token)) // Remove account
  backend.saveAccount = (data, token) => api.put('/account', data, auth(token)) // Update account
  backend.availableUsername = (data, token) => api.post('/available/username', data, auth(token)) // Check is a username is available
  backend.setPassword = (data, token) => api.post('/set/password', data, auth(token)) // (re)set a new password

  // Models
  backend.createModel = (data, token) => api.post('/models', data, auth(token)) // Create model
  backend.saveModel = (handle, data, token) => api.put('/models/' + handle, data, auth(token)) // Update model
  backend.removeModel = (handle, token) => api.delete('/models/' + handle, auth(token)) // Remove model
  //backend.removeModels = (data, token) => api.post('/remove/models', data, auth(token)) // Delete multiple models

  // Recipes
  backend.loadRecipe = (handle, token) => api.get('/recipes/' + handle, auth(token)) // Load recipe
  backend.createRecipe = (data, token) => api.post('/recipes', data, auth(token)) // Create recipe
  backend.removeRecipe = (handle, token) => api.delete('/recipes/' + handle, auth(token)) // Remove recipe
  backend.saveRecipe = (handle, data, token) => api.put('/recipes/' + handle, data, auth(token)) // Update recipe

  return backend
}

export default useBackend
