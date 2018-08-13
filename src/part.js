import * as utils from "./utils";
import Point from "./point";
import Path from "./path";
import Snippet from "./snippet";
import Attributes from "./attributes";
import * as hooklib from "hooks";
import { round } from "./round";

function Part() {
  this.attributes = new Attributes();
  this.points = {};
  this.paths = {};
  this.snippets = {};
  this.freeId = 0;
  this.topLeft = false;
  this.bottomRight = false;
  this.width = false;
  this.height = false;
  this.render = true;
  this.utils = utils;
  this.points.origin = new Point(0, 0);
  for (let k in hooklib) this[k] = hooklib[k];
  // Keep track of attached hooks

  // Constructors so macros can create objects
  this.Point = Point;
  this.Path = Path;
  this.Snippet = Snippet;

  // Expose round method to plugins
  this.round = round;

  let self = this;
  this.hooks.attach("debug", self);

  return this;
}

Part.prototype.macroClosure = function(args) {
  let self = this;
  let data = args;
  let method = function(key, data) {
    let macro = utils.macroName(key);
    if (typeof self[macro] === "function") {
      self[macro](data);
    } else {
      self.debug(`Warning: ${macro} is not registered`);
    }
  };

  return method;
};

Part.prototype.debugClosure = function() {
  let self = this;
  let method = function(d, e, b, u, g) {
    self.debug(d, e, b, u, g);
  };

  return method;
};

/** Debug method, exposes debug hook */
Part.prototype.debug = function(data) {};

/** Returns an unused ID */
Part.prototype.getUid = function() {
  this.freeId += 1;

  return "" + this.freeId;
};

/** Returns a value formatted for units provided in settings */
Part.prototype.unitsClosure = function(value) {
  let self = this;
  let method = function(value) {
    return utils.units(value, self.context.settings.units);
  };

  return method;
};

/** Calculates the part's bounding box and sets it */
Part.prototype.boundary = function() {
  if (this.topLeft) return this; // Cached

  let topLeft = new Point(Infinity, Infinity);
  let bottomRight = new Point(-Infinity, -Infinity);
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
  // Fix infinity of part has no paths
  if (topLeft.x === Infinity) topLeft.x = 0;
  if (topLeft.y === Infinity) topLeft.y = 0;
  if (bottomRight.x === -Infinity) bottomRight.x = 0;
  if (bottomRight.y === -Infinity) bottomRight.y = 0;
  // Add 10mm margin
  this.topLeft = new Point(topLeft.x - 10, topLeft.y - 10);
  this.bottomRight = new Point(bottomRight.x + 10, bottomRight.y + 10);
  this.width = this.bottomRight.x - this.topLeft.x;
  this.height = this.bottomRight.y - this.topLeft.y;

  return this;
};

/** Stacks part so that its top left corner is in (0,0) */
Part.prototype.stack = function() {
  if (this.topLeft.x === 0 && this.topLeft.y === 0) return this;

  this.boundary().attr(
    "transform",
    `translate(${this.topLeft.x * -1}, ${this.topLeft.y * -1})`
  );

  return this;
};

/** Adds an attribute. This is here to make this call chainable in assignment */
Part.prototype.attr = function(name, value, overwrite = false) {
  if (overwrite) this.attributes.set(name, value);
  else this.attributes.add(name, value);

  return this;
};

/** Copies point/path/snippet data from part orig into this */
Part.prototype.copy = function(orig) {
  for (let type of ["points", "paths", "snippets"]) {
    for (let i in orig[type]) {
      if (typeof this[type][i] === "undefined") {
        this[type][i] = orig[type][i].clone();
      }
    }
  }

  return this;
};

Part.prototype.units = function(input) {
  return utils.units(input, this.context.settings.units);
};

/** Returns an object with shorthand access for pattern design */
Part.prototype.shorthand = function() {
  let final = this.context.settings.mode === "draft" ? true : false;
  let paperless = this.context.settings.paperless === true ? true : false;
  return {
    sa: this.context.settings.sa || 0,
    measurements: this.context.settings.measurements || {},
    options: this.context.options || {},
    store: this.context.store,
    points: this.points || {},
    paths: this.paths || {},
    snippets: this.snippets || {},
    macro: this.macroClosure(),
    units: this.unitsClosure(),
    utils: this.utils,
    Point: this.Point,
    Path: this.Path,
    Snippet: this.Snippet,
    final,
    paperless,
    debug: this.debugClosure()
  };
};

export default Part;
