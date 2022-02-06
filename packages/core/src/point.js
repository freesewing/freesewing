import Attributes from './attributes'

function Point(x, y, debug = false) {
  this.x = x
  this.y = y
  this.attributes = new Attributes()
  Object.defineProperty(this, 'debug', { value: debug, configurable: true })
}

/** Adds the raise method for a path not created through the proxy **/
Point.prototype.withRaise = function (raise = false) {
  if (raise) Object.defineProperty(this, 'raise', { value: raise })

  return this
}

/** Debug method to validate point data **/
Point.prototype.check = function () {
  if (typeof this.x !== 'number') this.raise.warning('X value of `Point` is not a number')
  if (typeof this.y !== 'number') this.raise.warning('Y value of `Point` is not a number')
}

/** Radians to degrees */
Point.prototype.rad2deg = function (radians) {
  return radians * 57.29577951308232
}

/** Degrees to radians */
Point.prototype.deg2rad = function (degrees) {
  return degrees / 57.29577951308232
}

/** Adds an attribute. This is here to make this call chainable in assignment */
Point.prototype.attr = function (name, value, overwrite = false) {
  this.check()
  if (overwrite) this.attributes.set(name, value)
  else this.attributes.add(name, value)

  return this
}

/** Returns the distance between this point and that point */
Point.prototype.dist = function (that) {
  this.check()
  that.check()
  let dx = this.x - that.x
  let dy = this.y - that.y

  return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))
}

/** Returns slope of a line made by this point and that point */
Point.prototype.slope = function (that) {
  this.check()
  that.check()
  return (that.y - this.y) / (that.x - this.x)
}

/** Returns the x-delta between this point and that point */
Point.prototype.dx = function (that) {
  this.check()
  that.check()

  return that.x - this.x
}

/** Returns the y-delta between this point and that point */
Point.prototype.dy = function (that) {
  this.check()
  that.check()

  return that.y - this.y
}

/** Returns the angle between this point and that point */
Point.prototype.angle = function (that) {
  this.check()
  that.check()

  let rad = Math.atan2(-1 * this.dy(that), this.dx(that))
  while (rad < 0) rad += 2 * Math.PI

  return this.rad2deg(rad)
}

/** Rotate this point deg around that point */
Point.prototype.rotate = function (deg, that) {
  this.check()
  that.check()
  if (typeof deg !== 'number')
    this.raise.warning('Called `Point.rotate(deg,that)` but `deg` is not a number')
  if (that instanceof Point !== true)
    this.raise.warning('Called `Point.rotate(deg,that)` but `that` is not a `Point` object')
  let radius = this.dist(that)
  let angle = this.angle(that)
  let x = that.x + radius * Math.cos(this.deg2rad(angle + deg)) * -1
  let y = that.y + radius * Math.sin(this.deg2rad(angle + deg))

  return new Point(x, y, this.debug).withRaise(this.raise)
}

/** returns an identical copy of this point */
Point.prototype.copy = function () {
  this.check()

  return new Point(this.x, this.y, this.debug).withRaise(this.raise)
}

/** Mirrors this point around X value of that point */
Point.prototype.flipX = function (that = false) {
  this.check()
  if (that) {
    if (that instanceof Point !== true)
      this.raise.warning('Called `Point.rotate(deg,that)` but `that` is not a `Point` object')
    that.check()
  }
  if (that === false || that.x === 0)
    return new Point(this.x * -1, this.y, this.debug).withRaise(this.raise)
  else return new Point(that.x + this.dx(that), this.y, this.debug).withRaise(this.raise)
}

/** Mirrors this point around Y value of that point */
Point.prototype.flipY = function (that = false) {
  this.check()
  if (that) {
    if (that instanceof Point !== true)
      this.raise.warning('Called `Point.flipY(that)` but `that` is not a `Point` object')
    that.check()
  }
  if (that === false || that.y === 0)
    return new Point(this.x, this.y * -1, this.debug).withRaise(this.raise)
  else return new Point(this.x, that.y + this.dy(that), this.debug).withRaise(this.raise)
}

/** Shifts this point distance in the deg direction */
Point.prototype.shift = function (deg, distance) {
  this.check()
  if (typeof distance !== 'number')
    this.raise.warning('Called `Point.shift` but `distance` is not a number')
  let p = this.copy()
  p.x += distance

  return p.rotate(deg, this)
}

/** Shifts this point distance in the direction of that point */
Point.prototype.shiftTowards = function (that, distance) {
  if (typeof distance !== 'number')
    this.raise.warning('Called `Point.shiftTowards` but `distance` is not a number')
  if (that instanceof Point !== true)
    this.raise.warning(
      'Called `Point.shiftTowards(that, distance)` but `that` is not a `Point` object'
    )
  this.check()
  that.check()

  return this.shift(this.angle(that), distance)
}

/** Checks whether this has the same coordinates as that */
Point.prototype.sitsOn = function (that) {
  if (that instanceof Point !== true)
    this.raise.warning('Called `Point.sitsOn(that)` but `that` is not a `Point` object')
  this.check()
  that.check()
  if (this.x === that.x && this.y === that.y) return true
  else return false
}

/** Checks whether this has roughly the same coordinates as that */
Point.prototype.sitsRoughlyOn = function (that) {
  if (that instanceof Point !== true)
    this.raise.warning('Called `Point.sitsRoughlyOn(that)` but `that` is not a `Point` object')
  this.check()
  that.check()
  if (Math.round(this.x) === Math.round(that.x) && Math.round(this.y) === Math.round(that.y))
    return true
  else return false
}

/** Shifts this point fraction of the distance towards that point */
Point.prototype.shiftFractionTowards = function (that, fraction) {
  if (that instanceof Point !== true)
    this.raise.warning(
      'Called `Point.shiftFractionTowards(that, fraction)` but `that` is not a `Point` object'
    )
  if (typeof fraction !== 'number')
    this.raise.warning('Called `Point.shiftFractionTowards` but `fraction` is not a number')
  this.check()
  that.check()

  return this.shiftTowards(that, this.dist(that) * fraction)
}

/** Shifts this point distance beyond that point */
Point.prototype.shiftOutwards = function (that, distance) {
  if (that instanceof Point !== true)
    this.raise.warning(
      'Called `Point.shiftOutwards(that, distance)` but `that` is not a `Point` object'
    )
  if (typeof distance !== 'number')
    this.raise.warning(
      'Called `Point.shiftOutwards(that, distance)` but `distance` is not a number'
    )
  this.check()
  that.check()

  return this.shiftTowards(that, this.dist(that) + distance)
}

/** Returns a deep copy of this */
Point.prototype.clone = function () {
  this.check()
  const clone = new Point(this.x, this.y, this.debug).withRaise(this.raise)
  clone.attributes = this.attributes.clone()

  return clone
}

/** Applies a translate transform */
Point.prototype.translate = function (x, y) {
  this.check()
  if (typeof x !== 'number')
    this.raise.warning('Called `Point.translate(x,y)` but `x` is not a number')
  if (typeof y !== 'number')
    this.raise.warning('Called `Point.translate(x,y)` but `y` is not a number')
  const p = this.copy()
  p.x += x
  p.y += y

  return p
}

export default Point
