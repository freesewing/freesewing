---
title: clone()
---

```js
Path path.clone()
```

Returns a new Path that is a deep copy of this path.

<Example part="path_clone">
Example of the Path.clone() method
</Example>

```js
let { Point, points, Path, paths } = part.shorthand();

points.A = new Point(45, 60);
points.B = new Point(10, 30);
points.BCp2 = new Point(40, 20);
points.C = new Point(90, 30);
points.CCp1 = new Point(50, -30);

paths.example = new Path()
  .move(points.A)
  .line(points.B)
  .curve(points.BCp2, points.CCp1, points.C);

paths.clone = paths.example
    .clone()
    .attr("class", "note lashed stroke-l")
    .attr("style", "stroke-opacity: 0.5");
```
