const colors = require('tailwindcss/colors')
const gray = colors.trueGray

module.exports = {
  displayName: "👩‍💻 Hax0r",
  config: {
    'fontFamily': `ui-monospace, Menlo, Monaco, "Cascadia Mono", "Segoe UI Mono", "Roboto Mono", "Oxygen Mono", "Ubuntu Monospace", "Source Code Pro", "Fira Mono", "Droid Sans Mono", "Courier New", monospace;`,
    'primary': colors.lime['600'],
    'primary-focus': colors.lime['700'],
    'primary-content': colors.lime['100'],

    'secondary': colors.lime['600'],
    'secondary-focus': colors.lime['500'],
    'secondary-content': colors.lime['100'],

    'accent': colors.yellow['400'],
    'accent-focus': colors.yellow['500'],
    'accent-content': gray['900'],

    'neutral': colors.lime['900'],
    'neutral-focus': gray['200'],
    'neutral-content': colors.lime['300'],

    'base-100': '#002808',
    'base-200': '#002808',
    'base-300': colors.lime['900'],
    'base-content': colors.lime['500'],

    'info': colors.lime['700'],
    'success': colors.green['600'],
    'warning': colors.amber['400'],
    'error': colors.red['400'],

    '--rounded-btn': '0',

    '--pattern-fabric': colors.trueGray['700'],
    '--pattern-lining': colors.emerald['500'],
    '--pattern-interfacing': colors.trueGray['400'],
    '--pattern-canvas': colors.amber['600'],
    '--pattern-various': colors.red['500'],
    '--pattern-mark': colors.blue['500'],
    '--pattern-contrast': colors.pink['500'],
    '--pattern-note': colors.violet['500'],

    ".mdx.prose a" : {
      color: colors.lime['600'],
      'text-decoration': 'underline',
    },
    ".mdx.prose a:hover" : {
      color: colors.lime['500'],
    },
  }
}
