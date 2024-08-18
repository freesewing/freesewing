/** custom event handlers for inputs that need them */
export const menuCoreSettingsOnlyHandler =
  (Swizzled, { updateHandler, current }) =>
  (path, part) => {
    // Is this a reset?
    if (part === undefined || part === '__UNSET__') return updateHandler(path, part)

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
    updateHandler(['samm'], newCurrent)
    updateHandler(['sa'], newCurrent)
  }

export const menuCoreSettingsSaboolHandler = (Swizzled, { toggleSa }) => toggleSa
