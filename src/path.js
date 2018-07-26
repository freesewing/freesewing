import attributes from "./attributes";
import { pathOffset } from "./utils";

function path() {
  this.render = true;
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

/** Returns this path as a Bezier object */
path.prototype.asBezier = function() {};

/** Returns offset of this path as a new path */
path.prototype.offset = function(distance) {
  return pathOffset(this, distance);
};

export default path;
