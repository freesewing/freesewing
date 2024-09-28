/*
 * Helper method to save us having to type typeof checks all the time
 *
 * @param {mixed} obj - The value to check
 * @return {bool} result - True of obj is of type object
 */
export function isObject (obj) {
  return (typeof obj === 'object' && !Array.isArray(obj))
}

/*
 * Helper method to inject props into a component made for Swizzling
 *
 * @param {object} props - The props to merge
 * @param {object} components - Any swizzled components to add
 * @param {object} methods - Any swizzled methods to add
 * @return {object} props - The merged props object
 */
export function mergeProps (props, components=false, methods=false) {
  const Swizzled = isObject(props.Swizzled)
    ? props.Swizzled
    : { components: {}, methods: {} }

  if (components) {
    if (isObject(Swizzled.components)) Swizzled.components = { ...components, ...Swizzled.components }
    else Swizzled.components = components
  }

  if (methods) {
    if (isObject(Swizzled.methods)) Swizzled.methods = { ...methods, ...Swizzled.methods }
    else Swizzled.methods = methods
  }

  return { ...props, Swizzled }
}


