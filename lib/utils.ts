import { Point } from './point'

/** Rounds a value to PRECISION */
export function round(value: number): number {
  return Math.round(value * 1e2) / 1e2;
}

/** Radians to degrees */
export function rad2deg(radians: number): number {
  return radians * 57.29577951308232;
}

/** Degrees to radians */
export function deg2rad(degrees: number): number {
  return degrees / 57.29577951308232;
}

/** Find intersection of two (endless) lines */
export function beamsCross(a1: Point, a2: Point, b1: Point, b2: Point): Point | false {
  let slopeA = a1.slope(a2);
  let slopeB = b1.slope(b2);
  if(slopeA === slopeB) return false; // Parallel lines

  if(a1.x === a2.x) return new Point(a1.x, slopeB * a1.x + (b1.y - (slopeB * b1.x))); // Vertical line A
  else if(b1.x === b2.x) return new Point(b1.x, slopeA * b1.x + (a1.y - (slopeA * a1.x))); // Vertical line B
  else {
    // Swap points if line A or B goes from right to left
    if(a1.x > a2.x) {
      let tmp = a1.copy();
      a1 = a2.copy();
      a2 = tmp;
    }
    if(b1.x > b2.x) {
      let tmp = b1.copy();
      b1 = b2.copy();
      b2 = tmp;
    }
    // Find y intercept
    let iA = a1.y - (slopeA * a1.x);
    let iB = b1.y - (slopeB * b1.x);

    // Find intersection
    let x = (iB - iA) / (slopeA - slopeB);
    let y = slopeA * x + iA;

    return new Point(x, y);
  }
}

/** Find intersection of two line segments */
export function linesCross(a1: Point, a2: Point, b1: Point, b2: Point): Point | false {
  let p = beamsCross(a1,a2,b1,b2);
  if(p) {
    let lenA = a1.dist(a2);
    let lenB = b1.dist(b2);
    let lenC = a1.dist(p) + p.dist(a2);
    let lenD = b1.dist(p) + p.dist(b2);
    if (round(lenA) == round(lenC) && round(lenB) == round(lenD)) return p;
  }
  return false;
}

/** Find where an (endless) line crosses a certain Y-value */
export function beamCrossesY(from: Point, to: Point, y: number) {
  if(from.y === to.y) return false; // Horizontal line
  let left = new Point(-10,y);
  let right = new Point(10,y);

  return beamsCross(from, to, left, right);
}

/** Returns an object with shorthand access for pattern design */
export function shorthand(part, context): {} {
  let final = (context.settings.mode === 'draft') ? true : false;
  let paperless = (context.settings.paperless === true) ? true : false;
  return {
    measurements: context.settings.measurements || {},
    options: context.options || {},
    values: context.values || {},
    points: part.points || {},
    paths: part.paths || {},
    snippets: part.snippets || {},
    macro: part.macroRunner(),
    final,
    paperless
  }
}
