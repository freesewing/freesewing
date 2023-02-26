import axios from 'axios'
import process from 'process'

/*
 * Helper methods to interact with the FreeSewing backend
 */
const apiHandler = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND || 'https://backend.freesewing.org',
  timeout: 3000,
})

export function useBackend(app) {
  const auth = {
    headers: { Authorization: 'Bearer ' + app.token },
  }

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

  const backend = {}

  /*
   * User signup
   */
  backend.signUp = async ({ email, language }) => {
    const result = await api.post('/signup', { email, language })
    if (result && result.status === 201 && result.data) return result.data
    return null
  }

  /*
   * Load confirmation
   */
  backend.loadConfirmation = async ({ id, check }) => {
    const result = await api.get(`/confirmations/${id}/${check}`)
    if (result && result.status === 200 && result.data) return result.data
    return null
  }

  /*
   * Confirm signup
   */
  backend.confirmSignup = async ({ id, consent }) => {
    const result = await api.post(`/confirm/signup/${id}`, { consent })
    if (result && result.status === 200 && result.data) return result.data
    return null
  }

  /*
   * Generic update account method
   */
  backend.updateAccount = async (data) => {
    const result = await api.patch(`/account/jwt`, data, auth)
    if (result && result.status === 200 && result.data?.account) {
      app.setAccount(result.data.account)
      return true
    }
    console.log('backend result', result)

    return false
  }

  /*
   * Checks whether a username is available
   */
  backend.isUsernameAvailable = async (username) => {
    const result = await api.post(`/available/username/jwt`, { username }, auth)
    // 404 means username is available, which is success in this case
    if (result.response?.status === 404) return true

    return false
  }

  /*
   * Remove account method
   */
  backend.removeAccount = async () => {
    const result = await api.delete(`/account/jwt`, auth)
    if (result && result.status === 200 && result.data?.account) {
      app.setAccount(result.data.account)
      return true
    }

    return false
  }

  /*
   * Enable MFA
   */
  backend.enableMfa = async () => {
    const result = await api.post(`/account/mfa/jwt`, { mfa: true }, auth)
    if (result && result.status === 200 && result.data?.mfa) {
      return result.data.mfa
    }

    return false
  }

  /*
   * Confirm MFA
   */
  backend.confirmMfa = async (data) => {
    const result = await api.post(`/account/mfa/jwt`, { ...data, mfa: true }, auth)
    if (result && result.status === 200 && result.data?.account) {
      app.setAccount(result.data.account)
      return true
    }

    return false
  }

  /*
   * Disable MFA
   */
  backend.disableMfa = async (data) => {
    const result = await await api.post(`/account/mfa/jwt`, { ...data, mfa: false }, auth)
    if (result && result.status === 200 && result.data?.account) {
      app.setAccount(result.data.account)
      return true
    }

    return false
  }

  /*
   * Reload account
   */
  backend.reloadAccount = async () => {
    const result = await await api.get(`/whoami/jwt`, auth)
    if (result && result.status === 200 && result.data?.account) {
      app.setAccount(result.data.account)
      return true
    }

    return false
  }

  /*
   * Create API key
   */
  backend.createApikey = async (data) => {
    const result = await await api.post(`/apikeys/jwt`, data, auth)
    if (result && result.status === 201 && result.data?.apikey) {
      return result.data.apikey
    }

    return false
  }

  /*
   * Get API keys
   */
  backend.getApikeys = async () => {
    const result = await api.get(`/apikeys/jwt`, auth)
    if (result && result.status === 200 && result.data?.apikeys) {
      return result.data.apikeys
    }

    return false
  }

  /*
   * Remove API key
   */
  backend.removeApikey = async (id) => {
    const result = await api.delete(`/apikeys/${id}/jwt`, auth)
    if (result && result.status === 204) return true

    return false
  }

  return backend
}
