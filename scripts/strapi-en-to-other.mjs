import 'dotenv/config'
import axios from 'axios'

const strapiHost = 'https://posts.freesewing.org'
const languages = ['en', 'de', 'fr', 'es', 'nl']

const uris = {
  showcaseposts: `${strapiHost}/showcaseposts?_limit=-1`,
  blogposts: `${strapiHost}/blogposts?_limit=-1&dev_ne=true`,
  makers: `${strapiHost}/makers?_limit=-1`,
  authors: `${strapiHost}/authors?_limit=-1`,
}
const suffix = {
  nl: 'Niet vertaald',
  de: 'Nicht übersetzt',
  fr: 'Non traduit',
  es: 'No traducido',
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
const getContent = async (type) => {
  const items = {}
  let res
  try {
    res = await axios.get(uris[type])
    for (const item of res.data) {
      if (typeof items[item.slug] === 'undefined') items[item.slug] = {}
      items[item.slug].content = item
      items[item.slug].locales = item.localizations
        ? item.localizations.map(loc => loc.locale)
        : []
    }
  }
  catch (err) {
    console.log(err)
  }

  return items
}

/*
 * Adds translations for a showcase post
 */
const addShowcasepostTranslations = (item, token) => {
  const promises = []
  for (const lang of languages) {
    if (lang !== 'en') {
      if (item.locales.indexOf(lang) === -1) {
        console.log(`❌ Showcasepost / ${lang.toUpperCase()} / ${item.content.slug} --> Adding now...`)
        promises.push(axios.post(
          `${strapiHost}/showcaseposts/${item.content.id}/localizations`,
          {
            locale: lang,
            title: `${item.content.title} [${suffix[lang]}]`,
            body: item.content.body,
            caption: item.content.caption,
            translated: false,
          },
          bearer(token)
        )
        .then(res => {
        })
        .catch(err => console.log(JSON.stringify(err.response.data, null, 2)))
        )
      } else {
        console.log(`✅ Showcaseposts / ${lang.toUpperCase()} / ${item.content.slug}`)
      }
    }
  }

  return Promise.all(promises)
}

/*
 * Adds translations for a blog post
 */
const addBlogpostTranslations = (item, token) => {
  const promises = []
  for (const lang of languages) {
    if (lang !== 'en') {
      if (item.locales.indexOf(lang) === -1) {
        console.log(`❌ Blogposts / ${lang.toUpperCase()} / ${item.content.slug} --> Adding now...`)
        promises.push(axios.post(
          `${strapiHost}/blogposts/${item.content.id}/localizations`,
          {
            locale: lang,
            title: `${item.content.title} [${suffix[lang]}]`,
            linktitle: item.content.linktitle,
            body: item.content.body,
            caption: item.content.caption,
            translated: false,
          },
          bearer(token)
        )
        .then(res => {
        })
        .catch(err => console.log(JSON.stringify(err.response.data, null, 2)))
        )
      } else {
        console.log(`✅ Blogposts / ${lang.toUpperCase()} / ${item.content.slug}`)
      }
    }
  }

  return Promise.all(promises)
}

/*
 * Adds translations for an author item
 */
const addAuthorTranslations = (item, token) => {
  const promises = []
  for (const lang of languages) {
    if (lang !== 'en') {
      if (item.locales.indexOf(lang) === -1) {
        console.log(`❌ Authors / ${lang.toUpperCase()} / ${item.content.displayname} --> Adding now...`)
        promises.push(axios.post(
          `${strapiHost}/authors/${item.content.id}/localizations`,
          {
            locale: lang,
            about: item.content.about
          },
          bearer(token)
        )
        .then(res => {
        })
        .catch(err => console.log(err))
        )
      } else {
        console.log(`✅ Authors / ${lang.toUpperCase()} / ${item.content.displayname}`)
      }
    }
  }

  return Promise.all(promises)
}

/*
 * Adds translations for a maker item
 */
const addMakerTranslations = (item, token) => {
  const promises = []
  for (const lang of languages) {
    if (lang !== 'en') {
      if (item.locales.indexOf(lang) === -1) {
        console.log(`❌ Makers / ${lang.toUpperCase()} / ${item.content.displayname} --> Adding now...`)
        promises.push(axios.post(
          `${strapiHost}/makers/${item.content.id}/localizations`,
          {
            locale: lang,
            about: item.content.about
          },
          bearer(token)
        )
        .then(res => {
        })
        .catch(err => console.log(err))
        )
      } else {
        console.log(`✅ Makers / ${lang.toUpperCase()} / ${item.content.displayname}`)
      }
    }
  }

  return Promise.all(promises)
}

/*
 * One method to call that will add translations
 */
const addTranslations = async (type, content, token) => {
  if (type === 'showcaseposts') return await addShowcasepostTranslations(content, token)
  if (type === 'blogposts') return await addBlogpostTranslations(content, token)
  if (type === 'makers') return await addMakerTranslations(content, token)
  if (type === 'authors') return await addAuthorTranslations(content, token)

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
  const content = {}
  for (const type of Object.keys(uris)) {
    console.log(`Loading ${type} from Strapi`)
    content[type] = await getContent(type)
    for (const item of Object.values(content[type])) {
      await addTranslations(type, item, token)
    }
  }

}


getToWork()
