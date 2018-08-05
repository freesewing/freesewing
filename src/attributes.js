function Attributes(init = false) {
  this.list = {};
  if (init) {
    for (let key in init) {
      let val = init[key];
      this.add(key, val);
    }
  }
}

/** Adds an attribute */
Attributes.prototype.add = function(name, value) {
  if (typeof this.list[name] === "undefined") {
    this.list[name] = [];
  }
  this.list[name].push(value);

  return this;
};

/** Sets an attribute, overwriting existing value */
Attributes.prototype.set = function(name, value) {
  this.list[name] = [value];

  return this;
};

/** Retrieves an attribute */
Attributes.prototype.get = function(name) {
  if (typeof this.list[name] === "undefined") return false;
  else return this.list[name].join(" ");
};

/** Returns SVG code for attributes */
Attributes.prototype.render = function() {
  let svg = "";
  for (let key in this.list) {
    svg += ` ${key}="${this.list[key].join(" ")}"`;
  }

  return svg;
};

/** Returns SVG code for attributes with a fiven prefix
 * typically used for data-text*/
Attributes.prototype.renderIfPrefixIs = function(prefix = "") {
  let svg = "";
  let prefixLen = prefix.length;
  for (let key in this.list) {
    if (key.substr(0, prefixLen) === prefix) {
      svg += ` ${key.substr(prefixLen)}="${this.list[key].join(" ")}"`;
    }
  }

  return svg;
};

/** Returns a deep copy of this */
Attributes.prototype.clone = function() {
  let clone = new Attributes();
  clone.list = JSON.parse(JSON.stringify(this.list));

  return clone;
};

export default Attributes;
