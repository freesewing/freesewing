/*************************************************************************
 *                                                                       *
 * FreeSewing's pattern editor useDefaults hook, with swizzle support    *
 *                                                                       *
 * To 'swizzle' means to replace the defaults with other values.         *
 * It allows one to customize the pattern editor.                        *
 *                                                                       *
 * This file holds the 'useDefaults' hook that will load the various     *
 * defaults that can be swizzled, as well as their default versions      *
 * that can be overridden.                                               *
 *                                                                       *
 * To use a custom default, simply pas it as a prop into the editor      *
 * under the 'defaults' key. So to pass custom 'ui' defaults, you do:    *
 *                                                                       *
 * <PatternEditor defaults={{ ui: { kiosk: true } }} />                  *
 *                                                                       *
 * You can also pass in a function, in which case the defaults will be   *
 * the result of the function call.                                      *
 *                                                                       *
 *************************************************************************/

/*
 * This hook returns methods that can be swizzled
 * So either the passed-in methods, or the default ones
 */
export const useDefaults = (props) => ({
  settings: props?.settings || settings,
  ui: props?.ui || ui,
})

/*
 * Default pattern settings
 */
const settings = {}

/*
 * Default UI settings
 */
const ui = {
  renderer: 'react',
  kiosk: false,
}
