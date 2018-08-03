import attributes from "./attributes";

function snippet(def, anchor, description = "") {
  this.def = def;
  this.anchor = anchor;
  this.description = description;
  this.attributes = new attributes();

  return this;
}

/** Returns a deep copy of this */
snippet.prototype.clone = function() {
  let clone = new snippet(this.def, this.anchor.clone(), this.description);
  clone.attributes = this.attributes.clone();

  return clone;
};

export default snippet;
