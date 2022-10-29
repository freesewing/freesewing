import { randomString } from '../api/utils.mjs'
import kleur from 'kleur'
import { vascii } from '../api/utils.mjs'

const genKey = async () => {
  const secret = randomString(32)
  console.log(`
  ${kleur.green(vascii)}
  🔐  Here's a random secret to encrypt the JSON Web Tokens:

  ${kleur.cyan(secret)}


  To use this secret, you can set ${kleur.yellow('config.jwt.secret')} explicitly in ${kleur.green('vahi.config.mjs')}
  Or set the ${kleur.yellow('VAHI_SECRET')} environment variable in a ${kleur.green('.env')} file like this:

  ${kleur.yellow('VAHI_SECRET="'+secret+'"')}

  🗒️  Check the documentation for more details
  `)

  return 
}

genKey()
