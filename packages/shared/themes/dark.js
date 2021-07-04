const colors = require('tailwindcss/colors')
const gray = colors.trueGray

module.exports = {
  'fontFamily': 'Ubuntu',
  'primary': colors.violet['800'],
  'primary-focus': colors.violet['700'],
  'primary-content': colors.violet['100'],

  'secondary': colors.violet['500'],
  'secondary-focus': colors.violet['700'],
  'secondary-content': colors.violet['100'],

  'accent': colors.emerald['500'],
  'accent-focus': colors.emerald['400'],
  'accent-content': gray['900'],

  'neutral': gray['800'],
  'neutral-focus': gray['800'],
  'neutral-content': gray['300'],

  'base-100': gray['900'],
  'base-200': gray['800'],
  'base-300': gray['700'],
  'base-content': gray['300'],

  'info': colors.violet['400'],
  'success': colors.green['500'],
  'warning': colors.amber['500'],
  'error': colors.red['500'],
}

