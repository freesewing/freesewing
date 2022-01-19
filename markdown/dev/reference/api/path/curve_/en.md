---
title: "curve_()"
---

```js
Path path.curve_(Point cp1, Point to)
```

Draws a cubic Bezier curve from the current position via two control points to a given endpoint.
However, the end control point is identical to the end point.

<Tip>

###### This method exists to save you some typing

Note that the two following calls yield the same result:

```js
.curve(point1, point2, point2)
.curve_(point1, point2)
```

So the only purpose of this method is to save your some typing;

</Tip>

<Example part="path_curve_">
Example of the Path.curve\_() method
</Example>

```js
  let { Point, points, Path, paths } = part.shorthand();

  points.from = new Point(10, 20);
  points.cp1 = new Point(40, 0);
  points.to = new Point(90, 20);

  paths.line = new Path()
    .move(points.from)
    .curve_(points.cp1, points.to)
    .attr("data-text", "Path.curve_()")
    .attr("data-text-class", "text-sm center fill-note");
```
