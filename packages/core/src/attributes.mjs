//////////////////////////////////////////////
//               CONSTRUCTOR                //
//////////////////////////////////////////////

/**
 * Constructor for Attributes
 *
 * @constructor
 * @return {Attributes} this - The Attributes instance
 */
export function Attributes() {
  this.list = {}

  return this
}

//////////////////////////////////////////////
//            PUBLIC METHODS                //
//////////////////////////////////////////////

/**
 * Add an attribute
 *
 * @param {string} name - Name of the attribute to add
 * @param {string} value - Value of the attribute to add
 * @return {Attributes} this - The Attributes instance
 */
Attributes.prototype.add = function (name, value) {
  if (typeof this.list[name] === 'undefined') {
    this.list[name] = []
  }
  this.list[name].push(value)

  return this
}

/**
 * Return a props object for attributes with a given prefix (typically used for data-text)
 *
 * @param {string} prefix - The prefix to filter attributes on
 * @return {object} props - The attributes as props
 */
Attributes.prototype.asPropsIfPrefixIs = function (prefix = '') {
  let props = {}
  let prefixLen = prefix.length
  for (let key in this.list) {
    if (key.substr(0, prefixLen) === prefix) {
      let propKey = key.substr(prefixLen)
      if (propKey === 'class') propKey = 'className'
      props[propKey] = this.get(key)
    }
  }

  return props
}

/**
 * Return a deep copy of this
 *
 * @return {object} this - The Attributes instance
 */
Attributes.prototype.clone = function () {
  let clone = new Attributes()
  clone.list = JSON.parse(JSON.stringify(this.list))

  return clone
}

/**
 * Retrieve an attribute
 *
 * @param {string} name - Name of the attribute to get
 * @return value - The value under name
 */
Attributes.prototype.get = function (name) {
  if (typeof this.list[name] === 'undefined') return false
  else return this.list[name].join(' ')
}

/**
 * Retrieve an attribute as array
 *
 * @param {string} name - Name of the attribute to set
 * @return {object} this - The Attributes instance
 */
Attributes.prototype.getAsArray = function (name) {
  if (typeof this.list[name] === 'undefined') return false
  else return this.list[name]
}

/**
 * Remove an attribute
 *
 * @param {string} name - Name of the attribute to set
 * @return {object} this - The Attributes instance
 */
Attributes.prototype.remove = function (name) {
  delete this.list[name]

  return this
}

/**
 * Return SVG code for attributes
 *
 * @return {string} svg - The SVG code
 */
Attributes.prototype.render = function () {
  let svg = ''
  for (let key in this.list) {
    svg += ` ${key}="${this.list[key].join(' ')}"`
  }

  return svg
}

/**
 * Return CSS code for attributes
 *
 * @return {string} css - The CSS code
 */
Attributes.prototype.renderAsCss = function () {
  let css = ''
  for (let key in this.list) {
    css += ` ${key}:${this.list[key].join(' ')};`
  }

  return css
}

/**
 * Return SVG code for attributes with a fiven prefix (typically used for data-text)
 *
 * @param {string} prefix - The prefix to filter attributes on
 * @return {string} svg - The SVG code
 */
Attributes.prototype.renderIfPrefixIs = function (prefix = '') {
  let svg = ''
  let prefixLen = prefix.length
  for (let key in this.list) {
    if (key.substr(0, prefixLen) === prefix) {
      svg += ` ${key.substr(prefixLen)}="${this.list[key].join(' ')}"`
    }
  }

  return svg
}

/**
 * Set an attribute, overwriting existing value
 *
 * @param {string} name - Name of the attribute to set
 * @param {string} value - Value of the attribute to set
 * @return {Attributes} this - The Attributes instance
 */
Attributes.prototype.set = function (name, value) {
  this.list[name] = [value]

  return this
}

/**
 * Sets an attribute, but only if it's not currently set
 *
 * @param {string} name - Name of the attribute to set
 * @param {string} value - Value of the attribute to set
 * @return {Attributes} this - The Attributes instance
 */
Attributes.prototype.setIfUnset = function (name, value) {
  if (typeof this.list[name] === 'undefined') this.list[name] = [value]

  return this
}
