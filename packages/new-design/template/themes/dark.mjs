import colors from 'tailwindcss/colors'
import { theme as light } from './light.mjs'
export const theme = {
  // Start from the light theme
  ...light,

  // Then override what is needed for dark more
  'base-100': colors.neutral['900'],
  'base-200': colors.neutral['700'],
  'base-300': colors.neutral['600'],
  'base-content': colors.neutral['100'],

  primary: colors.violet['400'],
  'primary-focus': colors.violet['500'],
  'primary-content': colors.neutral['900'],

  secondary: colors.sky['400'],
  'secondary-focus': colors.sky['500'],
  'secondary-content': colors.neutral['900'],

  accent: colors.fuchsia['400'],
  'accent-focus': colors.fuchsia['500'],
  'accent-content': colors.neutral['900'],

  neutral: '#000',
  'neutral-focus': colors.neutral['800'],
  'neutral-content': colors.neutral['50'],

  info: colors.yellow['400'],
  success: colors.green['400'],
  warning: colors.orange['400'],
  error: colors.red['400'],

  '--btn-info-content': colors.neutral[900],
  '--btn-success-content': colors.neutral[900],
  '--btn-warning-content': colors.neutral[900],
  '--btn-error-content': colors.neutral[900],

  '--code-background-color': '#111',
  '--code-background-highlight-color': '#191919',
  '--code-border-color': colors.neutral['800'],
  '--code-color': colors.neutral['300'],
  '--code-color-keyword': colors.yellow['500'],
  '--code-color-entity': colors.violet['400'],
  '--code-color-constant': colors.lime['300'],
  '--code-color-string': colors.sky['300'],
  '--code-color-variable': colors.indigo['300'],
  '--code-color-comment': colors.neutral['400'],
  '--code-color-tag': colors.green['600'],
  '--code-color-property': colors.yellow['200'],

  '--pattern-bg': colors.neutral['900'],
  '--pattern-fabric': colors.neutral['50'],
  '--pattern-lining': colors.emerald['300'],
  '--pattern-interfacing': colors.neutral['500'],
  '--pattern-canvas': colors.amber['300'],
  '--pattern-various': colors.red['300'],
  '--pattern-mark': colors.blue['300'],
  '--pattern-contrast': colors.pink['300'],
  '--pattern-note': colors.violet['300'],

  '--pattern-dev-0': colors.red['500'],
  '--pattern-dev-1': colors.green['500'],
  '--pattern-dev-2': colors.blue['500'],
  '--pattern-dev-3': colors.yellow['500'],
  '--pattern-dev-4': colors.pink['500'],
  '--pattern-dev-5': colors.violet['500'],
  '--pattern-dev-6': colors.teal['500'],
  '--pattern-dev-7': colors.neutral['500'],
}
