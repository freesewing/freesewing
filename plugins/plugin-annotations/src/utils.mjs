/*
 * Helper method to get the various IDs for a macro
 */
export const getIds = (keys, id, macroName) => {
  const ids = {}
  for (const key of keys) ids[key] = `__macro_${macroName}_${id}_${key}`

  return ids
}

/*
 * Helper method to get an existing macro id
 */
const getIdsFromStore = (store, id, macroName, partName = false) => {
  if (!partName) partName = store.activePart
  const data = store.get(['parts', partName, 'macros', macroName, 'ids', id])

  return data ? data : false
}

/*
 * Add these to the store
 */
export const utilsStores = [
  ['createMacroIds', (store, keys, id, macroName) => getIds(keys, id, macroName)],
  ['getMacroIds', getIdsFromStore],
]
