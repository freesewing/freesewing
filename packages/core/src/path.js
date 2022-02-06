import Attributes from './attributes'
import Point from './point'
import { Bezier } from 'bezier-js'
import {
  linesIntersect,
  lineIntersectsCurve,
  curvesIntersect,
  pointOnLine,
  pointOnCurve,
  curveEdge,
  round,
} from './utils'

function Path(debug = false) {
  this.render = true
  this.topLeft = false
  this.bottomRight = false
  this.attributes = new Attributes()
  this.ops = []
  Object.defineProperty(this, 'debug', { value: debug, configurable: true })
}

/** Adds the raise method for a path not created through the proxy **/
Path.prototype.withRaise = function (raise = false) {
  if (raise) Object.defineProperty(this, 'raise', { value: raise })

  return this
}

/** Chainable way to set the render property */
Path.prototype.setRender = function (render = true) {
  if (render) this.render = true
  else this.render = false

  return this
}

/** Adds a move operation to Point to */
Path.prototype.move = function (to) {
  if (to instanceof Point !== true)
    this.raise.warning('Called `Path.rotate(to)` but `to` is not a `Point` object')
  this.ops.push({ type: 'move', to })

  return this
}

/** Adds a line operation to Point to */
Path.prototype.line = function (to) {
  if (to instanceof Point !== true)
    this.raise.warning('Called `Path.line(to)` but `to` is not a `Point` object')
  this.ops.push({ type: 'line', to })

  return this
}

/** Adds a curve operation via cp1 & cp2 to Point to */
Path.prototype.curve = function (cp1, cp2, to) {
  if (to instanceof Point !== true)
    this.raise.warning('Called `Path.curve(cp1, cp2, to)` but `to` is not a `Point` object')
  if (cp1 instanceof Point !== true)
    this.raise.warning('Called `Path.curve(cp1, cp2, to)` but `cp1` is not a `Point` object')
  if (cp2 instanceof Point !== true)
    this.raise.warning('Called `Path.curve(cp1, cp2, to)` but `cp2` is not a `Point` object')
  this.ops.push({ type: 'curve', cp1, cp2, to })

  return this
}

/** Adds a curve operation without cp1 via cp2 to Point to */
Path.prototype._curve = function (cp2, to) {
  if (to instanceof Point !== true)
    this.raise.warning('Called `Path._curve(cp2, to)` but `to` is not a `Point` object')
  if (cp2 instanceof Point !== true)
    this.raise.warning('Called `Path._curve(cp2, to)` but `cp2` is not a `Point` object')
  let cp1 = this.ops.slice(-1).pop().to
  this.ops.push({ type: 'curve', cp1, cp2, to })

  return this
}

/** Adds a curve operation via cp1 with no cp2 to Point to */
Path.prototype.curve_ = function (cp1, to) {
  if (to instanceof Point !== true)
    this.raise.warning('Called `Path.curve_(cp1, to)` but `to` is not a `Point` object')
  if (cp1 instanceof Point !== true)
    this.raise.warning('Called `Path.curve_(cp1, to)` but `cp2` is not a `Point` object')
  let cp2 = to.copy()
  this.ops.push({ type: 'curve', cp1, cp2, to })

  return this
}

/** Adds a close operation */
Path.prototype.close = function () {
  this.ops.push({ type: 'close' })

  return this
}

/** Adds a noop operation */
Path.prototype.noop = function (id = false) {
  this.ops.push({ type: 'noop', id })

  return this
}

/** Replace a noop operation with the ops from path */
Path.prototype.insop = function (noopId, path) {
  if (!noopId)
    this.raise.warning('Called `Path.insop(noopId, path)` but `noopId` is undefined or false')
  if (path instanceof Path !== true)
    this.raise.warning('Called `Path.insop(noopId, path) but `path` is not a `Path` object')
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

/** Adds an attribute. This is here to make this call chainable in assignment */
Path.prototype.attr = function (name, value, overwrite = false) {
  if (!name)
    this.raise.warning(
      'Called `Path.attr(name, value, overwrite=false)` but `name` is undefined or false'
    )
  if (typeof value === 'undefined')
    this.raise.warning(
      'Called `Path.attr(name, value, overwrite=false)` but `value` is undefined'
    )
  if (overwrite)
    this.raise.debug(
      `Overwriting \`Path.attribute.${name}\` with ${value} (was: ${this.attributes.get(name)})`
    )
  if (overwrite) this.attributes.set(name, value)
  else this.attributes.add(name, value)

  return this
}

/** Returns SVG pathstring for this path */
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

/** Returns offset of this path as a new path */
Path.prototype.offset = function (distance) {
  if (typeof distance !== 'number')
    this.raise.error('Called `Path.offset(distance)` but `distance` is not a number')
  return pathOffset(this, distance, this.raise)
}

/** Returns the length of this path */
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

/** Returns the startpoint of the path */
Path.prototype.start = function () {
  if (this.ops.length < 1 || typeof this.ops[0].to === 'undefined')
    this.raise.error('Called `Path.start()` but this path has no drawing operations')
  return this.ops[0].to
}

/** Returns the endpoint of the path */
Path.prototype.end = function () {
  if (this.ops.length < 1)
    this.raise.error('Called `Path.end()` but this path has no drawing operations')
  let op = this.ops[this.ops.length - 1]

  if (op.type === 'close') return this.start()
  else return op.to
}

/** Finds the bounding box of a path */
Path.prototype.boundary = function () {
  if (this.topLeft) return this // Cached

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

/** Returns a deep copy of this */
Path.prototype.clone = function () {
  let clone = new Path(this.debug).withRaise(this.raise).setRender(this.render)
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

/** Joins this with that path, closes them if wanted */
Path.prototype.join = function (that, closed = false) {
  if (that instanceof Path !== true)
    this.raise.error('Called `Path.join(that)` but `that` is not a `Path` object')
  return joinPaths([this, that], closed, this.raise)
}

/** Offsets a path by distance */
function pathOffset(path, distance, raise) {
  let offset = []
  let current
  let start = false
  let closed = false
  for (let i in path.ops) {
    let op = path.ops[i]
    if (op.type === 'line') {
      let segment = offsetLine(current, op.to, distance, path.debug, path.raise)
      if (segment) offset.push(segment)
    } else if (op.type === 'curve') {
      // We need to avoid a control point sitting on top of start or end
      // because that will break the offset in bezier-js
      let cp1, cp2
      if (current.sitsRoughlyOn(op.cp1)) {
        cp1 = new Path(path.debug).withRaise(path.raise).move(current).curve(op.cp1, op.cp2, op.to)
        cp1 = cp1.shiftAlong(cp1.length() > 2 ? 2 : cp1.length() / 10)
      } else cp1 = op.cp1
      if (op.cp2.sitsRoughlyOn(op.to)) {
        cp2 = new Path(path.debug).withRaise(path.raise).move(op.to).curve(op.cp2, op.cp1, current)
        cp2 = cp2.shiftAlong(cp2.length() > 2 ? 2 : cp2.length() / 10)
      } else cp2 = op.cp2
      let b = new Bezier(
        { x: current.x, y: current.y },
        { x: cp1.x, y: cp1.y },
        { x: cp2.x, y: cp2.y },
        { x: op.to.x, y: op.to.y }
      )
      for (let bezier of b.offset(distance)) offset.push(asPath(bezier, path.debug, path.raise))
    } else if (op.type === 'close') closed = true
    if (op.to) current = op.to
    if (!start) start = current
  }

  return joinPaths(offset, closed, raise)
}

/** Offsets a line by distance */
function offsetLine(from, to, distance, debug = false, raise = false) {
  if (from.x === to.x && from.y === to.y) return false
  let angle = from.angle(to) - 90

  return new Path(debug)
    .withRaise(raise)
    .move(from.shift(angle, distance))
    .line(to.shift(angle, distance))
}

/** Converts a bezier-js instance to a path */
function asPath(bezier, debug = false, raise = false) {
  return new Path(debug)
    .withRaise(raise)
    .move(new Point(bezier.points[0].x, bezier.points[0].y))
    .curve(
      new Point(bezier.points[1].x, bezier.points[1].y),
      new Point(bezier.points[2].x, bezier.points[2].y),
      new Point(bezier.points[3].x, bezier.points[3].y)
    )
}

/** Joins path segments together into one path */
function joinPaths(paths, closed = false, raise = false) {
  let joint = new Path(paths[0].debug).withRaise(paths[0].raise).move(paths[0].ops[0].to)
  let current
  for (let p of paths) {
    for (let op of p.ops) {
      if (op.type === 'curve') {
        joint.curve(op.cp1, op.cp2, op.to)
      } else if (op.type !== 'close') {
        // We're using sitsRoughlyOn here to avoid miniscule line segments
        if (current && !op.to.sitsRoughlyOn(current)) joint.line(op.to)
      } else {
        let err = 'Cannot join a closed path with another'
        joint.raise.error(err)
        throw new Error(err)
      }
      if (op.to) current = op.to
    }
  }
  if (closed) joint.close()

  return joint
}

/** Returns a point that lies at distance along this */
Path.prototype.shiftAlong = function (distance, stepsPerMm = 25) {
  if (typeof distance !== 'number')
    this.raise.error('Called `Path.shiftAlong(distance)` but `distance` is not a number')
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
        return shiftAlongBezier(distance - len, bezier, thisLen * stepsPerMm)
      len += thisLen
    }
    current = op.to
  }
  this.raise.error(
    `Called \`Path.shiftAlong(distance)\` with a \`distance\` of \`${distance}\` but \`Path.length()\` is only \`${this.length()}\``
  )
}

/** Returns a point that lies at fraction along this */
Path.prototype.shiftFractionAlong = function (fraction, stepsPerMm = 25) {
  if (typeof fraction !== 'number')
    this.raise.error('Called `Path.shiftFractionAlong(fraction)` but `fraction` is not a number')
  return this.shiftAlong(this.length() * fraction, stepsPerMm)
}

/** Returns a point that lies at distance along bezier */
function shiftAlongBezier(distance, bezier, steps = 100) {
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

/** Returns a point at the top edge of a bounding box of this */
Path.prototype.bbox = function () {
  let bbs = []
  let current
  for (let i in this.ops) {
    let op = this.ops[i]
    if (op.type === 'line') {
      bbs.push(lineBoundingBox({ from: current, to: op.to }))
    } else if (op.type === 'curve') {
      bbs.push(
        curveBoundingBox(
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

  return bbbbox(bbs)
}

function lineBoundingBox(line) {
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

function curveBoundingBox(curve) {
  let bb = curve.bbox()

  return {
    topLeft: new Point(bb.x.min, bb.y.min),
    bottomRight: new Point(bb.x.max, bb.y.max),
  }
}

function bbbbox(boxes) {
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

/** Returns a reversed version of this */
Path.prototype.reverse = function () {
  let sections = []
  let current
  let closed = false
  for (let i in this.ops) {
    let op = this.ops[i]
    if (op.type === 'line') {
      if (!op.to.sitsOn(current))
        sections.push(new Path(this.debug).withRaise(this.raise).move(op.to).line(current))
    } else if (op.type === 'curve') {
      sections.push(
        new Path(this.debug).withRaise(this.raise).move(op.to).curve(op.cp2, op.cp1, current)
      )
    } else if (op.type === 'close') {
      closed = true
    }
    if (op.to) current = op.to
  }
  let rev = new Path(this.debug).withRaise(this.raise).move(current)
  for (let section of sections.reverse()) rev.ops.push(section.ops[1])
  if (closed) rev.close()

  return rev
}

/** Returns the point at an edge of this path */
Path.prototype.edge = function (side) {
  this.boundary()
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
    } else if (this[s].type === 'curve') {
      let curve = edgeCurveAsBezier(this[s])
      return curveEdge(curve, side)
    }
  }
  this.raise.error(`Unable to find \`Path.edge(side)\` for side ${side}`)
}

function edgeCurveAsBezier(op) {
  return new Bezier(
    { x: op.from.x, y: op.from.y },
    { x: op.cp1.x, y: op.cp1.y },
    { x: op.cp2.x, y: op.cp2.y },
    { x: op.to.x, y: op.to.y }
  )
}

/** Divides a path into atomic paths */
Path.prototype.divide = function () {
  let paths = []
  let current, start
  for (let i in this.ops) {
    let op = this.ops[i]
    if (op.type === 'move') {
      start = op.to
    } else if (op.type === 'line') {
      if (!op.to.sitsRoughlyOn(current))
        paths.push(new Path(this.debug).withRaise(this.raise).move(current).line(op.to))
    } else if (op.type === 'curve') {
      paths.push(
        new Path(this.debug).withRaise(this.raise).move(current).curve(op.cp1, op.cp2, op.to)
      )
    } else if (op.type === 'close') {
      paths.push(new Path(this.debug).withRaise(this.raise).move(current).line(start))
    }
    if (op.to) current = op.to
  }

  return paths
}

/** Finds intersections between this path and an X value */
Path.prototype.intersectsX = function (x) {
  if (typeof x !== 'number')
    this.raise.error('Called `Path.intersectsX(x)` but `x` is not a number')
  return this.intersectsAxis(x, 'x')
}

/** Finds intersections between this path and an Y value */
Path.prototype.intersectsY = function (y) {
  if (typeof y !== 'number')
    this.raise.error('Called `Path.intersectsX(y)` but `y` is not a number')
  return this.intersectsAxis(y, 'y')
}

/** Finds intersections between this path and a X or Y value */
Path.prototype.intersectsAxis = function (val = false, mode) {
  let intersections = []
  let lineStart = mode === 'x' ? new Point(val, -100000) : new Point(-10000, val)
  let lineEnd = mode === 'x' ? new Point(val, 100000) : new Point(100000, val)
  for (let path of this.divide()) {
    if (path.ops[1].type === 'line') {
      addIntersectionsToArray(
        linesIntersect(path.ops[0].to, path.ops[1].to, lineStart, lineEnd),
        intersections
      )
    } else if (path.ops[1].type === 'curve') {
      addIntersectionsToArray(
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

/** Finds intersections between this path and another path */
Path.prototype.intersects = function (path) {
  if (this === path)
    this.raise.error('You called Path.intersects(path)` but `path` and `this` are the same object')
  let intersections = []
  for (let pathA of this.divide()) {
    for (let pathB of path.divide()) {
      if (pathA.ops[1].type === 'line') {
        if (pathB.ops[1].type === 'line') {
          addIntersectionsToArray(
            linesIntersect(pathA.ops[0].to, pathA.ops[1].to, pathB.ops[0].to, pathB.ops[1].to),
            intersections
          )
        } else if (pathB.ops[1].type === 'curve') {
          addIntersectionsToArray(
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
          addIntersectionsToArray(
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
          addIntersectionsToArray(
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

function addIntersectionsToArray(candidates, intersections) {
  if (!candidates) return
  if (typeof candidates === 'object') {
    if (typeof candidates.x === 'number') intersections.push(candidates)
    else {
      for (let candidate of candidates) intersections.push(candidate)
    }
  }
}

/** Splits path on point, and retuns both halves */
Path.prototype.split = function (point) {
  if (point instanceof Point !== true)
    this.raise.error('Called `Path.split(point)` but `point` is not a `Point` object')
  let divided = this.divide()
  let firstHalf = false
  let secondHalf = false
  for (let pi = 0; pi < divided.length; pi++) {
    let path = divided[pi]
    if (path.ops[1].type === 'line') {
      if (pointOnLine(path.ops[0].to, path.ops[1].to, point)) {
        firstHalf = divided.slice(0, pi)
        firstHalf.push(new Path(this.debug).withRaise(this.raise).move(path.ops[0].to).line(point))
        pi++
        secondHalf = divided.slice(pi)
        secondHalf.unshift(
          new Path(this.debug).withRaise(this.raise).move(point).line(path.ops[1].to)
        )
      }
    } else if (path.ops[1].type === 'curve') {
      let t = pointOnCurve(path.ops[0].to, path.ops[1].cp1, path.ops[1].cp2, path.ops[1].to, point)
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
          new Path(this.debug)
            .withRaise(this.raise)
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
          new Path(this.debug)
            .withRaise(this.raise)
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
  if (firstHalf) firstHalf = joinPaths(firstHalf, false, this.raise)
  if (secondHalf) secondHalf = joinPaths(secondHalf, false, this.raise)

  return [firstHalf, secondHalf]
}

/** Removes self-intersections (overlap) from the path */
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
        let glue = new Path(this.debug).withRaise(this.raise)
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
        if (trimmedStart.length > 0) joint = joinPaths(trimmedStart, false, this.raise).join(glue)
        else joint = glue
        if (trimmedEnd.length > 0) joint = joint.join(joinPaths(trimmedEnd, false, this.raise))

        return joint.trim()
      }
    }
  }

  return this
}

/** Applies a path translate transform */
Path.prototype.translate = function (x, y) {
  if (this.debug) {
    if (typeof x !== 'number')
      this.raise.warning('Called `Path.translate(x, y)` but `x` is not a number')
    if (typeof y !== 'number')
      this.raise.warning('Called `Path.translate(x, y)` but `y` is not a number')
  }
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

export default Path
