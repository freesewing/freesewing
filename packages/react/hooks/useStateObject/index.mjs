import React, { useState } from 'react'
import set from 'lodash/set.js'
import unset from 'lodash/unset.js'

/*
 * Helper method to handle object updates
 *
 * This is a wrapper around lodash.set() with extra support for unsetting data.
 *
 * @param {object} obj - The object to update
 * @param {array|string} path - The path to the property to update either as an array or string in dot notation
 * @param {mixed} val - The value to set. If the value holds the string 'unset' the property will be removed
 *
 * @return {object} obj - The mutated object
 */
export const objUpdate = (obj = {}, path, val = undefined) => {
  if (val === undefined) {
    if (Array.isArray(path) && Array.isArray(path[0])) {
      for (const [ipath, ival = undefined] of path) {
        if (ival === undefined) unset(obj, ipath)
        else set(obj, ipath, ival)
      }
    } else unset(obj, path)
  } else set(obj, path, val)

  return obj
}

/*
 * This hooks provides an React state update with an
 * update method that allows us to set deeply nested
 * properties.
 */
export const useStateObject = (dflt = {}) => {
  const [obj, setObj] = useState(dflt)

  const replace = (val) => setObj(val)

  const update = (path, val, altObj = false) => {
    const newObj = altObj ? { ...altObj } : { ...obj }
    objUpdate(newObj, path, val)
    setObj(newObj)

    return newObj
  }

  return [obj, update, replace]
}
