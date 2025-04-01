// Handle themes
import { light, dark } from './themes/index.mjs'
import daisyui from 'daisyui'

export default {
  content: [
    './src/**/*.{js,mjs,mdx}',
    './node_modules/daisyui/**/*.{js,mjs,ts,tsx}',
    './node_modules/@freesewing/react/components/**/*.mjs',
    './node_modules/@freesewing/react/context/**/*.mjs',
    './node_modules/@freesewing/react/hooks/**/*.mjs',
    './node_modules/@freesewing/react/lib/tailwind-force.mjs',
    './node_modules/@freesewing/utils/src/*.mjs',
    './tailwind-force.html',
  ],
  plugins: [daisyui],
  prefix: 'tw-',
  daisyui: {
    themes: [{ dark, light }],
    logs: true,
    prefix: 'daisy-',
  },
  theme: {
    extend: {
      aspectRatio: {
        '9/16': '9 / 16',
      },
    },
  },
}
