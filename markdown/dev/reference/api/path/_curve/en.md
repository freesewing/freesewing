---
title: "_curve()"
---

```js
Path path._curve(Point cp2, Point to)
```

Draws a cubic Bezier curve from the current position via two control points to a given endpoint.
However, the start control point is identical to the start point.

<Tip>

###### This method exists to save you some typing

Note that the two following calls yield the same result:

```js
.curve(point1, point1, point2)
._curve(point1, point2)
```

So the only purpose of this method is to save your some typing.

</Tip>

<Example part="path__curve">
Example of the Path.\_curve() method
</Example>

```js
  let { Point, points, Path, paths } = part.shorthand();

  points.from = new Point(5, 20);
  points.cp2 = new Point(60, 30);
  points.to = new Point(90, 20);

  paths.line = new Path()
    .move(points.from)
    ._curve(points.cp2, points.to)
    .attr("data-text", "Path._curve()")
    .attr("data-text-class", "text-sm center fill-note");
```
