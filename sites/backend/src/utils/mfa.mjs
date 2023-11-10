import qrcode from 'qrcode'
import { authenticator } from '@otplib/preset-default'
import { hash } from './crypto.mjs'

const dark = '#AAAAAA'
const light = '#EEEEEE'
/*
 * Exporting this closure that makes sure we have access to the
 * instantiated config
 */
export const mfa = ({ service }) => ({
  mfa: {
    enroll: async (user) => {
      const secret = authenticator.generateSecret()
      const otpauth = authenticator.keyuri(user, service, secret)
      let svg
      try {
        svg = await qrcode.toString(otpauth, {
          type: 'svg',
          color: { dark, light },
        })
      } catch (err) {
        console.log(err)
      }
      svg = svg
        .replace(dark, 'currentColor')
        .replace(light, 'none')
        .replace('<svg ', '<svg class="qrcode" width="100%" height="100%" ')

      return { secret, otpauth, qrcode: svg }
    },
    verify: async (token, secret, hashedScratchCodes) => {
      let result = authenticator.check(token, secret)
      // If it's good, return early
      if (result) return hashedScratchCodes ? [true, hashedScratchCodes] : true

      // If it fails, it could be a scratch code if we have any
      if (
        hashedScratchCodes &&
        Array.isArray(hashedScratchCodes) &&
        hashedScratchCodes.length > 0
      ) {
        const hashed = await hash(token)
        if (hashedScratchCodes.includes(hashed))
          return [true, hashedScratchCodes.filter((val) => val !== hashed)]
      }

      return hashedScratchCodes ? [false, hashedScratchCodes] : false
    },
  },
})
