import { Attributes } from './attributes.mjs'
import { Point } from './point.mjs'
import { Bezier } from 'bezier-js'
import {
  linesIntersect,
  lineIntersectsCurve,
  curvesIntersect,
  pointOnLine,
  pointOnCurve,
  curveEdge,
  round,
  __addNonEnumProp,
  __asNumber,
} from './utils.mjs'

//////////////////////////////////////////////
//               CONSTRUCTOR                //
//////////////////////////////////////////////

/**
 * Constructor for a Path
 *
 * @constructor
 * @return {Path} this - The Path instance
 */
export function Path() {
  // Enumerable properties
  this.hidden = false
  this.ops = []
  this.attributes = new Attributes()
  this.topLeft = false
  this.bottomRight = false

  return this
}

//////////////////////////////////////////////
//            PUBLIC METHODS                //
//////////////////////////////////////////////

/**
 * Adds a curve operation without cp1 via cp2 to Point to
 *
 * @param {Point} cp2 - The end control Point
 * @param {Point} to - The end point
 * @return {Path} this - The Path instance
 */
Path.prototype._curve = function (cp2, to) {
  if (to instanceof Point !== true)
    this.log.warning('Called `Path._curve(cp2, to)` but `to` is not a `Point` object')
  if (cp2 instanceof Point !== true)
    this.log.warning('Called `Path._curve(cp2, to)` but `cp2` is not a `Point` object')
  let cp1 = this.ops.slice(-1).pop().to
  this.ops.push({ type: 'curve', cp1, cp2, to })

  return this
}

/**
 * Chainable way to add to the class attribute
 *
 * @param {string} className - The value to add to the class attribute
 * @return {Path} this - The Path instance
 */
Path.prototype.addClass = function (className = false) {
  if (className) this.attributes.add('class', className)

  return this
}

/**
 * A chainable way to add text to a Path
 *
 * @param {string} text - The text to add to the Path
 * @param {string} className - The CSS classes to apply to the text
 * @return {Path} this - The Path instance
 */
Path.prototype.addText = function (text = '', className = false) {
  this.attributes.add('data-text', text)
  if (className) this.attributes.add('data-text-class', className)

  return this
}

/**
 * Returns the SVG pathstring for this path
 *
 * @return {string} svg - The SVG pathsstring (the 'd' attribute of an SVG path)
 */
Path.prototype.asPathstring = function () {
  let d = ''
  for (let op of this.ops) {
    switch (op.type) {
      case 'move':
        d += `M ${round(op.to.x)},${round(op.to.y)}`
        break
      case 'line':
        d += ` L ${round(op.to.x)},${round(op.to.y)}`
        break
      case 'curve':
        d += ` C ${round(op.cp1.x)},${round(op.cp1.y)} ${round(op.cp2.x)},${round(
          op.cp2.y
        )} ${round(op.to.x)},${round(op.to.y)}`
        break
      case 'close':
        d += ' z'
        break
    }
  }

  return d
}

/**
 * Chainable way to add an attribute
 *
 * @param {string} name - Name of the attribute to add
 * @param {string} value - Value of the attribute to add
 * @param {bool} overwrite - Whether to overwrite an existing attrubute or not
 * @return {Path} this - The Path instance
 */
Path.prototype.attr = function (name, value, overwrite = false) {
  if (!name)
    this.log.warning(
      'Called `Path.attr(name, value, overwrite=false)` but `name` is undefined or false'
    )
  if (typeof value === 'undefined')
    this.log.warning('Called `Path.attr(name, value, overwrite=false)` but `value` is undefined')
  if (overwrite)
    this.log.debug(
      `Overwriting \`Path.attribute.${name}\` with ${value} (was: ${this.attributes.get(name)})`
    )
  if (overwrite) this.attributes.set(name, value)
  else this.attributes.add(name, value)

  return this
}

/**
 * Returns an object holding topLeft and bottomRight Points of the bounding box of this path
 *
 * @return {object} bbox - The bounding box object holding a topLeft and bottomRight Point instance
 */
Path.prototype.bbox = function () {
  let bbs = []
  let current
  for (let i in this.ops) {
    let op = this.ops[i]
    if (op.type === 'line') {
      bbs.push(__lineBoundingBox({ from: current, to: op.to }))
    } else if (op.type === 'curve') {
      bbs.push(
        __curveBoundingBox(
          new Bezier(
            { x: current.x, y: current.y },
            { x: op.cp1.x, y: op.cp1.y },
            { x: op.cp2.x, y: op.cp2.y },
            { x: op.to.x, y: op.to.y }
          )
        )
      )
    }
    if (op.to) current = op.to
  }

  return __bbbbox(bbs)
}

/**
 * Returns this after cleaning out in-place path operations
 *
 * Cleaned means that any in-place ops will be removed
 * An in-place op is when a drawing operation doesn't draw anything
 * like a line from the point to the same point
 *
 * @return {Path} this - This, but cleaned
 */
Path.prototype.clean = function () {
  const ops = []
  let cur
  for (const i in this.ops) {
    const op = this.ops[i]
    if (['move', 'close', 'noop'].includes(op.type)) ops.push(op)
    else if (op.type === 'line') {
      if (!op.to.sitsRoughlyOn(cur)) ops.push(op)
    } else if (op.type === 'curve') {
      if (!(op.cp1.sitsRoughlyOn(cur) && op.cp2.sitsRoughlyOn(cur) && op.to.sitsRoughlyOn(cur)))
        ops.push(ops)
    }
    cur = op?.to
  }

  if (ops.length < this.ops.length) this.ops = ops

  return this
}

/**
 * Returns a deep copy of this path
 *
 * @return {Path} clone - A clone of this Path instance
 */
Path.prototype.clone = function () {
  let clone = new Path().__withLog(this.log).setHidden(this.hidden)
  if (this.topLeft) clone.topLeft = this.topLeft.clone()
  else clone.topLeft = false
  if (this.bottomRight) clone.bottomRight = this.bottomRight.clone()
  else clone.bottomRight = false
  clone.attributes = this.attributes.clone()
  clone.ops = []
  for (let i in this.ops) {
    let op = this.ops[i]
    clone.ops[i] = { type: op.type }
    if (op.type === 'move' || op.type === 'line') {
      clone.ops[i].to = op.to.clone()
    } else if (op.type === 'curve') {
      clone.ops[i].to = op.to.clone()
      clone.ops[i].cp1 = op.cp1.clone()
      clone.ops[i].cp2 = op.cp2.clone()
    } else if (op.type === 'noop') {
      clone.ops[i].id = op.id
    }
  }

  return clone
}

/**
 * Adds a close operation
 *
 * @return {Path} this - The Path instance
 */
Path.prototype.close = function () {
  this.ops.push({ type: 'close' })

  return this
}

/**
 * Adds a curve operation via cp1 & cp2 to Point to
 *
 * @param {Point} cp1 - The start control Point
 * @param {Point} cp2 - The end control Point
 * @param {Point} to - The end point
 * @return {Path} this - The Path instance
 */
Path.prototype.curve = function (cp1, cp2, to) {
  if (to instanceof Point !== true)
    this.log.warning('Called `Path.curve(cp1, cp2, to)` but `to` is not a `Point` object')
  if (cp1 instanceof Point !== true)
    this.log.warning('Called `Path.curve(cp1, cp2, to)` but `cp1` is not a `Point` object')
  if (cp2 instanceof Point !== true)
    this.log.warning('Called `Path.curve(cp1, cp2, to)` but `cp2` is not a `Point` object')
  this.ops.push({ type: 'curve', cp1, cp2, to })

  return this
}

/**
 * Adds a curve operation via cp1 with no cp2 to Point to
 *
 * @param {Point} cp1 - The start control Point
 * @param {Point} to - The end point
 * @return {Path} this - The Path instance
 */
Path.prototype.curve_ = function (cp1, to) {
  if (to instanceof Point !== true)
    this.log.warning('Called `Path.curve_(cp1, to)` but `to` is not a `Point` object')
  if (cp1 instanceof Point !== true)
    this.log.warning('Called `Path.curve_(cp1, to)` but `cp1` is not a `Point` object')
  let cp2 = to.copy()
  this.ops.push({ type: 'curve', cp1, cp2, to })

  return this
}

/**
 * Divides this Path in atomic paths
 *
 * @return {Array} paths - An array of atomic paths that together make up this Path
 */
Path.prototype.divide = function () {
  let paths = []
  let current, start
  for (let i in this.ops) {
    let op = this.ops[i]
    if (op.type === 'move') {
      start = op.to
    } else if (op.type === 'line') {
      if (!op.to.sitsRoughlyOn(current))
        paths.push(new Path().__withLog(this.log).move(current).line(op.to))
    } else if (op.type === 'curve') {
      paths.push(new Path().__withLog(this.log).move(current).curve(op.cp1, op.cp2, op.to))
    } else if (op.type === 'close') {
      paths.push(new Path().__withLog(this.log).move(current).line(start))
    }
    if (op.to) current = op.to
  }

  return paths
}

/**
 * Returns the point at an edge of this Path
 *
 * @param {string} side - One of 'topLeft', 'bottomRight', 'topRight', or 'bottomLeft'
 * @return {object} point - The Point at the requested edge of (the bounding box of) this Path
 */
Path.prototype.edge = function (side) {
  this.__boundary()
  if (side === 'topLeft') return this.topLeft
  else if (side === 'bottomRight') return this.bottomRight
  else if (side === 'topRight') return new Point(this.bottomRight.x, this.topLeft.y)
  else if (side === 'bottomLeft') return new Point(this.topLeft.x, this.bottomRight.y)
  else {
    let s = side + 'Op'
    if (this[s].type === 'move') return this[s].to
    else if (this[s].type === 'line') {
      if (side === 'top') {
        if (this.topOp.to.y < this.topOp.from.y) return this.topOp.to
        else return this.topOp.from
      } else if (side === 'left') {
        if (this.leftOp.to.x < this.leftOp.from.x) return this.leftOp.to
        else return this.leftOp.from
      } else if (side === 'bottom') {
        if (this.bottomOp.to.y > this.bottomOp.from.y) return this.bottomOp.to
        else return this.bottomOp.from
      } else if (side === 'right') {
        if (this.rightOp.to.x > this.rightOp.from.x) return this.rightOp.to
        else return this.rightOp.from
      }
    } else if (this[s].type === 'curve')
      return curveEdge(
        new Bezier(
          { x: this[s].from.x, y: this[s].from.y },
          { x: this[s].cp1.x, y: this[s].cp1.y },
          { x: this[s].cp2.x, y: this[s].cp2.y },
          { x: this[s].to.x, y: this[s].to.y }
        ),
        side
      )
  }
}

/**
 * Returns the endpoint of this path
 *
 * @return {Point} end - The end point
 */
Path.prototype.end = function () {
  if (this.ops.length < 1)
    this.log.error('Called `Path.end()` but this path has no drawing operations')
  let op = this.ops[this.ops.length - 1]

  if (op.type === 'close') return this.start()
  else return op.to
}

/**
 * Hide the path
 *
 * @return {Path} path - The Path instance
 */
Path.prototype.hide = function () {
  this.hidden = true

  return this
}

/**
 * Replace a noop operation with the ops from path
 *
 * @param {string} noopId = The ID of the noop where the operations should be inserted
 * @param {Path} path = The path of which the operations should be inserted
 * @return {object} this - The Path instance
 */
Path.prototype.insop = function (noopId, path) {
  if (!noopId)
    this.log.warning('Called `Path.insop(noopId, path)` but `noopId` is undefined or false')
  if (path instanceof Path !== true)
    this.log.warning('Called `Path.insop(noopId, path) but `path` is not a `Path` object')
  let newPath = this.clone()
  for (let i in newPath.ops) {
    if (newPath.ops[i].type === 'noop' && newPath.ops[i].id === noopId) {
      newPath.ops = newPath.ops
        .slice(0, i)
        .concat(path.ops)
        .concat(newPath.ops.slice(Number(i) + 1))
    }
  }

  return newPath
}

/**
 * Finds intersections between this Path and another Path
 *
 * @param {Path} path - The Path instance to check for intersections with this Path instance
 * @return {Array} intersections - An array of Point objects where the paths intersect
 */
Path.prototype.intersects = function (path) {
  if (this === path)
    this.log.error('You called Path.intersects(path)` but `path` and `this` are the same object')
  let intersections = []
  for (let pathA of this.divide()) {
    for (let pathB of path.divide()) {
      if (pathA.ops[1].type === 'line') {
        if (pathB.ops[1].type === 'line') {
          __addIntersectionsToArray(
            linesIntersect(pathA.ops[0].to, pathA.ops[1].to, pathB.ops[0].to, pathB.ops[1].to),
            intersections
          )
        } else if (pathB.ops[1].type === 'curve') {
          __addIntersectionsToArray(
            lineIntersectsCurve(
              pathA.ops[0].to,
              pathA.ops[1].to,
              pathB.ops[0].to,
              pathB.ops[1].cp1,
              pathB.ops[1].cp2,
              pathB.ops[1].to
            ),
            intersections
          )
        }
      } else if (pathA.ops[1].type === 'curve') {
        if (pathB.ops[1].type === 'line') {
          __addIntersectionsToArray(
            lineIntersectsCurve(
              pathB.ops[0].to,
              pathB.ops[1].to,
              pathA.ops[0].to,
              pathA.ops[1].cp1,
              pathA.ops[1].cp2,
              pathA.ops[1].to
            ),
            intersections
          )
        } else if (pathB.ops[1].type === 'curve') {
          __addIntersectionsToArray(
            curvesIntersect(
              pathA.ops[0].to,
              pathA.ops[1].cp1,
              pathA.ops[1].cp2,
              pathA.ops[1].to,
              pathB.ops[0].to,
              pathB.ops[1].cp1,
              pathB.ops[1].cp2,
              pathB.ops[1].to
            ),
            intersections
          )
        }
      }
    }
  }

  return intersections
}

/**
 * Finds intersections between this Path and an X value
 *
 * @param {float} x - The X-value to check for intersections
 * @return {Array} paths - An array of atomic paths that together make up this Path
 */
Path.prototype.intersectsX = function (x) {
  if (typeof x !== 'number') this.log.error('Called `Path.intersectsX(x)` but `x` is not a number')
  return this.__intersectsAxis(x, 'x')
}

/**
 * Finds intersections between this Path and an Y value
 *
 * @param {float} y - The Y-value to check for intersections
 * @return {Array} paths - An array of atomic paths that together make up this Path
 */
Path.prototype.intersectsY = function (y) {
  if (typeof y !== 'number') this.log.error('Called `Path.intersectsX(y)` but `y` is not a number')
  return this.__intersectsAxis(y, 'y')
}

/**
 * Joins this Path with that Path, and closes them if wanted
 *
 * @param {Path} that - The Path to join this Path with
 * @param {bool} closed - Whether or not to close the joint Path
 * @return {Path} joint - The joint Path instance
 */
Path.prototype.join = function (that, closed = false) {
  if (that instanceof Path !== true)
    this.log.error('Called `Path.join(that)` but `that` is not a `Path` object')
  return __joinPaths([this, that], closed)
}

/**
 * Return the length of this Path
 *
 * @return {float} length - The length of this path
 */
Path.prototype.length = function () {
  let current, start
  let length = 0
  for (let i in this.ops) {
    let op = this.ops[i]
    if (op.type === 'move') {
      start = op.to
    } else if (op.type === 'line') {
      length += current.dist(op.to)
    } else if (op.type === 'curve') {
      length += new Bezier(
        { x: current.x, y: current.y },
        { x: op.cp1.x, y: op.cp1.y },
        { x: op.cp2.x, y: op.cp2.y },
        { x: op.to.x, y: op.to.y }
      ).length()
    } else if (op.type === 'close') {
      length += current.dist(start)
    }
    if (op.to) current = op.to
  }

  return length
}

/**
 * Adds a line operation to Point to
 *
 * @param {Point} to - The point to stroke to
 * @return {object} this - The Path instance
 */
Path.prototype.line = function (to) {
  if (to instanceof Point !== true)
    this.log.warning('Called `Path.line(to)` but `to` is not a `Point` object')
  this.ops.push({ type: 'line', to })

  return this
}

/**
 * Adds a move operation to Point to
 *
 * @param {Point} to - The point to move to
 * @return {object} this - The Path instance
 */
Path.prototype.move = function (to) {
  if (to instanceof Point !== true)
    this.log.warning('Called `Path.move(to)` but `to` is not a `Point` object')
  this.ops.push({ type: 'move', to })

  return this
}

/**
 * Adds a noop operation
 *
 * @param {string} id = The ID to reference this noop later with Path.insop()
 * @return {object} this - The Path instance
 */
Path.prototype.noop = function (id = false) {
  this.ops.push({ type: 'noop', id })

  return this
}

/**
 * Returns an offset version of this path as a new path
 *
 * @param {float} distance - The distance by which to offset
 * @return {object} this - The Path instance
 */
Path.prototype.offset = function (distance) {
  distance = __asNumber(distance, 'distance', 'Path.offset', this.log)

  return __pathOffset(this, distance, this.log)
}

/**
 * Returns a reversed version of this Path
 *
 * @return {object} reverse - A Path instance that is the reversed version of this Path
 */
Path.prototype.reverse = function (cloneAttributes = false) {
  let sections = []
  let current
  let closed = false
  for (let i in this.ops) {
    let op = this.ops[i]
    if (op.type === 'line') {
      if (!op.to.sitsOn(current))
        sections.push(new Path().__withLog(this.log).move(op.to).line(current))
    } else if (op.type === 'curve') {
      sections.push(new Path().__withLog(this.log).move(op.to).curve(op.cp2, op.cp1, current))
    } else if (op.type === 'close') {
      closed = true
    }
    if (op.to) current = op.to
  }
  let rev = new Path().__withLog(this.log).move(current)
  for (let section of sections.reverse()) rev.ops.push(section.ops[1])
  if (closed) rev.close()
  if (cloneAttributes) rev.attributes = this.attributes.clone()

  return rev
}

/**
 * Returns a rough estimate of the length of this path
 *
 * This avoids walking Bezier curves and thus is much faster but not accurate at all
 *
 * @return {float} length - The approximate length of the path
 */
Path.prototype.roughLength = function () {
  let current, start
  let length = 0
  for (let i in this.ops) {
    let op = this.ops[i]
    if (op.type === 'move') {
      start = op.to
    } else if (op.type === 'line') {
      length += current.dist(op.to)
    } else if (op.type === 'curve') {
      length += current.dist(op.cp1)
      length += op.cp1.dist(op.cp2)
      length += op.cp2.dist(op.to)
    } else if (op.type === 'close') {
      length += current.dist(start)
    }
    if (op.to) current = op.to
  }

  return length
}

/**
 * Chainable way to set the class attribute
 *
 * @param {string} className - The value to set on the class attribute
 * @return {object} this - The Path instance
 */
Path.prototype.setClass = function (className = false) {
  if (className) this.attributes.set('class', className)

  return this
}

/**
 * Set the hidden attribute
 *
 * @param {boolean} hidden - The value to set the hidden property to
 * @return {object} this - The Path instance
 */
Path.prototype.setHidden = function (hidden = false) {
  if (hidden) this.hidden = true
  else this.hidden = false

  return this
}

/**
 * A chainable way to set text on a Path
 *
 * @param {string} text - The text to add to the Path
 * @param {string} className - The CSS classes to apply to the text
 * @return {Path} this - The Path instance
 */
Path.prototype.setText = function (text = '', className = false) {
  this.attributes.set('data-text', text)
  if (className) this.attributes.set('data-text-class', className)

  return this
}
/**
 * Returns a point that lies at distance along this Path
 *
 * @param {float} distance - The distance to shift along this Path
 * @param {int} stepsPerMm - The amount of steps per millimeter to talke while walking the cubic Bezier curve
 * @return {Point} point - The point that lies distance along this Path
 */
Path.prototype.shiftAlong = function (distance, stepsPerMm = 10) {
  distance = __asNumber(distance, 'distance', 'Path.shiftAlong', this.log)
  let len = 0
  let current
  for (let i in this.ops) {
    let op = this.ops[i]
    if (op.type === 'line') {
      let thisLen = op.to.dist(current)
      if (Math.abs(len + thisLen - distance) < 0.1) return op.to
      if (len + thisLen > distance) return current.shiftTowards(op.to, distance - len)
      len += thisLen
    } else if (op.type === 'curve') {
      let bezier = new Bezier(
        { x: current.x, y: current.y },
        { x: op.cp1.x, y: op.cp1.y },
        { x: op.cp2.x, y: op.cp2.y },
        { x: op.to.x, y: op.to.y }
      )
      let thisLen = bezier.length()
      if (Math.abs(len + thisLen - distance) < 0.1) return op.to
      if (len + thisLen > distance)
        return __shiftAlongBezier(distance - len, bezier, thisLen * stepsPerMm)
      len += thisLen
    }
    current = op.to
  }
  this.log.error(
    `Called \`Path.shiftAlong(distance)\` with a \`distance\` of \`${distance}\` but \`Path.length()\` is only \`${this.length()}\``
  )
}

/**
 * Returns a point that lies at fraction along this Path
 *
 * @param {float} fraction - The fraction to shift along this Path
 * @param {int} stepsPerMm - The amount of steps per millimeter to talke while walking the cubic Bezier curve
 * @return {Point} point - The point that lies fraction along this Path
 */
Path.prototype.shiftFractionAlong = function (fraction, stepsPerMm = 10) {
  if (typeof fraction !== 'number')
    this.log.error('Called `Path.shiftFractionAlong(fraction)` but `fraction` is not a number')
  return this.shiftAlong(this.length() * fraction, stepsPerMm)
}

/**
 * Adds a smooth curve operation via cp2 to Point to
 *
 * @param {Point} cp2 - The end control Point
 * @param {Point} to - The end point
 * @return {Path} this - The Path instance
 */
Path.prototype.smurve = function (cp2, to) {
  if (to instanceof Point !== true)
    this.log.warning('Called `Path.smurve(cp2, to)` but `to` is not a `Point` object')
  if (cp2 instanceof Point !== true)
    this.log.warning('Called `Path.smurve(cp2, to)` but `cp2` is not a `Point` object')
  // Retrieve cp1 from previous operation
  const prevOp = this.ops.slice(-1).pop()
  const cp1 = prevOp.cp2.rotate(180, prevOp.to)
  this.ops.push({ type: 'curve', cp1, cp2, to })

  return this
}

/**
 * Adds a smooth curve operation without cp to Point to
 *
 * @return {Path} this - The Path instance
 */
Path.prototype.smurve_ = function (to) {
  if (to instanceof Point !== true)
    this.log.warning('Called `Path.smurve_(to)` but `to` is not a `Point` object')
  // Retrieve cp1 from previous operation
  const prevOp = this.ops.slice(-1).pop()
  const cp1 = prevOp.cp2.rotate(180, prevOp.to)
  const cp2 = to
  this.ops.push({ type: 'curve', cp1, cp2, to })

  return this
}

/**
 * Splits path on point, and retuns both halves as Path instances
 *
 * @param {Point} point - The Point to split this Path on
 * @return {Array} halves - An array holding the two Path instances that make the split halves
 */
Path.prototype.split = function (point) {
  if (point instanceof Point !== true)
    this.log.error('Called `Path.split(point)` but `point` is not a `Point` object')
  let divided = this.divide()
  let firstHalf = []
  let secondHalf = []
  for (let pi = 0; pi < divided.length; pi++) {
    let path = divided[pi]
    if (path.ops[1].type === 'line') {
      if (path.ops[0].to.sitsRoughlyOn(point)) {
        secondHalf.push(new Path().__withLog(this.log).move(path.ops[0].to).line(path.ops[1].to))
      } else if (path.ops[1].to.sitsRoughlyOn(point)) {
        firstHalf.push(new Path().__withLog(this.log).move(path.ops[0].to).line(path.ops[1].to))
      } else if (pointOnLine(path.ops[0].to, path.ops[1].to, point)) {
        firstHalf = divided.slice(0, pi)
        firstHalf.push(new Path().__withLog(this.log).move(path.ops[0].to).line(point))
        pi++
        secondHalf = divided.slice(pi)
        secondHalf.unshift(new Path().__withLog(this.log).move(point).line(path.ops[1].to))
      }
    } else if (path.ops[1].type === 'curve') {
      if (path.ops[0].to.sitsRoughlyOn(point)) {
        secondHalf.push(
          new Path()
            .__withLog(this.log)
            .move(path.ops[0].to)
            .curve(path.ops[1].cp1, path.ops[1].cp2, path.ops[1].to)
        )
      } else if (path.ops[1].to.sitsRoughlyOn(point)) {
        firstHalf.push(
          new Path()
            .__withLog(this.log)
            .move(path.ops[0].to)
            .curve(path.ops[1].cp1, path.ops[1].cp2, path.ops[1].to)
        )
      } else {
        let t = pointOnCurve(
          path.ops[0].to,
          path.ops[1].cp1,
          path.ops[1].cp2,
          path.ops[1].to,
          point
        )
        if (t !== false) {
          let curve = new Bezier(
            { x: path.ops[0].to.x, y: path.ops[0].to.y },
            { x: path.ops[1].cp1.x, y: path.ops[1].cp1.y },
            { x: path.ops[1].cp2.x, y: path.ops[1].cp2.y },
            { x: path.ops[1].to.x, y: path.ops[1].to.y }
          )
          let split = curve.split(t)
          firstHalf = divided.slice(0, pi)
          firstHalf.push(
            new Path()
              .__withLog(this.log)
              .move(new Point(split.left.points[0].x, split.left.points[0].y))
              .curve(
                new Point(split.left.points[1].x, split.left.points[1].y),
                new Point(split.left.points[2].x, split.left.points[2].y),
                new Point(split.left.points[3].x, split.left.points[3].y)
              )
          )
          pi++
          secondHalf = divided.slice(pi)
          secondHalf.unshift(
            new Path()
              .__withLog(this.log)
              .move(new Point(split.right.points[0].x, split.right.points[0].y))
              .curve(
                new Point(split.right.points[1].x, split.right.points[1].y),
                new Point(split.right.points[2].x, split.right.points[2].y),
                new Point(split.right.points[3].x, split.right.points[3].y)
              )
          )
        }
      }
    }
  }
  if (firstHalf.length > 0) firstHalf = __joinPaths(firstHalf, false)
  if (secondHalf.length > 0) secondHalf = __joinPaths(secondHalf, false)

  return [firstHalf, secondHalf]
}

/**
 * Returns the startpoint of this path
 *
 * @return {Point} start - The start point
 */
Path.prototype.start = function () {
  if (this.ops.length < 1 || typeof this.ops[0].to === 'undefined')
    this.log.error('Called `Path.start()` but this path has no drawing operations')
  return this.ops[0].to
}

/**
 * Returns a cloned Path instance with a translate tranform applied
 *
 * @param {float} x - The X-value for the transform
 * @param {float} y - The Y-value for the transform
 * @return {Path} this - This Path instance
 */
Path.prototype.translate = function (x, y) {
  if (typeof x !== 'number')
    this.log.warning('Called `Path.translate(x, y)` but `x` is not a number')
  if (typeof y !== 'number')
    this.log.warning('Called `Path.translate(x, y)` but `y` is not a number')
  let clone = this.clone()
  for (let op of clone.ops) {
    if (op.type !== 'close') {
      op.to = op.to.translate(x, y)
    }
    if (op.type === 'curve') {
      op.cp1 = op.cp1.translate(x, y)
      op.cp2 = op.cp2.translate(x, y)
    }
  }

  return clone
}

/**
 * Removes self-intersections (overlap) from this Path instance
 *
 * @return {Path} this - This Path instance
 */
Path.prototype.trim = function () {
  let chunks = this.divide()
  for (let i = 0; i < chunks.length; i++) {
    let firstCandidate = parseInt(i) + 2
    let lastCandidate = parseInt(chunks.length) - 1
    for (let j = firstCandidate; j < lastCandidate; j++) {
      let intersections = chunks[i].intersects(chunks[j])
      if (intersections.length > 0) {
        let intersection = intersections.pop()
        let trimmedStart = chunks.slice(0, i)
        let trimmedEnd = chunks.slice(parseInt(j) + 1)
        let glue = new Path().__withLog(this.log)
        let first = true
        for (let k of [i, j]) {
          let ops = chunks[k].ops
          if (ops[1].type === 'line') {
            glue.line(intersection)
          } else if (ops[1].type === 'curve') {
            // handle curve
            let curve = new Bezier(
              { x: ops[0].to.x, y: ops[0].to.y },
              { x: ops[1].cp1.x, y: ops[1].cp1.y },
              { x: ops[1].cp2.x, y: ops[1].cp2.y },
              { x: ops[1].to.x, y: ops[1].to.y }
            )
            let t = pointOnCurve(ops[0].to, ops[1].cp1, ops[1].cp2, ops[1].to, intersection)
            let split = curve.split(t)
            let side
            if (first) side = split.left
            else side = split.right
            glue.curve(
              new Point(side.points[1].x, side.points[1].y),
              new Point(side.points[2].x, side.points[2].y),
              new Point(side.points[3].x, side.points[3].y)
            )
          }
          first = false
        }
        let joint
        if (trimmedStart.length > 0) joint = __joinPaths(trimmedStart, false).join(glue)
        else joint = glue
        if (trimmedEnd.length > 0) joint = joint.join(__joinPaths(trimmedEnd, false))

        return joint.trim()
      }
    }
  }

  return this
}

/**
 * Unhide the path
 *
 * @return {Path} path - The Path instance
 */
Path.prototype.unhide = function () {
  this.hidden = false

  return this
}

//////////////////////////////////////////////
//            PRIVATE METHODS               //
//////////////////////////////////////////////

/**
 * Finds the bounding box of a path
 *
 * @private
 * @return {object} this - The Path instance
 */
Path.prototype.__boundary = function () {
  if (this.topOp) return this // Cached

  let current
  let topLeft = new Point(Infinity, Infinity)
  let bottomRight = new Point(-Infinity, -Infinity)
  let edges = []
  for (let i in this.ops) {
    let op = this.ops[i]
    if (op.type === 'move' || op.type === 'line') {
      if (op.to.x < topLeft.x) {
        topLeft.x = op.to.x
        edges['leftOp'] = i
      }
      if (op.to.y < topLeft.y) {
        topLeft.y = op.to.y
        edges['topOp'] = i
      }
      if (op.to.x > bottomRight.x) {
        bottomRight.x = op.to.x
        edges['rightOp'] = i
      }
      if (op.to.y > bottomRight.y) {
        bottomRight.y = op.to.y
        edges['bottomOp'] = i
      }
    } else if (op.type === 'curve') {
      let bb = new Bezier(
        { x: current.x, y: current.y },
        { x: op.cp1.x, y: op.cp1.y },
        { x: op.cp2.x, y: op.cp2.y },
        { x: op.to.x, y: op.to.y }
      ).bbox()
      if (bb.x.min < topLeft.x) {
        topLeft.x = bb.x.min
        edges['leftOp'] = i
      }
      if (bb.y.min < topLeft.y) {
        topLeft.y = bb.y.min
        edges['topOp'] = i
      }
      if (bb.x.max > bottomRight.x) {
        bottomRight.x = bb.x.max
        edges['rightOp'] = i
      }
      if (bb.y.max > bottomRight.y) {
        bottomRight.y = bb.y.max
        edges['bottomOp'] = i
      }
    }
    if (op.to) current = op.to
  }

  this.topLeft = topLeft
  this.bottomRight = bottomRight

  for (let side of ['top', 'left', 'bottom', 'right']) {
    let s = side + 'Op'
    this[s] = this.ops[edges[s]]
    this[s].from = this[s].type === 'move' ? this[s].to : this.ops[edges[s] - 1].to
  }

  return this
}

/**
 * Finds intersections between this Path and a X or Y value
 *
 * @private
 * @param {float} val - The X or Y value check for intersections
 * @param {string} mode - Either 'x' or 'y' to indicate to check for intersections on the X or Y axis
 * @return {Array} intersections - An array of Point objects where the Path intersects
 */
Path.prototype.__intersectsAxis = function (val = false, mode) {
  let intersections = []
  let lineStart = mode === 'x' ? new Point(val, -100000) : new Point(-10000, val)
  let lineEnd = mode === 'x' ? new Point(val, 100000) : new Point(100000, val)
  for (let path of this.divide()) {
    if (path.ops[1].type === 'line') {
      __addIntersectionsToArray(
        linesIntersect(path.ops[0].to, path.ops[1].to, lineStart, lineEnd),
        intersections
      )
    } else if (path.ops[1].type === 'curve') {
      __addIntersectionsToArray(
        lineIntersectsCurve(
          lineStart,
          lineEnd,
          path.ops[0].to,
          path.ops[1].cp1,
          path.ops[1].cp2,
          path.ops[1].to
        ),
        intersections
      )
    }
  }

  return intersections
}

/**
 * Adds the log method for a path not created through the proxy
 *
 * @private
 * @return {object} this - The Path instance
 */
Path.prototype.__withLog = function (log = false) {
  if (log) __addNonEnumProp(this, 'log', log)

  return this
}

//////////////////////////////////////////////
//        PUBLIC  STATIC METHODS            //
//////////////////////////////////////////////

/**
 * Returns a ready-to-proxy that logs when things aren't exactly ok
 *
 * @private
 * @param {object} paths - The paths object to proxy
 * @param {object} log - The logging object
 * @return {object} proxy - The object that is ready to be proxied
 */
export function pathsProxy(paths, log) {
  return {
    get: function (...args) {
      return Reflect.get(...args)
    },
    set: (paths, name, value) => {
      // Constructor checks
      if (value instanceof Path !== true)
        log.warning(`\`paths.${name}\` was set with a value that is not a \`Path\` object`)
      try {
        value.name = name
      } catch (err) {
        log.warning(`Could not set \`name\` property on \`paths.${name}\``)
      }
      return (paths[name] = value)
    },
  }
}

//////////////////////////////////////////////
//       PRIVATE  STATIC METHODS            //
//////////////////////////////////////////////

/**
 * Helper method to add intersection candidates to Array
 *
 * @private
 * @param {Array|Object|false} candidates - One Point or an array of Points to check for intersection
 * @param {Path} path - The Path instance to add as intersection if it has coordinates
 * @return {Array} intersections - An array of Point objects where the paths intersect
 */
function __addIntersectionsToArray(candidates, intersections) {
  if (!candidates) return
  if (typeof candidates === 'object') {
    if (typeof candidates.x === 'number') intersections.push(candidates)
    else {
      for (let candidate of candidates) intersections.push(candidate)
    }
  }
}

/**
 * Converts a bezier-js instance to a path
 *
 * @private
 * @param {BezierJs} bezier - A BezierJs instance
 * @param {object} log - The logging object
 * @return {object} path - A Path instance
 */
function __asPath(bezier, log = false) {
  return new Path()
    .__withLog(log)
    .move(new Point(bezier.points[0].x, bezier.points[0].y))
    .curve(
      new Point(bezier.points[1].x, bezier.points[1].y),
      new Point(bezier.points[2].x, bezier.points[2].y),
      new Point(bezier.points[3].x, bezier.points[3].y)
    )
    .clean()
}

/**
 * Returns the bounding box of multiple bounding boxes
 *
 * @private
 * @param {Array} boxes - An Array of bounding box objects
 * @return {object} bbox - The bounding box object holding a topLeft and bottomRight Point instance
 */
function __bbbbox(boxes) {
  let minX = Infinity
  let maxX = -Infinity
  let minY = Infinity
  let maxY = -Infinity
  for (let box of boxes) {
    if (box.topLeft.x < minX) minX = box.topLeft.x
    if (box.topLeft.y < minY) minY = box.topLeft.y
    if (box.bottomRight.x > maxX) maxX = box.bottomRight.x
    if (box.bottomRight.y > maxY) maxY = box.bottomRight.y
  }

  return { topLeft: new Point(minX, minY), bottomRight: new Point(maxX, maxY) }
}

/**
 * Returns an object holding topLeft and bottomRight Points of the bounding box of a curve
 *
 * @private
 * @param {BezierJs} curve - A BezierJs instance representing the curve
 * @return {object} point - The bounding box object holding a topLeft and bottomRight Point instance
 */
function __curveBoundingBox(curve) {
  let bb = curve.bbox()

  return {
    topLeft: new Point(bb.x.min, bb.y.min),
    bottomRight: new Point(bb.x.max, bb.y.max),
  }
}

/**
 * Joins path segments together into one path
 *
 * @private
 * @param {Array} paths - An Array of Path objects
 * @param {bool} closed - Whether or not to close the joined paths
 * @return {object} path - A Path instance
 */
function __joinPaths(paths, closed = false) {
  let joint = new Path().__withLog(paths[0].log).move(paths[0].ops[0].to)
  let current
  for (let p of paths) {
    for (let op of p.ops) {
      if (op.type === 'curve') {
        joint.curve(op.cp1, op.cp2, op.to)
      } else if (op.type === 'noop') {
        joint.noop(op.id)
      } else if (op.type !== 'close') {
        // We're using sitsRoughlyOn here to avoid miniscule line segments
        if (current && !op.to.sitsRoughlyOn(current)) joint.line(op.to)
      } else {
        let err = 'Cannot join a closed path with another'
        joint.log.error(err)
        throw new Error(err)
      }
      if (op.to) current = op.to
    }
  }
  if (closed) joint.close()

  return joint
}

/**
 * Returns an object holding topLeft and bottomRight Points of the bounding box of a line
 *
 * @private
 * @param {object} line - An object with a from and to Point instance that represents a line
 * @return {object} point - The bounding box object holding a topLeft and bottomRight Point instance
 */
function __lineBoundingBox(line) {
  let from = line.from
  let to = line.to
  if (from.x === to.x) {
    if (from.y < to.y) return { topLeft: from, bottomRight: to }
    else return { topLeft: to, bottomRight: from }
  } else if (from.y === to.y) {
    if (from.x < to.x) return { topLeft: from, bottomRight: to }
    else return { topLeft: to, bottomRight: from }
  } else if (from.x < to.x) {
    if (from.y < to.y) return { topLeft: from, bottomRight: to }
    else
      return {
        topLeft: new Point(from.x, to.y),
        bottomRight: new Point(to.x, from.y),
      }
  } else if (from.x > to.x) {
    if (from.y < to.y)
      return {
        topLeft: new Point(to.x, from.y),
        bottomRight: new Point(from.x, to.y),
      }
    else
      return {
        topLeft: new Point(to.x, to.y),
        bottomRight: new Point(from.x, from.y),
      }
  }
}

/**
 * Offsets a line by distance
 *
 * @private
 * @param {Point} from - The line's start point
 * @param {Point} to - The line's end point
 * @param {float} distance - The distane by which to offset the line
 * @param {object} log - The logging object
 * @return {object} this - The Path instance
 */
function __offsetLine(from, to, distance, log = false) {
  if (from.x === to.x && from.y === to.y) return false
  let angle = from.angle(to) - 90

  return new Path().__withLog(log).move(from.shift(angle, distance)).line(to.shift(angle, distance))
}

/**
 * Offsets a path by distance
 *
 * @private
 * @param {Path} path - The Path to offset
 * @param {float} distance - The distance to offset by
 * @return {Path} offsetted - The offsetted Path instance
 */
function __pathOffset(path, distance) {
  let offset = []
  let current
  let start = false
  let closed = false
  for (let i in path.ops) {
    let op = path.ops[i]
    if (op.type === 'line') {
      let segment = __offsetLine(current, op.to, distance, path.log)
      if (segment) offset.push(segment)
    } else if (op.type === 'curve') {
      // We need to avoid a control point sitting on top of start or end
      // because that will break the offset in bezier-js
      let cp1, cp2
      if (current.sitsRoughlyOn(op.cp1)) {
        cp1 = new Path().__withLog(path.log).move(current).curve(op.cp1, op.cp2, op.to)
        cp1 = cp1.shiftAlong(cp1.length() > 2 ? 2 : cp1.length() / 10)
      } else cp1 = op.cp1
      if (op.cp2.sitsRoughlyOn(op.to)) {
        cp2 = new Path().__withLog(path.log).move(op.to).curve(op.cp2, op.cp1, current)
        cp2 = cp2.shiftAlong(cp2.length() > 2 ? 2 : cp2.length() / 10)
      } else cp2 = op.cp2
      let b = new Bezier(
        { x: current.x, y: current.y },
        { x: cp1.x, y: cp1.y },
        { x: cp2.x, y: cp2.y },
        { x: op.to.x, y: op.to.y }
      )
      for (let bezier of b.offset(distance)) offset.push(__asPath(bezier, path.log))
    } else if (op.type === 'close') closed = true
    if (op.to) current = op.to
    if (!start) start = current
  }

  return __joinPaths(offset, closed)
}

/**
 * Returns a Point that lies at distance along a cubic Bezier curve
 *
 * @private
 * @param {float} distance - The distance to shift along the cubic Bezier curve
 * @param {Bezier} bezier - The BezierJs instance
 * @param {int} steps - The numer of steps per mm to walk the Bezier with
 * @return {Point} point - The point at distance along the cubic Bezier curve
 */
function __shiftAlongBezier(distance, bezier, steps) {
  let previous, next, t, thisLen
  let len = 0
  for (let i = 0; i <= steps; i++) {
    t = i / steps
    next = bezier.get(t)
    next = new Point(next.x, next.y)
    if (i > 0) {
      thisLen = next.dist(previous)
      if (len + thisLen > distance) return next
      else len += thisLen
    }
    previous = next
  }
}
