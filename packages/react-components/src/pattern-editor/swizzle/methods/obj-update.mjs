import set from 'lodash.set'
import unset from 'lodash.unset'

/*
 * Helper method to handle object updates
 *
 * @param {object} methods - An object holding possibly swizzled methods (unused here)
 * @param {object} obj - The object to update
 * @param {string|array} path - The path to the key to update, either as array or dot notation
 * @param {mixed} val - The new value to set or 'unset' to unset the value
 * @return {object} result - The updated object
 */
export const objUpdate = (methods, obj = {}, path, val = 'unset') => {
  if (val === 'unset') {
    if (Array.isArray(path) && Array.isArray(path[0])) {
      for (const [ipath, ival = 'unset'] of path) {
        if (ival === 'unset') unset(obj, ipath)
        else set(obj, ipath, ival)
      }
    } else unset(obj, path)
  } else set(obj, path, val)

  return obj
}
