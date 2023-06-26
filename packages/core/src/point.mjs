import { Attributes } from './attributes.mjs'
import { __asNumber, __isCoord, rad2deg, deg2rad } from './utils.mjs'

//////////////////////////////////////////////
//               CONSTRUCTOR                //
//////////////////////////////////////////////

/**
 * Constructor for a Point
 *
 * @constructor
 * @param {float} x - X-coordinate of the Point
 * @param {float} y - Y-coordinate of the Point
 * @return {Point} this - The Point instance
 */
export function Point(x, y) {
  this.x = x
  this.y = y
  this.attributes = new Attributes()
}

//////////////////////////////////////////////
//            PUBLIC METHODS                //
//////////////////////////////////////////////

/**
 * A chainable way to add a circle at a Point
 *
 * @param {float} radius - The circle radius
 * @param {string} className - The CSS classes to apply to the circle
 * @return {Point} this - The Point instance
 */
Point.prototype.addCircle = function (radius = false, className = false) {
  if (radius) this.attributes.add('data-circle', radius)
  if (className) this.attributes.add('data-circle-class', className)

  return this.__check()
}

/**
 * A chainable way to add text to a Point
 *
 * @param {string} text - The text to add to the Point
 * @param {string} className - The CSS classes to apply to the text
 * @return {Point} this - The Point instance
 */
Point.prototype.addText = function (text = '', className = false) {
  this.attributes.add('data-text', text)
  if (className) this.attributes.add('data-text-class', className)

  return this.__check()
}

/**
 * Returns the angle between this Point and that Point
 *
 * @param {Point} that - The Point instance to calculate the angle with
 * @return {float} angle - The angle between this Point and that Point
 */
Point.prototype.angle = function (that) {
  let rad = Math.atan2(-1 * this.__check().dy(that.__check()), this.dx(that))
  while (rad < 0) rad += 2 * Math.PI

  return rad2deg(rad)
}

/**
 * Chainable way to add an attribute to the Point
 *
 * @param {string} name - Name of the attribute to add
 * @param {string} value - Value of the attribute to add
 * @param {bool} overwrite - Whether to overwrite an existing attrubute or not
 * @return {object} this - The Point instance
 */
Point.prototype.attr = function (name, value, overwrite = false) {
  if (overwrite) this.attributes.set(name, value)
  else this.attributes.add(name, value)

  return this.__check()
}

/**
 * returns an deel clone of this Point (including coordinates)
 *
 * @return {Point} clone - The cloned Point instance
 */
Point.prototype.clone = function () {
  this.__check()
  const clone = new Point(this.x, this.y).__withLog(this.log)
  clone.attributes = this.attributes.clone()

  return clone
}

/**
 * returns an copy of this Point (coordinates only)
 *
 * @return {Point} copy - The copied Point instance
 */
Point.prototype.copy = function () {
  return new Point(this.__check().x, this.y).__withLog(this.log)
}

/**
 * Returns the distance between this Point and that Point
 *
 * @param {Point} that - The Point instance to calculate the distance to
 * @return {float} distance - The distance between this Point and that Point
 */
Point.prototype.dist = function (that) {
  const dx = this.__check().x - that.__check().x
  const dy = this.y - that.y

  return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))
}

/**
 * Returns the distance along the X-axis between this Point and that Point (delta X)
 *
 * @param {Point} that - The Point to which to calcuate the X delta
 * @return {float} slote - The X delta
 */
Point.prototype.dx = function (that) {
  return that.__check().x - this.__check().x
}

/**
 * Returns the distance along the Y-axis between this Point and that Point (delta Y)
 *
 * @param {Point} that - The Point to which to calcuate the Y delta
 * @return {float} slote - The Y delta
 */
Point.prototype.dy = function (that) {
  return that.__check().y - this.__check().y
}

/**
 * Mirrors this Point around the X value of that Point
 *
 * @param {Point} that - The Point to flip around
 * @return {Point} flopped - The new flipped Point instance
 */
Point.prototype.flipX = function (that = false) {
  this.__check()
  if (that) {
    if (that instanceof Point !== true)
      this.log.warning('Called `Point.rotate(deg,that)` but `that` is not a `Point` object')
    that.__check()
  }
  if (that === false || that.x === 0) return new Point(this.x * -1, this.y).__withLog(this.log)
  else return new Point(that.x + this.dx(that), this.y).__withLog(this.log)
}

/**
 * Mirrors this Point around the Y value of that Point
 *
 * @param {Point} that - The Point to flip around
 * @return {Point} flipped - The new flipped Point instance
 */
Point.prototype.flipY = function (that = false) {
  this.__check()
  if (that) {
    if (that instanceof Point !== true)
      this.log.warning('Called `Point.flipY(that)` but `that` is not a `Point` object')
    that.__check()
  }
  if (that === false || that.y === 0) return new Point(this.x, this.y * -1).__withLog(this.log)
  else return new Point(this.x, that.y + this.dy(that)).__withLog(this.lo)
}

/**
 * Rotate this Point deg around that Point
 *
 * @param {float} deg - The degrees to rotate
 * @param {Point} that - The Point instance to rotate around
 * @return {Point} rotated - The rotated Point instance
 */
Point.prototype.rotate = function (deg, that) {
  if (typeof deg !== 'number')
    this.log.warning('Called `Point.rotate(deg,that)` but `deg` is not a number')
  if (that instanceof Point !== true)
    this.log.warning('Called `Point.rotate(deg,that)` but `that` is not a `Point` object')
  const radius = this.__check().dist(that.__check())
  const angle = this.angle(that)
  const x = that.x + radius * Math.cos(deg2rad(angle + deg)) * -1
  const y = that.y + radius * Math.sin(deg2rad(angle + deg))

  return new Point(x, y).__withLog(this.log)
}

/**
 * A chainable way to add a circle at a Point
 *
 * @param {float} radius - The circle radius
 * @param {string} className - The CSS classes to apply to the circle
 * @return {Point} this - The Point instance
 */
Point.prototype.setCircle = function (radius = false, className = false) {
  if (radius) this.attributes.set('data-circle', radius)
  if (className) this.attributes.set('data-circle-class', className)

  return this.__check()
}

/**
 * A chainable way to set text on a Point
 *
 * @param {string} text - The text to add to the Point
 * @param {string} className - The CSS classes to apply to the text
 * @return {Point} this - The Point instance
 */
Point.prototype.setText = function (text = '', className = false) {
  this.attributes.set('data-text', text)
  if (className) this.attributes.set('data-text-class', className)

  return this.__check()
}

/**
 * Shifts this Point distance in the deg direction
 *
 * @param {float} deg - The angle to shift towards
 * @param {float} dist - The distance to shift
 * @return {Point} shifted - The new shifted Point instance
 */
Point.prototype.shift = function (deg, dist) {
  deg = __asNumber(deg, 'deg', 'Point.shift', this.log)
  dist = __asNumber(dist, 'dist', 'Point.shift', this.log)
  let p = this.__check().copy()
  p.x += dist

  return p.rotate(deg, this)
}

/**
 * Shifts this Point a fraction in the direction of that Point
 *
 * @param {Point} that - The Point to shift towards
 * @param {float} fraction - The fraction to shift
 * @return {Point} shifted - The new shifted Point instance
 */
Point.prototype.shiftFractionTowards = function (that, fraction) {
  if (that instanceof Point !== true)
    this.log.warning(
      'Called `Point.shiftFractionTowards(that, fraction)` but `that` is not a `Point` object'
    )
  if (typeof fraction !== 'number')
    this.log.warning('Called `Point.shiftFractionTowards` but `fraction` is not a number')

  return this.__check().shiftTowards(that.__check(), this.dist(that) * fraction)
}

/**
 * Shifts this Point outwards from that Point
 *
 * @param {Point} that - The Point to shift outwards from
 * @param {float} distance - The distance to shift
 * @return {Point} shifted - The new shifted Point instance
 */
Point.prototype.shiftOutwards = function (that, distance) {
  distance = __asNumber(distance, 'distance', 'Point.shiftOutwards', this.log)
  if (that instanceof Point !== true)
    this.log.warning(
      'Called `Point.shiftOutwards(that, distance)` but `that` is not a `Point` object'
    )
  this.__check()
  that.__check()

  return this.__check().shiftTowards(that.__check(), this.dist(that) + distance)
}

/**
 * Shifts this Point distance in the direction of that Point
 *
 * @param {Point} that - The Point to short towards
 * @param {float} dist - The distance to shift
 * @return {Point} shifted - The new shifted Point instance
 */
Point.prototype.shiftTowards = function (that, dist) {
  dist = __asNumber(dist, 'dist', 'Point.shiftTowards', this.log)
  if (that instanceof Point !== true)
    this.log.warning(
      'Called `Point.shiftTowards(that, distance)` but `that` is not a `Point` object'
    )

  return this.__check().shift(this.angle(that.__check()), dist)
}

/**
 * Checks whether this Point has the same coordinates as that Point
 *
 * @param {Point} that - The Point to compare coordinates with
 * @return {bool} result - True if the Points' coordinates match, false when they do not
 */
Point.prototype.sitsOn = function (that) {
  if (that instanceof Point !== true)
    this.log.warning('Called `Point.sitsOn(that)` but `that` is not a `Point` object')
  if (this.__check().x === that.__check().x && this.y === that.y) return true
  else return false
}

/**
 * Checks whether this Point has roughtly the same coordinates as that Point
 *
 * @param {Point} that - The Point to compare coordinates with
 * @return {bool} result - True if the Points' coordinates roughty match, false when they do not
 */
Point.prototype.sitsRoughlyOn = function (that) {
  if (that instanceof Point !== true)
    this.log.warning('Called `Point.sitsRoughlyOn(that)` but `that` is not a `Point` object')
  if (
    Math.round(this.__check().x) === Math.round(that.__check().x) &&
    Math.round(this.y) === Math.round(that.y)
  )
    return true
  else return false
}

/**
 * Returns slope of a line made by this Point and that Point
 *
 * @param {Point} that - The Point that forms the line together with this Point
 * @return {float} slope - The slope of the line made by this Point and that Point
 */
Point.prototype.slope = function (that) {
  return (that.__check().y - this.__check().y) / (that.x - this.x)
}

/**
 * Returns a Point instance with a translate transform applied
 *
 * @param {float} x - The X-value of the translate transform
 * @param {float} y - The Y-value of the translate transform
 * @return {Point} translated - The translated Point instance
 */
Point.prototype.translate = function (x, y) {
  this.__check()
  if (typeof x !== 'number')
    this.log.warning('Called `Point.translate(x,y)` but `x` is not a number')
  if (typeof y !== 'number')
    this.log.warning('Called `Point.translate(x,y)` but `y` is not a number')
  const p = this.copy()
  p.x += x
  p.y += y

  return p
}

/**
 * Returns a point as an object suitable for inclusion in renderprops
 *
 * @return {object} point - A plain object representing the point
 */
Point.prototype.asRenderProps = function () {
  return {
    x: this.x,
    y: this.y,
    attributes: this.attributes.asRenderProps(),
  }
}

//////////////////////////////////////////////
//            PRIVATE METHODS               //
//////////////////////////////////////////////

/**
 * Checks the Points coordinates, and raises a warning when they are invalid
 *
 * @private
 * @return {object} this - The Point instance
 */
Point.prototype.__check = function () {
  if (typeof this.x !== 'number') this.log.warning('X value of `Point` is not a number')
  if (typeof this.y !== 'number') this.log.warning('Y value of `Point` is not a number')

  return this
}

/**
 * Adds a logging instance so the Point can log
 *
 * @private
 * @param {object} log - An object holding the logging methods
 * @return {object} this - The Point instance
 */
Point.prototype.__withLog = function (log = false) {
  if (log) Object.defineProperty(this, 'log', { value: log })

  return this
}

//////////////////////////////////////////////
//        PUBLIC STATIC METHODS             //
//////////////////////////////////////////////

/**
 * Returns a ready-to-proxy that logs when things aren't exactly ok
 *
 * @private
 * @param {object} points - The points object to proxy
 * @param {object} log - The logging object
 * @return {object} proxy - The object that is ready to be proxied
 */
export function pointsProxy(points, log) {
  return {
    get: function (...args) {
      return Reflect.get(...args)
    },
    set: (points, name, value) => {
      // Constructor checks
      if (value instanceof Point !== true)
        log.warning(`\`points.${name}\` was set with a value that is not a \`Point\` object`)
      if (value.x == null || !__isCoord(value.x))
        log.warning(`\`points.${name}\` was set with a \`x\` parameter that is not a \`number\``)
      if (value.y == null || !__isCoord(value.y))
        log.warning(`\`points.${name}\` was set with a \`y\` parameter that is not a \`number\``)
      try {
        value.name = name
      } catch (err) {
        log.warning(`Could not set \`name\` property on \`points.${name}\``)
      }
      return (points[name] = value)
    },
  }
}
