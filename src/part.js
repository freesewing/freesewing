import { macroName } from "./utils";
import point from "./point";
import path from "./path";
import snippet from "./snippet";
import attributes from "./attributes";
import * as hooklib from "hooks";
import { round, units } from "./utils";

function part(id) {
  this.attributes = new attributes();
  this.points = {};
  this.paths = {};
  this.snippets = {};
  this.id = id;
  this.freeId = 0;
  this.topLeft = false;
  this.bottomRight = false;
  this.width = false;
  this.height = false;
  this.render = id.substr(0, 1) === "_" ? false : true;
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
part.prototype.attr = function(name, value) {
  this.attributes.add(name, value);

  return this;
};

/** Returns a (deep) clone of this part object */
part.prototype.clone = function() {};

/** Returns a deep copy of this */
part.prototype.clone = function(id = false) {
  let clone = new part(id);
  clone.freeId = 0;
  clone.width = this.width;
  clone.height = this.height;
  clone.attributes = this.attributes.clone();
  clone.render = this.render;

  if (!id) clone.id = this.id;
  if (this.topLeft) clone.topLeft = this.topLeft.clone();
  else clone.topLeft = false;
  if (this.bottomRight) clone.bottomRight = this.bottomRight.clone();
  else clone.bottomRight = false;

  clone.points = {};
  clone.paths = {};
  clone.snippets = {};
  for (let i in this.points) clone.points[i] = this.points[i].clone();
  for (let i in this.paths) clone.paths[i] = this.paths[i].clone();
  for (let i in this.snippets) clone.snippets[i] = this.snippets[i].clone();
  for (let k in hooklib) clone[k] = hooklib[k];

  clone.point = point;
  clone.path = path;
  clone.snippet = snippet;
  clone.round = round;

  clone.context = this.context;

  return clone;
};
export default part;
