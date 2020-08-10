function Store(raise) {
  this.data = new Map()
  this.raise = raise
}

/** Sets a value under index key */
Store.prototype.set = function (key, value) {
  this.data.set(key, value)
}

/** Sets a value under index key */
Store.prototype.setIfUnset = function (key, value) {
  if (!this.data.has(key)) this.data.set(key, value)
}

/** Gets a value under index key */
Store.prototype.get = function (key) {
  if (!this.data.has(key))
    this.raise.warning(`Tried to access \`${key}\` in the \`store\` but it is not set`)
  return this.data.get(key)
}

export default Store
