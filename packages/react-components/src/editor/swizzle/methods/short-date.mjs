export const shortDate = (locale = 'en', timestamp = false, withTime = true) => {
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }
  if (withTime) {
    options.hour = '2-digit'
    options.minute = '2-digit'
    options.hour12 = false
  }
  const ts = timestamp ? new Date(timestamp) : new Date()

  return ts.toLocaleDateString(locale, options)
}
