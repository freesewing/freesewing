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
  // base-300: Another slightly different background color, used for another level of distinction
  'base-300': '#f3e7f5',
  // base-content: The default text color
  'base-content': colors.trueGray['700'],

  // primary: The main brand color and color of the primary button
  'primary': colors.violet['800'],
  // primary-focus: The :hover color for the primary button
  'primary-focus': colors.violet['700'],
  // primary-content: The text color for the primary button
  'primary-content': colors.violet['100'],

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

  // neutral: Used as the background for code blocks.
  // Should always be dark(ish) because of prism syntax highlighting
  'neutral': colors.trueGray['800'],
  // FIXME
  'neutral-focus': colors.trueGray['700'],
  // FIXME
  'neutral-content': colors.trueGray['200'],

  // FIXME
  'info': colors.violet['600'],
  // success: Used rarely, but if it is it's in notifications indicating success
  // Typically some shade of green
  'success': colors.green['500'],
  // warning: We don't do warnings, but this is used for the tabs under code blocks
  // and a couple of other UI elements.
  'warning': colors.amber['500'],
  // error: Used rarely, but if it is it's in notifications indicating success
  // or the danger button
  // Typically some shade of red
  'error': colors.red['500'],

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

