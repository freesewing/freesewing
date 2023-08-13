import fetch from 'node-fetch'
import { githubToken as token } from '../config.mjs'
const issueApi = `https://api.github.com/repos/freesewing/freesewing/issues`

export async function createIssue(body) {
  let response
  try {
    response = await fetch(issueApi, {
      method: 'POST',
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
    console.error('An error occurred while creating a GitHub issue:', error.message)
    response = false
  }

  return response
}
