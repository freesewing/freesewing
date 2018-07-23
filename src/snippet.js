import attributes from "./attributes";

function snippet(def, anchor, description = "") {
  this.def = def;
  this.anchor = anchor;
  this.description = description;
  this.attributes = new attributes();

  return this;
}

export default snippet;
