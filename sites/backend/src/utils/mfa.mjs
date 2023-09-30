import qrcode from 'qrcode'
import { authenticator } from '@otplib/preset-default'

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
    verify: (token, secret) => authenticator.check(token, secret),
  },
})
