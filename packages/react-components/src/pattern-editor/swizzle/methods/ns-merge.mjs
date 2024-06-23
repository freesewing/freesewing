/**
 * Helper method to merge arrays of translation namespaces
 *
 * Note that this method is variadic
 *
 * @param {object} methods - An object holding possibly swizzled methods (unused here)
 * @param {[string]} namespaces - A string or array of strings of namespaces
 * @return {[string]} namespaces - A merged array of all namespaces
 */
export const nsMerge = (Swizzled, ...args) => {
  const ns = new Set()
  for (const arg of args) {
    if (typeof arg === 'string') ns.add(arg)
    else if (Array.isArray(arg)) {
      for (const el of nsMerge(...arg)) ns.add(el)
    }
  }

  return [...ns]
}
