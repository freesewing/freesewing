import { createHash, createCipheriv, createDecipheriv, scryptSync, randomBytes } from 'crypto'

/*
 * Cleans a string (typically email) for hashing
 */
export const clean = (string) => {
  if (typeof string !== 'string') throw 'clean() only takes a string as input'

  return string.toLowerCase().trim()
}

/*
 * Hashes an email address (or other string)
 */
export const hash = (string) => createHash('sha256').update(string).digest('hex')

/*
 * Returns an object holding encrypt() and decrypt() methods
 *
 * These utility methods keep the crypto code out of the regular codebase
 * which makes things easier to read/understand for contributors, as well
 * as allowing scrutiny of the implementation in a single file.
 */
export const encryption = (stringKey, salt = 'FreeSewing') => {
  // Shout-out to the OG crypto bros Joan and Vincent
  const algorithm = 'aes-256-cbc'

  // Key and (optional) salt are passed in, prep them for aes-256
  const key = Buffer.from(scryptSync(stringKey, salt, 32))

  return {
    encrypt: (data) => {
      /*
       * This will encrypt almost anything, but undefined we cannot encrypt.
       * We could side-step this by assigning a default to data, but that would
       * lead to confusing bugs when people think they pass in data and instead
       * get an encrypted default. So instead, let's bail out loudly
       */
      if (typeof data === 'undefined') throw 'Undefined cannot be uncrypted'

      /*
       * With undefined out of the way, there's still some things we cannot encrypt.
       * Essentially, anything that can't be serialized to JSON, such as functions.
       * So let's catch the JSON.stringify() call and once again bail out if things
       * go off the rails here.
       */
      try {
        data = JSON.stringify(data)
      } catch (err) {
        throw ('Could not parse input to encrypt() call', err)
      }

      /*
       * Even with the same salt, this initialization vector avoids that
       * two identical input strings would generate the same ciphertext
       */
      const iv = randomBytes(16)

      /*
       * The thing that does the encrypting
       */
      const cipher = createCipheriv(algorithm, key, iv)

      /*
       * Always return a string so we can store this in SQLite no problemo
       */
      return JSON.stringify({
        iv: iv.toString('hex'),
        encrypted: Buffer.concat([cipher.update(data), cipher.final()]).toString('hex'),
      })
    },
    decrypt: (data) => {
      /*
       * Don't blindly assume this data is properly formatted ciphertext
       */
      try {
        data = JSON.parse(data)
      } catch (err) {
        throw ('Could not parse encrypted data in decrypt() call', err)
      }
      if (!data.iv || typeof data.encrypted === 'undefined') {
        throw 'Encrypted data passed to decrypt() was malformed'
      }

      /*
       * The thing that does the decrypting
       */
      const decipher = createDecipheriv(algorithm, key, Buffer.from(data.iv, 'hex'))

      /*
       * Parse this string as JSON
       * so we return the same type as what was passed to encrypt()
       */
      return JSON.parse(
        Buffer.concat([
          decipher.update(Buffer.from(data.encrypted, 'hex')),
          decipher.final(),
        ]).toString('utf-8')
      )
    },
  }
}
