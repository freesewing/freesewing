const colors = require('tailwindcss/colors')
const gray = colors.neutral

module.exports = {
  icon: "👩‍💻",
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

    '--code-background-color': '#002407',
    '--code-border-color': colors.lime['900'],
    '--code-color': colors.lime['600'],
    '--code-font-family': `"SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace`,
    '--code-border-radius': 0,
    '--code-border-style': 'solid',
    '--code-border-width': 1,
    '--code-outer-padding': '0 0.5rem',
    '--code-inner-padding': '1rem',
    '--code-color-keyword': colors.lime['400'],
    '--code-font-weight-keyword': 'bold',
    '--code-color-entity': colors.lime['400'],
    '--code-font-weight-entity': 'bold',
    '--code-color-constant': colors.lime['200'],
    '--code-color-string': colors.lime['200'],
    '--code-font-style-string': 'italic',
    '--code-color-variable': colors.lime['400'],
    '--code-color-comment': colors.lime['600'],
    '--code-color-tag': colors.lime['400'],
    '--code-color-property': colors.lime['200'],
    '--code-font-weight-property': 'bold',

    '--pattern-fabric': colors.neutral['700'],
    '--pattern-lining': colors.emerald['500'],
    '--pattern-interfacing': colors.neutral['400'],
    '--pattern-canvas': colors.amber['600'],
    '--pattern-various': colors.red['500'],
    '--pattern-mark': colors.blue['500'],
    '--pattern-contrast': colors.pink['500'],
    '--pattern-note': colors.violet['500'],
    '--pattern-fabric': colors.neutral['700'],
    '--pattern-lining': colors.emerald['500'],
    '--pattern-interfacing': colors.neutral['400'],
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
