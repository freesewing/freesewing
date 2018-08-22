import Point from "./point";
import Path from "./path";
import Bezier from "bezier-js";
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
  if (
    Math.round(lenA) == Math.round(lenC) &&
    Math.round(lenB) == Math.round(lenD)
  )
    return p;
  else return false;
}

/** Finds out whether a point lies on an endless line */
export function pointOnBeam(from, to, check) {
  if (from.sitsOn(check)) return true;
  if (to.sitsOn(check)) return true;
  let angleA = from.angle(to);
  let angleB = from.angle(check);
  if (angleA === angleB || Math.abs(angleA - angleB) === 180) return true;
  else return false;
}

/** Finds out whether a point lies on a line segment */
export function pointOnLine(from, to, check) {
  if (!pointOnBeam(from, to, check)) return false;
  let lenA = from.dist(to);
  let lenB = from.dist(check) + check.dist(to);
  if (Math.round(lenA) == Math.round(lenB)) return true;
  else return false;
}

/** Finds out whether a point lies on a curve */
export function pointOnCurve(start, cp1, cp2, end, check) {
  if (start.sitsOn(check)) return true;
  if (end.sitsOn(check)) return true;
  let curve = new Bezier(
    { x: start.x, y: start.y },
    { x: cp1.x, y: cp1.y },
    { x: cp2.x, y: cp2.y },
    { x: end.x, y: end.y }
  );
  let intersections = curve.intersects({
    p1: { x: check.x - 1, y: check.y },
    p2: { x: check.x + 1, y: check.y }
  });
  if (intersections.length > 0) return intersections.shift();
  else return false;
}

/** Find where an (endless) line crosses a certain X-value */
export function beamCrossesX(from, to, x) {
  if (from.x === to.x) return false; // Vertical line
  let top = new Point(x, -10);
  let bottom = new Point(x, 10);

  return beamsCross(from, to, top, bottom);
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

/** Find where a curve crosses a line */
export function curveCrossesLine(from, cp1, cp2, to, start, end) {
  let intersections = [];
  let bz = new Bezier(
    { x: from.x, y: from.y },
    { x: cp1.x, y: cp1.y },
    { x: cp2.x, y: cp2.y },
    { x: to.x, y: to.y }
  );
  let line = {
    p1: { x: start.x, y: start.y },
    p2: { x: end.x, y: end.y }
  };
  for (let t of bz.intersects(line)) {
    let isect = bz.get(t);
    intersections.push(new Point(isect.x, isect.y));
  }

  if (intersections.length === 0) return false;
  else if (intersections.length === 1) return intersections[0];
  else return intersections;
}

/** Find where a curve crosses another curve */
export function curveCrossesCurve(
  fromA,
  cp1A,
  cp2A,
  toA,
  fromB,
  cp1B,
  cp2B,
  toB
) {
  let precision = 0.005; // See https://github.com/Pomax/bezierjs/issues/99
  let intersections = [];
  let curveA = new Bezier(
    { x: fromA.x, y: fromA.y },
    { x: cp1A.x, y: cp1A.y },
    { x: cp2A.x, y: cp2A.y },
    { x: toA.x, y: toA.y }
  );
  let curveB = new Bezier(
    { x: fromB.x, y: fromB.y },
    { x: cp1B.x, y: cp1B.y },
    { x: cp2B.x, y: cp2B.y },
    { x: toB.x, y: toB.y }
  );

  for (let tvalues of curveA.intersects(curveB, precision)) {
    let intersection = curveA.get(tvalues.substr(0, tvalues.indexOf("/")));
    intersections.push(new Point(intersection.x, intersection.y));
  }

  if (intersections.length === 0) return false;
  else if (intersections.length === 1) return intersections.shift();
  else {
    let unique = [];
    for (let i of intersections) {
      let dupe = false;
      for (let u of unique) {
        if (i.sitsRoughlyOn(u)) dupe = true;
      }
      if (!dupe) unique.push(i);
    }
    return unique;
  }
}
