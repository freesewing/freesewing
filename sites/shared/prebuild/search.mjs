import { collection } from '../../org/hooks/use-design.mjs'
import { siteConfig as orgConfig } from '../../org/site.config.mjs'
import { algoliaClient, indexSettings } from './algolia.mjs'
import fs from 'fs'
import path from 'path'
import { remark } from 'remark'
import strip from 'strip-markdown'

const siteConfig = {
  org: orgConfig,
}

export const loadMdText = async ({
  language, // The language code of the markdown to load (like 'en')
  site, // The site folder, one of 'dev' or 'org'
  slug, // The slug below that folder, like 'guides/plugins'
}) => {
  let result
  try {
    result = await fs.promises.readFile(
      path.resolve(`../../markdown/${site}/${slug}/${language}.md`),
      'utf-8'
    )
  } catch (err) {
    result = await fs.promises.readFile(
      path.resolve(`../../markdown/${site}/${slug}/en.md`),
      'utf-8'
    )
  }

  const file = await remark().use(strip).process(result)

  return String(file)
    .split('\n')
    .filter((line) => line.slice(0, 7) !== 'title: ')
    .join('\n')
}

const searchIndexDesigns = async (store) => {
  for (const language of siteConfig[store.site].languages) {
    const algolia = algoliaClient()
    // Init index
    await algolia.init({
      ...siteConfig[store.site].algolia,
      apiKey: process.env.ALGOLIA_INDEX_KEY,
      indexName: `designs_${language}`,
    })
    // Configure index
    await algolia.configureIndex(indexSettings.design(language))
    // Clear existing records
    await algolia.clearRecords()
    // Index design records
    await algolia.indexRecords(
      collection.map((design) => ({
        objectID: `${language}_design_${design}`,
        name: design,
        title: store.i18n.designNs[language][`${design}.t`],
        description: store.i18n.designNs[language][`${design}.d`],
      }))
    )
    console.log(
      '\n' + `  🔎 Indexed ${collection.length} records to Algolia (index = designs_${language}).`
    )
  }
}

const searchIndexDocs = async (store) => {
  const site = store.site
  for (const language of siteConfig[site].languages) {
    const algolia = algoliaClient()
    // Init index
    await algolia.init({
      ...siteConfig[site].algolia,
      apiKey: process.env.ALGOLIA_INDEX_KEY,
      indexName: `${site}_docs_${language}`,
    })
    // Configure index
    await algolia.configureIndex(indexSettings.docs(language))
    // Clear existing records
    await algolia.clearRecords()
    // Index docs records
    let toIndex = []
    let total = 0
    for (const [slug, page] of Object.entries(store.docs[language])) {
      const md = await loadMdText({ language, site, slug })
      toIndex.push({
        objectID: slug,
        page: `${language === 'en' ? '/' : '/' + language + '/'}${slug}`,
        title: page.t,
        body: md,
        type: 'docs',
      })
      if (toIndex.length > 99) {
        await algolia.indexRecords(toIndex)
        total += toIndex.length
        toIndex = []
      }
    }
    await algolia.indexRecords(toIndex)
    total += toIndex.length
    if (site === 'org') {
      // ALso index design records
      await algolia.indexRecords(
        collection.map((design) => ({
          objectID: `designs/${design}`,
          page: `${language === 'en' ? '/' : '/' + language + '/'}designs/${design}`,
          title: store.i18n.designNs[language][`${design}.t`],
          body: store.i18n.designNs[language][`${design}.d`],
          type: 'design',
        }))
      )
      total += collection.length
    }
    console.log(
      '\n' + `  🔎 Indexed ${total} records to Algolia (index = ${site}_docs_${language}).`
    )
  }
}

export const prebuildSearch = async (store, mock) => {
  if (mock) return
  if (store.site === 'org') await searchIndexDesigns(store)
  await searchIndexDocs(store)
}
