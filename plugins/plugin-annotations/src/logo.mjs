import { logoPath } from '@freesewing/config'

export const logoDefs = [
  {
    name: 'logo',
    def: (scale) =>
      `<g id="logo" transform="scale(${
        2 * scale
      }) translate(-12.55 -18)"><path class="logo" fill="currentColor" d="${logoPath}"/></g>`,
  },
]
