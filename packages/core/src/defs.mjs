//////////////////////////////////////////////
//               CONSTRUCTOR                //
//////////////////////////////////////////////

/**
 * Constructor for Defs
 *
 * @constructor
 * @return {Defs} this - The Defs instance
 */
export function Defs() {
  this.list = {}

  return this
}

//////////////////////////////////////////////
//            PUBLIC METHODS                //
//////////////////////////////////////////////

/**
 * Return a deep copy of this
 *
 * @return {object} this - The Defs instance
 */
Defs.prototype.clone = function () {
  let clone = new Defs()
  clone.list = JSON.parse(JSON.stringify(this.list))

  return clone
}

/**
 * Retrieve a def
 *
 * @param {string} name - Name of the def to get
 * @return value - The value under name
 */
Defs.prototype.get = function (name) {
  if (typeof this.list[name] === 'undefined') return false
  else return this.list[name]
}

/**
 * Remove a def
 *
 * @param {string} name - Name of the def to set
 * @return {object} this - The Defs instance
 */
Defs.prototype.remove = function (name) {
  delete this.list[name]

  return this
}

/**
 * Return SVG code for Defs
 *
 * @return {string} svg - The SVG code
 */
Defs.prototype.render = function () {
  let svg = ''
  for (let key in this.list) {
    svg += ` ${key}="${this.list[key]}"`
  }

  return svg
}

/**
 * Set a def, overwriting existing value
 *
 * @param {string} name - Name of the def to set
 * @param {string} value - Value of the def to set
 * @return {Defs} this - The Defs instance
 */
Defs.prototype.set = function (name, value) {
  this.list[name] = value

  return this
}

/**
 * Sets a def, but only if it's not currently set
 *
 * @param {string} name - Name of the def to set
 * @param {string} value - Value of the def to set
 * @return {Defs} this - The Defs instance
 */
Defs.prototype.setIfUnset = function (name, value) {
  if (typeof this.list[name] === 'undefined') this.list[name] = value
  return this
}

/**
 * Returns defs as an object suitable for inclusion in renderprops
 *
 * @return {object} defs - A plain object representing the defs
 */
Defs.prototype.asRenderProps = function () {
  return {
    list: this.list,
    forSvg: this.render(),
  }
}
