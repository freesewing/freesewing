import get from 'lodash.get'
import set from 'lodash.set'
import unset from 'lodash.unset'

const UNSET = '__UNSET__'
/*
 * Helper method to handle object updates
 *
 * @param {object} methods - An object holding possibly swizzled methods (unused here)
 * @param {object} obj - The object to update
 * @param {string|array} path - The path to the key to update, either as array or dot notation
 * @param {mixed} val - The new value to set or 'unset' to unset the value
 * @return {object} result - The updated object
 */
export const objUpdate = (Swizzled, obj = {}, path, val = '__UNSET__') => {
  if (val === UNSET) unset(obj, path)
  else set(obj, path, val)

  return obj
}

/*
 * Helper method to handle object updates that also updates the undo history in ephemeral state
 *
 * @param {object} methods - An object holding possibly swizzled methods (unused here)
 * @param {object} obj - The object to update
 * @param {string|array} path - The path to the key to update, either as array or dot notation
 * @param {mixed} val - The new value to set or 'unset' to unset the value
 * @param {function} setEphemeralState - The ephemeral state setter
 * @return {object} result - The updated object
 */
export const undoableObjUpdate = (
  Swizzled,
  name,
  obj = {},
  path,
  val = '__UNSET__',
  setEphemeralState
) => {
  const current = get(obj, path)
  setEphemeralState((cur) => {
    if (!Array.isArray(cur.undos)) cur.undos = []
    return {
      ...cur,
      undos: [
        {
          name,
          time: Date.now(),
          path,
          old: current,
          new: val,
          restore: Swizzled.methods.cloneObject(obj),
        },
        ...cur.undos,
      ],
    }
  })

  return Swizzled.methods.objUpdate(obj, path, val)
}

/*
 * Helper method to add an undo step for which state updates are handles in another way
 *
 * This is typically used for SA changes as it requires changing 3 fields:
 * - sabool: Is sa on or off?
 * - sa: sa value for core
 * - samm: Holds the sa value in mm even when sa is off
 *
 * @param {object} Swizzled - An object holding possibly swizzled code (unused here)
 * @param {object} undo - The undo step to add
 * @param {object} restore - The state to restore for this step
 * @param {function} setEphemeralState - The ephemeral state setter
 */
export const addUndoStep = (Swizzled, undo, restore, setEphemeralState) => {
  setEphemeralState((cur) => {
    if (!Array.isArray(cur.undos)) cur.undos = []
    return {
      ...cur,
      undos: [
        { time: Date.now(), ...undo, restore: Swizzled.methods.cloneObject(restore) },
        ...cur.undos,
      ],
    }
  })
}

/*
 * Helper method to clone an object
 */
export const cloneObject = (Swizzled, obj) => JSON.parse(JSON.stringify(obj))
