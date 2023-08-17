import fetch from 'node-fetch'
import { githubToken as token } from '../config.mjs'

export async function createIssue(body) {
  const api = `https://api.github.com/repos/freesewing/freesewing/issues`
  let response
  try {
    response = await fetch(api, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    if (response.status === 201) response = await response.json()
    else response = false
  } catch (error) {
    console.error('An error occurred while creating a GitHub issue:', error.message)
    response = false
  }

  return response
}

export async function createFile({ path, body }) {
  const api = `https://api.github.com/repos/freesewing/freesewing/contents`
  let response
  try {
    response = await fetch(`${api}/${path}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    if (response.status === 201) response = await response.json()
    else {
      console.log(response)
      response = false
    }
  } catch (error) {
    console.error('An error occurred while creating a GitHub file:', error.message)
    response = false
  }

  return response
}
