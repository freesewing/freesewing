const colors = require('tailwindcss/colors')
const gray = colors.trueGray

module.exports = {
  displayName: "🐕 Kindergarten",
  config: {
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

    '--pattern-fabric': colors.trueGray['700'],
    '--pattern-lining': colors.emerald['500'],
    '--pattern-interfacing': colors.trueGray['400'],
    '--pattern-canvas': colors.amber['600'],
    '--pattern-various': colors.red['500'],
    '--pattern-mark': colors.blue['500'],
    '--pattern-contrast': colors.pink['500'],
    '--pattern-note': colors.violet['500'],

    ".mdx.prose a" : {
      color: colors.fuchsia['600'],
      'text-decoration': 'none',
    },
    ".mdx.prose a:hover" : {
      color: colors.fuchsia['500'],
      'text-decoration': 'underline',
    },
  }
}
