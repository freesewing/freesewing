import { prebuildDocs } from './docs.mjs'
import { prebuildNavigation } from './navigation.mjs'
import { prebuildGitData } from './git.mjs'
import { prebuildContributors } from './contributors.mjs'
import { prebuildPatrons } from './patrons.mjs'
import { prebuildI18n } from './i18n.mjs'
import { prebuildLab } from './lab.mjs'
import { prebuildDesigns } from './designs.mjs'
import { prebuildFavicon } from './favicon.mjs'
import { generateOgImage } from './og/index.mjs'
import { prebuildPosts } from './posts.mjs'
import { prebuildCrowdin } from './crowdin.mjs'

const run = async () => {
  if (process.env.LINTER) return true
  const startTime = Date.now()
  const FAST = process.env.FAST ? true : false
  const SITE = process.env.SITE || 'lab'
  const promises = []
  promises.push(prebuildDesigns())
  if (['org', 'dev'].includes(SITE)) {
    if (!FAST) {
      promises.push(prebuildGitData(SITE))
      promises.push(prebuildCrowdin(SITE))
      promises.push(prebuildContributors(SITE))
      promises.push(prebuildPatrons(SITE))
      promises.push(prebuildFavicon(SITE))
    }
    promises.push(prebuildI18n(SITE))

    const pages = {}
    await prebuildDocs(SITE, pages)
    await prebuildPosts(SITE, pages)
    prebuildNavigation(SITE, pages)
    if (!FAST && process.env.GENERATE_OG_IMAGES) {
      // Create og image for the home page
      promises.push(
        generateOgImage({
          lang: 'en',
          site: SITE,
          slug: '',
          title: 'FreeSewing.dev',
        })
      )
      // Create og image for the 404 page
      promises.push(
        generateOgImage({
          lang: 'en',
          site: SITE,
          slug: '/404',
          intro: "There's nothing here. Only this message to say there's nothing here.",
          title: 'Page not found',
          lead: '404',
        })
      )
    }
  } else {
    await prebuildLab()
  }

  await Promise.all(promises)
  console.log(`Completed Prebuild in ${Date.now() - startTime}ms`)
}

run()
