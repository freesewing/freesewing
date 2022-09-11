import set from 'lodash.set'
import unset from 'lodash.unset'
import get from 'lodash.get'

const avoid = ['set', 'setIfUnset', 'push', 'unset', 'get', 'extend']

export function Store(methods = []) {
  for (const method of methods) {
    if (avoid.indexOf(method[0]) !== -1) {
      console.log(`WARNING: You can't squat ${method[0]}in the store`)
    } else set(this, ...method)
  }

  /*
   * Default logging methods
   * You can override these with a plugin
   */
  const logs = {
    debug: [],
    info: [],
    warning: [],
    error: [],
  }
  this.log = {
    debug: function (...data) {
      logs.debug.push(...data)
    },
    info: function (...data) {
      logs.info.push(...data)
    },
    warning: function (...data) {
      logs.warning.push(...data)
    },
    error: function (...data) {
      logs.error.push(...data)
    },
  }
  this.logs = logs

  return this
}

/** Extends the store with additional methods */
Store.prototype.extend = function (...methods) {
  for (const [path, method] of methods) {
    if (avoid.indexOf(method[0]) !== -1) {
      this.log.warning(`You can't squat ${method[0]}in the store`)
    } else {
      this.log.info(`Extending store with ${path}`)
      set(this, path, (...args) => method(this, ...args))
    }
  }

  return this
}

/** Set key at path to value */
Store.prototype.set = function (path, value) {
  if (typeof value === 'undefined') {
    this.log.warning(`Store.set(value) on key \`${path}\`, but value is undefined`)
  }
  set(this, path, value)

  return this
}

/** Set key at path to value, but only if it's not currently set */
Store.prototype.setIfUnset = function (path, value) {
  if (typeof value === 'undefined') {
    this.log.warning(`Store.setIfUnset(value) on key \`${path}\`, but value is undefined`)
  }
  if (typeof get(this, path) === 'undefined') {
    return set(this, path, value)
  }

  return this
}

/** Adds a value to an array stored under path */
Store.prototype.push = function (path, ...values) {
  const arr = get(this, path)
  if (Array.isArray(arr)) {
    return this.set(path, [...arr, ...values])
  } else {
    this.log.warning(`Store.push(value) on key \`${path}\`, but key does not hold an array`)
  }

  return this
}

/** Remove the key at path */
Store.prototype.unset = function (path) {
  unset(this, path)

  return this
}

/** Retrieve a key */
Store.prototype.get = function (path, dflt) {
  const val = get(this, path, dflt)
  if (typeof val === 'undefined') {
    this.log.warning(`Store.get(key) on key \`${path}\`, which is undefined`)
  }

  return val
}
