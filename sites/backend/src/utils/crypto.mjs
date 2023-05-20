import bcrypt from 'bcryptjs' // Required for legacy password hashes
import { createHash, createCipheriv, createDecipheriv, scryptSync, randomBytes } from 'crypto'
import { log } from './log.mjs'
import { asJson } from './index.mjs'

/*
 * Hashes an email address (or other string)
 */
export function hash(string) {
  return createHash('sha256').update(string).digest('hex')
}

/*
 * Generates a random string
 *
 * This is not used in anything cryptographic. It is only used as a temporary
 * username to avoid username collisions or to generate (long) API key secrets
 */
export function randomString(bytes = 8) {
  return randomBytes(bytes).toString('hex')
}

/*
 * Returns an object holding encrypt() and decrypt() methods
 *
 * These utility methods keep the crypto code out of the regular codebase
 * which makes things easier to read/understand for contributors, as well
 * as allowing scrutiny of the implementation in a single file.
 */
export function encryption(stringKey, salt = 'FreeSewing') {
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
       * So let's catch the asJson() call and once again bail out if things
       * go off the rails here.
       */
      try {
        data = asJson(data)
      } catch (err) {
        console.log(err)
        throw 'Could not parse input to encrypt() call'
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
      return asJson({
        // iv = Initialization Vector
        iv: iv.toString('hex'),
        // ct = CipherText
        ct: Buffer.concat([cipher.update(data), cipher.final()]).toString('hex'),
      })
    },
    decrypt: (data) => {
      /*
       * Don't blindly assume this data is properly formatted ciphertext
       */
      try {
        data = JSON.parse(data)
      } catch (err) {
        console.log(err)
        throw 'Could not parse encrypted data in decrypt() call'
      }
      if (!data.iv || typeof data.ct === 'undefined') {
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
        Buffer.concat([decipher.update(Buffer.from(data.ct, 'hex')), decipher.final()]).toString(
          'utf-8'
        )
      )
    },
  }
}

/*
 * Salts and hashes a password
 */
export function hashPassword(input, salt = false) {
  if (salt === false) salt = Buffer.from(randomBytes(16))
  else salt = Buffer.from(salt, 'hex')
  const hash = scryptSync(input, salt, 64)

  return {
    type: 'v3',
    hash: hash.toString('hex'),
    salt: salt.toString('hex'),
  }
}

/*
 * Verifies a (user-provided) password against the stored hash + salt
 *
 * Note that:
 * - For legacy password hashes, the password field will hold serialized
 *   JSON with a 'type' field set to 'v2' and a 'data' field holding the
 *   legacy hash info to pass to the verifyLegacyPassword() method below.
 * - For new password hashes, the password field will hold  serialized
 *   JSON with a 'type' field set to 'v3' and a 'hash' and 'salt' field.
 * - When legacy passwords are confirmed, they will be re-hashed and
 *   updated in the database. The database update is not handled here but
 *   prepared, by returning the new value for the password field as the
 *   second element in the returned array.
 */
export function verifyPassword(input, passwordField) {
  let data
  try {
    data = JSON.parse(passwordField)
  } catch {
    /*
     * This should not happen. Let's just log a warning and return false
     */
    log.warn(passwordField, 'Unable to parse JSON in password field')
    return [false, false]
  }
  // Is this a legacy password field?
  if (data.type === 'v2') {
    const result = verifyLegacyPassword(input, data.data)
    if (result) {
      /*
       * Correct password for legacy password field.
       * Re-hash and return updated password field value.
       */
      return [true, asJson(hashPassword(input))]
    }
  } else if (data.type === 'v3') {
    if (data.hash && data.salt) {
      const verify = hashPassword(input, data.salt)
      if (data.hash === verify.hash && data.salt === verify.salt) {
        // Son of a bitch, you're in
        return [true, false]
      }
    }
  }

  return [false, false]
}

/*
 * Verifies a legacy password hash
 *
 * Legacy means that an account was imported from the v2 FreeSewing backend
 * which used MongoDB as a database with Mongoose as an ORM.
 * Passwords were handles with the mongoose-bcrypt plugin and have been
 * imported from a database dump.
 *
 * So to verify these passwords, we need to verify the original logic of
 * the mongoose plugin which uses the bcryptjs library.
 *
 * Each time a user with a legacy password field logs in with the correct
 * password, we re-hash the password field with the new (crypto) hasing method.
 * This way, in a while all users will be migrated, and we can drop this method
 * and the cryptojs dependency
 */
function verifyLegacyPassword(password, hash) {
  return bcrypt.compareSync(password, hash)
}
