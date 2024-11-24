// Handle themes
import { themes } from './themes/index.mjs'
import daisyui from 'daisyui'

export default {
  content: ['./src/**/*.{js,mjs,mdx}', '../../node_modules/daisyui/**/*.{js,mjs,ts,tsx}'],
  plugins: [daisyui],
  corePlugins: { preflight: false },
  darkMode: ['class', "[data-theme='dark']"],
  prefix: 'tw-',
  daisyui: {
    themes: [themes],
    base: false,
    logs: false,
    themeRoot: '*',
    prefix: 'dsy-',
  },
  theme: {
    extend: {
      aspectRatio: {
        '9/16': '9 / 16',
      },
    },
  },
}
