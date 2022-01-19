---
title: close()
---

```js
Path path.close()
```

Closes a path by drawing a straight line from the current position to the path's start.

<Example part="path_close">
Example of the Path.close() method
</Example>

```js
let { Point, points, Path, paths } = part.shorthand();

points.from = new Point(10, 20);
points.cp2 = new Point(60, 30);
points.to = new Point(90, 20);

paths.line = new Path()
  .move(points.from)
  ._curve(points.cp2, points.to)
  .close()
  .reverse() // To keep text from being upside-down
  .attr("data-text", "Path._close()")
  .attr("data-text-class", "text-sm right fill-note");
```

