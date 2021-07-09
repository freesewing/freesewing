const colors = require('tailwindcss/colors')
const gray = colors.trueGray

module.exports = {
  displayName: "👨‍💼 Bureaucrats",
  config: {
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

    'neutral': colors.blue['900'],
    'neutral-focus': colors.blue['800'],
    'neutral-content': colors.blue['100'],

    'base-100': '#ffffff',
    'base-200': gray['200'],
    'base-300': gray['400'],
    'base-content': gray['700'],

    'info': colors.blue['400'],
    'success': colors.green['600'],
    'warning': colors.amber['500'],
    'error': colors.red['600'],

    '--rounded-box': '2px',
    '--rounded-btn': '2px',

    ".mdx.prose a" : {
      color: colors.blue['600'],
      'text-decoration': 'underline',
    },
    ".mdx.prose a:hover" : {
      color: colors.blue['500'],
      'text-decoration': 'underline',
    },
  }
}
