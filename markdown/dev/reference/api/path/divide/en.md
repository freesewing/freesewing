---
title: divide()
---

```js
array path.divide()
```

Breaks a path apart in an array of atomic paths. An atomic path is a path that can't be divided further and is
always made up of one move + one drawing operation.

<Example part="path_divide">
Example of the Path.divide() method
</Example>

```js
let { Point, points, Path, paths } = part.shorthand();

points.A = new Point(55, 40);
points.B = new Point(10, 70);
points.BCp2 = new Point(40, 20);
points.C = new Point(90, 60);
points.CCp1 = new Point(50, -30);
points.D = new Point(50, 80);
points.DCp1 = new Point(140, 50);

paths.example = new Path()
  .move(points.A)
  .line(points.B)
  .curve(points.BCp2, points.CCp1, points.C)
  .curve(points.DCp1, points.DCp1, points.D)
  .close();

let style = "stroke-width: 4; stroke-opacity: 0.5;";
let i = 0;
for (let p of paths.example.divide()) {
  i++;
  paths[i] = p
    .attr("style", style)
    .attr("style", `stroke: hsl(${i * 70}, 100%, 50%)`);
}
```
