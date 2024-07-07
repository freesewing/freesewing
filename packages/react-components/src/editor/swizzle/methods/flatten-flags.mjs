export const flattenFlags = (Swizzled, flags) => {
  const all = {}
  for (const type of Swizzled.config.flagTypes) {
    let i = 0
    if (flags[type]) {
      for (const flag of Object.values(flags[type])) {
        i++
        all[`${type}-${i}`] = { ...flag, type }
      }
    }
  }

  return all
}
