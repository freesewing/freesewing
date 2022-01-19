---
title: end()
---

```js
Point path.end()
```

Returns the Point object at the end of the path.

<Example part="path_end">
Example of the Path.end() method
</Example>

```js
let { Point, points, Path, paths, Snippet, snippets } = part.shorthand();

points.A = new Point(45, 60);
points.B = new Point(10, 30);
points.BCp2 = new Point(40, 20);
points.C = new Point(90, 30);
points.CCp1 = new Point(50, -30);

paths.demo = new Path()
  .move(points.A)
  .line(points.B)
  .curve(points.BCp2, points.CCp1, points.C);

snippets.end = new Snippet("notch", paths.demo.end());
```
