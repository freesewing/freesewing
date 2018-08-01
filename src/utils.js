import point from "./point";
import path from "./path";
import Bezier from "bezier-js";

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
    return new point(a1.x, slopeB * a1.x + (b1.y - slopeB * b1.x));
  // Vertical line A
  else if (b1.x === b2.x)
    return new point(b1.x, slopeA * b1.x + (a1.y - slopeA * a1.x));
  // Vertical line B
  else {
    // Swap points if line A or B goes from right to left
    if (a1.x > a2.x) {
      let tmp = a1.copy();
      a1 = a2.copy();
      a2 = tmp;
    }
    if (b1.x > b2.x) {
      let tmp = b1.copy();
      b1 = b2.copy();
      b2 = tmp;
    }
    // Find y intercept
    let iA = a1.y - slopeA * a1.x;
    let iB = b1.y - slopeB * b1.x;

    // Find intersection
    let x = (iB - iA) / (slopeA - slopeB);
    let y = slopeA * x + iA;

    return new point(x, y);
  }
}

/** Find intersection of two line segments */
export function linesCross(a1, a2, b1, b2) {
  let p = beamsCross(a1, a2, b1, b2);
  if (p) {
    let lenA = a1.dist(a2);
    let lenB = b1.dist(b2);
    let lenC = a1.dist(p) + p.dist(a2);
    let lenD = b1.dist(p) + p.dist(b2);
    if (round(lenA) == round(lenC) && round(lenB) == round(lenD)) return p;
  }
  return false;
}

/** Find where an (endless) line crosses a certain Y-value */
export function beamCrossesY(from, to, y) {
  if (from.y === to.y) return false; // Horizontal line
  let left = new point(-10, y);
  let right = new point(10, y);

  return beamsCross(from, to, left, right);
}

/** Returns an object with shorthand access for pattern design */
export function shorthand(part) {
  let final = part.context.settings.mode === "draft" ? true : false;
  let paperless = part.context.settings.paperless === true ? true : false;
  return {
    sa: part.context.settings.sa || 0,
    measurements: part.context.settings.measurements || {},
    options: part.context.options || {},
    values: part.context.values || {},
    points: part.points || {},
    paths: part.paths || {},
    snippets: part.snippets || {},
    macro: part.macroRunner(),
    point: part.point,
    path: part.path,
    snippet: part.snippet,
    final,
    paperless
  };
}

/** Offsets a path by distance */
export function pathOffset(path, distance) {
  let offset = [];
  let current;
  let start = false;
  let closed = false;
  for (let i in path.ops) {
    let op = path.ops[i];
    if (op.type === "line") {
      offset.push(offsetLine(current, op.to, distance));
    } else if (op.type === "curve") {
      let b = new Bezier(
        { x: current.x, y: current.y },
        { x: op.cp1.x, y: op.cp1.y },
        { x: op.cp2.x, y: op.cp2.y },
        { x: op.to.x, y: op.to.y }
      );
      for (let bezier of b.offset(distance)) {
        offset.push(asPath(bezier));
      }
    } else if (op.type === "close") {
      //    offset.push(offsetLine(current, start, distance));
      closed = true;
    }
    if (op.to) current = op.to;
    if (!start) start = current;
  }

  return joinPaths(offset, closed);
}

/** Offsets a line by distance */
export function offsetLine(from, to, distance) {
  if (from.x === to.x && from.y === to.y) {
    throw "Cannot offset line that starts and ends in the same point";
  }
  let angle = from.angle(to) - 90;

  return new path()
    .move(from.shift(angle, distance))
    .line(to.shift(angle, distance));
}

/** Converts a bezier-js instance to a path */
export function asPath(bezier) {
  return new path()
    .move(new point(bezier.points[0].x, bezier.points[0].y))
    .curve(
      new point(bezier.points[1].x, bezier.points[1].y),
      new point(bezier.points[2].x, bezier.points[2].y),
      new point(bezier.points[3].x, bezier.points[3].y)
    );
}

/** Joins path segments together into one path */
export function joinPaths(paths, closed = false) {
  let joint = new path().move(paths[0].ops[0].to);
  for (let p of paths) {
    for (let op of p.ops) {
      if (op.type === "curve") {
        joint.curve(op.cp1, op.cp2, op.to);
      } else if (op.type !== "close") {
        joint.line(op.to);
      } else {
        throw "Close op not handled";
      }
    }
  }
  if (closed) joint.close();

  return joint;
}

/** Convert value in mm to cm or imperial units */
export function units(value, to = "metric") {
  if (to === "imperial") return round(value / 25.4) + '"';
  else return round(value / 10) + "cm";
}

/** Rounds a value to 2 decimals */
export function round(value) {
  return Math.round(value * 1e2) / 1e2;
}
