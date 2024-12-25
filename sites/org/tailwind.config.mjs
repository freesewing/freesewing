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
    './tailwind-force.html',
  ],
  plugins: [daisyui],
  corePlugins: { preflight: false },
  darkMode: ['class', "[data-theme='dark']"],
  prefix: 'tw-',
  daisyui: {
    themes: [{ light, dark }],
    logs: true,
    themeRoot: '*',
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
