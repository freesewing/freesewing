// Handle themes
const allThemes = require('../freesewing.shared/themes')
const themes = {}
for (const theme in allThemes) themes[theme] = allThemes[theme].config

module.exports = {
  // jit compilations causes weird issues
  //mode: 'jit',
  purge: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    '../shared/components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: require('daisyui/colors'),
      zIndex: {
        '-10': '-10',
      }
    },
  },
  variants: {
    extend: {
      borderColor: ['active'],
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('daisyui'),
  ],
  daisyui: {
    styled: true,
    themes: [ themes ],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
  },
}
