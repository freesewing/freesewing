---
title: line()
---

```js
Path path.line(Point to)
```

Draws a straight line from the current position to a given point.

<Example part="path_line">
Example of the Path.line() method
</Example>

```js
let { Point, points, Path, paths } = part.shorthand();

points.from = new Point(10, 10);
points.to = new Point(90, 10);

paths.line = new Path()
  .move(points.from)
  .line(points.to)
  .attr("data-text", "Path.line()")
  .attr("data-text-class", "text-sm center fill-note");
```
