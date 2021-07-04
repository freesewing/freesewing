const colors = require('tailwindcss/colors')
const gray = colors.trueGray

module.exports = {
  'fontFamily': 'Ubuntu',
  'primary': colors.violet['800'],
  'primary-focus': colors.violet['700'],
  'primary-content': colors.violet['100'],

  'secondary': colors.violet['500'],
  'secondary-focus': colors.violet['300'],
  'secondary-content': colors.violet['700'],

  'accent': colors.fuchsia['500'],
  'accent-focus': colors.fuchsia['400'],
  'accent-content': gray['900'],

  'neutral': gray['900'],
  'neutral-focus': gray['200'],
  'neutral-content': gray['300'],

  'base-100': gray['100'],
  'base-200': colors.violet['100'],
  'base-300': '#f3e7f5',
  'base-content': gray['700'],

  'info': colors.violet['600'],
  'success': colors.green['500'],
  'warning': colors.amber['500'],
  'error': colors.red['500'],
}

