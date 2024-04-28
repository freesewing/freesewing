// Export defs
import { logoPath } from '../../../config/logo.mjs'

export const logoDefs = [
  {
    name: 'logo',
    symbol: (scale) => `
<symbol id="logo" transform="scale(${2 * scale})" viewBox="-40 -40 80 80" width="80" height="80" x="-52.5" y="-57.5">
  <path class="logo" stroke="none" fill="currentColor" d="${logoPath}"/>
</symbol>`,
  },
]
