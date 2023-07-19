// Dependencies
import { oraPromise } from 'ora'
import { capitalize } from '../utils.mjs'
// Handlers
import { prebuildDocs as docs, prebuildPosts as posts } from './markdown.mjs'
import { prebuildNavigation as navigation } from './navigation.mjs'
import { prebuildGitData as git } from './git.mjs'
import { prebuildContributors as contributors } from './contributors.mjs'
import { prebuildPatrons as patrons } from './patrons.mjs'
import { prebuildI18n as i18n } from './i18n.mjs'
//import { prebuildLab as lab} from './lab.mjs'
import { prebuildDesigns as designs } from './designs.mjs'
import { prebuildFavicon as favicon } from './favicon.mjs'
import { prebuildOgImages as ogImages } from './og/index.mjs'
import { prebuildCrowdin as crowdin } from './crowdin.mjs'

/*
 * Are we running in production?
 */
const PRODUCTION = process.env.NODE_ENV === 'production'

/*
 * Structure handlers in a single object
 */
const handlers = {
  designs,
  contributors,
  crowdin,
  i18n,
  favicon,
  patrons,
  docs,
  posts,
  navigation,
  git,
  // FIXME: This needs work, but perhaps after v3
  //ogImages,
}

export const prebuildRunner = async ({
  site, // The site we are running the prebuild for
  prebuild, // The prebuild configuration object. See sites/[site]/prebuild.mjs
}) => {
  /*
   * Setup a place where we can keep data
   */
  const store = { site }

  /*
   * Let the user know what's going to happen
   */
  logSummary(site, prebuild)
  /*
   * To avoid order issues, we use the order as configured
   * above, not the order as passed by the prebuild script
   */
  for (const step in handlers) {
    if (prebuild[step] === true)
      await oraPromise(handlers[step](store), { text: `Prebuild ${capitalize(step)}` })
    else if (prebuild[step] === 'productionOnly')
      await oraPromise(handlers[step](store, !PRODUCTION), {
        text: `Prebuild ${capitalize(step)}${PRODUCTION ? '' : ' (mocked)'}`,
      })
    else await oraPromise(() => true, { text: `Prebuild ${capitalize(step)} (skipped)` })
  }

  console.log()

  return
}

const logSummary = (site, prebuild) => {
  console.log()
  console.log()
  console.log(`👷  Preparing prebuild step for FreeSewing's ${site} site`)
  console.log(
    `${PRODUCTION ? '🚀' : '🚧'}  This ${PRODUCTION ? 'is' : 'is not'} a production build`
  )
  console.log(`🏁  We will run the following prebuild steps:`)
  console.log()
  for (const step in prebuild) {
    if (prebuild[step] === 'productionOnly') {
      if (PRODUCTION) console.log(`🟢  Prebuild ${capitalize(step)}`)
      else console.log(`🟡  Mock ${capitalize(step)}`)
    } else if (prebuild[step]) console.log(`🟢  Prebuild ${capitalize(step)}`)
    else console.log(`🔴  Skip ${capitalize(step)}`)
  }
  console.log()
  console.log(`👷  Let's get to work...`)
  console.log()
}

const run = async () => {
  if (process.env.LINTER) return true
  const FAST = process.env.FAST ? true : false
  const SITE = process.env.SITE || 'lab'
  await prebuildDesigns()
  if (['org', 'dev'].includes(SITE)) {
    if (!FAST) await prebuildGitData(SITE)
    const docs = await prebuildDocs(SITE)
    let posts = false
    if (SITE === 'org') {
      if (!FAST) await prebuildCrowdin()
      posts = await prebuildPosts()
    }
    prebuildNavigation(docs, posts, SITE)
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

  await prebuildI18n(SITE)
  if (!FAST) {
    await prebuildContributors(SITE)
    await prebuildPatrons(SITE)
    await prebuildFavicon(SITE)
  }
  console.log()
}
