import Attributes from "./attributes";
import { round } from "./round";

function Point(x, y) {
  this.x = round(x);
  this.y = round(y);
  this.attributes = new Attributes();
}

/** Radians to degrees */
Point.prototype.rad2deg = function(radians) {
  return radians * 57.29577951308232;
};

/** Degrees to radians */
Point.prototype.deg2rad = function(degrees) {
  return degrees / 57.29577951308232;
};

/** Adds an attribute. This is here to make this call chainable in assignment */
Point.prototype.attr = function(name, value, overwrite = false) {
  if (overwrite) this.attributes.set(name, value);
  else this.attributes.add(name, value);

  return this;
};

/** Returns the distance between this point and that point */
Point.prototype.dist = function(that) {
  let dx = this.x - that.x;
  let dy = this.y - that.y;

  return round(Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2)));
};

/** Returns slope of a line made by this point and that point */
Point.prototype.slope = function(that) {
  return (that.y - this.y) / (that.x - this.x);
};

/** Returns the x-delta between this point and that point */
Point.prototype.dx = function(that) {
  return that.x - this.x;
};

/** Returns the y-delta between this point and that point */
Point.prototype.dy = function(that) {
  return that.y - this.y;
};

/** Returns the angle between this point and that point */
Point.prototype.angle = function(that) {
  let rad = Math.atan2(-1 * this.dy(that), this.dx(that));
  while (rad < 0) rad += 2 * Math.PI;

  return this.rad2deg(rad);
};

/** Rotate this point deg around that point */
Point.prototype.rotate = function(deg, that) {
  let radius = this.dist(that);
  let angle = this.angle(that);
  let x = that.x + radius * Math.cos(this.deg2rad(angle + deg)) * -1;
  let y = that.y + radius * Math.sin(this.deg2rad(angle + deg));

  return new Point(x, y);
};

/** returns an identical copy of this point */
Point.prototype.copy = function() {
  return new Point(this.x, this.y);
};

/** Mirrors this point around X value of that point */
Point.prototype.flipX = function(that) {
  return new Point(that.x + this.dx(that), this.y);
};

/** Mirrors this point around Y value of that point */
Point.prototype.flipY = function(that) {
  return new Point(this.x, that.y + this.dy(that));
};

/** Shifts this point distance in the deg direction */
Point.prototype.shift = function(deg, distance) {
  let p = this.copy();
  p.x += distance;

  return p.rotate(deg, this);
};

/** Shifts this point distance in the direction of that point */
Point.prototype.shiftTowards = function(that, distance) {
  return this.shift(this.angle(that), distance);
};

/** Checks whether this has the same coordinates as that */
Point.prototype.sitsOn = function(that) {
  if (this.x === that.x && this.y === that.y) return true;
  else return false;
};

/** Checks whether this has roughly the same coordinates as that */
Point.prototype.sitsRoughlyOn = function(that) {
  if (
    Math.round(this.x) === Math.round(that.x) &&
    Math.round(this.y) === Math.round(that.y)
  )
    return true;
  else return false;
};

/** Shifts this point fraction of the distance towards that point */
Point.prototype.shiftFractionTowards = function(that, fraction) {
  return this.shiftTowards(that, this.dist(that) * fraction);
};

/** Shifts this point distance beyond that point */
Point.prototype.shiftOutwards = function(that, distance) {
  return this.shiftTowards(that, this.dist(that) + distance);
};

/** Returns a deep copy of this */
Point.prototype.clone = function() {
  let clone = new Point(this.x, this.y);
  clone.attributes = this.attributes.clone();

  return clone;
};

export default Point;
