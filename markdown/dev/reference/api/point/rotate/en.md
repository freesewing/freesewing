---
title: rotate()
---

```js
Point point.rotate(float angle, Point center)
``` 

Rotates a point the number of degrees you pass it around the point you pass it.

<Example 
  part="point_rotate"
  caption="An example of the Point.rotate() method"
/>

```js
let { Point, points, Path, paths, Snippet, snippets } = part.shorthand();

points.sun = new Point(40, 40);
points.moon = new Point(70, 40);
let step = 360 / 36;
for (let i = 1; i < 37; i++) {
  let angle = step * i;
  points[`moon${i}`] = points.moon.rotate(angle, points.sun);
  paths[`moon${i}`] = new Path().move(points.sun).line(points[`moon${i}`]);
}
```
