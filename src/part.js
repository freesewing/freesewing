import { macroName } from "./utils";
import point from "./point";
import path from "./path";
import snippet from "./snippet";
import attributes from "./attributes";
import * as hooklib from "hooks";

function part(id) {
  this.attributes = new attributes();
  this.points = {};
  this.paths = {};
  this.snippets = {};
  this.id = id;
  this.render = id.substr(0, 1) === "_" ? false : true;
  this.points.origin = new point(0, 0);
  for (let k in hooklib) this[k] = hooklib[k];

  // Constructors so macros can create objects
  this.point = point;
  this.path = path;
  this.snippet = snippet;

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

export default part;
