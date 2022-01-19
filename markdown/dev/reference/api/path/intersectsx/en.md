---
title: intersectsX()
---

```js
array|false path.intersectsX(float x)
```

Returns the Point object(s) where the path intersects with a given X-value.

<Example part="path_intersectsx">
Example of the Path.intersectsX() method
</Example>

```js
let { Point, points, Path, paths, Snippet, snippets } = part.shorthand();

points.A = new Point(95, 50);
points.B = new Point(10, 30);
points.BCp2 = new Point(40, 20);
points.C = new Point(90, 30);
points.CCp1 = new Point(50, -30);
points.D = new Point(50, 130);
points.DCp1 = new Point(150, 30);

points.top = new Point(60, -10);
points.bot = new Point(60, 140);

paths.line = new Path()
  .move(points.top)
  .line(points.bot)
  .attr("class", "lining dashed");

paths.demo = new Path()
  .move(points.A)
  .line(points.B)
  .curve(points.BCp2, points.CCp1, points.C)
  .curve(points.DCp1, points.DCp1, points.D);

for (let p of paths.demo.intersectsX(60)) {
  snippets[part.getId()] = new Snippet("notch", p);
}
```
