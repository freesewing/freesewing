import Bugsnag from '@bugsnag/js'
import { siteConfig } from 'site/site.config.mjs'
import { useAccount } from 'shared/hooks/use-account.mjs'

Bugsnag.start({
  apiKey: siteConfig.bugsnag.key,
  collectUserIp: false,
})

/*
 * Dumb method to generate a unique (enough) ID for submissions to bugsnag
 */
function createErrorId() {
  let result = ''
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  for (let s = 0; s < 3; s++) {
    for (let i = 0; i < 4; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    if (s < 2) result += '-'
  }

  return result
}

/*
 * The hook
 */
export function useBugsnag() {
  const { account } = useAccount()
  const reportError = async (err, data = false) => {
    const id = createErrorId()
    await Bugsnag.notify(err, (evt) => {
      evt.setUser(account.id ? account.id : '__visitor')
      evt.context = id
      if (data) evt.addMetadata('info', data)
      console.log(evt)
    })

    return {
      id,
      url: `https://app.bugsnag.com/freesewing/org/errors?filters[search]=${id}&sort=last_seen`,
    }
  }

  return reportError
}
