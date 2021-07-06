const colors = require('tailwindcss/colors')
const gray = colors.trueGray

module.exports = {
  'fontFamily': "Chalkboard,comic sans ms,\"sanssecondaryerif\"",
  'primary': colors.emerald['600'],
  'primary-focus': colors.emerald['500'],
  'primary-content': '#fff',

  'secondary': colors.fuchsia['600'],
  'secondary-focus': colors.fuchsia['500'],
  'secondary-content': colors.gray['800'],

  'accent': colors.green['500'],
  'accent-focus': colors.yellow['400'],
  'accent-content': gray['900'],

  'neutral': colors.emerald['900'],
  'neutral-focus': gray['200'],
  'neutral-content': colors.emerald['100'],

  'base-100': colors.yellow['200'],
  'base-200': colors.yellow['300'],
  'base-300': colors.yellow['400'],
  'base-content': gray['700'],

  'info': colors.pink['400'],
  'success': colors.green['600'],
  'warning': colors.amber['600'],
  'error': colors.red['600'],

  '--rounded-btn': '10rem',
}

