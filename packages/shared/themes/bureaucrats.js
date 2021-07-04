const colors = require('tailwindcss/colors')
const gray = colors.trueGray

module.exports = {
  'fontFamily': 'Iowan Old Style, Apple Garamond, Baskerville, Times New Roman, Droid Serif, Times, Source Serif Pro, serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol',
  'primary': colors.blue['600'],
  'primary-focus': colors.blue['500'],
  'primary-content': '#fff',

  'secondary': colors.blue['600'],
  'secondary-focus': colors.blue['200'],
  'secondary-content': colors.blue['700'],

  'accent': colors.blue['500'],
  'accent-focus': colors.yellow['400'],
  'accent-content': gray['900'],

  'neutral': colors.blue['100'],
  'neutral-focus': gray['200'],
  'neutral-content': gray['700'],

  'base-100': '#ffffff',
  'base-200': gray['200'],
  'base-300': gray['200'],
  'base-content': gray['700'],

  'info': colors.gray['500'],
  'success': colors.green['600'],
  'warning': colors.amber['600'],
  'error': colors.red['600'],

  '--rounded-box': '5px',
  '--rounded-btn': '5px',
}

