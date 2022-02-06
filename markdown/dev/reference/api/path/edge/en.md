---
title: edge()
---

```js
Point path.edge(string side)
```

Returns the Point object at the edge of the path you specify. Edge must be one of:

 - `top`
 - `bottom`
 - `left`
 - `right`
 - `topLeft`
 - `topRight`
 - `bottomLeft`
 - `bottomRight`

<Example part="path_edge">
Example of the Path.edge() method
</Example>

```js
let { Point, points, Path, paths, Snippet, snippets } = part.shorthand();

points.A = new Point(45, 60);
points.B = new Point(10, 30);
points.BCp2 = new Point(40, 20);
points.C = new Point(90, 30);
points.CCp1 = new Point(50, -30);
points.D = new Point(-60, 90);
points.E = new Point(90, 190);

paths.demo = new Path()
  .move(points.A)
  .line(points.B)
  .curve(points.BCp2, points.CCp1, points.C)
  .curve(points.E, points.D, points.A)
  .close();

for (let i of [
  "topLeft",
  "topRight",
  "bottomLeft",
  "bottomRight",
  "top",
  "left",
  "bottom",
  "right"
]) snippets[i] = new Snippet("notch", paths.demo.edge(i));
```

