import axios from "axios";
import storage from "./storage";

function useBackend(baseURL, timeout = 10000) {
  // Configure Axios
  const api = axios.create({ baseURL, timeout });

  // Helper method for Authorization header
  const auth = (token = storage.get("token")) => ({
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
  backend.createAccount = confirmId => api.post("/user", { id: confirmId }); // Create account

  // Other non-authenticated calls
  backend.login = (username, password) =>
    api.post("/login", { username, password }); // Login
  backend.profile = username => api.get("/users/" + username); // Load user profile
  backend.loadGist = handle => api.get("/gist/" + handle); // Load draft/gist anonymously
  backend.loadPatrons = handle => api.get("/patrons"); // Load patron list

  // Users
  backend.account = () => api.get("/account", auth()); // Try to authenticate based on stored token
  backend.export = () => api.get("/export", auth()); // Export data
  backend.restrict = () => api.get("/restrict", auth()); // Restrict data processing (freeze account)
  backend.remove = () => api.get("/remove", auth()); // Remove account
  backend.saveAccount = data => api.put("/user", data, auth()); // Update account
  backend.availableUsername = data =>
    api.post("/available/username", data, auth()); // Check is a username is available
  backend.resetPassword = username =>
    api.post("/reset/password", { username: username }, auth()); // Ask for a password reset
  backend.setPassword = data => api.post("/set/password", data, auth()); // (re)set a new password

  // Models
  backend.removeModels = data => api.post("/remove/models", data, auth()); // Delete multiple models
  backend.createModel = data => api.post("/model", data, auth()); // Create model
  backend.saveModel = (handle, data) =>
    api.put("/model/" + handle, data, auth()); // Update model

  // Drafts
  backend.createDraft = data => api.post("/draft", data, auth()); // Create draft
  backend.saveDraft = (handle, data) =>
    api.put("/draft/" + handle, data, auth()); // Update draft
  backend.removeDraft = handle => api.delete("/draft/" + handle, auth()); // Remove draft
  backend.removeDrafts = data => api.post("/remove/drafts", data, auth()); // Delete multiple drafts

  return backend;
}

export default useBackend;
