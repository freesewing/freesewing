const colors = require('tailwindcss/colors')
const gray = colors.trueGray

module.exports = {
  'fontFamily': "Chalkboard,comic sans ms,\"sanssecondaryerif\"",
  'primary': colors.fuchsia['600'],
  'primary-focus': colors.fuchsia['700'],
  'primary-content': '#fff',

  'secondary': colors.fuchsia['600'],
  'secondary-focus': colors.fuchsia['200'],
  'secondary-content': colors.gray['800'],

  'accent': colors.green['500'],
  'accent-focus': colors.yellow['400'],
  'accent-content': gray['900'],

  'neutral': colors.yellow['300'],
  'neutral-focus': gray['200'],
  'neutral-content': gray['700'],

  'base-100': colors.yellow['200'],
  'base-200': colors.yellow['100'],
  'base-300': colors.yellow['100'],
  'base-content': gray['700'],

  'info': colors.green['600'],
  'success': colors.green['600'],
  'warning': colors.amber['600'],
  'error': colors.red['600'],

  '--rounded-btn': '10rem',
}

