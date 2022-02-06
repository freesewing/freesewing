---
title: start()
---

```js
Point path.start()
```

Returns the Point object at the start of the path.

<Example part="path_start">
Example of the Path.start() method
</Example>

```js
let { Point, points, Path, paths, Snippet, snippets } = part.shorthand();

points.A = new Point(45, 60);
points.B = new Point(10, 30);
points.BCp2 = new Point(40, 20);
points.C = new Point(90, 30);
points.CCp1 = new Point(50, -30);

paths.example = new Path()
  .move(points.A)
  .line(points.B)
  .curve(points.BCp2, points.CCp1, points.C);

snippets.start = new Snippet("notch", paths.example.start());
```
