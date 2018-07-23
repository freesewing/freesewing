import attributes from './attributes'

function point (x, y)
{
  this.x = this.round(x);
  this.y = this.round(y);
  this.attributes = new attributes();

  return this;

  /** Rounds a value to PRECISION */
  this.prototype.round = function (value)
  {
    return Math.round(value * 1e2) / 1e2;
  }

  /** Radians to degrees */
  this.prototype.rad2deg = function (radians)
  {
    return radians * 57.29577951308232;
  }

  /** Degrees to radians */
  this.prototype.deg2rad (degrees)
  {
    return degrees / 57.29577951308232;
  }

  /** Adds an attribute. This is here to make this call chainable in assignment */
  this.prototype.attr = function (name, value)
  {
    this.attributes.add(name, value);

    return this;
  }

  /** Returns the distance between this point and that point */
  this.prototype.dist = function (that)
  {
    let dx = this.x - that.x;
    let dy = this.y - that.y;

    return this.round(Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2)));
  }

  /** Returns slope of a line made by this point and that point */
  this.prototype.slope = function (that)
  {
    return (that.y - this.y) / (that.x - this.x);
  }

  /** Returns the x-delta between this point and that point */
  this.prototype.dx = function (that)
  {
    return that.x - this.x;
  }

  /** Returns the y-delta between this point and that point */
  this.prototype.dy = function (that)
  {
    return that.y - this.y;
  }

  /** Returns the angle between this point and that point */
  this.prototype.angle = function (that)
  {
    let rad = Math.atan2(-1 * this.dy(that), this.dx(that));
    while (rad < 0) rad += 2 * Math.PI;

    return this.rad2deg(rad);
  }

  /** Rotate this point deg around that point */
  this.prototype.rotate = function (deg, that)
  {
    let radius = this.dist(that);
    let angle = this.angle(that);
    let x = that.x + radius * Math.cos(this.deg2rad(angle + deg)) * -1;
    let y = that.y + radius * Math.sin(this.deg2rad(angle + deg));

    return new Point(x, y);
  }

  /** returns an identical copy of this point */
  this.prototype.copy = function ()
  {
    return new Point(this.x, this.y);
  }

  /** checks whether this point is equal to that point */
  this.prototype.equals = function (that)
  {
    return (this.x === that.x && this.y === that.y) ? true : false;
  }

  /** Mirrors this point around X value of that point */
  this.prototype.flipX = function (that)
  {
    return new Point(that.x + this.dx(that), that.y);
  }

  /** Mirrors this point around Y value of that point */
  this.prototype.flipY = function (that)
  {
    return new Point(that.x, that.y + this.dy(that));
  }

  /** Shifts this point distance in the deg direction */
  this.prototype.shift = function (deg, distance)
  {
    let p = this.copy();
    p.x += distance;

    return p.rotate(deg, this);
  }

  /** Shifts this point distance in the direction of that point */
  this.prototype.shiftTowards = function (that, distance)
  {
    return this.shift(this.angle(that), distance);
  }

  /** Shifts this point fraction of the distance towards that point */
  this.prototype.shiftFractionTowards = function (that, fraction)
  {
    return this.shiftTowards(that, this.dist(that) * fraction);
  }

  /** Shifts this point distance beyond that point */
  this.prototype.shiftOutwards = function (that, distance)
  {
    return this.shiftTowards(that, this.dist(that) + distance);
  }
}

export default point;
