export function Attributes() {
  this.list = {}
}

/** Adds an attribute */
Attributes.prototype.add = function (name, value) {
  if (typeof this.list[name] === 'undefined') {
    this.list[name] = []
  }
  this.list[name].push(value)

  return this
}

/** Sets an attribute, overwriting existing value */
Attributes.prototype.set = function (name, value) {
  this.list[name] = [value]

  return this
}

/** Sets an attribute, but only if it's not currently set */
Attributes.prototype.setIfUnset = function (name, value) {
  if (typeof this.list[name] === 'undefined') this.list[name] = [value]

  return this
}

/** Removes an attribute */
Attributes.prototype.remove = function (name) {
  delete this.list[name]

  return this
}

/** Retrieves an attribute */
Attributes.prototype.get = function (name) {
  if (typeof this.list[name] === 'undefined') return false
  else return this.list[name].join(' ')
}

/** Retrieves an attribute as array*/
Attributes.prototype.getAsArray = function (name) {
  if (typeof this.list[name] === 'undefined') return false
  else return this.list[name]
}

/** Returns SVG code for attributes */
Attributes.prototype.render = function () {
  let svg = ''
  for (let key in this.list) {
    svg += ` ${key}="${this.list[key].join(' ')}"`
  }

  return svg
}

/** Returns CSS code for attributes */
Attributes.prototype.renderAsCss = function () {
  let css = ''
  for (let key in this.list) {
    css += ` ${key}:${this.list[key].join(' ')};`
  }

  return css
}

/** Returns SVG code for attributes with a fiven prefix
 * typically used for data-text*/
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

/** Returns a props object for attributes with a fiven prefix
 * typically used for data-text*/
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

/** Returns a deep copy of this */
Attributes.prototype.clone = function () {
  let clone = new Attributes()
  clone.list = JSON.parse(JSON.stringify(this.list))

  return clone
}
