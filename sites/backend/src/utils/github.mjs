import fetch from 'node-fetch'
import { github as config } from '../config.mjs'

const api = 'https://api.github.com/repos/freesewing/freesewing'
const graphApi = 'https://api.github.com/graphql'

/*
 * Sometimes we'd like to cache responses.
 * This is a poor man's cache
 */
const cache = {}
const fresh = 1800000 // 30 minutes

/*
 * Helper method to run a requests against the GitHub API
 * with built-in cachine
 */
const cachedApiRequest = async (method, url, body = false, success = 200) => {
  const id = JSON.stringify({ method, url, body, success })
  const now = Date.now()

  /*
   * Is this reponse cached?
   */
  if (cache[id]) {
    /*
     * It is. But Is it fresh?
     */
    if (cache[id].timestamp && now - cache[id].timestamp < fresh) return cache[id].data
    /*
     * It is in the cache, but stale. Remove cache entry
     */ else delete cache[id]
  } else {
    const data = apiRequest(method, url, body, success)
    cache[id] = { timestamp: now, data }

    return data
  }
}

/*
 * Helper method to run requests against the GitHub API
 */
const apiRequest = async (method, url, body = false, success = 200) => {
  const data = {
    method: method,
    headers: {
      Authorization: `Bearer ${config.token}`,
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
export const createIssue = async (body) => await apiRequest('POST', `${api}/issues`, body, 201)

/*
 * Creates a discussion (graphql)
 */
export const createDiscussion = async ({ title, body }) =>
  await apiRequest('POST', graphApi, {
    query: `mutation {
    createDiscussion(
      input: {
        repositoryId: "${config.repoId}",
        categoryId: "${config.forumCategoryId}",
        body: ${JSON.stringify(body)},
        title: ${JSON.stringify(title)}
      }
    )
    {
      discussion {
        url
      }
    }
}`,
  })

/*
 * Creates a file in the respository
 */
export const createFile = async ({ path, body }) =>
  await apiRequest('PUT', `${api}/contents/${path}`, body, 201)

/*
 * Gets a branch. Defaults to the default branch ('develop')
 */
export const getBranch = async (branch = 'develop') =>
  await apiRequest('GET', `${api}/branches/${branch}`)

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

/*
 * Creates a pull request.
 */
export const createPullRequest = async ({ title, body, from, to = 'develop' }) =>
  await apiRequest(
    'POST',
    `${api}/pulls`,
    {
      title,
      head: from,
      base: to,
      body,
    },
    201
  )

/*
 * Retrieves a list of files for a folder
 */
export const getFileList = async (path) => await cachedApiRequest('GET', `${api}/contents/${path}`)
