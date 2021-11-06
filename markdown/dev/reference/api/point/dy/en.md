---
title: Point.dy()
---

A point's `dy()` method returns the delta (in mm) along the Y-axis between this point and the point you pass it.

## Point.dy() signature

```js
float point.dy(Point point)
```

## Point.dy() example

<Example
  part="point_dy"
  caption="An example of the Point.dy() method"
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

paths.line_dx = new Path()
  .move(points.from)
  .line(points.totop)
  .attr("class", "dashed")

points.text_dy = points.totop
  .shiftFractionTowards(points.to, 0.4)
  .attr("data-text", points.from.dy(points.to)+"mm")
  .attr("data-text-class", "text-sm fill-note right")
  
paths.line_dy = new Path()
  .move(points.to)
  .line(points.totop)
  .attr("class", "dashed")
```
