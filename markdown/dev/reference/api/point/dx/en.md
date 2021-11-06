---
title: Point.dx()
---

A point's `dx()` method returns the delta (in mm) along the X-axis between this point and the point you pass it.

## Point.dx() signature

```js
float point.dx(Point point)
```

## Point.dx() example

<Example
  part="point_dx"
  caption="An example of the Point.dx() method"
/>

```js
let { Point, points, Path, paths } = part.shorthand()

points.from = new Point(10, 10)
points.to = new Point(80, 70)
    
paths.line = new Path()
  .move(points.from)
  .line(points.to)
  .attr("class", "dashed")

points.totop = points.from.shift(0,points.from.dx(points.to))

points.text_dx = points.from
  .shiftFractionTowards(points.totop, 0.6)
  .shiftFractionTowards(points.to,0.1)
  .attr("data-text", points.from.dx(points.to)+"mm")
  .attr("data-text-class", "text-sm fill-note center")

paths.line_dx = new Path()
  .move(points.from)
  .line(points.totop)
  .attr("class", "dashed")
    
paths.line_dy = new Path()
  .move(points.to)
  .line(points.totop)
  .attr("class", "dashed")
```
