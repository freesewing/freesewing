/*
 * Helper method to get the various IDs for a macro
 */
export const getIds = (keys, id, macroName) => {
  const ids = {}
  for (const key of keys) ids[key] = `__macro_${macroName}_${id}_${key}`

  return ids
}
