---
title: Point.rotate()
---

A point's `rotate()` method returns a new `Point` that has been rotated by `angle` degrees
around the point (`center`) that you pass it.

Just like the result of the [`Point.angle()`](reference/api/point/angle/) method, an angle of 0° points right, and the angle increases counterclockwise.

## Point.rotate() signature

```js
Point point.rotate(float angle, Point center)
```

## Point.rotate() example

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
