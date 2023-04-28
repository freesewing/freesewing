import { Bezier } from 'bezier-js'
import { Path } from './path.mjs'
import { Point } from './point.mjs'

//////////////////////////////////////////////
//            PUBLIC  METHODS               //
//////////////////////////////////////////////

/**
 * Find the intersections between an endless line (beam) and a circle
 *
 * @param {Point} c - The center Point of the circle
 * @param {float} r - The radius of the circle
 * @param {Point} p1 - First Point on the line
 * @param {Point} p2 - Second Point on the line
 * @param {string} sort - Controls the sort of the resulting intersections
 * @return {Array} intersections - An array with Point objects for the intersections
 */
export function beamIntersectsCircle(c, r, p1, p2, sort = 'x') {
  let dx = p2.x - p1.x
  let dy = p2.y - p1.y
  let A = Math.pow(dx, 2) + Math.pow(dy, 2)
  let B = 2 * (dx * (p1.x - c.x) + dy * (p1.y - c.y))
  let C = Math.pow(p1.x - c.x, 2) + Math.pow(p1.y - c.y, 2) - Math.pow(r, 2)

  let det = Math.pow(B, 2) - 4 * A * C

  if (A <= 0.0000001 || det < 0) return false
  // No real solutions
  else if (det === 0) {
    // One solution
    let t = (-1 * B) / (2 * A)
    let i1 = new Point(p1.x + t * dx, p1.y + t * dy)
    return [i1]
  } else {
    // Two solutions
    let t = (-1 * B + Math.sqrt(det)) / (2 * A)
    let i1 = new Point(p1.x + t * dx, p1.y + t * dy)
    t = (-1 * B - Math.sqrt(det)) / (2 * A)
    let i2 = new Point(p1.x + t * dx, p1.y + t * dy)
    if ((sort === 'x' && i1.x <= i2.x) || (sort === 'y' && i1.y <= i2.y)) return [i1, i2]
    else return [i2, i1]
  }
}

/**
 * Finds where an endless line intersects with a given X-value
 *
 * @param {Point} from - First Point on the line
 * @param {Point} to - Second Point on the line
 * @param {float} x - X-value to check
 * @return {Point} intersection - The Point at the intersection
 */
export function beamIntersectsX(from, to, x) {
  if (from.x === to.x) return false // Vertical line
  let top = new Point(x, -10)
  let bottom = new Point(x, 10)

  return beamsIntersect(from, to, top, bottom)
}

/**
 * Finds where an endless line intersects with a given Y-value
 *
 * @param {Point} from - First Point 1 on the line
 * @param {Point} to - Second Point on the line
 * @param {float} y - Y-value to check
 * @return {Point} intersection - The Point at the intersection
 */
export function beamIntersectsY(from, to, y) {
  if (from.y === to.y) return false // Horizontal line
  let left = new Point(-10, y)
  let right = new Point(10, y)

  return beamsIntersect(from, to, left, right)
}

/**
 * Finds the intersection of two endless lines (beams)
 *
 * @param {Point} a1 - Point 1 of line A
 * @param {Point} a2 - Point 2 of line A
 * @param {Point} b1 - Point 1 of line B
 * @param {Point} b2 - Point 2 of line B
 * @return {Point} intersections - The Point at the intersection
 */
export function beamsIntersect(a1, a2, b1, b2) {
  let slopeA = a1.slope(a2)
  let slopeB = b1.slope(b2)
  if (slopeA === slopeB) return false // Parallel lines

  // Check for vertical line A
  if (Math.round(a1.x * 10000) === Math.round(a2.x * 10000))
    return new Point(a1.x, slopeB * a1.x + (b1.y - slopeB * b1.x))
  // Check for vertical line B
  else if (Math.round(b1.x * 10000) === Math.round(b2.x * 10000))
    return new Point(b1.x, slopeA * b1.x + (a1.y - slopeA * a1.x))
  else {
    // Swap points if line A or B goes from right to left
    if (a1.x > a2.x) a1 = a2.copy()
    if (b1.x > b2.x) b1 = b2.copy()
    // Find y intercept
    let iA = a1.y - slopeA * a1.x
    let iB = b1.y - slopeB * b1.x

    // Find intersection
    let x = (iB - iA) / (slopeA - slopeB)
    let y = slopeA * x + iA

    return new Point(x, y)
  }
}

/**
 * Returns the string you pass with with the first character converted to uppercase
 *
 * @param {string} string - The string to capitalize
 * @return {string} capitalized - The capitalized string
 */
export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

/**
 * Find the intersections between two circles
 *
 * @param {Point} c1 - The center Point of the first circle
 * @param {float} r1 - The radius of the first circle
 * @param {Point} c2 - The center Point of the second circle
 * @param {float} r2 - The radius of the second circle
 * @param {string} sort - Controls the sort of the resulting intersections
 * @return {Array} intersections - An array with Point objects for the intersections
 */
export function circlesIntersect(c1, r1, c2, r2, sort = 'x') {
  let dx = c1.dx(c2)
  let dy = c1.dy(c2)
  let dist = c1.dist(c2)
  // Check for edge cases
  if (dist > parseFloat(r1) + parseFloat(r2)) return false // Circles do not intersect
  if (dist < parseFloat(r2) - parseFloat(r1)) return false // One circle is contained in the other
  if (dist === 0 && r1 === r2) return false // Two circles are identical
  let chorddistance = (Math.pow(r1, 2) - Math.pow(r2, 2) + Math.pow(dist, 2)) / (2 * dist)
  let halfchordlength = Math.sqrt(Math.pow(r1, 2) - Math.pow(chorddistance, 2))
  let chordmidpointx = c1.x + (chorddistance * dx) / dist
  let chordmidpointy = c1.y + (chorddistance * dy) / dist
  let i1 = new Point(
    chordmidpointx + (halfchordlength * dy) / dist,
    chordmidpointy - (halfchordlength * dx) / dist
  )
  let i2 = new Point(
    chordmidpointx - (halfchordlength * dy) / dist,
    chordmidpointy + (halfchordlength * dx) / dist
  )

  if ((sort === 'x' && i1.x <= i2.x) || (sort === 'y' && i1.y <= i2.y)) return [i1, i2]
  else return [i2, i1]
}

/**
 * Finds the edge of a cubic Bezier curve
 *
 * @param {BezierJs} curve - A BezierJs curve instance
 * @param {string} edge - The edge to find: top, bottom, right, or left
 * @param {int} steps - The number of steps to divide the curve in while walking it
 * @return {Point} edgepoint - A Point object located on the edge of the curve. Returns the first point found, if more than one lies on the edge.
 */
export function curveEdge(curve, edge, steps = 500) {
  let x = Infinity
  let y = Infinity
  let p
  if (edge === 'bottom') y = -Infinity
  if (edge === 'right') x = -Infinity
  for (let i = 0; i < steps; i++) {
    p = curve.get(i / steps)
    if (
      (edge === 'top' && p.y < y) ||
      (edge === 'bottom' && p.y > y) ||
      (edge === 'right' && p.x > x) ||
      (edge === 'left' && p.x < x)
    ) {
      x = p.x
      y = p.y
    }
  }

  return new Point(x, y)
}

/**
 * Find where a curve intersections with a given X-value
 *
 * @param {Point} from - Start Point of the curve
 * @param {Point} cp1 - Control Point at the start of the curve
 * @param {Point} cp2 - Control Point at the end of the curve
 * @param {Point} to - End Point of the curve
 * @param {float} x - X-value to check for intersections
 * @return {Array} intersections - An Array of Point objects of all intersections
 */
export function curveIntersectsX(from, cp1, cp2, to, x) {
  let start = new Point(x, -10000)
  let end = new Point(x, 10000)
  return lineIntersectsCurve(start, end, from, cp1, cp2, to)
}

/**
 * Find where a curve intersections with a given Y-value
 *
 * @param {Point} from - Start Point of the curve
 * @param {Point} cp1 - Control Point at the start of the curve
 * @param {Point} cp2 - Control Point at the end of the curve
 * @param {Point} to - End Point of the curve
 * @param {float} y - Y-value to check for intersections
 * @return {Array} intersections - An Array of Point objects of all intersections
 */
export function curveIntersectsY(from, cp1, cp2, to, y) {
  let start = new Point(-10000, y)
  let end = new Point(10000, y)
  return lineIntersectsCurve(start, end, from, cp1, cp2, to)
}

/**
 * Find where a curve intersections with another curve
 *
 * @param {Point} fromA - Start Point of the first curve
 * @param {Point} cp1A - Control Point at the start of the first curve
 * @param {Point} cp2A - Control Point at the end of the first curve
 * @param {Point} toA - End Point of the first curve
 * @param {Point} fromB - Start Point of the second curve
 * @param {Point} cp1B - Control Point at the start of the second curve
 * @param {Point} cp2B - Control Point at the end of the second curve
 * @param {Point} toB - End Point of the fsecond curve
 * @return {Array} intersections - An Array of Point objects of all intersections between the curves, when there are more than 1 intersection
 * @return {Point} intersection - A Point object of the intersection when there is exactly 1 intersection
 * @return {Boolean} - false when there are no intersections
 */
export function curvesIntersect(fromA, cp1A, cp2A, toA, fromB, cp1B, cp2B, toB) {
  let precision = 0.005 // See https://github.com/Pomax/bezierjs/issues/99
  let intersections = []
  let curveA = new Bezier(
    { x: fromA.x, y: fromA.y },
    { x: cp1A.x, y: cp1A.y },
    { x: cp2A.x, y: cp2A.y },
    { x: toA.x, y: toA.y }
  )
  let curveB = new Bezier(
    { x: fromB.x, y: fromB.y },
    { x: cp1B.x, y: cp1B.y },
    { x: cp2B.x, y: cp2B.y },
    { x: toB.x, y: toB.y }
  )

  for (let tvalues of curveA.intersects(curveB, precision)) {
    let intersection = curveA.get(tvalues.substr(0, tvalues.indexOf('/')))
    intersections.push(new Point(intersection.x, intersection.y))
  }

  if (intersections.length === 0) return false
  else if (intersections.length === 1) return intersections.shift()
  else {
    let unique = []
    for (let i of intersections) {
      let dupe = false
      for (let u of unique) {
        if (i.sitsRoughlyOn(u)) dupe = true
      }
      if (!dupe) unique.push(i)
    }
    return unique.length === 1 ? unique.shift() : unique
  }
}

/**
 * Converts degrees to radians
 *
 * @param {float} degrees - The degrees to convert
 * @return {float} radians - The provided degrees in radians
 */
export function deg2rad(degrees) {
  return degrees * (Math.PI / 180)
}

/**
 * Generates the transform attributes needed for a given stack
 *
 * @param {float} x - The translate value along the X-axis
 * @param {float} y - The translate value along the Y-axis
 * @param {float} rotate - The rotation
 * @param {bool} flipX - Whether or not to flip/mirror along the X-axis
 * @param {bool} flipY - Whether or not to flip/mirror along the Y-axis
 * @param {Stack} stack - The Stack instance
 * @return {string} transform - The SVG transform value
 */
export const generateStackTransform = (
  x = 0,
  y = 0,
  rotate = 0,
  flipX = false,
  flipY = false,
  stack
) => {
  const transforms = []
  let xTotal = x || 0
  let yTotal = y || 0
  let scaleX = 1
  let scaleY = 1

  // move the part an additional offset so it ends up in the correct spot after flipping.
  // it will scale around the part's 0, 0, which isn't always the top left, so we need to move it over so that 0,0 lines up with topRight + topLeft
  if (flipX) {
    xTotal += stack.topLeft.x
    xTotal += stack.bottomRight.x
    // reverse the x scale
    scaleX = -1
  }
  if (flipY) {
    yTotal += stack.topLeft.y
    yTotal += stack.bottomRight.y
    scaleY = -1
  }

  // add the scaling to the transforms
  if (scaleX + scaleY < 2) {
    transforms.push(`scale(${scaleX}, ${scaleY})`)
  }

  if (rotate) {
    // we can put the center as the rotation origin, so get the center
    const center = {
      x: stack.topLeft.x + stack.width / 2,
      y: stack.topLeft.y + stack.height / 2,
    }

    // add the rotation around the center to the transforms
    transforms.push(`rotate(${rotate}, ${center.x}, ${center.y})`)
  }

  // put the translation before any other transforms to avoid having to make complex calculations once the matrix has been rotated or scaled
  if (xTotal !== 0 || yTotal !== 0) transforms.unshift(`translate(${xTotal}, ${yTotal})`)

  return {
    transform: transforms.join(' '),
    // 'transform-origin': `${center.x} ${center.y}`
  }
}

/**
 * Find the intersections between a line segment and a circle
 *
 * @param {Point} c - The center Point of the circle
 * @param {float} r - The radius of the circle
 * @param {Point} p1 - Start Point of the line segment
 * @param {Point} p2 - End Point of the line segment
 * @param {string} sort - Controls the sort of the resulting intersections
 * @return {Array} intersections - An array with Point objects for the intersections
 */
export function lineIntersectsCircle(c, r, p1, p2, sort = 'x') {
  let intersections = beamIntersectsCircle(c, r, p1, p2, sort)
  if (intersections === false) return false
  else {
    if (intersections.length === 1) {
      if (pointOnLine(p1, p2, intersections[0])) return intersections
      else return false
    } else {
      let i1 = intersections[0]
      let i2 = intersections[1]
      if (!pointOnLine(p1, p2, i1, 5) && !pointOnLine(p1, p2, i2, 5)) return false
      else if (pointOnLine(p1, p2, i1, 5) && pointOnLine(p1, p2, i2, 5)) {
        if ((sort === 'x' && i1.x <= i2.x) || (sort === 'y' && i1.y <= i2.y)) return [i1, i2]
        else return [i2, i1]
      } else if (pointOnLine(p1, p2, i1, 5)) return [i1]
      else if (pointOnLine(p1, p2, i2, 5)) return [i2]
    }
  }
}

/**
 * Finds the intersection of two line segments
 *
 * @param {Point} a1 - Point 1 of line A
 * @param {Point} a2 - Point 2 of line A
 * @param {Point} b1 - Point 1 of line B
 * @param {Point} b2 - Point 2 of line B
 * @return {Point} intersection - The Point at the intersection
 */
export function linesIntersect(a1, a2, b1, b2) {
  let p = beamsIntersect(a1, a2, b1, b2)
  if (!p) return false
  let lenA = a1.dist(a2)
  let lenB = b1.dist(b2)
  let lenC = a1.dist(p) + p.dist(a2)
  let lenD = b1.dist(p) + p.dist(b2)
  if (Math.round(lenA) == Math.round(lenC) && Math.round(lenB) == Math.round(lenD)) return p
  else return false
}

/**
 * Finds the intersections of a line and a curve
 *
 * @param {Point} start - Start Point of the line
 * @param {Point} end - End Point of the line
 * @param {Point} from - Start Point of the curve
 * @param {Point} cp1 - Control Point at the start of the curve
 * @param {Point} cp2 - Control Point at the end of the curve
 * @param {Point} to - End Point of the curve
 * @return {Array} intersections - An array of Points at the intersections
 */
export function lineIntersectsCurve(start, end, from, cp1, cp2, to) {
  let intersections = []
  let bz = new Bezier(
    { x: from.x, y: from.y },
    { x: cp1.x, y: cp1.y },
    { x: cp2.x, y: cp2.y },
    { x: to.x, y: to.y }
  )
  let line = {
    p1: { x: start.x, y: start.y },
    p2: { x: end.x, y: end.y },
  }
  for (let t of bz.intersects(line)) {
    let isect = bz.get(t)
    intersections.push(new Point(isect.x, isect.y))
  }

  if (intersections.length === 0) return false
  else if (intersections.length === 1) return intersections[0]
  else return intersections
}

/**
 * Helper method to calculate abolute option value based on a measurement
 *
 * @param {string} measurement - The measurement to base the calculation on
 * @return {object} result - An object with the toAbs() and fromAbs() methods
 */
export function pctBasedOn(measurement) {
  return {
    toAbs: (val, { measurements }) => measurements[measurement] * val,
    fromAbs: (val, { measurements }) =>
      Math.round((10000 * val) / measurements[measurement]) / 10000,
  }
}

/**
 * Finds out whether a Point lies on an endless line (beam)
 *
 * @param {Point} from - First Point on the line
 * @param {Point} to - Second Point on the line
 * @param {Point} check - Point to check
 * @param {float} preciesion - How precise we should check
 * @return {bool} result - True of the Point is on the line, false when not
 */
export function pointOnBeam(from, to, check, precision = 1e6) {
  if (from.sitsOn(check)) return true
  if (to.sitsOn(check)) return true
  let cross = check.dx(from) * to.dy(from) - check.dy(from) * to.dx(from)

  if (Math.abs(Math.round(cross * precision) / precision) === 0) return true
  else return false
}

/**
 * Finds out whether a Point lies on a (cubic) Bezier curve
 *
 * @param {Point} from - Start of the curve
 * @param {Point} cp1 - Control point at the start of the curve
 * @param {Point} cp1 - Control point at the end of the curve
 * @param {Point} end - End of the curve
 * @param {Point} check - Point to check
 * @return {bool} result - True of the Point is on the curve, false when not
 */
export function pointOnCurve(start, cp1, cp2, end, check) {
  if (start.sitsOn(check)) return true
  if (end.sitsOn(check)) return true
  let curve = new Bezier(
    { x: start.x, y: start.y },
    { x: cp1.x, y: cp1.y },
    { x: cp2.x, y: cp2.y },
    { x: end.x, y: end.y }
  )
  let intersections = curve.intersects({
    p1: { x: check.x - 1, y: check.y },
    p2: { x: check.x + 1, y: check.y },
  })
  if (intersections.length === 0) {
    // Handle edge case of a curve that's a perfect horizontal line
    intersections = curve.intersects({
      p1: { x: check.x, y: check.y - 1 },
      p2: { x: check.x, y: check.y + 1 },
    })
  }

  if (intersections.length > 0) return intersections.shift()
  else return false
}

/**
 * Finds out whether a Point lies on a line segment
 *
 * @param {Point} from - Start of the line segment
 * @param {Point} to - End of the line segment
 * @param {Point} check - Point to check
 * @param {float} preciesion - How precise we should check
 * @return {bool} result - True of the Point is on the line segment, false when not
 */
export function pointOnLine(from, to, check, precision = 1e6) {
  if (!pointOnBeam(from, to, check, precision)) return false
  let lenA = from.dist(to)
  let lenB = from.dist(check) + check.dist(to)
  if (Math.round(lenA) == Math.round(lenB)) return true
  else return false
}

/**
 * Converts radians to degrees
 *
 * @param {float} radians - The radiand to convert
 * @return {float} degrees - The provided radians in degrees
 */
export function rad2deg(radians) {
  return (radians / Math.PI) * 180
}

/**
 * Rounds a value to 2 digits
 *
 * @param {float} value - The value to round
 * @return {float} rounded - The rounded value
 */
export function round(value) {
  return Math.round(value * 1e2) / 1e2
}

/**
 * Splits curve on a Point
 *
 * @param {Point} from - Start of the curve
 * @param {Point} cp1 - Control point at the start of the curve
 * @param {Point} cp1 - Control point at the end of the curve
 * @param {Point} end - End of the curve
 * @param {Point} split - Point to split the curve on
 * @return {Array} halves - An array with the two halves of the Path
 */
export function splitCurve(start, cp1, cp2, end, split) {
  let [c1, c2] = new Path().move(start).curve(cp1, cp2, end).split(split)

  return [
    {
      start: c1.ops[0].to,
      cp1: c1.ops[1].cp1,
      cp2: c1.ops[1].cp2,
      end: c1.ops[1].to,
    },
    {
      start: c2.ops[0].to,
      cp1: c2.ops[1].cp1,
      cp2: c2.ops[1].cp2,
      end: c2.ops[1].to,
    },
  ]
}

/**
 * Calculates scale factor based on stretch factor
 *
 * The way people measure stretch intuitively is
 * different from the way we handle stretch in code.
 * When people say '25% stretch' they mean that
 * 10cm fabric should get stretched to 12.5cm fabric.
 * In our code, that means we need to scale things by 80%.
 * This method does that calculation.
 *
 * @param {float} stretch - Strech factor
 * @return {float} scale - The scale for the provided stretch factor
 */
export function stretchToScale(stretch) {
  return 1 / (1 + parseFloat(stretch))
}

/**
 * Convert value in mm to cm or imperial units
 *
 * @param {float} value - Value in millimeter
 * @param {astring} to - Either 'metric' or 'imperial'
 * @return {string} formatted - The value formatted according to the units
 */
export function units(value, to = 'metric') {
  if (to === 'imperial') return round(value / 25.4) + '&quot;'
  else return round(value / 10) + 'cm'
}

//////////////////////////////////////////////
//            PRIVATE  METHODS              //
//////////////////////////////////////////////

/**
 * Adds a non-enumerable property to an object
 *
 * @private
 * @param {Object} obj - The object to add the property to
 * @param {string} name - The name of the property
 * @param {mixed} value - The value of the property
 * @return {object} obj - The mutated object
 */
export function __addNonEnumProp(obj, name, value) {
  Object.defineProperty(obj, name, {
    enumerable: false,
    configurable: false,
    writable: true,
    value,
  })

  return obj
}

/**
 * Makes sure a passed argument is a number if it can be cast
 * Will log warnings/errors accordingly
 *
 * @private
 * @param {mixed} value - The value to check
 * @param {string} param - The name of the parameter to use in the logs
 * @param {string} method - The name of the method to use in the logs
 * @param {object} log - A logging object
 * @return {bool} result - True if it is a valid coordinate, false when  not
 */
export function __asNumber(value, param, method, log) {
  if (typeof value === 'number') return value
  if (typeof value === 'string') {
    log.warning(
      `Called \`${method}(${param})\` but \`${param}\` is not a number. Will attempt to cast to Number`
    )
    try {
      value = Number(value)
      return value
    } catch {
      log.error(
        `Called \`${method}(${param})\` but \`${param}\` is not a number nor can it be cast to one`
      )
    }
  } else log.error(`Called \`${method}(${param})\` but \`${param}\` is not a number`)

  return value
}

/**
 * Checks whether the paramater passed to it is a valid coordinate (x and y attribute)
 *
 * @private
 * @param {object} value - The object to check
 * @return {bool} result - True if it is a valid coordinate, false when  not
 */
export function __isCoord(value) {
  return value === value // NaN does not equal itself
    ? typeof value === 'number'
    : false
}

/**
 * Returns the internal hook name for a macro
 *
 * @private
 * @param {string} name - The macro name
 * @return {string} macroName - The inernal macroName
 */
export function __macroName(name) {
  return `__macro_${name}`
}

/**
 * Helper method to parse an (SVG) transform string
 *
 * @private
 * @param {string} transform - The SVG transform string
 * @return {object} result - An object with the parts, name, and values
 */
function __parseTransform(transform) {
  const parts = transform.match(/(\w+)\(([^)]+)\)/)
  const name = parts[1]
  const values = parts[2].split(/,\s*/).map(parseFloat)

  return { parts, name, values }
}

/**
 * Combines an array of (SVG) transforms into a single matrix transform
 *
 * @param {array} transorms - The list of transforms to combine
 * @return {string} matrixTransform - The combined matrix transform
 */
export function combineTransforms(transforms = []) {
  // Don't bother if there are no part transforms
  if (transforms.length < 1) return ''

  // The starting matrix
  let matrix = [1, 0, 0, 1, 0, 0]

  // Loop through the transforms
  for (let i = 0; i < transforms.length; i++) {
    // Parse the transform string
    const { name, values } = __parseTransform(transforms[i])

    // Update matrix for transform
    switch (name) {
      case 'matrix':
        matrix = [
          matrix[0] * values[0] + matrix[2] * values[1],
          matrix[1] * values[0] + matrix[3] * values[1],
          matrix[0] * values[2] + matrix[2] * values[3],
          matrix[1] * values[2] + matrix[3] * values[3],
          matrix[0] * values[4] + matrix[2] * values[5] + matrix[4],
          matrix[1] * values[4] + matrix[3] * values[5] + matrix[5],
        ]
        break
      case 'translate':
        matrix[4] += matrix[0] * values[0] + matrix[2] * values[1]
        matrix[5] += matrix[1] * values[0] + matrix[3] * values[1]
        break
      case 'scale':
        matrix[0] *= values[0]
        matrix[1] *= values[0]
        matrix[2] *= values[1]
        matrix[3] *= values[1]
        break
      case 'rotate': {
        const angle = (values[0] * Math.PI) / 180
        const cos = Math.cos(angle)
        const sin = Math.sin(angle)
        matrix = [
          matrix[0] * cos + matrix[2] * sin,
          matrix[1] * cos + matrix[3] * sin,
          matrix[0] * -sin + matrix[2] * cos,
          matrix[1] * -sin + matrix[3] * cos,
          matrix[4],
          matrix[5],
        ]
        break
      }
      case 'skewX':
        matrix[2] += matrix[0] * Math.tan((values[0] * Math.PI) / 180)
        matrix[3] += matrix[1] * Math.tan((values[0] * Math.PI) / 180)
        break
      case 'skewY':
        matrix[0] += matrix[2] * Math.tan((values[0] * Math.PI) / 180)
        matrix[1] += matrix[3] * Math.tan((values[0] * Math.PI) / 180)
        break
    }
  }

  // Return the combined matrix transform
  return 'matrix(' + matrix.join(', ') + ')'
}

/**
 * Applies and (SVG) transform to a point's coordinates (x and y)
 *
 * @param {string} transorm - The transform to apply
 * @param {Point} point - The point of which to update the coordinates
 * @return {Point} point - The point with the transform applied to its coordinates
 */
export function applyTransformToPoint(transform, point) {
  // Parse the transform string
  const { name, values } = __parseTransform(transform)

  // The starting matrix
  let matrix = [1, 0, 0, 1, 0, 0]

  // Update matrix for transform
  switch (name) {
    case 'matrix':
      matrix = values
      break
    case 'translate':
      matrix[4] = values[0]
      matrix[5] = values[1]
      break
    case 'scale':
      matrix[0] = values[0]
      matrix[3] = values[1]
      break
    case 'rotate': {
      const angle = (values[0] * Math.PI) / 180
      const cos = Math.cos(angle)
      const sin = Math.sin(angle)
      console.log('in rotate', { angle })
      matrix = [cos, sin, -sin, cos, 0, 0]
      break
    }
    case 'skewX':
      matrix[2] = Math.tan((values[0] * Math.PI) / 180)
      break
    case 'skewY':
      matrix[1] = Math.tan((values[0] * Math.PI) / 180)
      break
  }

  // Apply the matrix transform to the coordinates
  const newX = point.x * matrix[0] + point.y * matrix[2] + matrix[4]
  const newY = point.x * matrix[1] + point.y * matrix[3] + matrix[5]

  point.x = newX
  point.y = newY

  return point
}
