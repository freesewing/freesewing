import { Attributes } from './attributes.mjs'

export function Snippet(def, anchor, debug = false) {
  this.def = def
  this.anchor = anchor
  this.attributes = new Attributes()
  Object.defineProperty(this, 'debug', { value: debug, configurable: true })

  return this
}

/** Adds the raise method for a snippet not created through the proxy **/
Snippet.prototype.withRaise = function (raise = false) {
  if (raise) Object.defineProperty(this, 'raise', { value: raise })

  return this
}
/** Adds an attribute. This is here to make this call chainable in assignment */
Snippet.prototype.attr = function (name, value, overwrite = false) {
  if (overwrite) this.attributes.set(name, value)
  else this.attributes.add(name, value)

  return this
}

/** Returns a deep copy of this */
Snippet.prototype.clone = function () {
  let clone = new Snippet(this.def, this.anchor.clone(), this.debug).withRaise(this.raise)
  clone.attributes = this.attributes.clone()

  return clone
}
