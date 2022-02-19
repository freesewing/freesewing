---
title: translate()
---

```js
Path path.translate(float deltaX, float deltaY)
```

Returns a path with
[a translate transform](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/transform#Translate)
applied.

<Example part="path_translate">
Example of the Path.translate() method
</Example>

```js
let { Point, points, Path, paths, macro } = part.shorthand();

points.A = new Point(45, 60);
points.B = new Point(10, 30);
points.BCp2 = new Point(40, 20);
points.C = new Point(90, 30);
points.CCp1 = new Point(50, -30);

paths.A = new Path()
  .move(points.A)
  .line(points.B)
  .curve(points.BCp2, points.CCp1, points.C);

paths.B = paths.A.translate(60, 30);

points.step1 = points.B.shift(0, 60);
points.step2 = points.step1.shift(-90, 30);
macro("ld", {
  from: points.B,
  to: points.step1,
  noStartMarker: true
});
macro("ld", {
  from: points.step1,
  to: points.step2,
  noStartMarker: true
});
```
