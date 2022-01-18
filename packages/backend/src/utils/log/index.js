import dateFormat from 'dateformat'

// FIXME: This needs work

const now = () => dateFormat(new Date(), 'yyyy-mm-dd HH:MM:ss')

const logWorthy = (msg, data) => {
  let d = { at: now() }
  switch (msg) {
    case 'ping':
    case 'login':
    case 'wrongPassword':
    case 'passwordSet':
    case 'dataExport':
      d.user = data.user.handle
      d.from = data.req.ip
      d.with = data.req.headers['user-agent']
      break
    case 'signupRequest':
      d.email = data.email
      d.confirmation = data.confirmation
      break
    case 'accountRemovalFailed':
      d.err = data.err
      d.user = data.user.handle
      d.from = data.req.ip
      d.with = data.req.headers['user-agent']
      break
    default:
      d.data = data
      break
  }

  return d
}

const log = (type, msg, data) => {
  console.log(type, msg, logWorthy(msg, data))
}

log.info = (msg, data) => log('info', msg, data)
log.warning = (msg, data) => log('warning', msg, data)
log.error = (msg, data) => log('error', msg, data)

export default log
