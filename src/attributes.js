function attributes(init = false) {
  if (init) {
    for (let key in init) {
      let val = init[key];
      this.add(key, val);
    }
  }

  /** Adds an attribute */
  this.prototype.add = function(name, value) {
    if (typeof this.list[name] === "undefined") {
      this.list[name] = [];
    }
    this.list[name].push(value);

    return this;
  };

  /** Retrieves an attribute */
  this.prototype.get = function(name) {
    if (typeof this.list[name] === "undefined") return false;
    else return this.list[name].join(" ");
  };

  /** Returns SVG code for attributes */
  this.prototype.render = function() {
    let svg = "";
    for (let key in this.list) {
      svg += ` ${key}="${this.list[key].join(" ")}"`;
    }

    return svg;
  };

  /** Returns SVG code for attributes with a fiven prefix
   * typically used for data-text*/
  this.prototype.renderIfPrefixIs = function(prefix = "") {
    let svg = "";
    let prefixLen = prefix.length;
    for (let key in this.list) {
      if (key.substr(0, prefixLen) === prefix) {
        svg += ` ${key.substr(prefixLen)}="${this.list[key].join(" ")}"`;
      }
    }

    return svg;
  };

  return this;
}

export default attributes;
