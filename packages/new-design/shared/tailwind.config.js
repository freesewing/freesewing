// Handle themes
const themes = require('./shared/themes/index.js')

module.exports = {
  content: [
    './pages/*.js',
    './pages/**/*.js',
    './shared/**/*.js',
    './lab/**/*.js',
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
        '9/16': '9 / 16'
      }
    }
  }
}
