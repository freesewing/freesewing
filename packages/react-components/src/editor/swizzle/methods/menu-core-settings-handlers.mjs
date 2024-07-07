/** custom event handlers for inputs that need them */
export const menuCoreSettingsOnlyHandler =
  (Swizzled, { updateHandler, current }) =>
  (path, part) => {
    // if there's no part being set, it's a reset
    if (part === undefined) return updateHandler(path, part)

    // add or remove the part from the set
    let newParts = new Set(current || [])
    if (newParts.has(part)) newParts.delete(part)
    else newParts.add(part)

    // if the set is now empty, reset
    if (newParts.size < 1) newParts = undefined
    // otherwise use the new set
    else newParts = [...newParts]

    updateHandler(path, newParts)
  }

export const menuCoreSettingsSammHandler =
  (Swizzled, { updateHandler, config }) =>
  (_path, newCurrent) => {
    // convert to millimeters if there's a value
    newCurrent = newCurrent === undefined ? config.dflt : newCurrent
    // update both values to match
    updateHandler([
      [['samm'], newCurrent],
      [['sa'], newCurrent],
    ])
  }

export const menuCoreSettingsSaboolHandler =
  (Swizzled, { updateHandler, samm }) =>
  (_path, newCurrent) => {
    updateHandler([
      // update sabool to the new current
      [['sabool'], newCurrent],
      // set sa based on whether there's a current value or not
      [['sa'], newCurrent ? samm : undefined],
    ])
  }
