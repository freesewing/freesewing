const colors = require('tailwindcss/colors')

module.exports = {

  /* FONTS
  *
  * This will apply to everything except code blocks
  */

  // fontFamily: The font family to use.
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

  // base-100: The default background color
  'base-100': colors.neutral['50'],
  // base-200: A slightly different background color, used for hovers and so on
  'base-200': colors.neutral['200'],
  // base-300: A shade midway between dark and light
  'base-300': colors.neutral['400'],
  // base-content: The default text color
  'base-content': colors.neutral['700'],

  // primary: The main brand color and color of the primary button
  'primary': colors.sky['500'],
  // primary-focus: The :hover color for the primary button
  'primary-focus': colors.sky['600'],
  // primary-content: The text color for the primary button
  'primary-content': colors.sky['100'],

  // secondary: The link color
  'secondary': colors.violet['500'],
  // secondary: The :hover link color
  'secondary-focus': colors.violet['400'],
  // secondary: An alternative link color for on dark backgrounds
  // Typically a light shade of the secondary color
  'secondary-content': colors.violet['300'],

  // accent: The accent color is used to highlight active things
  // Should be something is positive/neutral. Avoid red or orange.
  'accent': colors.emerald['500'],
  // accent-focus: The :hover color for the accent button
  'accent-focus': colors.emerald['400'],
  // accent-content: The text color for the accent button
  'accent-content': colors.neutral['900'],

  // neutral: Used as the background for the footer and code blocks.
  // Should always be dark(ish) because of prism syntax highlighting
  'neutral': colors.neutral['800'],
  // neutral-focus: Typically a shade lighter than neutral
  'neutral-focus': colors.neutral['700'],
  // neutral-content: The text color on neutral backgrounds
  'neutral-content': colors.neutral['200'],

  // info: Used rarely, can be another color best somewhat neutral looking
  // and should work with the default text color
  'info': colors.pink['400'],
  // success: Used rarely, but if it is it's in notifications indicating success
  // Typically some shade of green
  'success': colors.green['600'],
  // warning: We don't do warnings, but this is used for the tabs under code blocks
  // and a couple of other UI elements.
  'warning': colors.amber['500'],
  // error: Used rarely, but if it is it's in notifications indicating success
  // or the danger button
  // Typically some shade of red
  'error': colors.red['600'],

  /* CODE HIGHLIGHTING COLORS
  *
  * These are variables to style highlighted code blocks.
  *
  * Specifically this first set applies to the wrapper around
  * the highlighted code.
  * The names should (hopefully) speak for themselves
  */
  '--code-background-color': colors.neutral['100'],
  '--code-border-color': colors.neutral['300'],
  '--code-color': colors.neutral['900'],
  '--code-font-family': `"SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace`,
  '--code-border-radius': '0.5rem',
  '--code-border-style': 'solid',
  '--code-border-width': 1,
  '--code-outer-padding': '0 0.5rem',
  '--code-inner-padding': '1rem',
  /*
    * These variables are used to style the highlighted tokesn themselves
    */
  '--code-color-keyword': colors.pink['500'],
  '--code-font-weight-keyword': 'bold',
  '--code-color-entity': colors.violet['500'],
  '--code-font-weight-entity': 'bold',
  '--code-color-constant': colors.lime['600'],
  '--code-color-string': colors.sky['600'],
  '--code-font-style-string': 'italic',
  '--code-color-variable': colors.indigo['600'],
  '--code-color-comment': colors.neutral['600'],
  '--code-color-tag': colors.green['600'],
  '--code-color-property': 'inherit',
  '--code-font-weight-property': 'bold',
}

