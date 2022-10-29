import { createHash, createCipheriv, createDecipheriv, scryptSync, randomBytes } from 'crypto'
import dotenv from 'dotenv'
dotenv.config()

/*
 * Cleans a string (typically email) for hashing
 */
export const clean = (email) => {
  if (typeof email !== 'string') throw("clean() only takes a string as input")

  return email.toLowerCase().trim()
}

// Hashes an email address
export const ehash = (email) => createHash('sha256').update(clean(email)).digest('hex')

/*
 * Returns an object holding encrypt() and decrypt() methods
 *
 * These utility methods keep the crypto code out of the regular codebase
 * which makes things easier to read/understand for contributors, as well
 * as allowing scrutiny of the implementation in a single file.
 */
export const encryption = (stringKey, salt='FreeSewing') => {

  // Shout-out to the OG crypto bros Joan and Vincent
  const algorithm = 'aes-256-cbc'

  // Key and (optional) salt are passed in, prep them for aes-256
  const key = Buffer.from(scryptSync(stringKey, salt, 32))

  return {
    encrypt: (data) => {

      /*
       * This will encrypt almost anything, but undefined we cannot encrypt.
       * We could side-step this by assigning a default to data, but that would
       * lead to confusing bugs when people thing they pass in data and instead
       * get an encrypted default. So instead, let's bail out loudly
       */
      if (typeof data === 'undefined') throw("Undefined cannot be uncrypted")

      /*
       * With undefined out of the way, there's still thing we cannot encrypt.
       * Essentially, anything that can't be serialized to JSON, such as functions.
       * So let's catch the JSON.stringify() call and once again bail out if things
       * go off the rails here.
       */
      try {
        data = JSON.stringify(data)
      }
      catch (err) {
        throw('Could not parse input to encrypt() call', err)
      }

      /*
       * Even with the same salt, this initialization vector avoid that two
       * identical input strings would generate the same cyphertext
       */
      const iv = randomBytes(16)

      /*
       * The thing that does the thing
       */
      const cipher = createCipheriv(algorithm, key, iv)

      // Always return a string so we can store this in SQLite no problemo
      return JSON.stringify({
        iv: iv.toString('hex'),
        encrypted: Buffer.concat([cipher.update(data), cipher.final()]).toString('hex'),
      })
    },
    decrypt: (data) => {
      /*
       * Don't blindly assume this data is properly formatted cyphertext
       */
      try {
        data = JSON.parse(data)
      }
      catch (err) {
        throw('Could not parse encrypted data in decrypt() call', err)
      }
      if (!data.iv || typeof data.encrypted === 'undefined') {
        throw('Encrypted data passed to decrypt() was malformed')
      }

      /*
       * The thing that does the thing
       */
      const decipher = createDecipheriv(algorithm, key, Buffer.from(data.iv, 'hex'))

      // Parse this string as JSON so we return what was passed to encrypt()
      return JSON.parse(
        Buffer.concat([
          decipher.update(Buffer.from(data.encrypted, 'hex')),
          decipher.final()
        ]).toString('utf-8')
      )
    }
  }
}
