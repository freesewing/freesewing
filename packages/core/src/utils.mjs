import { Bezier } from 'bezier-js'
import { Path } from './path.mjs'
import { Point } from './point.mjs'

/*
 * See: https://en.wikipedia.org/wiki/Golden_ratio
 */
export const goldenRatio = 1.618034

/*
 * cbqc = Cubic Bezier Quarter Circle
 * The value to best approximate a (quarter) circle with cubic Bézier curves
 * See: https://spencermortensen.com/articles/bezier-circle/
 */
export const cbqc = 0.55191502449351

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
 * Find the intersections between an endless line (beam) and a curve
 *
 *
 * @param {Point} start - Start Point of the line
 * @param {Point} end - End Point of the line
 * @param {Point} from - Start Point of the curve
 * @param {Point} cp1 - Control Point at the start of the curve
 * @param {Point} cp2 - Control Point at the end of the curve
 * @param {Point} to - End Point of the curve
 * @return {Array} intersections - An array of Points at the intersections
 */
export function beamIntersectsCurve(start, end, from, cp1, cp2, to) {
  let _start = new Point(start.x + (start.x - end.x) * 1000, start.y + (start.y - end.y) * 1000)
  let _end = new Point(end.x + (end.x - start.x) * 1000, end.y + (end.y - start.y) * 1000)
  return lineIntersectsCurve(_start, _end, from, cp1, cp2, to)
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
  if (dist < Math.abs(parseFloat(r2) - parseFloat(r1))) return false // One circle is contained in the other
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
 * @return {String[]} transform - An array of SVG transform values
 */
export function generateStackTransform(
  x = 0,
  y = 0,
  rotate = 0,
  flipX = false,
  flipY = false,
  stack
) {
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

  return transforms
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
 * Helper method to merge translation files from different designs
 *
 * @param {array} designs - One or more translation objects for designs
 * @param {object} options - Configuration object for how to merge these designs
 * @return {object} result - A merged object of translations
 */
export function mergeI18n(designs, options) {
  const i18n = {}
  for (const design of designs) {
    for (const lang in design) {
      const obj = design[lang]
      if (typeof i18n[lang] === 'undefined') i18n[lang] = {}
      if (obj.t) i18n[lang].t = obj.t
      if (obj.d) i18n[lang].d = obj.d
      for (const section of 'spo') {
        if (obj[section]) {
          if (typeof i18n[lang][section] === 'undefined') i18n[lang][section] = {}
          for (const [key, val] of Object.entries(obj[section])) {
            if (__keepTranslation(key, options?.[section])) i18n[lang][section][key] = val
          }
        }
      }
    }
  }

  return i18n
}

/**
 * Helper method to merge passed in options with default options from the pattern config
 *
 * @param {object} settings - The settings passed to the pattern
 * @param {object} optionsConfig - The pattern's options config
 * @return {object} result - An object with the merged options and their values
 */
export function mergeOptions(settings = {}, optionsConfig) {
  let merged = {}
  for (const [key, option] of Object.entries(optionsConfig)) {
    if (typeof option === 'object') {
      if (typeof option.pct !== 'undefined') merged[key] = option.pct / 100
      else if (typeof option.mm !== 'undefined') merged[key] = option.mm
      else if (typeof option.deg !== 'undefined') merged[key] = option.deg
      else if (typeof option.count !== 'undefined') merged[key] = option.count
      else if (typeof option.bool !== 'undefined') merged[key] = option.bool
      else if (typeof option.dflt !== 'undefined') merged[key] = option.dflt
    } else merged[key] = option
  }
  if (typeof settings.options === 'object') merged = { ...merged, ...settings.options }

  return merged
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
 * @param {Point} start - Start of the curve
 * @param {Point} cp1 - Control point at the start of the curve
 * @param {Point} cp2 - Control point at the end of the curve
 * @param {Point} end - End of the curve
 * @param {Point} check - Point to check
 * @return {boolean} result - True of the Point is on the curve, false when not
 */
export function pointOnCurve(start, cp1, cp2, end, check) {
  return curveParameterFromPoint(start, cp1, cp2, end, check) !== false
}

/**
 * Finds where a Point lies on a (cubic) Bezier curve and returns the curve parameter t of this position.
 * For example a return value of 0 indicates that the given point is the start of the curve, a return value
 * of 1 indicated that the given point is identical to the end of the curve.
 *
 * A return value of 0.5 indicates that the start point and the first control point had the same influence
 * as the end point and the second control point, to create the point, but this doesn't necessarily mean
 * that the point lies exactly half-way on the curve.
 *
 * @param {Point} start - Start of the curve
 * @param {Point} cp1 - Control point at the start of the curve
 * @param {Point} cp2 - Control point at the end of the curve
 * @param {Point} end - End of the curve
 * @param {Point} check - Point to check
 * @return {false|number} result - relative position on the curve (value between 0 and 1), false when not on curve
 */
export function curveParameterFromPoint(start, cp1, cp2, end, check) {
  if (start.sitsOn(check)) return 0
  if (end.sitsOn(check)) return 1
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
 * @return {number} the given value parameter, converted to a number if possible
 */
export function __asNumber(value, param, method, log) {
  if (typeof value === 'number') return value
  if (typeof value === 'string') {
    log.warn(
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
  return `__macro_${name.toLowerCase()}`
}

/**
 * Returns true if we want to keep the translation
 * Called by mergeI18n
 *
 * @private
 * @param {string} key - The translation key
 * @param {object} options - The options (for this particular section of the translation file)
 * @return {bool} result - Whether or not to keep the translation
 */
function __keepTranslation(key, options) {
  // Drop it?
  if (options?.drop && options.drop.includes(key)) return false
  // Keep only some and not this one?
  if (options?.keep && !options.keep.includes(key)) return false

  // Keep it
  return true
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
 * Applies a transformation of the given type to the matrix
 * @param  {String} transformationType   the transformation type (tranlate, rotate, scale, skew, etc)
 * @param  {Number[]} matrix             the matrix to apply the transform to
 * @param  {Number[]} values             the transformation values to apply
 * @return {Number[]}                    the transformed matrix
 */
function matrixTransform(transformationType, matrix, values) {
  // Update matrix for transform
  switch (transformationType) {
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
      const centerX = values[1]
      const centerY = values[2]

      // if there's a rotation center, we need to move the origin to that center
      if (centerX !== undefined) {
        matrix = matrixTransform('translate', matrix, [centerX, centerY])
      }

      // rotate
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

      // move the origin back to origin
      if (centerX !== undefined) {
        matrix = matrixTransform('translate', matrix, [-centerX, -centerY])
      }
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

  return matrix
}

/**
 * Combines an array of (SVG) transforms into a single matrix transform
 *
 * @param {array} transforms - The list of transforms to combine
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
    matrix = matrixTransform(name, matrix, values)
  }

  // Return the combined matrix transform
  return 'matrix(' + matrix.join(', ') + ')'
}

/**
 * Applies and (SVG) transform to a point's coordinates (x and y)
 *
 * @param {string} transform - The transform to apply
 * @param {Point} point - The point of which to update the coordinates
 * @return {Point} point - The point with the transform applied to its coordinates
 */
export function applyTransformToPoint(transform, point) {
  // Parse the transform string
  const { name, values } = __parseTransform(transform)

  // The starting matrix
  let matrix = [1, 0, 0, 1, 0, 0]
  matrix = matrixTransform(name, matrix, values)

  // Apply the matrix transform to the coordinates
  const newX = point.x * matrix[0] + point.y * matrix[2] + matrix[4]
  const newY = point.x * matrix[1] + point.y * matrix[3] + matrix[5]

  point.x = newX
  point.y = newY

  return point
}

/**
 * Get the bounds of a given object after transforms have been applied
 * @param  {Object}           boundsObj   any object with `topLeft` and `bottomRight` properties
 * @param  {Boolean|String[]} transforms  the transforms to apply to the bounds, structured as they would be for being applied as an svg attribute
 * @return {Object}                       `topLeft` and `bottomRight` for the transformed bounds
 */
export function getTransformedBounds(boundsObj, transforms = false) {
  if (!boundsObj.topLeft) return {}
  // get all corners of the part's bounds
  let tl = boundsObj.topLeft
  let br = boundsObj.bottomRight
  let tr = new Point(br.x, tl.y)
  let bl = new Point(tl.x, br.y)

  // if there are transforms on the part, apply them to the corners so that we have the correct bounds
  if (transforms) {
    const combinedTransform = combineTransforms(transforms)

    tl = applyTransformToPoint(combinedTransform, tl.copy())
    br = applyTransformToPoint(combinedTransform, br.copy())
    tr = applyTransformToPoint(combinedTransform, tr.copy())
    bl = applyTransformToPoint(combinedTransform, bl.copy())
  }

  // now get the top left and bottom right after transforms
  const transformedTl = new Point(
    Math.min(tl.x, br.x, bl.x, tr.x),
    Math.min(tl.y, br.y, bl.y, tr.y)
  )

  const transformedBr = new Point(
    Math.max(tl.x, br.x, bl.x, tr.x),
    Math.max(tl.y, br.y, bl.y, tr.y)
  )

  return {
    topLeft: transformedTl,
    bottomRight: transformedBr,
  }
}

export function projectPointOnBeam(from, to, check, precision = 1e6) {
  console.log('projectPointOnBeam - ', 'points:', from, to, check)
  if (from.sitsOn(check, precision)) return 0
  if (to.sitsOn(check, precision)) return 1
  if (from.sitsOn(to, precision)) return 0.5
  let angleBetween = (360 + from.angle(check) - from.angle(to)) % 360 // guaranteed to be in [0 360)

  console.log(
    'projectPointOnBeam - ',
    'angle:',
    angleBetween,
    'rel. length',
    from.dist(check) / from.dist(to)
  )

  return (Math.cos(deg2rad(angleBetween)) * from.dist(check)) / from.dist(to)
}

function closestFraction(frac) {
  return Math.max(0, Math.min(1, frac))
}

function boundsForLine(start, end, tol) {
  // exception: start and end are extremely close
  if (start.dist(end) < tol) {
    // make bounds (roughly) horizontal
    const upperBound = new Path().move(start.translate(-tol, tol)).line(end.translate(tol, tol))
    const lowerBound = new Path().move(start.translate(-tol, -tol)).line(end.translate(tol, -tol))
    console.log('defined boundsForLine as roughly horizontal')
    return [upperBound, lowerBound]
  } else {
    const pathBase = new Path()
      .move(start.shiftTowards(end, -tol / 2))
      .line(end.shiftTowards(start, -tol / 2))
    console.log('pathBase', pathBase, 'start', start, 'end', end)
    const upperBound = pathBase.offset(tol / 2)
    const lowerBound = pathBase.offset(-tol / 2)
    return [upperBound, lowerBound]
  }
}

function boundsForCurve(from, cp1, cp2, to, tol) {
  // calculate *signed* distance to the straight line between start and end
  const temp_points = [from, cp1, cp2, to]
  const distCp1 =
    ((temp_points[3].x - temp_points[0].x) * (temp_points[0].y - temp_points[1].y) -
      (temp_points[0].x - temp_points[1].x) * (temp_points[3].y - temp_points[0].y)) /
    Math.sqrt(
      (temp_points[3].x - temp_points[0].x) * (temp_points[3].x - temp_points[0].x) +
        (temp_points[3].y - temp_points[0].y) * (temp_points[3].y - temp_points[0].y)
    )

  const distCp2 =
    ((temp_points[3].x - temp_points[0].x) * (temp_points[0].y - temp_points[2].y) -
      (temp_points[0].x - temp_points[2].x) * (temp_points[3].y - temp_points[0].y)) /
    Math.sqrt(
      (temp_points[3].x - temp_points[0].x) * (temp_points[3].x - temp_points[0].x) +
        (temp_points[3].y - temp_points[0].y) * (temp_points[3].y - temp_points[0].y)
    )

  const distToUpper = Math.max(distCp1, distCp2, 0) + tol / 2
  const distToLower = Math.min(distCp1, distCp2, 0) - tol / 2

  console.log('dist:', [distToUpper, distToLower])

  const upperStart = temp_points[0]
    .shiftTowards(temp_points[3], distToUpper)
    .rotate(90, temp_points[0])
  const upperEnd = temp_points[3]
    .shiftTowards(temp_points[0], distToUpper)
    .rotate(270, temp_points[3])
  const lowerStart = temp_points[0]
    .shiftTowards(temp_points[3], distToLower)
    .rotate(90, temp_points[0])
  const lowerEnd = temp_points[3]
    .shiftTowards(temp_points[0], distToLower)
    .rotate(270, temp_points[3])

  const upperBound = new Path()
    .move(upperStart.shiftTowards(upperEnd, -tol / 2))
    .line(upperEnd.shiftTowards(upperStart, -tol / 2))
    .addClass('mark')

  const lowerBound = new Path()
    .move(lowerStart.shiftTowards(lowerEnd, -tol / 2))
    .line(lowerEnd.shiftTowards(lowerStart, -tol / 2))
    .addClass('mark sa')

  return [upperBound, lowerBound]
}

function boundsIntersect(
  aStart,
  aEnd,
  bStart,
  bEnd,
  cStart,
  cEnd,
  dStart,
  dEnd,
  angleBetween,
  tol
) {
  console.log([aStart, aEnd, bStart, bEnd, cStart, cEnd, dStart, dEnd])

  const xAC = linesIntersect(aStart, aEnd, cStart, cEnd)
  const xAD = linesIntersect(aStart, aEnd, dStart, dEnd)
  const xBC = linesIntersect(bStart, bEnd, cStart, cEnd)
  const xBD = linesIntersect(bStart, bEnd, dStart, dEnd)

  // deal with some lines not intersecting

  // special case: if there are zero intersections, all bounds are parallel:
  // check whether one is inside the other (if not, these curves do not intersect)
  if (!(xAC || xAD || xBC || xBD)) {
    console.log('none of the bounds intersect')
    // project all starting points onto a perpendicular line
    const CvsAB = projectPointOnBeam(aStart, bStart, cStart, tol)
    const DvsAB = projectPointOnBeam(aStart, bStart, dStart, tol)

    if ((CvsAB < 0 && DvsAB < 0) || (CvsAB > 1 && DvsAB > 1)) {
      console.log('bounding boxes do not overlap')
      return false
    }
  }

  // general approach: for any missing intersection, project the corners of the other box and
  // use this distance instead (or 0 if the projection is beyond the line start/end)

  const xACa =
    xAC ||
    aStart.shiftFractionTowards(
      aEnd,
      closestFraction(projectPointOnBeam(aStart, aEnd, angleBetween < 0 ? cStart : cEnd, tol))
    )
  const xBDb =
    xBD ||
    bStart.shiftFractionTowards(
      bEnd,
      closestFraction(projectPointOnBeam(bStart, bEnd, angleBetween < 0 ? dEnd : dStart, tol))
    )

  // symmetry: CD mirrors AB
  const xACc =
    xAC ||
    cStart.shiftFractionTowards(
      cEnd,
      closestFraction(projectPointOnBeam(cStart, cEnd, angleBetween < 0 ? aStart : aEnd, tol))
    )
  const xBDd =
    xBD ||
    dStart.shiftFractionTowards(
      dEnd,
      closestFraction(projectPointOnBeam(dStart, dEnd, angleBetween < 0 ? bEnd : bStart, tol))
    )

  const distToFirstAB = angleBetween < 0 ? aStart.dist(xACa) : bStart.dist(xBDb)
  const distToLastAB = angleBetween < 0 ? bEnd.dist(xBDb) : aEnd.dist(xACa)
  // again, angle flips because of the mirror image
  const distToFirstCD = angleBetween < 0 ? cStart.dist(xACc) : dStart.dist(xBDd)
  const distToLastCD = angleBetween < 0 ? dEnd.dist(xBDd) : cEnd.dist(xACc)

  //console.log('crossings', [xAC, xACa, xACc, xBD, xBDb, xBDd])

  return [distToFirstAB, distToLastAB, distToFirstCD, distToLastCD]
}

function checkIntersectionLength(start_a, start_b, start_c, start_d, angleBetween, tol) {
  if (start_a.dist(start_b) > 4 * tol || start_c.dist(start_d) > 4 * tol) {
    // curve is not sufficiently straight to make a prediction
    return false
  } else {
    const intersectionLength = tol / Math.tan(deg2rad(Math.abs(angleBetween) / 2))

    if (intersectionLength > tol) {
      console.log('expecting long intersection:', intersectionLength)
    } else {
      console.log('expecting short intersection:', intersectionLength)
    }

    return intersectionLength
  }
}

export function lineIntersectsCurveAlt(
  start,
  end,
  from,
  cp1,
  cp2,
  to,
  tol,
  depth = 0,
  segmentName = 'base'
) {
  const maxIterations = 10
  let intersections,
    tempOp,
    temp_points,
    pathTemp,
    halves,
    newCurve,
    newStart,
    newEnd,
    newFrom,
    newCp1,
    newCp2,
    newTo,
    bounds = []
  if (depth < maxIterations) {
    console.log('iteration: ', depth, 'for segment', segmentName)

    console.log('point input:', [start, end, from, cp1, cp2, to])

    // define bounds for the line
    bounds = boundsForLine(start, end, tol)

    const bound_a = bounds[0].addClass('lining')
    const bound_b = bounds[1].addClass('lining sa')

    // reverse the curve if necessary to define bounds consistently
    let angleBetween = (360 + start.angle(end) - from.angle(to)) % 360 // guaranteed to be in [0 360)
    console.log('angle:', angleBetween)
    temp_points = [from, cp1, cp2, to]
    if (angleBetween >= 90 && angleBetween < 270) {
      // reverse the array defining the path if necessary to ensure that bounds do not run in opposite direction
      temp_points.reverse()
      angleBetween = (180 + angleBetween) % 360
      console.log('reversed points')
    }
    // express the angle as a value in [-90 90) instead of [0 360) (with (90 270) cut out)
    angleBetween = ((angleBetween + 90) % 360) - 90

    // define bounds for the curve
    bounds = boundsForCurve(...temp_points, tol)

    const bound_c = bounds[0].addClass('mark')
    const bound_d = bounds[1].addClass('mark sa')

    // find intersections of the bounds

    // helper function boundsIntersect calculates how much the bounds can be shortened:
    // [from start of a/b, from end of a/b, from start of c/d, from end of c/d]
    const lengthsToRemove = boundsIntersect(
      bound_a.start(),
      bound_a.end(),
      bound_b.start(),
      bound_b.end(),
      bound_c.start(),
      bound_c.end(),
      bound_d.start(),
      bound_d.end(),
      angleBetween,
      tol
    )

    console.log(
      'lengthsToRemove',
      lengthsToRemove,
      'lengthAB:',
      bound_a.length(),
      'remaining:',
      bound_a.length() - (lengthsToRemove[0] + lengthsToRemove[1]),
      'lengthCD:',
      bound_c.length(),
      'remaining:',
      bound_c.length() - (lengthsToRemove[2] + lengthsToRemove[3])
    )

    if (!lengthsToRemove) {
      // no overlap between the bounding boxes ==> no intersection
      console.log(
        'no intersection found (and parallel bounds) after',
        depth,
        'for segment',
        segmentName,
        'iterations'
      )
      return false
    }

    // remove these sections from the line segment
    // reduce the length by tol to account for both the tolerance itself and the fact that the bounds start tol/2 before the start of the curve

    if (lengthsToRemove[0] - tol > 0) {
      newStart = start.shiftTowards(end, lengthsToRemove[0] - tol)
    } else {
      newStart = start
    }
    if (lengthsToRemove[1] - tol > 0) {
      newEnd = end.shiftTowards(start, lengthsToRemove[1] - tol)
    } else {
      newEnd = end
    }

    console.log('newstartend:', [newStart, newEnd])

    // TODO: calculate roughLength first to save time?
    // NOTE: several bezier operations use 100 segments, so 10 * tol ensures that these segments are an order of magnitude smaller than our tolerance
    if (newStart.dist(newEnd) < 10 * tol) {
      // if we're lucky, the middles are within tol of each other
      let bz = new Bezier(
        { x: from.x, y: from.y },
        { x: cp1.x, y: cp1.y },
        { x: cp2.x, y: cp2.y },
        { x: to.x, y: to.y }
      )
      let tempBzPoint = bz.compute(0.5)
      let tempPoint = new Point(tempBzPoint.x, tempBzPoint.y)
      if (newStart.shiftFractionTowards(newEnd, 0.5).dist(tempPoint) < tol) {
        intersections = newStart.shiftFractionTowards(newEnd, 0.5) // got it!
        console.log(
          'found intersection in ',
          depth,
          'for segment',
          segmentName,
          'iterations by reducing line length to <10*tol'
        )
        return intersections
      }
    }

    // continue by removing sections from the curve

    // reduce the length by tol to account for both the tolerance itself and the fact that the bounds start tol/2 before the start of the curve
    pathTemp = new Path().move(temp_points[0]).curve(temp_points[1], temp_points[2], temp_points[3])
    console.log('pathTemp:', pathTemp, 'temp_points:', temp_points)
    const oldLength = pathTemp.length()
    // don't bother splitting if the section to actually remove (length to remove minus tol) is smaller than tol
    if (lengthsToRemove[2] - tol > tol) {
      halves = pathTemp.split(pathTemp.shiftAlong(lengthsToRemove[2] - tol, 10 / tol))
      pathTemp = halves[1].reverse()
    } else {
      pathTemp = pathTemp.reverse()
    }
    if (lengthsToRemove[3] - tol > tol) {
      halves = pathTemp.split(pathTemp.shiftAlong(lengthsToRemove[3] - tol, 10 / tol))
      newCurve = halves[1].reverse()
    } else {
      newCurve = pathTemp.reverse()
    }

    // four ways to proceed, depending on remaining length:
    // - less than tol: any point on this curve qualifies as an intersection
    // - not much more than tol: check whether the middle counts as an intersection
    // - longer than 10*tol: repeat the whole thing with the shorter line+curve
    // - almost as long as the original: split before repeating
    const newLength = newCurve.length()
    if (newLength < tol) {
      // either we have found an intersection, or there isn't one
      const potentialIntersection = newCurve.shiftFractionAlong(0.5)
      const closestFractionOnLine = projectPointOnBeam(newStart, newEnd, potentialIntersection)
      const closestPointOnLine = newStart.shiftFractionTowards(
        newEnd,
        closestFraction(projectPointOnBeam(newStart, newEnd, potentialIntersection))
      )

      console.log(
        'hoping to find intersection for segment',
        segmentName,
        ' in ',
        depth,
        'iterations using potential intersection',
        potentialIntersection,
        'and closest point',
        closestPointOnLine,
        ' (at fraction',
        closestFractionOnLine,
        ')'
      )

      if (potentialIntersection.dist(closestPointOnLine) < tol) {
        intersections = potentialIntersection // got it!
        console.log(
          'found intersection for segment',
          segmentName,
          ' in ',
          depth,
          'iterations by reducing curve length to <tol'
        )
        return intersections
      } else {
        console.log(
          'ruled out intersections for segment',
          segmentName,
          ' in ',
          depth,
          'iterations by reducing curve length to <tol'
        )
        console.log('closest points are', potentialIntersection.dist(closestPointOnLine), 'apart')
        return false
      }
    } else if (
      newStart.dist(newEnd) < 10 * tol &&
      newCurve.shiftFractionAlong(0.5).dist(newStart.shiftFractionTowards(newEnd, 0.5)) < tol
    ) {
      // TODO: check whether either end of the curve is closer (and then use that)
      // we're lucky; the middles are within tol of each other
      intersections = newCurve.shiftFractionAlong(0.5) // got it!
      console.log(
        'found intersection for segment',
        segmentName,
        'in ',
        depth,
        'iterations by reducing curve length to <10*tol'
      )
      return intersections
    } else if (newLength > 0.9 * oldLength) {
      // split, then repeat the whole thing (recursive function)
      console.log(
        'splitting curve for segment',
        segmentName,
        ' in half after ',
        depth,
        ' iterations; new length: ',
        newLength,
        '; old length: ',
        oldLength
      )

      // use Bezier.js to split at t = 0.5, which is more efficient
      newFrom = newCurve.start()
      tempOp = newCurve.ops[1]
      newCp1 = tempOp.cp1
      newCp2 = tempOp.cp2
      newTo = tempOp.to
      let bz = new Bezier(
        { x: newFrom.x, y: newFrom.y },
        { x: newCp1.x, y: newCp1.y },
        { x: newCp2.x, y: newCp2.y },
        { x: newTo.x, y: newTo.y }
      )

      halves = bz.split(0.5)

      console.log('bezier halves:', halves, 'bezier whole:', bz)
      console.log('split at:', new Point(halves.right.points[0].x, halves.right.points[0].y))

      // TODO: find better syntax
      const curvePointsA = [
        new Point(halves.left.points[0].x, halves.left.points[0].y),
        new Point(halves.left.points[1].x, halves.left.points[1].y),
        new Point(halves.left.points[2].x, halves.left.points[2].y),
        new Point(halves.left.points[3].x, halves.left.points[3].y),
      ]
      const curvePointsB = [
        new Point(halves.right.points[0].x, halves.right.points[0].y),
        new Point(halves.right.points[1].x, halves.right.points[1].y),
        new Point(halves.right.points[2].x, halves.right.points[2].y),
        new Point(halves.right.points[3].x, halves.right.points[3].y),
      ]

      intersections = []

      // add any intersections from the first part
      intersections.push(
        lineIntersectsCurveAlt(
          newStart,
          newEnd,
          ...curvePointsA,
          tol,
          depth + 1,
          segmentName + 'left'
        )
      )

      // add any intersections from the second part
      intersections.push(
        lineIntersectsCurveAlt(
          newStart,
          newEnd,
          ...curvePointsB,
          tol,
          depth + 1,
          segmentName + 'right'
        )
      )

      // due to the tolerance, a single intersection may show up in both halves
      // calculate the expected length of the line/curve segments that are within tol of each other
      const intersectionLength = checkIntersectionLength(
        bound_a.start(),
        bound_b.start(),
        bound_c.start(),
        bound_d.start(),
        angleBetween,
        tol
      )

      if (intersectionLength) {
        // use intersectionLength to determine whether intersections should be considered unique
        const flattened_left =
          intersections[0] instanceof Array ? intersections[0].flat(Infinity) : [intersections[0]]
        const flattened_right =
          intersections[1] instanceof Array ? intersections[1].flat(Infinity) : [intersections[1]]

        // if both left and right found an intersection and they are less than intersectionLength apart
        if (
          flattened_left[flattened_left.length - 1] &&
          flattened_right[0] &&
          flattened_left[flattened_left.length - 1].dist(flattened_right[0]) < intersectionLength
        ) {
          // pick the middle (using pop and shift to remove the to-be-merged points)
          const merged_intersection = flattened_left
            .pop()
            .shiftTowards(flattened_right.shift(), 0.5)
          intersections = [flattened_left, merged_intersection, flattened_right]
          console.log(
            'merged intersections for segment',
            segmentName,
            'after',
            depth,
            'iterations after splitting curve'
          )
        } else {
          console.log(
            'no need to merge intersections (left:',
            flattened_left,
            'right:',
            flattened_right,
            'length:',
            intersectionLength,
            ')'
          )
        }
      }
    } else {
      // repeat the whole thing (recursive function)
      newFrom = newCurve.start()
      tempOp = newCurve.ops[1]
      newCp1 = tempOp.cp1
      newCp2 = tempOp.cp2
      newTo = tempOp.to

      intersections = lineIntersectsCurveAlt(
        newStart,
        newEnd,
        newFrom,
        newCp1,
        newCp2,
        newTo,
        tol,
        depth + 1,
        segmentName
      )
    }

    // TODO remove any 'false's, check for duplicates

    return intersections
  } else {
    console.log(
      'no intersection found for segment',
      segmentName,
      'after',
      depth,
      'iterations; line length',
      start.dist(end),
      ', curve length',
      new Path().move(to).curve(cp1, cp2, to).length()
    )
    return false
  }
}

// NOTE: a-d are used to label bounds, so label curves as E and F to avoid confusion
export function curvesIntersectAlt(
  fromE,
  cp1E,
  cp2E,
  toE,
  fromF,
  cp1F,
  cp2F,
  toF,
  tol,
  depth = 0,
  segmentName = 'base'
) {
  const maxIterations = 10
  let intersections,
    tempOp,
    temp_points,
    pathTemp,
    halves,
    newCurveE,
    newCurveF,
    newFromE,
    newCp1E,
    newCp2E,
    newToE,
    newFromF,
    newCp1F,
    newCp2F,
    newToF,
    bounds = []
  if (depth < maxIterations) {
    console.log('iteration: ', depth, 'for segment', segmentName)

    console.log('point input:', [fromE, cp1E, cp2E, toE, fromF, cp1F, cp2F, toF])

    // define bounds for the line
    bounds = boundsForCurve(fromE, cp1E, cp2E, toE, tol)

    const bound_a = bounds[0].addClass('lining')
    const bound_b = bounds[1].addClass('lining sa')

    // reverse the curve if necessary to define bounds consistently
    let angleBetween = (360 + fromE.angle(toE) - fromF.angle(toF)) % 360 // guaranteed to be in [0 360)
    console.log('angle:', angleBetween)
    temp_points = [fromF, cp1F, cp2F, toF]
    if (angleBetween >= 90 && angleBetween < 270) {
      // reverse the array defining the path if necessary to ensure that bounds do not run in opposite direction
      temp_points.reverse()
      angleBetween = (180 + angleBetween) % 360
      console.log('reversed points')
    }
    // express the angle as a value in [-90 90) instead of [0 360) (with (90 270) cut out)
    angleBetween = ((angleBetween + 90) % 360) - 90

    // define bounds for the curve
    bounds = boundsForCurve(...temp_points, tol)

    const bound_c = bounds[0].addClass('mark')
    const bound_d = bounds[1].addClass('mark sa')

    // find intersections of the bounds

    // helper function boundsIntersect calculates how much the bounds can be shortened:
    // [from start of a/b, from end of a/b, from start of c/d, from end of c/d]
    const lengthsToRemove = boundsIntersect(
      bound_a.start(),
      bound_a.end(),
      bound_b.start(),
      bound_b.end(),
      bound_c.start(),
      bound_c.end(),
      bound_d.start(),
      bound_d.end(),
      angleBetween,
      tol
    )

    console.log(
      'lengthsToRemove',
      lengthsToRemove,
      'lengthAB:',
      bound_a.length(),
      'remaining:',
      bound_a.length() - (lengthsToRemove[0] + lengthsToRemove[1]),
      'lengthCD:',
      bound_c.length(),
      'remaining:',
      bound_c.length() - (lengthsToRemove[2] + lengthsToRemove[3])
    )

    if (!lengthsToRemove) {
      // no overlap between the bounding boxes ==> no intersection
      console.log(
        'no intersection found (and parallel bounds) after',
        depth,
        'for segment',
        segmentName,
        'iterations'
      )
      return false
    }

    // remove these sections from the line segment
    // reduce the length by tol to account for both the tolerance itself and the fact that the bounds start tol/2 before the start of the curve

    pathTemp = new Path().move(fromE).curve(cp1E, cp2E, toE)
    // don't bother splitting if the section to actually remove (length to remove minus tol) is smaller than tol
    if (lengthsToRemove[0] - tol > tol) {
      halves = pathTemp.split(pathTemp.shiftAlong(lengthsToRemove[0] - tol, 10 / tol))
      pathTemp = halves[1].reverse()
    } else {
      pathTemp = pathTemp.reverse()
    }
    if (lengthsToRemove[1] - tol > tol) {
      halves = pathTemp.split(pathTemp.shiftAlong(lengthsToRemove[1] - tol, 10 / tol))
      newCurveE = halves[1].reverse()
    } else {
      newCurveE = pathTemp.reverse()
    }
    newFromE = newCurveE.start()
    tempOp = newCurveE.ops[1]
    newCp1E = tempOp.cp1
    newCp2E = tempOp.cp2
    newToE = tempOp.to

    // TODO: calculate roughLength first to save time?
    // NOTE: several bezier operations use 100 segments, so 10 * tol ensures that these segments are an order of magnitude smaller than our tolerance
    if (newCurveE.length() < 10 * tol) {
      // if we're lucky, the middles are within tol of each other
      let bzE = new Bezier(
        { x: newFromE.x, y: newFromE.y },
        { x: newCp1E.x, y: newCp1E.y },
        { x: newCp2E.x, y: newCp2E.y },
        { x: newToE.x, y: newToE.y }
      )
      let bzF = new Bezier(
        { x: fromF.x, y: fromF.y },
        { x: cp1F.x, y: cp1F.y },
        { x: cp2F.x, y: cp2F.y },
        { x: toF.x, y: toF.y }
      ) // potentially reversed wrt temp_points/newCurveF, but midpoint is the same...
      let tempBzPointE = bzE.compute(0.5)
      let tempPointE = new Point(tempBzPointE.x, tempBzPointE.y)
      let tempBzPointF = bzF.compute(0.5)
      let tempPointF = new Point(tempBzPointF.x, tempBzPointF.y)
      if (tempPointE.dist(tempPointF) < tol) {
        intersections = tempPointE // got it!
        // order of curves gets inverted every other iteration
        console.log(
          'found intersection for segment',
          segmentName,
          'in ',
          depth,
          'iterations by reducing',
          depth % 2 > 0 ? 'second' : 'first',
          'curve length to <10*tol'
        )
        return intersections
      }
    }

    // continue by removing sections from the other curve

    // reduce the length by tol to account for both the tolerance itself and the fact that the bounds start tol/2 before the start of the curve
    pathTemp = new Path().move(temp_points[0]).curve(temp_points[1], temp_points[2], temp_points[3])
    console.log('pathTemp:', pathTemp, 'temp_points:', temp_points)
    const oldLength = pathTemp.length()
    // don't bother splitting if the section to actually remove (length to remove minus tol) is smaller than tol
    if (lengthsToRemove[2] - tol > tol) {
      halves = pathTemp.split(pathTemp.shiftAlong(lengthsToRemove[2] - tol, 10 / tol))
      pathTemp = halves[1].reverse()
    } else {
      pathTemp = pathTemp.reverse()
    }
    if (lengthsToRemove[3] - tol > tol) {
      halves = pathTemp.split(pathTemp.shiftAlong(lengthsToRemove[3] - tol, 10 / tol))
      newCurveF = halves[1].reverse()
    } else {
      newCurveF = pathTemp.reverse()
    }

    // four ways to proceed, depending on remaining length:
    // - less than tol: any point on this curve qualifies as an intersection
    // - not much more than tol: check whether the middle counts as an intersection
    // - longer than 10*tol: repeat the whole thing with the shorter line+curve
    // - almost as long as the original: split before repeating
    const newLength = newCurveF.length()
    if (newLength < tol) {
      // either we have found an intersection, or there isn't one
      const potentialIntersection = newCurveF.shiftFractionAlong(0.5)
      let bzE = new Bezier(
        { x: fromE.x, y: fromE.y },
        { x: cp1E.x, y: cp1E.y },
        { x: cp2E.x, y: cp2E.y },
        { x: toE.x, y: toE.y }
      )
      // TODO: how to do this for a curve?
      const closestPointOnCurveE = bzE.project({
        x: potentialIntersection.x,
        y: potentialIntersection.y,
      })

      console.log(
        'hoping to find intersection for segment',
        segmentName,
        ' in ',
        depth,
        'iterations using potential intersection',
        potentialIntersection,
        'and closest point',
        closestPointOnCurveE
      )

      if (potentialIntersection.dist(closestPointOnCurveE) < tol) {
        intersections = potentialIntersection // got it!
        console.log(
          'found intersection for segment',
          segmentName,
          ' in ',
          depth,
          'iterations by reducing',
          depth % 2 > 0 ? 'first' : 'second',
          'curve length to <tol'
        )
        return intersections
      } else {
        console.log(
          'ruled out intersections for segment',
          segmentName,
          ' in ',
          depth,
          'iterations by reducing',
          depth % 2 > 0 ? 'first' : 'second',
          'curve length to <tol'
        )
        console.log('closest points are', potentialIntersection.dist(closestPointOnCurveE), 'apart')
        return false
      }
      // NOTE: unlike lineIntersectsCurve, do not attempt to guess an intersections for length < 10 * tol, since curves are less predictable in shape
    } else if (newLength > 0.9 * oldLength) {
      // split, then repeat the whole thing (recursive function)
      console.log(
        'splitting',
        depth % 2 > 0 ? 'first' : 'second',
        ' curve for segment',
        segmentName,
        ' in half after ',
        depth,
        ' iterations; new length: ',
        newLength,
        '; old length: ',
        oldLength
      )

      // use Bezier.js to split at t = 0.5, which is more efficient
      newFromF = newCurveF.start()
      tempOp = newCurveF.ops[1]
      newCp1F = tempOpF.cp1
      newCp2F = tempOpF.cp2
      newToF = tempOpF.to
      let bzF = new Bezier(
        { x: newFromF.x, y: newFromF.y },
        { x: newCp1F.x, y: newCp1F.y },
        { x: newCp2F.x, y: newCp2F.y },
        { x: newToF.x, y: newToF.y }
      )

      halves = bzF.split(0.5)

      console.log('bezier halves:', halves, 'bezier whole:', bz)
      console.log('split at:', new Point(halves.right.points[0].x, halves.right.points[0].y))

      // TODO: find better syntax
      const curvePointsA = [
        new Point(halves.left.points[0].x, halves.left.points[0].y),
        new Point(halves.left.points[1].x, halves.left.points[1].y),
        new Point(halves.left.points[2].x, halves.left.points[2].y),
        new Point(halves.left.points[3].x, halves.left.points[3].y),
      ]
      const curvePointsB = [
        new Point(halves.right.points[0].x, halves.right.points[0].y),
        new Point(halves.right.points[1].x, halves.right.points[1].y),
        new Point(halves.right.points[2].x, halves.right.points[2].y),
        new Point(halves.right.points[3].x, halves.right.points[3].y),
      ]

      intersections = []

      // NOTE: swap the order of the curves, so the other curve can also be split

      // add any intersections from the first part
      intersections.push(
        curvesIntersectAlt(
          ...curvePointsA,
          newFromE,
          newCp1E,
          newCp2E,
          newToE,
          tol,
          depth + 1,
          segmentName + 'left'
        )
      )

      // add any intersections from the second part
      intersections.push(
        curvesIntersectAlt(
          ...curvePointsB,
          newFromE,
          newCp1E,
          newCp2E,
          newToE,
          tol,
          depth + 1,
          segmentName + 'right'
        )
      )

      // due to the tolerance, a single intersection may show up in both halves
      // calculate the expected length of the line/curve segments that are within tol of each other
      const intersectionLength = checkIntersectionLength(
        bound_a.start(),
        bound_b.start(),
        bound_c.start(),
        bound_d.start(),
        angleBetween,
        tol
      )

      if (intersectionLength) {
        // use intersectionLength to determine whether intersections should be considered unique
        const flattened_left =
          intersections[0] instanceof Array ? intersections[0].flat(Infinity) : [intersections[0]]
        const flattened_right =
          intersections[1] instanceof Array ? intersections[1].flat(Infinity) : [intersections[1]]

        // if both left and right found an intersection and they are less than intersectionLength apart
        if (
          flattened_left[flattened_left.length - 1] &&
          flattened_right[0] &&
          flattened_left[flattened_left.length - 1].dist(flattened_right[0]) < intersectionLength
        ) {
          // pick the middle (using pop and shift to remove the to-be-merged points)
          const merged_intersection = flattened_left
            .pop()
            .shiftTowards(flattened_right.shift(), 0.5)
          intersections = [flattened_left, merged_intersection, flattened_right]
          console.log(
            'merged intersections for segment',
            segmentName,
            'after',
            depth,
            'iterations after splitting curve'
          )
        } else {
          console.log(
            'no need to merge intersections (left:',
            flattened_left,
            'right:',
            flattened_right,
            'length:',
            intersectionLength,
            ')'
          )
        }
      }
    } else {
      // repeat the whole thing (recursive function)
      newFrom = newCurve.start()
      tempOp = newCurve.ops[1]
      newCp1 = tempOp.cp1
      newCp2 = tempOp.cp2
      newTo = tempOp.to

      // NOTE: swap the order of the curves, so the other curve can also be split

      intersections = curvesIntersectAlt(
        newFromF,
        newCp1F,
        newCp2F,
        newToF,
        newFromE,
        newCp1E,
        newCp2E,
        newToE,
        tol,
        depth + 1,
        segmentName
      )
    }

    // TODO remove any 'false's, check for duplicates

    return intersections
  } else {
    console.log(
      'no intersection found for segment',
      segmentName,
      'after',
      depth,
      'iterations; line length',
      start.dist(end),
      ', curve length',
      new Path().move(to).curve(cp1, cp2, to).length()
    )
    return false
  }
}
