import { createContext, useState } from 'react'
import { objUpdate } from 'shared/utils.mjs'
import { siteNav as defaultSiteNav } from 'site/prebuild/sitenav.mjs'
import { slugLut as defaultSlugLut } from 'site/prebuild/sluglut.mjs'
import { useRouter } from 'next/router'

/*
 * The context, which uses the default pre-build data
 */
export const NavigationContext = createContext({
  siteNav: defaultSiteNav,
  slugLut: defaultSlugLut,
})

/*
 * The context provider which will pass the value down
 */
export const NavigationContextProvider = ({ children }) => {
  /*
   * Get the locale and slug from the Next's router object
   */
  const { locale, asPath } = useRouter()
  const slug = asPath.slice(1) // Strip the leading slash

  /*
   * Helper method to hot-update the siteNav object
   * This object is created in the prebuild step and holds all site pages.
   * However, sometimes we want to update it with user-generated pages such
   * as individual patterns or measurments sets
   *
   * This uses objUpdate() from utils, which is just a wrapper around lodash.set
   * that has additional functionality to unset/delete values.
   *
   * @param path {string} - Path to the value to update. See lodash.set for details.
   * @param value {value} to set
   */
  function updateSiteNav(path, value) {
    setSiteNav(objUpdate(siteNav[locale], path, value))
  }

  /*
   * Helper method to update the slugLut
   * This is a list of slugs of all the pages in the order one would expect them.
   * This makes it easy to put a 'next page' or 'previous page' link as we just grab
   * the next/previous entry on the list and lookup its title in the siteNav objectt.
   *
   * Currently not implemented: How do we update this for user-generated content?
   * Perhaps something like:  updateSlugLut('after', slug)
   * We'll do this later. Not even certain it's needed as we may just not place
   * previous/next links on user-generated content.
   */
  function updateSlugLut() {
    // FIXME: Is this even needed?
    console.log('updateSlugLut is not implemented (yet)')
  }

  /*
   * Helper method for when we want to update both the siteNav and slugLut object in one call
   */
  function update(obj) {
    if (obj.siteNav) updateSiteNav(...obj.siteNav)
    if (obj.slugLut) updateSlugLut(...obj.slugLut)
  }

  /*
   * Local state
   * Remember that only a state of prop change will trigger a re-render.
   * So if we want changes to the context to propogate throughout the components
   * using the context, we need to make the context value itself a state value
   * so that updating it will trigger a re-render and the propagated value will update.
   */
  const [siteNav, setSiteNav] = useState(defaultSiteNav)
  const [slugLut] = useState(defaultSlugLut)

  /*
   * Pass everything down as the value object, including the methods to update
   * the state (which will in turn update the context value)
   *
   * Note that we're only passing down the siteNav object for the current locale
   */
  return (
    <NavigationContext.Provider
      value={{
        siteNav: siteNav[locale],
        slugLut,
        slug,
        locale,
        updateSiteNav,
        updateSlugLut,
        update,
      }}
    >
      {children}
    </NavigationContext.Provider>
  )
}
