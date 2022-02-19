// Handle themes
const themes = require('../themes')

module.exports = {
  content: [
    './pages/*.js',
    './pages/**/*.js',
    './components/*.js',
    './components/**/*.js',
    '../freesewing.shared/components/**/*.js',
  ],
  plugins: [require('daisyui'), require('tailwindcss/nesting')],
  daisyui: {
    styled: true,
    themes: [themes],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
  }
}
