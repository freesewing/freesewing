import axios from 'axios'

/*
 * Helper methods to interact with the FreeSewing backend
 */

const backend = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND || 'https://backend.freesewing.org',
  timeout: 3000,
})

export const signUp = async ({ email, language, startLoading, stopLoading }) => {
  let result
  try {
    startLoading()
    result = await backend.post('/signup', { email, language })
  } catch (err) {
    console.log({ err })
  } finally {
    if (result) console.log({ result })
    stopLoading()
  }
}
