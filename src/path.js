import attributes from "./attributes";
import point from "./point";
import Bezier from "bezier-js";
import { pathOffset, pathLength } from "./utils";

function path() {
  this.render = true;
  this.topLeft = false;
  this.bottomRight = false;
  this.attributes = new attributes();
  this.ops = [];
}

/** Adds a move operation to Point to */
path.prototype.move = function(to) {
  this.ops.push({ type: "move", to });

  return this;
};

/** Adds a line operation to Point to */
path.prototype.line = function(to) {
  this.ops.push({ type: "line", to });

  return this;
};

/** Adds a line operation to Point to */
path.prototype.curve = function(cp1, cp2, to) {
  this.ops.push({ type: "curve", cp1, cp2, to });

  return this;
};

/** Adds a close operation */
path.prototype.close = function() {
  this.ops.push({ type: "close" });

  return this;
};

/** Adds an attribute. This is here to make this call chainable in assignment */
path.prototype.attr = function(name, value) {
  this.attributes.add(name, value);

  return this;
};

/** Returns SVG pathstring for this path */
path.prototype.asPathstring = function() {
  let d = "";
  for (let op of this.ops) {
    switch (op.type) {
      case "move":
        d += `M ${op.to.x},${op.to.y}`;
        break;
      case "line":
        d += ` L ${op.to.x},${op.to.y}`;
        break;
      case "curve":
        d += ` C ${op.cp1.x},${op.cp1.y} ${op.cp2.x},${op.cp2.y} ${op.to.x},${
          op.to.y
        }`;
        break;
      case "close":
        d += " z";
        break;
      default:
        throw `${op.type} is not a valid path command`;
        break;
    }
  }

  return d;
};

/** Returns offset of this path as a new path */
path.prototype.offset = function(distance) {
  return pathOffset(this, distance);
};

/** Returns the length of this path */
path.prototype.length = function() {
  let current, start;
  let length = 0;
  for (let i in this.ops) {
    let op = this.ops[i];
    if (op.type === "move") {
      start = op.to;
    } else if (op.type === "line") {
      length += op.from.dist(op.to);
    } else if (op.type === "curve") {
      length += new Bezier(
        { x: current.x, y: current.y },
        { x: op.cp1.x, y: op.cp1.y },
        { x: op.cp2.x, y: op.cp2.y },
        { x: op.to.x, y: op.to.y }
      ).length();
    } else if (op.type === "close") {
      length += current.dist(start);
    }
    if (op.to) current = op.to;
  }

  return length;
};

/** Returns the startpoint of the path */
path.prototype.start = function() {
  return this.ops[0].to;
};

/** Returns the endpoint of the path */
path.prototype.end = function() {
  let op = this.ops[this.ops.length - 1];

  if (op.type === "close") return this.start();
  else return op.to;
};

/** Finds the bounding box of a path */
path.prototype.boundary = function() {
  if (this.topLeft) return this; // Cached

  let current;
  let topLeft = new point(Infinity, Infinity);
  let bottomRight = new point(-Infinity, -Infinity);
  for (let i in this.ops) {
    let op = this.ops[i];
    if (op.type === "move" || op.type === "line") {
      if (op.to.x < topLeft.x) topLeft.x = op.to.x;
      if (op.to.y < topLeft.y) topLeft.y = op.to.y;
      if (op.to.x > bottomRight.x) bottomRight.x = op.to.x;
      if (op.to.y > bottomRight.y) bottomRight.y = op.to.y;
    } else if (op.type === "curve") {
      let bb = new Bezier(
        { x: current.x, y: current.y },
        { x: op.cp1.x, y: op.cp1.y },
        { x: op.cp2.x, y: op.cp2.y },
        { x: op.to.x, y: op.to.y }
      ).bbox();
      if (bb.x.min < topLeft.x) topLeft.x = bb.x.min;
      if (bb.y.min < topLeft.y) topLeft.y = bb.y.min;
      if (bb.x.max > bottomRight.x) bottomRight.x = bb.x.max;
      if (bb.y.max > bottomRight.y) bottomRight.y = bb.y.max;
    }
    if (op.to) current = op.to;
  }

  this.topLeft = topLeft;
  this.bottomRight = bottomRight;

  return this;
};
export default path;
