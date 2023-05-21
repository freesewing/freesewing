import { prebuildDocs } from './docs.mjs'
import { prebuildNavigation } from './navigation.mjs'
import { prebuildGitData } from './git.mjs'
import { prebuildContributors } from './contributors.mjs'
import { prebuildPatrons } from './patrons.mjs'
import { prebuildI18n } from './i18n.mjs'
import { prebuildLab } from './lab.mjs'
import { prebuildOrg } from './org.mjs'
import { prebuildDesigns } from './designs.mjs'
import { generateOgImage } from './og/index.mjs'

const run = async () => {
  if (process.env.LINTER) return true
  const FAST = process.env.FAST ? true : false
  const SITE = process.env.SITE || 'lab'
  if (!FAST) prebuildDesigns()
  if (['org', 'dev'].includes(SITE)) {
    if (!FAST) await prebuildGitData(SITE)
    const docPages = await prebuildDocs(SITE)
    prebuildNavigation(docPages, false, SITE)
    if (!FAST && process.env.GENERATE_OG_IMAGES) {
      // Create og image for the home page
      await generateOgImage({
        lang: 'en',
        site: SITE,
        slug: '',
        title: 'FreeSewing.dev',
      })
      // Create og image for the 404 page
      await generateOgImage({
        lang: 'en',
        site: SITE,
        slug: '/404',
        intro: "There's nothing here. Only this message to say there's nothing here.",
        title: 'Page not found',
        lead: '404',
      })
    }
  } else {
    await prebuildLab()
  }
  if (SITE === 'org') await prebuildOrg()

  await prebuildI18n(SITE)
  if (!FAST) {
    await prebuildContributors(SITE)
    await prebuildPatrons(SITE)
  }
  console.log()
}

run()
