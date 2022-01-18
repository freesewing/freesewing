/**
 * This is a theme file for FreeSewing's NextJS-based website
 *
 * You can change colors, fonts, and a few other things here.
 * While technically, you can change more, it is not recommended.
 * Best to stick to the examples in this light theme
 *
 * If you want to make your own theme, copy this file to a new name.
 * Then update the index.js to include it, and you're good to go.
 */

/*
 * We're using the TailwindCSS colors.
 * Let's include them so we can reference them by name.
 * For a full list, see: https://tailwindcss.com/docs/customizing-colors
 */
const colors = require('tailwindcss/colors')

module.exports = {
  /* FONTS
  *
  * This will apply to everything except code blocks
  * Note that we're using a system font stack here.
  * That means we're not loading any fonts in the browser,
  * but rather relying on what the user has available locally.
  */
  'fontFamily': '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',

  /* COLORS
  *
  * These names are a bit 'bootstrap' like, which can be misleading.
  * We don't really use primary and secondary colors, nor do we have
  * a warning color and so on.
  * However, these names are used under the hood by TailwindCSS
  * and DaisyUI, so we're stuck with them.
  *
  * Read the descriptions below to understand what each color is used for.
  */

  // base-100: The default background color for a regular page (docs and so on)
  'base-100': colors.neutral['50'],
  // base-200: A slightly darker background color, used for hovers and so on
  'base-200': colors.neutral['200'],
  // base-300: A shade midway between dark and light
  'base-300': colors.neutral['400'],
  // base-content: The default text color for a regular page (docs and so on)
  'base-content': colors.neutral['700'],

  // primary: The main brand color and color of the primary button
  'primary': colors.violet['700'],
  // primary-focus: The :hover color for the primary button
  'primary-focus': colors.violet['600'],
  // primary-content: The text color on a primary button
  'primary-content': colors.neutral['50'],

  // secondary: The link color on default backgrounds (base-100)
  'secondary': colors.sky['500'],
  // secondary-focus: The :hover link color for default backgrounds. Or:
  // secondary-focus: An alternative link color for on dark backgrounds
  'secondary-focus': colors.sky['400'],
  // secondary-content: The text color on a secondary button
  'secondary-content': colors.sky['50'],

  // accent: The accent color is used to highlight active things
  // Should be something is positive/neutral. Avoid red or orange.
  'accent': colors.pink['400'],
  // accent-focus: The :hover color for the accent button
  'accent-focus': colors.pink['300'],
  // accent-content: The text color for the accent button
  'accent-content': colors.pink['50'],

  // neutral: Used as the background for the footer and navigation on desktop
  // Should always be dark
  'neutral': colors.neutral['900'],
  // neutral-focus: Typically a shade lighter than neutral
  'neutral-focus': colors.neutral['700'],
  // neutral-content: The text color on neutral backgrounds
  'neutral-content': colors.neutral['50'],

  // info: Used rarely, can be another color best somewhat neutral looking
  // and should work with the default text color
  'info': colors.indigo['600'],
  // Text color on the info button
  '--btn-info-content': colors.neutral[50],
  // success: Used rarely, but if it is it's in notifications indicating success
  // Typically some shade of green
  'success': colors.green['600'],
  // Text color on the success button
  '--btn-success-content': colors.neutral[50],
  // warning: We don't do warnings, but this is used for the tabs under code blocks
  // and a couple of other UI elements.
  'warning': colors.orange['500'],
  // Text color on the warning button
  '--btn-warning-content': colors.neutral[50],
  // error: Used rarely, but if it is it's in notifications indicating success
  // or the danger button
  // Typically some shade of red
  'error': colors.red['600'],
  // Text color on the error button
  '--btn-error-content': colors.neutral[50],

  /* VARIOUS
  *
  * These are additional variables to control other aspects of the theme
  */
  // border-radius for cards and other big elements
  '--rounded-box': '0.5rem',
  // border-radius for buttons and similar elements
  '--rounded-btn': '0.5rem',
  // border-radius for badges and other small elements
  '--rounded-badge': '1.9rem',
  // bounce animation time for button
  '--animation-btn': '0.25s',
  // bounce animation time for checkbox, toggle, etc
  '--animation-input': '.4s',
  // default card-body padding
  '--padding-card': '2rem',
  // default text case for buttons
  '--btn-text-case': 'uppercase',
  // default padding for navbar
  '--navbar-padding': '.5rem',
  // default border size for button
  '--border-btn': '1px',
  // focus ring size for button and inputs
  '--focus-ring': '2px',
  // focus ring offset size for button and inputs
  '--focus-ring-offset': '2px',

  /* THEME GRADIENT
  *
  * This is used as a border & loading indicator
  */
  '--theme-gradient': `repeating-linear-gradient(
    -45deg,
    ${colors.neutral[900]} 0,
    ${colors.neutral[900]} 10px,
    ${colors.neutral[50]} 10px,
    ${colors.neutral[50]} 20px
  )`,

  /* CODE HIGHLIGHTING COLORS
  *
  * These are variables to style highlighted code blocks.
  *
  * Specifically this first set applies to the wrapper around
  * the highlighted code.
  * The names should (hopefully) speak for themselves
  */
  '--code-background-color': colors.neutral['800'],
  '--code-border-color': colors.neutral['900'],
  '--code-color': colors.neutral['100'],
  '--code-font-family': `"SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace`,
  '--code-border-radius': '0.5rem',
  '--code-border-style': 'solid',
  '--code-border-width': 1,
  '--code-outer-padding': '0 0.5rem',
  '--code-inner-padding': '1rem',
  /*
    * These variables are used to style the highlighted tokens themselves
    */
  '--code-color-keyword': colors.pink['400'],
  '--code-font-weight-keyword': 'bold',
  '--code-color-entity': colors.violet['400'],
  '--code-font-weight-entity': 'bold',
  '--code-color-constant': colors.lime['400'],
  '--code-color-string': colors.sky['400'],
  '--code-font-style-string': 'italic',
  '--code-color-variable': colors.indigo['400'],
  '--code-color-comment': colors.neutral['400'],
  '--code-color-tag': colors.green['400'],
  '--code-color-property': 'inherit',
  '--code-font-weight-property': 'bold',

  /* FREESEWING PATTERN THEMEING
  *
  * These are variables to style FreeSewing SVG output (drafts, examples, and so on)
  */
  // Pattern background color
  '--pattern-bg': colors.neutral['50'],
  // Color for the main fabric
  '--pattern-fabric': colors.neutral['700'],
  // Color for lining fabric
  '--pattern-lining': colors.emerald['500'],
  // Color for interfacing
  '--pattern-interfacing': colors.neutral['400'],
  // Color for canvas
  '--pattern-canvas': colors.amber['600'],
  // Color for various fabric types
  '--pattern-various': colors.red['500'],
  // Color for marking things on a pattern
  '--pattern-mark': colors.blue['500'],
  // Color to provide contrast on a pattern
  '--pattern-contrast': colors.pink['500'],
  // Color for noting things on a pattern
  '--pattern-note': colors.violet['500'],

  // Color 0 in develop mode
  '--pattern-dev-0': colors.red['500'],
  // Color 1 in develop mode
  '--pattern-dev-1': colors.green['500'],
  // Color 2 in develop mode
  '--pattern-dev-2': colors.blue['500'],
  // Color 3 in develop mode
  '--pattern-dev-3': colors.yellow['500'],
  // Color 4 in develop mode
  '--pattern-dev-4': colors.pink['500'],
  // Color 5 in develop mode
  '--pattern-dev-5': colors.violet['500'],
  // Color 6 in develop mode
  '--pattern-dev-6': colors.teal['500'],
  // Color 7 in develop mode
  '--pattern-dev-7': colors.neutral['500'],

  // Pattern xs text size
  '--pattern-text-xs': '0.2rem',
  // Pattern sm text size
  '--pattern-text-sm': '0.3rem',
  // Pattern default text size
  '--pattern-text': '0.4rem',
  // Pattern lg text size
  '--pattern-text-lg': '0.6rem',
  // Pattern xl text size
  '--pattern-text-xl': '0.8rem',
  // Pattern 2xl text size
  '--pattern-text-2xl': '1.5rem',
  // Pattern 3xl text size
  '--pattern-text-3xl': '2rem',
  // Pattern 4xl text size
  '--pattern-text-4xl': '3rem',

  // Pattern overal scale for strokes and text sizes
  '--pattern-scale': '1',
  // Pattern xs stroke width
  '--pattern-stroke-xs': "0.2px",
  // Pattern sm stroke width
  '--pattern-stroke-sm': "0.4px",
  // Pattern default stroke width
  '--pattern-stroke': "0.7px",
  // Pattern lg stroke width
  '--pattern-stroke-lg': "1.3px",
  // Pattern xl stroke width
  '--pattern-stroke-xl': "2px",
  // Pattern xxl stroke width
  '--pattern-stroke-2xl': "4px",
}
