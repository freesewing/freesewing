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
  if (val === UNSET) {
    if (Array.isArray(path) && Array.isArray(path[0])) {
      for (const [ipath, ival = UNSET] of path) {
        if (ival === UNSET) unset(obj, ipath)
        else set(obj, ipath, ival)
      }
    } else unset(obj, path)
  } else set(obj, path, val)

  return obj
}
