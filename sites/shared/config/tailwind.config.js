// Handle themes
const themes = require('../themes')

module.exports = {
  content: [
    './pages/*.mjs',
    './pages/*.js',
    './pages/**/*.mjs',
    './pages/**/*.js',
    './components/*.mjs',
    './components/**/*.mjs',
    './page-templates/*.mjs',
    '../shared/components/**/*.mjs',
    '../shared/config/tailwind-force.html',
  ],
  plugins: [require('daisyui'), require('tailwindcss/nesting')],
  daisyui: {
    styled: true,
    themes: [themes],
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
