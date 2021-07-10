/**
 * This is a theme file for FreeSewing's NextJS-based website
 *
 * You can change colors, fonts, and a few other things here.
 * While technically, you can change more, it's really not recommended.
 * Best to stick to the examples in this light theme
 *
 * If you want to make your own theme, copy this file to a new name.
 * Update ../index.js to include it, and you're good to go.
 */

/*
 * We're using the TailwindCSS colors.
 * Let's include them so we can reference them by name.
 * For a full list, see: https://tailwindcss.com/docs/customizing-colors
 */
const colors = require('tailwindcss/colors')

module.exports = {
  displayName: "🌞 Light",
  config: {

    /* FONTS
    *
    * This will apply to everything except code blocks
    */

    // fontFamily: The font family to use.
    'fontFamily': 'Ubuntu',

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

    // base-100: The default background color
    'base-100': colors.trueGray['100'],
    // base-200: A slightly different background color, used for hovers and so on
    'base-200': colors.trueGray['200'],
    // base-300: A shade midway between dark and light
    'base-300': colors.trueGray['400'],
    // base-content: The default text color
    'base-content': colors.trueGray['700'],

    // primary: The main brand color and color of the primary button
    'primary': colors.trueGray['900'],
    // primary-focus: The :hover color for the primary button
    'primary-focus': colors.violet['600'],
    // primary-content: The text color for the primary button
    'primary-content': colors.trueGray['200'],

    // secondary: The link color
    'secondary': colors.violet['500'],
    // secondary: The :hover link color
    'secondary-focus': colors.violet['400'],
    // secondary: An alternative link color for on dark backgrounds
    // Typically a light shade of the secondary color
    'secondary-content': colors.violet['300'],

    // accent: The main accent color and color of the accent button
    'accent': colors.fuchsia['500'],
    // accent-focus: The :hover color for the accent button
    'accent-focus': colors.fuchsia['400'],
    // accent-content: The text color for the accent button
    'accent-content': colors.trueGray['900'],

    // neutral: Used as the background for the footer and code blocks.
    // Should always be dark(ish) because of prism syntax highlighting
    'neutral': colors.trueGray['800'],
    // neutral-focus: Typically a shade lighter than neutral
    'neutral-focus': colors.trueGray['700'],
    // neutral-content: The text color on neutral backgrounds
    'neutral-content': colors.trueGray['200'],

    // info: Used rarely, can be another color best somewhat neutral looking
    // and should work with the default text color
    'info': colors.amber['300'],
    // success: Used rarely, but if it is it's in notifications indicating success
    // Typically some shade of green
    'success': colors.green['500'],
    // warning: We don't do warnings, but this is used for the tabs under code blocks
    // and a couple of other UI elements.
    'warning': colors.amber['500'],
    // error: Used rarely, but if it is it's in notifications indicating success
    // or the danger button
    // Typically some shade of red
    'error': colors.red['600'],

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

    /* FREESEWING PATTERN COLORS
    *
    * These are variables to style FreeSewing SVG output (drafts, examples, and so on)
    */

    // Color for the main fabric
    '--pattern-fabric': colors.trueGray['700'],
    // Color for lining fabric
    '--pattern-lining': colors.emerald['500'],
    // Color for interfacing
    '--pattern-interfacing': colors.trueGray['400'],
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

    /* ADVANCED
    *
    * You can override CSS this way, but ask yourself: why?
    *
    * One thing we do is take care of links in MDX content.
    * Since this content is styled by the TailwindCSS Typography
    * plugin, it won't follow the theme link styling.
    */
    ".mdx.prose a" : {
      color: colors.violet['500'],
      'text-decoration': 'none',
    },
    ".mdx.prose a:hover" : {
      color: colors.violet['400'],
    },
  }
}
