---
title: beamIntersectsY()
---

```js
Point | false utils.beamIntersectsY(Point A, Point B, float Y)
```

Finds the intersection between an endless line and a given Y-value. Returns a [Point](#point) object
for the intersection, or `false` there is no intersection.

<Example part="utils_beamintersectsy">
A Utils.beamIntersectsY() example
</Example>

```js
let {
  Point,
  points,
  Path,
  paths,
  Snippet,
  snippets,
  utils
} = part.shorthand();

points.A = new Point(10, 10);
points.B = new Point(50, 40);

paths.AB = new Path().move(points.A).line(points.B);

snippets.x = new Snippet("notch", utils.beamIntersectsY(points.A, points.B, 30));

paths.help = new Path()
  .move(new Point(0, 30))
  .line(new Point(50, 30))
  .attr("class", "note dashed");
```
