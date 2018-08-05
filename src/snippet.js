import Attributes from "./attributes";

function Snippet(def, anchor, description = "") {
  this.def = def;
  this.anchor = anchor;
  this.description = description;
  this.attributes = new Attributes();

  return this;
}

/** Returns a deep copy of this */
Snippet.prototype.clone = function() {
  let clone = new Snippet(this.def, this.anchor.clone(), this.description);
  clone.attributes = this.attributes.clone();

  return clone;
};

export default Snippet;
