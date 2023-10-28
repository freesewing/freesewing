// Export defs
import { logoPath } from '../../../config/logo.mjs'

export const logoDefs = [
  {
    name: 'logo',
    def: (scale) =>
      `<g id="logo" transform="scale(${
        2 * scale
      }) translate(-23 -36)"><path class="logo" stroke="none" fill="currentColor" d="${logoPath}"/></g>`,
  },
]
