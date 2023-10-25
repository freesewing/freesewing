import set from 'lodash.set'
import unset from 'lodash.unset'
import get from 'lodash.get'

/*
 * Don't allow setting of these top-level keys in the store
 */
const avoid = [
  'set',
  'setIfUnset',
  'push',
  'unset',
  'get',
  'extend',
  'generateMacroIds',
  'getMacroIds',
  'removeMacroNodes',
]

//////////////////////////////////////////////
//               CONSTRUCTOR                //
//////////////////////////////////////////////

/**
 * Constructor for a Store
 *
 * @constructor
 * @param {Array} methods - Any methods to add to the store
 * @return {Store} this - The Store instance
 */
export function Store(methods = []) {
  /*
   * Default logging containers
   */
  const logs = {
    debug: [],
    info: [],
    warn: [],
    error: [],
  }

  /*
   * Default logging methods
   * You can override these with a plugin
   */
  this.log = {
    debug: function (...data) {
      logs.debug.push(...data)
    },
    info: function (...data) {
      logs.info.push(...data)
    },
    warn: function (...data) {
      logs.warn.push(...data)
    },
    error: function (...data) {
      if (typeof window !== 'undefined') console.error(...data[0])
      logs.error.push(...data)
    },
  }

  /*
   * Attach logs object
   */
  this.logs = logs

  /*
   * Method to generate macro IDs
   */
  this.generateMacroIds = function (keys, id, macro = false) {
    if (!macro) macro = this.get('activeMacro')
    const ids = {}
    for (const key of keys) ids[key] = `__macro_${macro}_${id}_${key}`

    return ids
  }

  /*
   * Method to store macro IDs
   */
  this.storeMacroIds = function (id, ids, macro = false, part = false) {
    if (!macro) macro = this.get('activeMacro')
    if (!part) part = this.get('activePart')
    this.set(['parts', part, 'macros', macro, 'ids', id], ids)
  }

  /*
   * Method to retrieve macro IDs
   */
  this.getMacroIds = function (id, macro = false, part = false) {
    if (!macro) macro = this.get('activeMacro')
    if (!part) part = this.get('activePart')

    return this.get(['parts', part, 'macros', macro.toLowerCase(), 'ids', id], false)
  }

  /*
   * Method to remove nodes added by a macro
   */
  this.removeMacroNodes = function (id, macro, part) {
    const toRemove = this.getMacroIds(id, macro, part.name)
    if (toRemove) {
      if (toRemove.points) {
        for (const nodeId of Object.values(toRemove.points)) delete part.points[nodeId]
      }
      if (toRemove.paths) {
        for (const nodeId of Object.values(toRemove.paths)) delete part.paths[nodeId]
      }
    }

    return this.getMacroIds(id, macro)
  }

  /*
   * Add fallback packing algorithm
   */
  this.pack = fallbackPacker

  /*
   * Attache passed-in methods
   */
  for (const [path, method] of methods) {
    if (avoid.indexOf(path) !== -1) {
      this.log.warn(`You cannot overwrite \`store.${path}()\``)
    } else set(this, path, method)
  }

  return this
}

//////////////////////////////////////////////
//            PUBLIC METHODS                //
//////////////////////////////////////////////

/**
 * Extend the store with additional methods
 *
 * @param {function} method - Method to add to the store (variadic)
 * @return {Store} this - The Store instance
 */
Store.prototype.extend = function (methods) {
  for (const [path, method] of methods) {
    if (avoid.indexOf(path) !== -1) {
      this.log.warn(`You cannot overwrite \`store.${path}()\``)
    } else {
      this.log.info(`Extending store with \`${path}\``)
      set(this, path, (...args) => method(this, ...args))
    }
  }

  return this
}

/**
 * Retrieve a key from the store
 *
 * @param {string|array} path - Path to the key
 * @param {mixed} dflt - Default method to return if key is undefined
 * @return {mixed} value - The value stored under key
 */
Store.prototype.get = function (path, dflt) {
  const val = get(this, path, dflt)
  if (typeof val === 'undefined') {
    this.log.warn(`Store.get(key) on key \`${path}\`, which is undefined`)
  }

  return val
}

/**
 * Adds a value to an array stored under path
 *
 * @param {string|array} path - Path to the key
 * @param {mixed} values - One or more values to add (variadic)
 * @return {Store} this - The Store instance
 */
Store.prototype.push = function (path, ...values) {
  const arr = get(this, path)
  if (Array.isArray(arr)) {
    return this.set(path, [...arr, ...values])
  } else {
    this.log.warn(`Store.push(value) on key \`${path}\`, but key does not hold an array`)
  }

  return this
}

/**
 * Set key at path to value
 *
 * @param {string|array} path - Path to the key
 * @param {mixed} value - The value to set
 * @return {Store} this - The Store instance
 */
Store.prototype.set = function (path, value) {
  if (typeof value === 'undefined') {
    this.log.warn(`Store.set(value) on key \`${path}\`, but value is undefined`)
  }
  set(this, path, value)

  return this
}

/**
 * Set key at path to value, but only if it's not currently set
 *
 * @param {string|array} path - Path to the key
 * @param {mixed} value - The value to set
 * @return {Store} this - The Store instance
 */
Store.prototype.setIfUnset = function (path, value) {
  if (typeof value === 'undefined') {
    this.log.warn(`Store.setIfUnset(value) on key \`${path}\`, but value is undefined`)
  }
  if (typeof get(this, path) === 'undefined') {
    return set(this, path, value)
  }

  return this
}

/**
 * Remove the key at path
 *
 * @param {string|array} path - Path to the key
 * @param {mixed} value - The value to set
 * @return {Store} this - The Store instance
 */
Store.prototype.unset = function (path) {
  unset(this, path)

  return this
}

/**
 * The default pack method comes from a plugin, typically
 * plugin-bin-back which is part of core plugins.
 * However, when a pattern is loaded without plugins
 * we stil don't want it work even when no pack method
 * is available, so this is the fallback default pack method.
 */
function fallbackPacker(items) {
  let w = 0
  let h = 0
  for (const item of items) {
    if (item.width > w) w = item.width
    if (item.height > w) w = item.height
  }

  return { w, h }
}
