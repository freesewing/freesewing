import Attributes from './attributes'

function Snippet(def, anchor) {
  this.def = def
  this.anchor = anchor
  this.attributes = new Attributes()

  return this
}

/** Adds an attribute. This is here to make this call chainable in assignment */
Snippet.prototype.attr = function(name, value, overwrite = false) {
  if (overwrite) this.attributes.set(name, value)
  else this.attributes.add(name, value)

  return this
}

/** Returns a deep copy of this */
Snippet.prototype.clone = function() {
  let clone = new Snippet(this.def, this.anchor.clone())
  clone.attributes = this.attributes.clone()

  return clone
}

export default Snippet
