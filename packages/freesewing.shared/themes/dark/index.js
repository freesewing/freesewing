const colors = require('tailwindcss/colors')
const gray = colors.neutral

module.exports = {
  'fontFamily': '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
  'primary': colors.violet['700'],
  'primary-focus': colors.violet['600'],
  'primary-content': colors.violet['50'],

  'secondary': colors.sky['500'],
  'secondary-focus': colors.sky['400'],
  'secondary-content': colors.sky['50'],

  'accent': colors.pink['500'],
  'accent-focus': colors.pink['400'],
  'accent-content': colors.pink['50'],

  'neutral': colors.neutral['300'],
  'neutral-focus': colors.neutral['50'],
  'neutral-content': colors.neutral['900'],

  'base-100': colors.neutral['900'],
  'base-200': colors.neutral['700'],
  'base-300': colors.neutral['600'],
  'base-content': colors.neutral['300'],

  'info': colors.indigo['700'],
  'success': colors.green['700'],
  'warning': colors.orange['500'],
  'error': colors.red['700'],

  '--btn-info-content': colors.neutral[50],
  '--btn-success-content': colors.neutral[50],
  '--btn-warning-content': colors.neutral[50],
  '--btn-error-content': colors.neutral[50],

  '--theme-gradient': `repeating-linear-gradient(
    -45deg,
    ${colors.gray[300]},
    ${colors.gray[300]} 15px,
    transparent 15px,
    transparent 25px
  )`,

  '--code-background-color': '#111',
  '--code-border-color': colors.neutral['800'],
  '--code-color': colors.neutral['300'],
  '--code-font-family': `"SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace`,
  '--code-border-radius': '0.5rem',
  '--code-border-style': 'solid',
  '--code-border-width': 2,
  '--code-outer-padding': '0 0.5rem',
  '--code-inner-padding': '1rem',
  '--code-color-keyword': colors.pink['400'],
  '--code-font-weight-keyword': 'bold',
  '--code-color-entity': colors.violet['400'],
  '--code-font-weight-entity': 'bold',
  '--code-color-constant': colors.lime['300'],
  '--code-color-string': colors.sky['300'],
  '--code-font-style-string': 'italic',
  '--code-color-variable': colors.indigo['300'],
  '--code-color-comment': colors.neutral['600'],
  '--code-color-tag': colors.green['600'],
  '--code-color-property': colors.yellow['200'],
  '--code-font-weight-property': 'bold',

  '--pattern-bg': colors.neutral['900'],
  '--pattern-fabric': colors.neutral['300'],
  '--pattern-lining': colors.emerald['700'],
  '--pattern-interfacing': colors.neutral['500'],
  '--pattern-canvas': colors.amber['700'],
  '--pattern-various': colors.red['700'],
  '--pattern-mark': colors.blue['700'],
  '--pattern-contrast': colors.pink['600'],
  '--pattern-note': colors.violet['600'],

  '--pattern-scale': 1,
  '--pattern-stroke-xs': "0.2",
  '--pattern-stroke-sm': "0.4",
  '--pattern-stroke': "0.7",
  '--pattern-stroke-lg': "1.3",
  '--pattern-stroke-xl': "2",
  '--pattern-stroke-xxl': "4",
}
