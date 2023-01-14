import axios from 'axios'
import process from 'process'

/*
 * Helper methods to interact with the FreeSewing backend
 */
const backend = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND || 'https://backend.freesewing.org',
  timeout: 3000,
})

/*
 * User signup
 */
export const signUp = async ({ email, language, startLoading, stopLoading }) => {
  let result
  try {
    startLoading()
    result = await backend.post('/signup', { email, language })
  } catch (err) {
    return err
  } finally {
    stopLoading()
  }
  if (result && result.status === 201 && result.data) return result.data
  return null
}
