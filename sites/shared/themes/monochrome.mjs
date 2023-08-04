import colors from 'tailwindcss/colors'

/*
 * See the light theme for an example with inline comments
 */

const color = colors.stone
const primary = color[800]

const spectrum = {}
for (let s = 0; s < 11; s++) {
  spectrum[`--fs-sp-${s}`] = color['300']
  spectrum[`--fs-spf-${s}`] = color['900']
}
const rating = {}
for (let r = 0; r < 5; r++) {
  rating[`--fs-rt-${r}`] = primary
}

export const theme = {
  fontFamily: "Optima, Candara, 'Noto Sans', source-sans-pro, sans-serif;",
  'base-100': color['50'],
  'base-200': color['100'],
  'base-300': color['500'],
  'base-content': color['900'],
  primary,
  'primary-focus': color['900'],
  'primary-content': color['50'],
  secondary: color['800'],
  'secondary-focus': color['900'],
  'secondary-content': color['50'],
  accent: color['800'],
  'accent-focus': color['900'],
  'accent-content': color['50'],
  neutral: color['800'],
  'neutral-focus': color['900'],
  'neutral-content': color['50'],
  info: color['600'],
  '--btn-info-content': color[50],
  success: color['500'],
  '--btn-success-content': color[50],
  warning: color['300'],
  '--btn-warning-content': color[900],
  error: color['700'],
  '--btn-error-content': color[50],
  '--theme-gradient': `repeating-linear-gradient(
    90deg,
    ${color[400]} 0,
    ${color[400]} 11%,
    ${color[400]} 22%,
    ${color[400]} 33%,
    ${color[400]} 44%,
    ${color[400]} 55%,
    ${color[400]} 66%,
    ${color[400]} 77%,
    ${color[400]} 88%,
    ${color[400]} 100%
  )`,
  '--code-background-color': color['800'],
  '--code-background-highlight-color': color['300'],
  '--code-border-color': color['900'],
  '--code-color': color['100'],
  '--code-font-family': `"SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace`,
  '--code-border-radius': '0.5rem',
  '--code-border-style': 'solid',
  '--code-border-width': 1,
  '--code-outer-padding': '0 0.5rem',
  '--code-inner-padding': '1rem',
  '--code-color-keyword': color['500'],
  '--code-font-weight-keyword': 'bold',
  '--code-color-entity': color['400'],
  '--code-font-weight-entity': 'bold',
  '--code-color-constant': color['400'],
  '--code-color-string': color['400'],
  '--code-font-style-string': 'italic',
  '--code-color-variable': color['400'],
  '--code-color-comment': color['400'],
  '--code-color-tag': color['400'],
  '--code-color-property': color['200'],
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
  '--pattern-bg': color['50'],
  '--pattern-fabric': color['700'],
  '--pattern-lining': color['500'],
  '--pattern-interfacing': color['400'],
  '--pattern-canvas': color['600'],
  '--pattern-various': color['500'],
  '--pattern-mark': color['500'],
  '--pattern-contrast': color['500'],
  '--pattern-note': color['500'],
  '--pattern-text-xs': '0.2rem',
  '--pattern-text-sm': '0.3rem',
  '--pattern-text': '0.4rem',
  '--pattern-text-lg': '0.6rem',
  '--pattern-text-xl': '0.8rem',
  '--pattern-text-2xl': '1.5rem',
  '--pattern-text-3xl': '2rem',
  '--pattern-text-4xl': '3rem',
  '--pattern-scale': '1',
  '--pattern-stroke-xs': '0.2px',
  '--pattern-stroke-sm': '0.4px',
  '--pattern-stroke': '0.7px',
  '--pattern-stroke-lg': '1.3px',
  '--pattern-stroke-xl': '2px',
  '--pattern-stroke-2xl': '4px',
  '--pattern-stroke-3xl': '6px',
  '--pattern-stroke-4xl': '8px',
  '--pattern-stroke-5xl': '12px',
  '--pattern-stroke-6xl': '16px',
  '--pattern-stroke-7xl': '20px',
  '--pattern-sample-1': color['500'],
  '--pattern-sample-2': color['500'],
  '--pattern-sample-3': color['500'],
  '--pattern-sample-4': color['500'],
  '--pattern-sample-5': color['500'],
  '--pattern-sample-6': color['500'],
  '--pattern-sample-7': color['500'],
  '--pattern-sample-8': color['500'],
  '--pattern-sample-9': color['500'],
  '--pattern-sample-10': color['500'],
  stripeTheme: 'stripe',

  /**
   * Add the spectrum and ratings vars last so they can pick up on other ones
   */
  ...spectrum,
  ...rating,
}
