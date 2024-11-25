// Export defs
import { logoPath } from '../../../config/logo.mjs'

export const logoDefs = [
  {
    name: 'logo',
    def: (scale) =>
      `<g id="logo" transform="scale(${
        2 * scale
      }) translate(-12.55 -18)"><path class="logo" fill="currentColor" d="${logoPath}"/></g>`,
  },
]
