import axios from 'axios'
import process from 'process'

/*
 * Helper methods to interact with the FreeSewing backend
 */
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND || 'https://backend.freesewing.org',
  timeout: 3000,
})

export function useBackend(app) {
  const auth = {
    headers: { Authorization: 'Bearer ' + app.token },
  }

  const backend = {}

  /*
   * User signup
   */
  backend.signUp = async ({ email, language }) => {
    let result
    try {
      app.startLoading()
      result = await api.post('/signup', { email, language })
    } catch (err) {
      return err
    } finally {
      app.stopLoading()
    }
    if (result && result.status === 201 && result.data) return result.data
    return null
  }

  /*
   * Load confirmation
   */
  backend.loadConfirmation = async ({ id, check }) => {
    let result
    try {
      app.startLoading()
      result = await api.get(`/confirmations/${id}/${check}`)
    } catch (err) {
      return err
    } finally {
      app.stopLoading()
    }
    if (result && result.status === 201 && result.data) return result.data
    return null
  }

  /*
   * Confirm signup
   */
  backend.confirmSignup = async ({ id, consent }) => {
    let result
    try {
      app.startLoading()
      result = await api.post(`/confirm/signup/${id}`, { consent })
    } catch (err) {
      return err
    } finally {
      app.stopLoading()
    }
    if (result && result.status === 200 && result.data) return result.data
    return null
  }

  /*
   * Generic update account method
   */
  backend.updateAccount = async (data) => {
    let result
    try {
      app.startLoading()
      result = await api.patch(`/account/jwt`, data, auth)
    } catch (err) {
      return err
    } finally {
      app.stopLoading()
    }
    if (result && result.status === 200 && result.data?.account) {
      app.setAccount(result.data.account)
      return true
    }

    return false
  }

  /*
   * Checks whether a username is available
   */
  backend.isUsernameAvailable = async (username) => {
    try {
      app.startLoading()
      await api.post(`/available/username/jwt`, { username }, auth)
    } catch (err) {
      // 404 means user is not found, so the username is available
      if (err.response?.status === 404) return true
      return false
    } finally {
      app.stopLoading()
    }
    return false
  }

  return backend
}
