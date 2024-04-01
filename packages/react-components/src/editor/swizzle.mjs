/*************************************************************************
 *                                                                       *
 * FreeSewing's pattern editor swizzle file                              *
 *                                                                       *
 * To 'swizzle' means to replace the default implementation of a         *
 * method/component with a custom one. It allows one to whitelabel       *
 * the pattern editor.                                                   *
 *                                                                       *
 * This file holds the 'useSwizzle' hook that will load the various      *
 * components that can be swizzled, as well as their default versions    *
 * that can be overridden.                                               *
 *                                                                       *
 * To use a custom version, simply pas it as a prop into the editor      *
 * under the 'swizzle' key. So to pass a custom 'TemporaryLoader'        *
 * component, you do:                                                    *
 *                                                                       *
 * <PatternEditor swizzle={{ TemporaryLoader: MyTemporaryLoader }} />    *
 *                                                                       *
 *************************************************************************/

/*
 * This hook returns a component that can be swizzled
 * So either the passed-in component, or the default one
 */
export const useSwizzle({
  TemporaryLoader = false,
}) => ({
  TemporaryLoader: TemporaryLoader || DefaultTemporaryLoader,
})


/*************************************************************************
 *                                                                       *
 * Below are all the components that can be swizzled.                    *
 * To do so, pass in a component with the name without Default prefix.   *
 *                                                                       *
 *************************************************************************/

/**
 * A temporary loader 'one moment please' style
 * Just a spinner in this case, but could also be branded.
 */
const DefaultTemporaryLoader = () => (
  <div className="">
    One moment please
  </div>
)
