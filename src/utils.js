import Point from "./point";
import { round } from "./round";

/** Returns internal hook name for a macro */
export function macroName(name) {
  return `_macro_${name}`;
}

/** Find intersection of two (endless) lines */
export function beamsCross(a1, a2, b1, b2) {
  let slopeA = a1.slope(a2);
  let slopeB = b1.slope(b2);
  if (slopeA === slopeB) return false; // Parallel lines

  if (a1.x === a2.x)
    return new Point(a1.x, slopeB * a1.x + (b1.y - slopeB * b1.x));
  // Vertical line A
  else if (b1.x === b2.x)
    return new Point(b1.x, slopeA * b1.x + (a1.y - slopeA * a1.x));
  // Vertical line B
  else {
    // Swap points if line A or B goes from right to left
    if (a1.x > a2.x) a1 = a2.copy();
    if (b1.x > b2.x) b1 = b2.copy();
    // Find y intercept
    let iA = a1.y - slopeA * a1.x;
    let iB = b1.y - slopeB * b1.x;

    // Find intersection
    let x = (iB - iA) / (slopeA - slopeB);
    let y = slopeA * x + iA;

    return new Point(x, y);
  }
}

/** Find intersection of two line segments */
export function linesCross(a1, a2, b1, b2) {
  let p = beamsCross(a1, a2, b1, b2);
  if (!p) return false;
  let lenA = a1.dist(a2);
  let lenB = b1.dist(b2);
  let lenC = a1.dist(p) + p.dist(a2);
  let lenD = b1.dist(p) + p.dist(b2);
  if (round(lenA) == round(lenC) && round(lenB) == round(lenD)) return p;
  else return false;
}

/** Find where an (endless) line crosses a certain Y-value */
export function beamCrossesY(from, to, y) {
  if (from.y === to.y) return false; // Horizontal line
  let left = new Point(-10, y);
  let right = new Point(10, y);

  return beamsCross(from, to, left, right);
}

/** Convert value in mm to cm or imperial units */
export function units(value, to = "metric") {
  if (to === "imperial") return round(value / 25.4) + '"';
  else return round(value / 10) + "cm";
}
