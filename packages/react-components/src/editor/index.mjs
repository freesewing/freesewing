import { useState, useEffect } from 'react'
import { swizzleConfig } from './swizzle/config.mjs'
import { swizzleComponents } from './swizzle/components/index.mjs'
import { swizzleHooks } from './swizzle/hooks/index.mjs'
import { swizzleMethods } from './swizzle/methods/index.mjs'
import { ViewWrapper } from './components/view-wrapper.mjs'
// This is an exception as we need to show something before Swizzled components are ready
import { TemporaryLoader as UnswizzledTemporaryLoader } from './swizzle/components/loaders.mjs'

/*
 * Namespaces used by the pattern editor
 */
export const ns = ['pe', 'measurements']

/**
 * PatternEditor is the high-level FreeSewing component
 * that provides the entire pattern editing environment
 *
 * @param {object} props.design = The name of the design we are editing
 * @param {object} props.designs = An object holding the designs code
 * @param {object} props.components = An object holding components to swizzle
 * @param {object} props.hooks = An object holding hooks to swizzle
 * @param {object} props.methods = An object holding methods to swizzle
 * @param {object} props.config = An object holding the editor config to swizzle
 * @param {object} props.locale = The locale (language) code
 * @param {object} props.preload = Any state to preload
 *
 */
export const PatternEditor = (props) => {
  const [swizzled, setSwizzled] = useState(false)

  useEffect(() => {
    if (!swizzled) {
      const merged = {
        config: swizzleConfig(props.config),
      }
      merged.methods = swizzleMethods(props.methods, merged)
      merged.components = swizzleComponents(props.components, merged)
      merged.hooks = swizzleHooks(props.hooks, merged)
      setSwizzled(merged)
    }
  }, [swizzled, props.components, props.config, props.hooks, props.methods])

  if (!swizzled?.hooks) return <UnswizzledTemporaryLoader />
  /*
   * First of all, make sure we have all the required props
   */
  const lackingProps = lackingPropsCheck(props)
  if (lackingProps !== false) return <LackingPropsError error={lackingProps} />

  /*
   * Extract props we care about
   */
  const { designs = {}, locale = 'en', preload } = props

  /*
   * Now return the view wrapper and pass it the relevant props and the swizzled props
   */
  return <ViewWrapper {...{ designs, locale, preload }} Swizzled={swizzled} />
}

/**
 * Helper function to verify that all props that are required to
 * run the editor are present.
 *
 * Note that these errors are not translation, because they are
 * not intended for end-users, but rather for developers.
 *
 * @param {object} props - The props passed to the PatternEditor component
 * @return {bool} result - Either true or false depending on required props being present
 */
const lackingPropsCheck = (props) => {
  if (typeof props.designs !== 'object')
    return "Please pass a 'designs' prop with the designs supported by this editor"
  if (Object.keys(props.designs).length < 1) return "The 'designs' prop does not hold any designs"

  return false
}

/**
 * A component to inform the user that the editor cannot be started
 * because there are missing required props
 */
const LackingPropsError = ({ error }) => (
  <div className="w-full p-0 text-center py-24">
    <h2>Unable to initialize pattern editor</h2>
    <p>{error}</p>
  </div>
)
