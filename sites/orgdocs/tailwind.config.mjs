// Handle themes
import { themes } from './themes/index.mjs'

export default {
  content: ['./src/*.js', './src/**/*.js', './src/*.mjs', './src/**/*.mjs'],
  plugins: [require('daisyui'), require('tailwindcss/nesting')],
  daisyui: {
    styled: true,
    themes,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
  },
  theme: {
    extend: {
      aspectRatio: {
        '9/16': '9 / 16',
      },
    },
  },
}
