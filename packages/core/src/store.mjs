import set from 'lodash.set'
import unset from 'lodash.unset'
import get from 'lodash.get'

const avoid = ['set', 'setIfUnset', 'push', 'unset', 'get', 'extend']

export function Store(methods=[]) {
  for (const method of methods) {
    if (avoid.indexOf(method[0]) !== -1) {
      console.log(`WARNING: You can't squat ${method[0]}in the store`)
    } else set(this, ...method)
  }

  return this
}

/** Extends the store with additional methods */
Store.prototype.extend = function (...methods) {
  for (const [path, method] of methods) {
    if (avoid.indexOf(method[0]) !== -1) {
      console.log(`WARNING: You can't squat ${method[0]}in the store`)
    } else set(this, path, (...args) => method(this, ...args))
  }

  return this
}

/** Set key at path to value */
Store.prototype.set = function (path, value) {
  set(this, path, value)

  return this
}

/** Set key at path to value, but only if it's not currently set */
Store.prototype.setIfUnset = function (path, value) {
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
  }

  return this
}

/** Remove the key at path */
Store.prototype.unset = function (path) {
  unset(this, path)

  return this
}

/** Retrieve a key */
Store.prototype.get = function (path) {
  const val = get(this, path)
  if (typeof val === 'undefined') {
    const msg = `Tried to access \`${path}\` in the \`store\` but it is not set`
    if (typeof this.emit?.warning === 'function') this.emit.warning(msg)
    else console.log(msg)
  }

  return val
}
