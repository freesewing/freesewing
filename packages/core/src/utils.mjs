import { Bezier } from 'bezier-js'
import { Path } from './path.mjs'
import { Point } from './point.mjs'

export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

/** Checks for a valid coordinate value **/
export function isCoord(value) {
  return value === value // NaN does not equal itself
    ? typeof value === 'number'
    : false
}

/** Returns internal hook name for a macro */
export function macroName(name) {
  return `_macro_${name}`
}

/** Find intersection of two (endless) lines */
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

/** Find intersection of two line segments */
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

/** Finds out whether a point lies on an endless line */
export function pointOnBeam(from, to, check, precision = 1e6) {
  if (from.sitsOn(check)) return true
  if (to.sitsOn(check)) return true
  let cross = check.dx(from) * to.dy(from) - check.dy(from) * to.dx(from)

  if (Math.abs(Math.round(cross * precision) / precision) === 0) return true
  else return false
}

/** Finds out whether a point lies on a line segment */
export function pointOnLine(from, to, check, precision = 1e6) {
  if (!pointOnBeam(from, to, check, precision)) return false
  let lenA = from.dist(to)
  let lenB = from.dist(check) + check.dist(to)
  if (Math.round(lenA) == Math.round(lenB)) return true
  else return false
}

/** Finds out whether a point lies on a curve */
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

/** Splits a curve on a point */
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

/** Find where an (endless) line intersects with a certain X-value */
export function beamIntersectsX(from, to, x) {
  if (from.x === to.x) return false // Vertical line
  let top = new Point(x, -10)
  let bottom = new Point(x, 10)

  return beamsIntersect(from, to, top, bottom)
}

/** Find where an (endless) line intersects with a certain Y-value */
export function beamIntersectsY(from, to, y) {
  if (from.y === to.y) return false // Horizontal line
  let left = new Point(-10, y)
  let right = new Point(10, y)

  return beamsIntersect(from, to, left, right)
}

/** Convert value in mm to cm or imperial units */
export function units(value, to = 'metric') {
  if (to === 'imperial') return round(value / 25.4) + '&quot;'
  else return round(value / 10) + 'cm'
}

/** Find where a curve intersects with line */
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

/** Find where a curve intersects with a given X-value */
export function curveIntersectsX(from, cp1, cp2, to, x) {
  let start = new Point(x, -10000)
  let end = new Point(x, 10000)
  return lineIntersectsCurve(start, end, from, cp1, cp2, to)
}

/** Find where a curve intersects with a given Y-value */
export function curveIntersectsY(from, cp1, cp2, to, y) {
  let start = new Point(-10000, y)
  let end = new Point(10000, y)
  return lineIntersectsCurve(start, end, from, cp1, cp2, to)
}

/** Find where a curve intersects with another curve */
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
    return unique
  }
}

/** Find the intersections between two circles */
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

/** Find the intersections between a beam and a circle */
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
/** Find the intersections between a line and a circle */
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
 * Calculates scale factor based on stretch factor
 *
 * The way people measure stretch intuitively is
 * different from the way we handle stretch in code.
 * When people say '25% stretch' they mean that
 * 10cm fabric should get stretched to 12.5cm fabric.
 * In our code, that means we need to scale things by 80%.
 *
 * This method does that calculation.
 */
export function stretchToScale(stretch) {
  return 1 / (1 + parseFloat(stretch))
}

export function round(value) {
  return Math.round(value * 1e2) / 1e2
}

export function sampleStyle(run, runs, styles = false) {
  return styles && Array.isArray(styles) && styles.length > 0
    ? styles[run % styles.length]
    : `stroke: hsl(${(run - 1) * (330 / runs)}, 100%, 35%);`
}

export function deg2rad(degrees) {
  return degrees * (Math.PI / 180)
}

export function rad2deg(radians) {
  return (radians / Math.PI) * 180
}

// Export bezier-js so plugins can use it
export { Bezier }

export function pctBasedOn(measurement) {
  return {
    toAbs: (val, { measurements }) => measurements[measurement] * val,
    fromAbs: (val, { measurements }) => Math.round((10000 * val) / measurements[measurement]) / 10000,
  }
}

/** Generates the transform attributes needed for a given part */
export const generatePartTransform = (x, y, rotate, flipX, flipY, part) => {

  const transforms = []
  let xTotal = x || 0;
  let yTotal = y || 0;
  let scaleX = 1
  let scaleY = 1

  // move the part an additional offset so it ends up in the correct spot after flipping.
  // it will scale around the part's 0, 0, which isn't always the top left, so we need to move it over so that 0,0 lines up with topRight + topLeft
  if (flipX) {
    xTotal += part.topLeft.x
    xTotal += part.bottomRight.x
    // reverse the x scale
    scaleX = -1
  }
  if (flipY) {
    yTotal += part.topLeft.y
    yTotal += part.bottomRight.y
    scaleY = -1
  }

  // add the scaling to the transforms
  if (scaleX + scaleY < 2) {
    transforms.push(`scale(${scaleX} ${scaleY})`)
  }

  if (rotate) {
    // we can put the center as the rotation origin, so get the center
    const center = {
      x: part.topLeft.x + part.width/2,
      y: part.topLeft.y + part.height/2,
    }

    // add the rotation around the center to the transforms
    transforms.push(`rotate(${rotate} ${center.x} ${center.y})`)
  }

  // put the translation before any other transforms to avoid having to make complex calculations once the matrix has been rotated or scaled
  if (xTotal !== 0 || yTotal !== 0) transforms.unshift(
    `translate(${xTotal} ${yTotal})`
  )

  return {
    transform: transforms.join(' '),
    // 'transform-origin': `${center.x} ${center.y}`
  }
}

// Add part-level options
const addPartOptions = (part, config) => {
  if (part.options) {
    for (const optionName in part.options) {
      config.options[optionName] = part.options[optionName]
    }
  }
  if (part.from) addPartOptions(part.from, config)
  if (part.after) {
    if (Array.isArray(part.after)) {
      for (const dep of part.after) addPartOptions(dep, config)
    } else addPartOptions(part.after, config)
  }

  return config
}

/*
// Helper method for detecting a array with only strings
const isStringArray = val => (Array.isArray(val) && val.length > 0)
  ? val.reduce((prev=true, cur) => (prev && typeof cur === 'string'))
  : false
// Helper method for detecting an object
const isObject = obj => obj && typeof obj === 'object'

// Hat-tip to jhildenbiddle => https://stackoverflow.com/a/48218209
const mergeOptionSubgroup = (...objects) => objects.reduce((prev, obj) => {
  Object.keys(obj).forEach(key => {
    const pVal = prev[key];
    const oVal = obj[key];

    if (Array.isArray(pVal) && Array.isArray(oVal)) {
      prev[key] = pVal.concat(...oVal);
    }
    else if (isObject(pVal) && isObject(oVal)) {
      prev[key] = mergeOptionSubgroup(pVal, oVal);
    }
    else {
      prev[key] = oVal;
    }
  })

  return prev
}, {})

const mergeOptionGroups = (cur, add) => {
  if (isStringArray(cur) && isStringArray(add)) return [...new Set([...cur, ...add])]
  else if (!Array.isArray(cur) && !Array.isArray(add)) return mergeOptionSubgroup(cur, add)
  else {
    const all = [...cur]
    for (const entry of add) {
      if (typeof add === 'string' && all.indexOf(entry) === -1) all.push(entry)
      else all.push(entry)
    }
    return all
  }

  return cur
}
*/
// Add part-level optionGroups
const addPartOptionGroups = (part, config) => {
  if (typeof config.optionGroups === 'undefined') {
    if (part.optionGroups) config.optionGroups = part.optionGroups
    return config
  }
  if (part.optionGroups) {
    for (const group in part.optionGroups) {
      if (typeof config.optionGroups[group] === 'undefined') config.optionGroups[group] = part.optionGroups[group]
      else config.optionGroups[group] = mergeOptionGroups(config.optionGroups[group], part.optionGroups[group])
    }
  }
  if (part.from) addPartOptionGroups(part.from, config)
  if (part.after) {
    if (Array.isArray(part.after)) {
      for (const dep of part.after) addPartOptionGroups(dep, config)
    } else addPartOptionGroups(part.after, config)
  }

  return config
}

// Add part-level measurements
const addPartMeasurements = (part, config, raise, list=false) => {
  if (!list) list = config.measurements
    ? [...config.measurements]
    : []
  if (part.measurements) {
    for (const m of part.measurements) list.push(m)
  }
  if (part.from) addPartMeasurements(part.from, config, raise, list)
  if (part.after) {
    if (Array.isArray(part.after)) {
      for (const dep of part.after) addPartMeasurements(dep, config, raise, list)
    } else addPartMeasurements(part.after, config, raise, list)
  }

  // Weed out duplicates
  config.measurements = [...new Set(list)]

  return config
}

// Add part-level optional measurements
const addPartOptionalMeasurements = (part, config, raise, list=false) => {
  if (!list) list = config.optionalMeasurements
    ? [...config.optionalMeasurements]
    : []
  if (part.optionalMeasurements) {
    for (const m of part.optionalMeasurements) {
      // Don't add it's a required measurement for another part
      if (config.measurements.indexOf(m) === -1) list.push(m)
    }
  }
  if (part.from) addPartOptionalMeasurements(part.from, config, list)
  if (part.after) {
    if (Array.isArray(part.after)) {
      for (const dep of part.after) addPartOptionalMeasurements(dep, config, list)
    } else addPartOptionalMeasurements(part.after, config, list)
  }

  // Weed out duplicates
  config.optionalMeasurements = [...new Set(list)]

  return config
}


export const mergeDependencies = (dep=[], current=[]) => {
  // Current dependencies
  const list = []
  if (Array.isArray(current)) list.push(...current)
  else if (typeof current === 'string') list.push(current)

  if (Array.isArray(dep)) list.push(...dep)
  else if (typeof dep === 'string') list.push(dep)

  // Dependencies should be parts names (string) not the object
  const deps = []
  for (const part of [...new Set(list)]) {
    if (typeof part === 'object') deps.push(part.name)
    else deps.push(part)
  }

  return deps
}

// Add part-level dependencies
export const addPartDependencies = (part, config) => {
  if (part.after) {
    if (typeof config.dependencies === 'undefined') config.dependencies = {}
    config.dependencies[part.name] = mergeDependencies(config.dependencies[part.name], part.after)
  }

  return config
}

// Add part-level plugins
export const addPartPlugins = (part, config, raise) => {
  if (!part.plugins) return config
  if (!Array.isArray(part.plugins)) part.plugins = [ part.plugins ]
  for (const plugin of part.plugins) {
    // Do not overwrite an existing plugin with a conditional plugin unless it is also conditional
    if (plugin.plugin && plugin.condition) {
      if (config.plugins[plugin.plugin.name]?.condition) {
        raise.info(`Plugin \`${plugin.plugin.name}\` was re-requested conditionally. Overwriting earlier condition.`)
        config.plugins[plugin.plugin.name] = plugin
      }
      else raise.info(`Plugin \`${plugin.plugin.name}\` was requested conditionally, but is already loaded explicitly. Not loading.`)
  }
    else config.plugins[plugin.name] = plugin
  }

  return config
}

export const addPartConfig = (part, config, raise) => {
  config = addPartOptions(part, config, raise)
  config = addPartMeasurements(part, config, raise)
  config = addPartOptionalMeasurements(part, config, raise)
  config = addPartDependencies(part, config, raise)
  config = addPartOptionGroups(part, config, raise)
  config = addPartPlugins(part, config, raise)

  return config
}

