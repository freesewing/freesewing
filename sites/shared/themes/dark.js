const colors = require('tailwindcss/colors')

module.exports = {
  'fontFamily': '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',

  'base-100': colors.neutral['900'],
  'base-200': colors.neutral['700'],
  'base-300': colors.neutral['600'],
  'base-content': colors.neutral['300'],

  'primary': colors.violet['700'],
  'primary-focus': colors.violet['600'],
  'primary-content': colors.violet['50'],

  'secondary': colors.sky['500'],
  'secondary-focus': colors.sky['400'],
  'secondary-content': colors.sky['50'],

  'accent': colors.pink['500'],
  'accent-focus': colors.pink['400'],
  'accent-content': colors.pink['50'],

  'neutral': '#000000', // Dark as my soul
  'neutral-focus': colors.neutral['300'],
  'neutral-content': colors.neutral['50'],

  'info': colors.indigo['700'],
  'success': colors.green['700'],
  'warning': colors.orange['500'],
  'error': colors.red['700'],

  '--btn-info-content': colors.neutral[50],
  '--btn-success-content': colors.neutral[50],
  '--btn-warning-content': colors.neutral[50],
  '--btn-error-content': colors.neutral[50],

  '--theme-gradient': `repeating-linear-gradient(
    90deg,
    ${colors.violet[900]},
    ${colors.violet[900]} 40%,
    ${colors.pink[700]} 65%,
    ${colors.violet[600]} 90%,
    ${colors.violet[900]} 100%
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
  '--code-color-keyword': colors.yellow['500'],
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

  '--rounded-box': '0.5rem',
  '--rounded-btn': '0.5rem',
  '--rounded-badge': '1.9rem',
  '--animation-btn': '0.25s',
  '--animation-input': '.4s',
  '--padding-card': '2rem',
  '--btn-text-case': 'uppercase',
  '--navbar-padding': '.5rem',
  '--border-btn': '1px',
  '--focus-ring': '2px',
  '--focus-ring-offset': '2px',

  '--pattern-bg': colors.neutral['900'],
  '--pattern-fabric': colors.neutral['300'],
  '--pattern-lining': colors.emerald['700'],
  '--pattern-interfacing': colors.neutral['500'],
  '--pattern-canvas': colors.amber['700'],
  '--pattern-various': colors.red['700'],
  '--pattern-mark': colors.blue['700'],
  '--pattern-contrast': colors.pink['600'],
  '--pattern-note': colors.violet['600'],

  '--pattern-dev-0': colors.red['500'],
  '--pattern-dev-1': colors.green['500'],
  '--pattern-dev-2': colors.blue['500'],
  '--pattern-dev-3': colors.yellow['500'],
  '--pattern-dev-4': colors.pink['500'],
  '--pattern-dev-5': colors.violet['500'],
  '--pattern-dev-6': colors.teal['500'],
  '--pattern-dev-7': colors.neutral['500'],
}
