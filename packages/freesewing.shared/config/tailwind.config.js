// Handle themes
const allThemes = require('../themes')
const themes = {}
for (const theme in allThemes) themes[theme] = allThemes[theme].config

module.exports = {
  content: [
    './pages/*.js',
    './pages/**/*.js',
    '../freesewing.shared/components/**/*.js',
  ],
  daisyui: {
    styled: true,
    themes: [ themes ],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
  },
  theme: {
    extend: {
      colors: require('daisyui/colors'),
    },
  },
  plugins: [
    require('daisyui'),
  ],
}
