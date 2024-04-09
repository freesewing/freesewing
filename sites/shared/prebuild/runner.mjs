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
import { prebuildDesigns as designs } from './designs.mjs'
import { prebuildFavicon as favicon } from './favicon.mjs'
import { prebuildCrowdin as crowdin } from './crowdin.mjs'
import { prebuildOrg as orgPageTemplates } from './org.mjs'
import { prebuildSearch as search } from './search.mjs'
import { prebuildJargon as jargon } from './jargon.mjs'
//import { prebuildLab as lab} from './lab.mjs'
import { prebuildOgImages as ogImages } from './og.mjs'

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
  jargon,
  posts,
  navigation,
  git,
  'Page Templates': true,
  search,
  ogImages,
}

/*
 * Site specific handlers
 */
const siteSpecificHandlers = {
  'Page Templates': {
    org: orgPageTemplates,
  },
}

export const prebuildRunner = async ({
  site, // The site we are running the prebuild for
  prebuild, // The prebuild configuration object. See sites/[site]/prebuild.mjs
}) => {
  /*
   * We don't run this in the linter
   * because it slows down linting for no good reason
   */
  if (process.env.LINTER) {
    console.log('Linter detected - Skipping prebuidl step')
    return
  }

  /*
   * Setup a place where we can keep data
   */
  const store = { site, users: {} }

  /*
   * Let the user know what's going to happen
   */
  logSummary(site, prebuild)
  /*
   * To avoid order issues, we use the order as configured
   * above, not the order as passed by the prebuild script
   */
  for (const step in handlers) {
    const task =
      typeof siteSpecificHandlers[step]?.[site] === 'undefined'
        ? handlers[step]
        : siteSpecificHandlers[step][site]
    if (prebuild[step] === true)
      await oraPromise(task(store), { text: `Prebuild ${capitalize(step)}` })
    else if (prebuild[step] === 'productionOnly')
      await oraPromise(task(store, !PRODUCTION), {
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
