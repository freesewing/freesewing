import point from "./point";

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
    measurements: part.context.settings.measurements || {},
    options: part.context.options || {},
    values: part.context.values || {},
    points: part.points || {},
    paths: part.paths || {},
    snippets: part.snippets || {},
    macro: part.macroRunner(),
    final,
    paperless
  };
}
/** Offsets a line by distance */
export function offsetLine(from, to, distance) {
  if (from.x === to.x && from.y === to.y) {
    throw "Cannot offset line that starts and ends in the same point";
  }

  let angle = from.angle(to) + 90;
  console.log("offsetting line from", from, "to", to, "angle is", angle);
  return {
    from: from.shift(angle, distance),
    to: to.shift(angle, distance)
  };
}

/** Offsets a path by distance */
export function pathOffset(path, distance) {
  let offset = [];
  let current;
  for (let i in path.ops) {
    let op = path.ops[i];
    if (op.type === "line") {
      offset.push(offsetLine(current, op.to, distance));
    } else if (op.type === "curve") {
      //offset.push(utils.offsetLine(current, op.to);
    }
    current = op.to;
  }
  //let orig = new Bezier(
  console.log(offset);
}
