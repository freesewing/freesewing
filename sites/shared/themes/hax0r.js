const colors = require('tailwindcss/colors')

const bg = '#002808'

module.exports = {
  fontFamily: `ui-monospace, Menlo, Monaco, "Cascadia Mono", "Segoe UI Mono", "Roboto Mono", "Oxygen Mono", "Ubuntu Monospace", "Source Code Pro", "Fira Mono", "Droid Sans Mono", "Courier New", monospace;`,

  'base-100': bg,
  'base-200': colors.lime['900'],
  'base-300': colors.lime['800'],
  'base-content': colors.lime['500'],

  primary: colors.lime['700'],
  'primary-focus': colors.lime['600'],
  'primary-content': colors.lime['50'],

  secondary: colors.lime['600'],
  'secondary-focus': colors.lime['500'],
  'secondary-content': bg,

  accent: colors.lime['800'],
  'accent-focus': colors.lime['600'],
  'accent-content': colors.lime['400'],

  neutral: '#001c06', // Even darker
  'neutral-focus': colors.lime['600'],
  'neutral-content': colors.lime['200'],

  info: colors.lime['700'],
  success: colors.lime['700'],
  warning: colors.lime['700'],
  error: colors.lime['700'],

  '--btn-info-content': colors.teal[300],
  '--btn-success-content': colors.green[300],
  '--btn-warning-content': colors.orange[300],
  '--btn-error-content': colors.red[300],

  '--theme-gradient': `repeating-linear-gradient(
    90deg,
    ${colors.lime['900']},
    ${colors.lime['500']} 50%,
    ${colors.lime['900']} 100%
  )`,

  '--code-background-color': '#002407',
  '--code-background-highlight-color': '#191919',
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
  '--code-color-comment': colors.lime['700'],
  '--code-color-tag': colors.lime['400'],
  '--code-color-property': colors.lime['200'],
  '--code-font-weight-property': 'bold',

  '--rounded-box': '0',
  '--rounded-btn': '0',
  '--rounded-badge': '0',
  '--animation-btn': '0.25s',
  '--animation-input': '.4s',
  '--padding-card': '2rem',
  '--btn-text-case': 'uppercase',
  '--navbar-padding': '.5rem',
  '--border-btn': '1px',
  '--focus-ring': '2px',
  '--focus-ring-offset': '2px',

  '--pattern-bg': colors.lime['900'],
  '--pattern-fabric': colors.neutral['400'],
  '--pattern-lining': colors.emerald['500'],
  '--pattern-interfacing': colors.neutral['400'],
  '--pattern-canvas': colors.amber['600'],
  '--pattern-various': colors.red['500'],
  '--pattern-mark': colors.blue['500'],
  '--pattern-contrast': colors.pink['500'],
  '--pattern-note': colors.violet['500'],

  '--pattern-dev-0': colors.red['500'],
  '--pattern-dev-1': colors.green['500'],
  '--pattern-dev-2': colors.blue['500'],
  '--pattern-dev-3': colors.yellow['500'],
  '--pattern-dev-4': colors.pink['500'],
  '--pattern-dev-5': colors.violet['500'],
  '--pattern-dev-6': colors.teal['500'],
  '--pattern-dev-7': colors.neutral['500'],

  '--pattern-text-xs': '0.2rem',
  '--pattern-text-sm': '0.3rem',
  '--pattern-text': '0.4rem',
  '--pattern-text-lg': '0.6rem',
  '--pattern-text-xl': '0.8rem',
  '--pattern-text-2xl': '1.5rem',
  '--pattern-text-3xl': '2rem',
  '--pattern-text-4xl': '3rem',

  '--pattern-stroke-xs': '0.2px',
  '--pattern-stroke-sm': '0.4px',
  '--pattern-stroke': '0.7px',
  '--pattern-stroke-lg': '1.3px',
  '--pattern-stroke-xl': '2px',
  '--pattern-stroke-2xl': '4px',
  '--pattern-stroke-3xl': '6px',
  '--pattern-stroke-4xl': '8px',
}
