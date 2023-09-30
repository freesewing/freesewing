import path from 'path'
import fs from 'fs'
import { siteConfig } from '../../org/site.config.mjs'
import axios from 'axios'

/*
 * List of crowdin language codes
 */
const languages = ['nl', 'fr', 'de', 'es-ES', 'uk']

/*
 * Configuration object for the crowdin report
 */
const report = {
  name: 'top-members',
  schema: {
    unit: 'words',
    format: 'json',
  },
}

const sendApiRequest = async (url = '', body = false, download = false) => {
  let response
  const params = [`https://api.crowdin.com/api/v2/projects/${siteConfig.crowdin.projectId}/${url}`]
  if (body) params.push(body)
  params.push({ headers: { Authorization: `Bearer ${siteConfig.crowdin.token}` } })
  try {
    response = body
      ? await axios.post(...params)
      : download
      ? await axios.get(download)
      : await axios.get(...params)
  } catch (err) {
    console.log(err)
    console.log(JSON.stringify(err.response.data))
  }
  if (response) {
    const data = await response.data

    return data.data
  }

  return false
}

const loadTopMembers = async (languageId) =>
  await sendApiRequest('reports?limit=500', { ...report, schema: { ...report.schema, languageId } })
const checkReportStatus = async (id) => await sendApiRequest(`reports/${id}`)
const getReportUrl = async (id) => await sendApiRequest(`reports/${id}/download`)
const downloadReport = async (url) => await sendApiRequest('', false, url)

export const prebuildCrowdin = async (store, mock = false) => {
  if (mock) {
    fs.writeFileSync(
      path.resolve('..', 'org', 'prebuild', 'translators.json'),
      JSON.stringify(mockedData)
    )

    return (store.crowdin = mockedData)
  }

  const contributions = {}
  for (let language of languages) {
    contributions[language] = {}
    const report = await loadTopMembers(language)
    const id = report.identifier
    let url = false
    while (!url) {
      const result = await checkReportStatus(id)
      if (result.status === 'finished') {
        const where = await getReportUrl(id)
        url = where.url
      }
    }
    const users = await downloadReport(url)
    for (const user of users) {
      const handle = user.user.fullName || user.user.username
      // Drop Joost from non-Dutch translations because it's not a correct representation
      // as these numbers are based on the innitial machine translation
      if (handle !== 'Joost De Cock (joostdecock)' || language === 'nl') {
        contributions[language][handle] = { translated: user.translated }
      }
    }
  }
  // Move 'es-ES' to 'es'
  contributions.es = { ...contributions['es-ES'] }
  delete contributions['es-ES']

  // Now write to disk
  fs.writeFileSync(
    path.resolve('..', 'org', 'prebuild', 'translators.json'),
    JSON.stringify(contributions)
  )

  store.crowdin = contributions

  return
}

/*
 * In development, we return this mocked data to speed things up
 */
const mockedData = {
  nl: { 'Joost De Cock (joostdecock)': { translated: 16427 } },
  fr: { bret76: { translated: 36800 } },
  de: { starf: { translated: 22370 } },
  uk: { 'Morgan Frost (KaerMorhan)': { translated: 10505 } },
  es: { 'Sara Latorre (Tyrannogina)': { translated: 6713 } },
}
