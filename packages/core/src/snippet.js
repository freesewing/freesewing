import Attributes from './attributes'
import Point from './point'

function Snippet(def, anchor, debug = false) {
  this.debug = debug
  if (this.debug) {
    if (typeof def !== 'string')
      raise.warning('Called `new Snippet(def, anchor)` but `def` is not a string')
    if (anchor instanceof Point !== true)
      raise.warning('Called `new Snippet(dev, anchor)` but `anchor` is not a `Point` object')
  }
  this.def = def
  this.anchor = anchor
  this.attributes = new Attributes()

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
  let clone = new Snippet(this.def, this.anchor.clone())
  clone.attributes = this.attributes.clone()
  clone.raise = this.raise

  return clone
}

export default Snippet
