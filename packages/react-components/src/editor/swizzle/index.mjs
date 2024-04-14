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
export const useSwizzle = ({
  TemporaryLoader = false,
  DesignsView = false,
}) => ({
  DesignsView: DesignsView || DefaultDesignsView,
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

/**
 * The design view is loaded if and only if not design is passed to the editor
 */
const DefaultDesignsView = ({ designs={}, setView, t }) => (
  <div className="text-center mt-8">
    <h2>{t('pickADesign')}</h2>
    <ul className="flex flex-row flex-wrap gap-2 items-center justify-center max-w-2xl px-8 mx-auto">
      {Object.entries(designs).map(([name, design]) => (
        <li key={design}>
          <button className={`btn btn-primary btn-outline btn-sm capitalize font-bold `}>{name}</button>
        </li>
      ))}
    </ul>
  </div>
)
