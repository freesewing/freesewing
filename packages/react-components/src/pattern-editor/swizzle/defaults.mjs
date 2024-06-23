/*************************************************************************
 *                                                                       *
 * FreeSewing's pattern editor allows swizzling the defaults             *
 *                                                                       *
 * To 'swizzle' means to replace a default implementation with a         *
 * custom one. It allows one to customize the pattern editor.            *
 *                                                                       *
 * This file holds the 'swizzleDefaults' method that will return         *
 * the merged defaults.                                                  *
 *                                                                       *
 * To use a custom default, simply pas it as a prop into the editor      *
 * under the 'defaults' key. So to pass custom 'ui' defaults, you do:    *
 *                                                                       *
 * <PatternEditor defaults={{ ui: { kiosk: true } }} />                  *
 *                                                                       *
 * You can also pass in a function, in which case the defaults will be   *
 * the result of the function call which will receive the standard       *
 * defaults as its argument.                                             *
 *                                                                       *
 *************************************************************************/

/*
 * This methods returns the merged/swizzled defaults
 */
export const swizzleDefaults = (customDefaults = {}) => {
  const defaults = { ...normalDefaults }
  for (const key of ['settings', 'ui']) {
    if (customDefaults[key])
      defaults[key] =
        typeof customDefaults[key] === 'function'
          ? customDefaults[key](defaults)
          : customDefaults[key]
  }

  return defaults
}

/*
 * The default defaults :)
 */
const normalDefaults = {
  settings: {},
  ui: {
    renderer: 'react',
    kiosk: false,
  },
}
