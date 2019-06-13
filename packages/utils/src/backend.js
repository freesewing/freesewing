import axios from "axios";

function useBackend(baseURL, timeout = 10000) {
  // Configure Axios
  const api = axios.create({ baseURL, timeout });

  // Helper method for Authorization header
  const auth = token => ({
    headers: { Authorization: "Bearer " + token }
  });

  const backend = {};

  // Oauth
  backend.initOauth = data => api.post("/oauth/init", data); // Init Oauth (to get state)
  backend.providerLogin = data => api.post("/oauth/login", data); // Finalize Oauth login

  // Signup flow
  backend.signup = (email, password, language) =>
    api.post("/signup", { email, password, language }); // Signup
  backend.confirm = confirmId => api.post("/confirm", { id: confirmId }); // Confirm
  backend.createAccount = (confirmId, consent) =>
    api.post("/user", { id: confirmId, consent }); // Create account

  // Other non-authenticated calls
  backend.login = (username, password) =>
    api.post("/login", { username, password }); // Login
  backend.profile = username => api.get("/users/" + username); // Load user profile
  backend.loadGist = handle => api.get("/gist/" + handle); // Load draft/gist anonymously
  backend.loadPatrons = handle => api.get("/patrons"); // Load patron list

  // Users
  backend.account = token => api.get("/account", auth(token)); // Try to authenticate based on stored token
  backend.export = token => api.get("/export", auth(token)); // Export data
  backend.restrict = token => api.get("/restrict", auth(token)); // Restrict data processing (freeze account)
  backend.remove = token => api.get("/remove", auth(token)); // Remove account
  backend.saveAccount = (data, token) => api.put("/user", data, auth(token)); // Update account
  backend.availableUsername = (data, token) =>
    api.post("/available/username", data, auth(token)); // Check is a username is available
  backend.resetPassword = (username, token) =>
    api.post("/reset/password", { username: username }, auth(token)); // Ask for a password reset
  backend.setPassword = (data, token) =>
    api.post("/set/password", data, auth(token)); // (re)set a new password

  // Models
  backend.removeModels = (data, token) =>
    api.post("/remove/models", data, auth(token)); // Delete multiple models
  backend.createModel = (data, token) => api.post("/model", data, auth(token)); // Create model
  backend.saveModel = (handle, data, token) =>
    api.put("/model/" + handle, data, auth(token)); // Update model

  // Drafts
  backend.createDraft = (data, token) => api.post("/draft", data, auth(token)); // Create draft
  backend.saveDraft = (handle, data, token) =>
    api.put("/draft/" + handle, data, auth(token)); // Update draft
  backend.removeDraft = (handle, token) =>
    api.delete("/draft/" + handle, auth(token)); // Remove draft
  backend.removeDrafts = (data, token) =>
    api.post("/remove/drafts", data, auth(token)); // Delete multiple drafts

  return backend;
}

export default useBackend;
