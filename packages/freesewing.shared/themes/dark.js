const colors = require('tailwindcss/colors')
const gray = colors.neutral

module.exports = {
  icon: "🌚",
  config: {
    'fontFamily': '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
    'primary': gray['300'],
    'primary-focus': colors.violet['300'],
    'primary-content': gray['900'],

    'secondary': colors.violet['500'],
    'secondary-focus': colors.violet['400'],
    'secondary-content': colors.violet['900'],

    'accent': colors.emerald['500'],
    'accent-focus': colors.emerald['400'],
    'accent-content': gray['900'],

    'neutral': gray['900'],
    'neutral-focus': gray['800'],
    'neutral-content': gray['300'],

    'base-100': gray['800'],
    'base-200': gray['700'],
    'base-300': gray['600'],
    'base-content': gray['300'],

    'info': colors.emerald['700'],
    'success': colors.green['500'],
    'warning': colors.amber['500'],
    'error': colors.red['400'],

    '--pattern-fabric': colors.neutral['300'],
    '--pattern-lining': colors.emerald['700'],
    '--pattern-interfacing': colors.neutral['500'],
    '--pattern-canvas': colors.amber['700'],
    '--pattern-various': colors.red['700'],
    '--pattern-mark': colors.blue['700'],
    '--pattern-contrast': colors.pink['600'],
    '--pattern-note': colors.violet['600'],
  }
}
