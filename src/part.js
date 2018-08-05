import { macroName } from "./utils";
import point from "./point";
import path from "./path";
import snippet from "./snippet";
import attributes from "./attributes";
import * as hooklib from "hooks";
import { round, units } from "./utils";

function part() {
  this.attributes = new attributes();
  this.points = {};
  this.paths = {};
  this.snippets = {};
  this.freeId = 0;
  this.topLeft = false;
  this.bottomRight = false;
  this.width = false;
  this.height = false;
  this.render = true;
  this.points.origin = new point(0, 0);
  for (let k in hooklib) this[k] = hooklib[k];

  // Constructors so macros can create objects
  this.point = point;
  this.path = path;
  this.snippet = snippet;

  // Expose round method to plugins
  this.round = round;

  return this;
}

part.prototype.macroRunner = function(args) {
  let self = this;
  let data = args;
  let method = function(key, data) {
    let macro = macroName(key);
    if (typeof self[macro] === "function") {
      self[macro](data);
    } else {
      console.log(`Warning: ${macro} is not registered`);
    }
  };

  return method;
};

/** Returns an unused ID */
part.prototype.getUid = function() {
  this.freeId += 1;

  return "" + this.freeId;
};

/** Returns a value formatted for units provided in settings */
part.prototype.units = function(value) {
  return units(value, this.context.settings.units);
};

/** Calculates the part's bounding box and sets it */
part.prototype.boundary = function() {
  if (this.topLeft) return this; // Cached

  let topLeft = new point(Infinity, Infinity);
  let bottomRight = new point(-Infinity, -Infinity);
  for (let key in this.paths) {
    let path = this.paths[key].boundary();
    if (path.render) {
      if (path.topLeft.x < topLeft.x) topLeft.x = path.topLeft.x;
      if (path.topLeft.y < topLeft.y) topLeft.y = path.topLeft.y;
      if (path.bottomRight.x > bottomRight.x)
        bottomRight.x = path.bottomRight.x;
      if (path.bottomRight.y > bottomRight.y)
        bottomRight.y = path.bottomRight.y;
    }
  }
  // Add 10mm margin
  this.topLeft = new point(topLeft.x - 10, topLeft.y - 10);
  this.bottomRight = new point(bottomRight.x + 10, bottomRight.y + 10);
  this.width = this.bottomRight.x - this.topLeft.x;
  this.height = this.bottomRight.y - this.topLeft.y;

  return this;
};

/** Stacks part so that its top left corner is in (0,0) */
part.prototype.stack = function() {
  if (this.topLeft.x === 0 && this.topLeft.y === 0) return this;

  this.boundary().attr(
    "transform",
    `translate(${this.topLeft.x * -1}, ${this.topLeft.y * -1})`
  );

  return this;
};

/** Adds an attribute. This is here to make this call chainable in assignment */
part.prototype.attr = function(name, value, overwrite = false) {
  if (overwrite) this.attributes.set(name, value);
  else this.attributes.add(name, value);

  return this;
};

/** Copies point/path/snippet data from part orig into this */
part.prototype.copy = function(orig) {
  for (let type of ["points", "paths", "snippets"]) {
    for (let i in orig[type]) {
      if (typeof this[type][i] === "undefined") {
        this[type][i] = orig[type][i].clone();
      }
    }
  }

  return this;
};

export default part;
