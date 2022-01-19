---
title: length()
---

```js
float path.length()
```

Returns the length of the path.

<Example part="path_length">
Example of the Path.length() method
</Example>

```js
let { Point, points, Path, paths, macro } = part.shorthand();

points.A = new Point(45, 60);
points.B = new Point(10, 30);
points.BCp2 = new Point(40, 20);
points.C = new Point(90, 30);
points.CCp1 = new Point(50, -30);

paths.example = new Path()
  .move(points.A)
  .line(points.B)
  .curve(points.BCp2, points.CCp1, points.C);

macro("pd", {
  path: paths.example,
  d: -20
});

macro("pd", {
  path: new Path().move(points.B).line(points.A),
  d: 10
});

macro("pd", {
  path: new Path().move(points.B).curve(points.BCp2, points.CCp1, points.C),
  d: -10
});
```
