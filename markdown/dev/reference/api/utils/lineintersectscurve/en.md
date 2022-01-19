---
title: lineIntersectsCurve()
---

```js
array | false utils.lineIntersectsCurve(
  Point from, 
  Point to, 
  Point start, 
  Point cp1, 
  Point cp2, 
  Point end
)
```

Finds the intersection between a line segment from point `from` to point `to`
and a curve described by points `start`, `cp1`, `cp2, and `end`.

<Example part="utils_lineintersectscurve">
A Utils.lineIntersectsCurve() example
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
points.E = new Point(20, -5);
points.D = new Point(100, 85);
paths.curve = new Path()
  .move(points.A)
  .curve(points.Acp, points.Bcp, points.B);
paths.line = new Path().move(points.E).line(points.D);

for (let p of utils.lineIntersectsCurve(
  points.D,
  points.E,
  points.A,
  points.Acp,
  points.Bcp,
  points.B
)) {
  snippets[part.getId()] = new Snippet("notch", p);
}
```

