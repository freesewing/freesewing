import fetch from 'node-fetch'
import { githubToken as token } from '../config.mjs'

const api = 'https://api.github.com/repos/freesewing/freesewing'

/*
 * Helper method to run requests against the GitHub API
 */
const apiRequest = async (method, url, body = false, success = 200) => {
  const data = {
    method: method,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
    },
  }
  if (body) data.body = JSON.stringify(body)

  let response
  try {
    response = await fetch(url, data)
    if (response.status === success) response = await response.json()
    else response = false
  } catch (error) {
    console.error('An error occurred while creating a GitHub issue:', error.message)
    response = false
  }

  return response
}

/*
 * Creates an issue
 */
export const createIssue = async (body) => apiRequest('POST', `${api}/issues`, body)

/*
 * Creates a file in the respository
 */
export const createFile = async ({ path, body }) =>
  apiRequest('PUT', `${api}/contents/${path}`, body, 201)

/*
 * Gets a branch. Defaults to the default branch ('develop')
 */
export const getBranch = async (branch = 'develop') =>
  apiRequest('GET', `${api}/branches/${branch}`)

/*
 * Creates a new branch. Defaults to the default branch ('develop')
 */
export const createBranch = async ({ name, from = 'develop' }) => {
  const fromBranch = await getBranch(from)

  return await apiRequest(
    'POST',
    `${api}/git/refs`,
    {
      ref: `refs/heads/${name}`,
      sha: fromBranch.commit.sha,
    },
    201
  )
}
