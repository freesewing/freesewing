---
title: curvesIntersect()
---

```js
array | false utils.curvesIntersect(
  Point startA, 
  Point Cp1A,
  Point Cp2A,
  Point endA,
  Point startB, 
  Point Cp1B,
  Point Cp2B,
  Point endB)
```

Finds the intersections between two curves described by 4 points each.

<Example part="utils_curvesintersect">
A Utils.curvesIntersect() example
</Example>

```js
let {
  Point,
  points,
  Path,
  paths,
  Snippet,
  snippets,
  utils
} = part.shorthand();

points.A = new Point(10, 10);
points.Acp = new Point(310, 40);
points.B = new Point(110, 70);
points.Bcp = new Point(-210, 40);

points.C = new Point(20, -5);
points.Ccp = new Point(60, 300);
points.D = new Point(100, 85);
points.Dcp = new Point(70, -220);
paths.curveA = new Path()
  .move(points.A)
  .curve(points.Acp, points.Bcp, points.B);
paths.curveB = new Path()
  .move(points.C)
  .curve(points.Ccp, points.Dcp, points.D);

for (let p of utils.curvesIntersect(
  points.A,
  points.Acp,
  points.Bcp,
  points.B,
  points.C,
  points.Ccp,
  points.Dcp,
  points.D
)) {
  snippets[part.getId()] = new Snippet("notch", p);
}
```
