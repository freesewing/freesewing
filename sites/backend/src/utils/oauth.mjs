import axios from 'axios'
import { oauth as config } from '../config.mjs'

export const oauth = {
  github: {},
  google: {},
}

oauth.github.getToken = async (code) => {
  let result
  try {
    result = await axios.post(
      config.github.tokenUri,
      {
        client_id: config.github.clientId,
        client_secret: config.github.clientSecret,
        code,
        redirect_uri: config.github.redirectUri,
      },
      {
        headers: {
          Accept: 'application/json',
        },
      }
    )
  } catch (err) {
    console.log(err)
  }

  return result.data.access_token
}

oauth.github.loadUser = async (token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
    'X-Github-Api-Version': '2022-11-28',
  }
  let result
  try {
    result = await axios.get(config.github.dataUri, { headers })
  } catch (err) {
    console.log(err)
  }

  /*
   * If the user has their email address set as public in GitHub we are done
   * If not, we need an extra API call to get the email address.
   */
  const allData = result.data
  if (!allData.email) {
    try {
      result = await axios.get(config.github.emailUri, { headers })
    } catch (err) {
      console.log(err)
    }
    for (const entry of result.data) {
      if (entry.primary) {
        allData.email = entry.email
      }
    }
  }

  /*
   * Return the data we need
   */
  return {
    email: allData.email,
    username: allData.login,
    website: allData.blog,
    twitter: allData.twitter_username,
    bio: allData.bio,
    img: allData.avatar_url,
  }
}

oauth.google.getToken = async (code) => {
  let result
  try {
    result = await axios.post(
      config.google.tokenUri,
      {
        client_id: config.google.clientId,
        client_secret: config.google.clientSecret,
        code,
        redirect_uri: config.google.redirectUri,
        grant_type: 'authorization_code',
      },
      {
        headers: {
          Accept: 'application/json',
        },
      }
    )
  } catch (err) {
    console.log(err)
  }

  return result.data.access_token
}

oauth.google.loadUser = async (token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  }
  let result
  try {
    result = await axios.get(config.google.dataUri, { headers })
  } catch (err) {
    console.log(err)
  }

  /*
   * Extract, then return,  the data we need
   */
  const data = {}
  for (const name of result.data.names) {
    if (name.metadata.primary) data.username = name.displayName
  }
  for (const img of result.data.photos) {
    if (img.metadata.primary) data.img = img.url
  }
  for (const email of result.data.emailAddresses) {
    if (email.metadata.primary) data.email = email.value
  }
  // Ensure a username is set
  if (!data.username) data.username = data.email

  return data
}
