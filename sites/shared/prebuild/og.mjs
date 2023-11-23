import axios from 'axios'
import { freeSewingConfig as config } from '../config/freesewing.config.mjs'
import { slugToOgImg } from '../utils.mjs'
import get from 'lodash.get'
import fs from 'fs'
import path from 'path'

export const generateImage = async ({ title, intro, site, slug, language }) => {
  let result
  try {
    result = await axios.post(
      `${config.backend}/img`,
      { title, intro, site, type: 'wide' },
      { responseType: 'arraybuffer' }
    )
    const file = path.resolve('..', site, 'public', 'img', 'og', slugToOgImg(slug, language))
    await fs.promises.writeFile(file, result.data)
  } catch (err) {
    console.log(err)
  }
}

export const prebuildOgImages = async (store, mock) => {
  if (mock) return
  for (const [language, nav] of Object.entries(store.navigation.sitenav)) {
    for (const slug of store.navigation.sluglut) {
      await generateImage({
        title: get(nav, slug.split('/'))?.t || 'FIXME: No title',
        intro: '',
        site: store.site,
        slug,
        language,
      })
    }
  }

  return
}
