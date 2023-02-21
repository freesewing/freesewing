import tlds from 'tlds/index.json' assert { type: 'json' }

/** Validates an email address for correct syntax */
export const validateEmail = (email) => {
  /* eslint-disable */
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  /* eslint-enable */
  return re.test(email)
}

/** Validates the top level domain (TLT) for an email address */
export const validateTld = (email) => {
  const tld = email.split('@').pop().split('.').pop().toLowerCase()
  if (tlds.indexOf(tld) === -1) return tld
  else return true
}
