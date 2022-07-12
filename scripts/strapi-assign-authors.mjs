import 'dotenv/config'
import axios from 'axios'

const strapiHost = 'https://posts.freesewing.org'
const languages = ['en', 'de', 'fr', 'es', 'nl']
const anon = '6143bb25941e4d1efd882b35' // A FreeSewing maker
const joost = '60fade591972003530e03b39' // joostdecock

const uris = {
  showcaseposts: `${strapiHost}/showcaseposts?_limit=-1`,
//  blogposts: `${strapiHost}/blogposts?_limit=-1&dev_ne=true`,
}

/*
 * This script will connect to Strapi and make sure there's a
 * localized version for each:
 *
 * - blog post
 * - showcase post
 * - maker
 * - author
 *
 * And this for all non-Enlgish languages:
 *
 * - Dutch
 * - German
 * - Spanish
 * - French
 *
 * But only if a translated version does not exist yet.
 *
 * When that's the case, it will just copy over the English
 * and add a (translated) [in English] to the title of posts.
 */

/*
 * We need to login and get the JWT token
 */
const login = async () => {
  let result
  const data = {
    email: process.env.FS_STRAPI_USERNAME,
    password: process.env.FS_STRAPI_PASSWORD,
  }
  try {
    result = await axios.post(`${strapiHost}/admin/login`, data)
    if (result?.data?.data?.token) return result.data.data.token
  }
  catch(err) {
    console.log(err)
    return false
  }

  return false
}

/*
 * Helper method for Authorization header
 */
const bearer = token => ({
  headers: { Authorization: 'Bearer ' + token }
})

/*
 * Helper method to load content from Strapi
 * Exported because it's re-used by the Algolia indexing script
 */
const getContent = async (lang, type) => {
  let res
  try {
    res = await axios.get(`${uris[type]}&_locale=${lang}`)
    if (res.data) return res.data
  }
  catch (err) {
    console.log(err)
  }

  return false
}

/*
 * Adds maker to showcase post
 */
const addMaker = (content, token, makers) => {
  const promises = []
  for (const item of content) {
    promises.push(axios.put(
      `${strapiHost}/showcaseposts/${item.id}`,
      {
        maker: makers[item.slug]
      },
      bearer(token)
    )
    .then(res => {
    })
    .catch(err => console.log(err))
    )
  }

  return Promise.all(promises)
}

const addAuthors = async (type, token) => {
  const english = await getContent('en', type)
  const makers = {}
  for (const item of english) {
    makers[item.slug] = (item.maker.id === joost)
      ? anon
      : item.maker.id
  }

  for (const lang of languages) {
    const content = await getContent(lang, type)
    if (type === 'showcaseposts') await addMaker(content, token, makers)
  }

  return false
}

const getToWork = async () => {
  if (!process.env.FS_STRAPI_USERNAME || !process.env.FS_STRAPI_PASSWORD) {
    console.log(`
    You need to set the following environment variables to run this script:

     - FS_STRAPI_USERNAME
     - FS_STRAPi_PASSWORD
    `)
    process.exit()
  }
  const token = await login()
  if (!token) {
    console.log('Failed to login to strapi')
    process.exit()
  }
  for (const type of Object.keys(uris)) {
    console.log(`Loading ${type} from Strapi`)
    await addAuthors(type, token)
  }

}


getToWork()
