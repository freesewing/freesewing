/*
 * Loading MDX dynamically is non-trivial an depends on the
 * environment in which the component is loaded.
 * By default, we use this component, which disabled loading
 * inline docs. If you want this to work, you need to pass in
 * your own DynamicMdx component into the editor:
 *
 * <PatternEditor components={{ DynamicMdx: MyComponent }} />
 */
export const DynamicMdx = ({ Swizzled }) => (
  <Swizzled.components.Popout node>Not implemented</Swizzled.components.Popout>
)
