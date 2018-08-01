import attributes from "./attributes";
import { round } from "./utils";

function point(x, y) {
  this.x = round(x);
  this.y = round(y);
  this.attributes = new attributes();
}

/** Radians to degrees */
point.prototype.rad2deg = function(radians) {
  return radians * 57.29577951308232;
};

/** Degrees to radians */
point.prototype.deg2rad = function(degrees) {
  return degrees / 57.29577951308232;
};

/** Adds an attribute. This is here to make this call chainable in assignment */
point.prototype.attr = function(name, value) {
  this.attributes.add(name, value);

  return this;
};

/** Returns the distance between this point and that point */
point.prototype.dist = function(that) {
  let dx = this.x - that.x;
  let dy = this.y - that.y;

  return round(Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2)));
};

/** Returns slope of a line made by this point and that point */
point.prototype.slope = function(that) {
  return (that.y - this.y) / (that.x - this.x);
};

/** Returns the x-delta between this point and that point */
point.prototype.dx = function(that) {
  return that.x - this.x;
};

/** Returns the y-delta between this point and that point */
point.prototype.dy = function(that) {
  return that.y - this.y;
};

/** Returns the angle between this point and that point */
point.prototype.angle = function(that) {
  let rad = Math.atan2(-1 * this.dy(that), this.dx(that));
  while (rad < 0) rad += 2 * Math.PI;

  return this.rad2deg(rad);
};

/** Rotate this point deg around that point */
point.prototype.rotate = function(deg, that) {
  let radius = this.dist(that);
  let angle = this.angle(that);
  let x = that.x + radius * Math.cos(this.deg2rad(angle + deg)) * -1;
  let y = that.y + radius * Math.sin(this.deg2rad(angle + deg));

  return new point(x, y);
};

/** returns an identical copy of this point */
point.prototype.copy = function() {
  return new point(this.x, this.y);
};

/** checks whether this point is equal to that point */
point.prototype.equals = function(that) {
  return this.x === that.x && this.y === that.y ? true : false;
};

/** Mirrors this point around X value of that point */
point.prototype.flipX = function(that) {
  return new point(that.x + this.dx(that), that.y);
};

/** Mirrors this point around Y value of that point */
point.prototype.flipY = function(that) {
  return new point(that.x, that.y + this.dy(that));
};

/** Shifts this point distance in the deg direction */
point.prototype.shift = function(deg, distance) {
  let p = this.copy();
  p.x += distance;

  return p.rotate(deg, this);
};

/** Shifts this point distance in the direction of that point */
point.prototype.shiftTowards = function(that, distance) {
  return this.shift(this.angle(that), distance);
};

/** Shifts this point fraction of the distance towards that point */
point.prototype.shiftFractionTowards = function(that, fraction) {
  return this.shiftTowards(that, this.dist(that) * fraction);
};

/** Shifts this point distance beyond that point */
point.prototype.shiftOutwards = function(that, distance) {
  return this.shiftTowards(that, this.dist(that) + distance);
};

export default point;
