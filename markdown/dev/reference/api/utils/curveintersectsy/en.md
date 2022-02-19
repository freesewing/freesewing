---
title: curveIntersectsY()
---

```js
array | Point | false utils.curveIntersectsY(
  Point start, 
  Point cp1,
  Point cp2,
  Point end,
  float y)
```

Finds the point(s) where a curve intersects a given Y-value.

This is a low-level variant
of [`Path.intersectsY()`](/reference/api/path/#pathintersectsy).
Instead of a path, you describe a single curve by passing the four
points that describes it.

This returns `false` if no intersections are found,
a [Point](/reference/api/point/) object if
a single intersection is found, and an array
of [Point](/reference/api/point/) objects if
multiple intersections are found.

<Example part="utils_curveintersectsy">A Utils.curveIntersectY() example</Example>

```js
let {
  Point,
  points,
  Path,
  paths,
  utils,
  snippets,
  Snippet
} = part.shorthand();

points.start = new Point(10, 45);
points.cp1 = new Point(50, 10);
points.cp2 = new Point(0, 80);
points.end = new Point(110, 70);

paths.curve = new Path()
  .move(points.start)
  .curve(points.cp1, points.cp2, points.end);

for (let y of [40, 50]) {
  points["from" + y] = new Point(10, y);
  points["to" + y] = new Point(110, y);
  paths["line" + y] = new Path()
    .move(points["from" + y])
    .line(points["to" + y])
    .attr("class", "lining dashed");
}

snippets.i50 = new Snippet(
  "notch",
  utils.curveIntersectsY(points.start, points.cp1, points.cp2, points.end, 50)
);

for (let p of utils.curveIntersectsY(
  points.start,
  points.cp1,
  points.cp2,
  points.end,
  40
))
  snippets[p.x] = new Snippet("notch", p);
```
