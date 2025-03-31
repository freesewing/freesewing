// Handle themes
import { light, dark } from './themes/index.mjs'
import daisyui from 'daisyui'

export default {
  content: [
    './src/**/*.{js,mjs,mdx}',
    '../../node_modules/daisyui/**/*.{js,mjs,ts,tsx}',
    '../../packages/react/components/**/*.mjs',
    '../../packages/react/context/**/*.mjs',
    '../../packages/react/hooks/**/*.mjs',
    '../../packages/react/lib/tailwind-force.mjs',
    '../../packages/utils/src/*.mjs',
    './tailwind-force.html',
  ],
  plugins: [daisyui],
  prefix: 'tw-',
  daisyui: {
    themes: [{ dark, light }],
    logs: true,
    //themeRoot: '*',
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
