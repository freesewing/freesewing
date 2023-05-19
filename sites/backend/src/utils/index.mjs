import { website } from '../config.mjs'

/*
 * Capitalizes a string
 */
export const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1)

/*
 * Cleans a string (typically email) for hashing
 */
export const clean = (string) => {
  if (typeof string === 'number') string = string.toString()
  if (typeof string !== 'string') throw 'clean() only takes a string or number as input'

  return string.toLowerCase().trim()
}

/*
 * I find JSON.stringify to long to type, and prone to errors
 * So I make an alias here: asJson
 */
export const asJson = JSON.stringify

/*
 * Builds a url using the correct scheme, language and domain
 */
export const i18nUrl = (lang, path) => {
  let url = `${website.scheme}://${website.domain}`
  if (lang !== 'en') url += `/${lang}`

  return url + path
}
