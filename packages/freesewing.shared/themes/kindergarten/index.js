const colors = require('tailwindcss/colors')
const gray = colors.neutral

module.exports = {
  icon: "🐕",
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

    '--code-background-color': colors.emerald['900'],
    '--code-border-color': colors.yellow['400'],
    '--code-color': colors.neutral['200'],
    '--code-font-family': `"SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace`,
    '--code-border-radius': '1.5rem',
    '--code-border-style': 'dashed',
    '--code-border-width': 4,
    '--code-outer-padding': '0 0.5rem',
    '--code-inner-padding': '1rem',
    '--code-color-keyword': colors.yellow['400'],
    '--code-font-weight-keyword': 'bold',
    '--code-color-entity': colors.pink['300'],
    '--code-font-weight-entity': 'bold',
    '--code-color-constant': colors.lime['300'],
    '--code-color-string': colors.sky['300'],
    '--code-font-style-string': 'italic',
    '--code-color-variable': colors.indigo['300'],
    '--code-color-comment': colors.neutral['600'],
    '--code-color-tag': colors.green['600'],
    '--code-color-property': colors.yellow['200'],
    '--code-font-weight-property': 'bold',
    '--pattern-fabric': colors.neutral['700'],
    '--pattern-lining': colors.emerald['500'],
    '--pattern-interfacing': colors.neutral['400'],
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
