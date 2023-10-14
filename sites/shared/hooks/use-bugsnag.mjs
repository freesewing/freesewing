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
export function useBugsnag(bugsnag) {
  // If we don't use bugsnag, return a placeholder method
  if (!bugsnag) return () => false

  const reportError = (err) => {
    const id = createErrorId()
    bugsnag.notify(err, (evt) => {
      evt.setUser(account.username ? account.username : '__visitor')
      evt.context = id
    })

    return id
  }

  return reportError
}
