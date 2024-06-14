import { ViewWrapper } from './components/view-wrapper.mjs'
import { useComponents } from './hooks/use-components.mjs'
import { useHooks } from './hooks/use-hooks.mjs'
import { useMethods } from './hooks/use-methods.mjs'
import { useConfig } from './hooks/use-config.mjs'

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
 *
 */
export const PatternEditor = (props) => {
  /*
   * Allow swizzling of components and methods
   */
  const config = useConfig(props.config)
  const methods = useMethods(props.methods, config)
  const components = useComponents(props.components, methods)
  const hooks = useHooks(props.hooks, methods)

  /*
   * First of all, make sure we have all the required props
   */
  const lackingProps = lackingPropsCheck(props)
  if (lackingProps !== false) return <LackingPropsError error={lackingProps} />

  /*
   * Now return the view wrapper
   */
  return <ViewWrapper {...props} {...{ components, methods, hooks, config }} />
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
