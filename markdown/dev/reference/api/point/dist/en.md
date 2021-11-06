---
title: Point.dist()
---

A point's `dist()` method returns the distance (in mm) between this point and the point you pass it.

## Point.dist() signature

```js
float point.dist(Point point)
```

## Point.dist() example

<Example
  part="point_dist"
  caption="An example of the Point.dist() method"
/>

```js
let { Point, points, Path, paths } = part.shorthand()

points.from = new Point(10, 10)
points.to = new Point(80, 70)

points.text = points.from
  .shiftFractionTowards(points.to, 0.6)
  .attr('data-text', points.from.dist(points.to) + 'mm')
  .attr('data-text-class', 'text-sm fill-note center')

paths.line = new Path()
  .move(points.from)
  .line(points.to)
  .attr('class', 'dashed')

return part
```
