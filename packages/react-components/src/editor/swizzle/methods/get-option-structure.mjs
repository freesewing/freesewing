/*
 * Helper method to grab an option from an Design options structure
 *
 * Since these structures can be nested with option groups, this needs some extra logic
 */
export const getOptionStructure = (Swizzled, option, Design, state) => {
  const structure = Swizzled.methods.menuDesignOptionsStructure(
    Design.patternConfig.options,
    state.settings
  )
  console.log({ structure })

  return Swizzled.methods.findOption(structure, option)
}

export const findOption = (Swizzled, structure, option) => {
  for (const [key, val] of Object.entries(structure)) {
    if (key === option) return val
    if (val.isGroup) {
      const sub = findOption(val, option)
      if (sub) return sub
    }
  }

  return false
}
