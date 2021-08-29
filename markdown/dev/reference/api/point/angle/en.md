---
title: angle()
---

```js
float point.angle(Point point)
``` 

Returns the angle made by a line from this point to the point you pass it.

<Example 
  part="point_angle"
  caption="An example of the Point.angle() method"
/>

```js
let { Point, points, Path, paths } = part.shorthand();

points.sun = new Point(10, 5);
points.moon = points.sun.shift(-15, 70);
points.text = points.sun
  .shiftFractionTowards(points.moon, 0.8)
  .attr("data-text", points.sun.angle(points.moon)+"°")
  .attr("data-text-class", "text-sm fill-note center");

paths.line = new Path()
  .move(points.sun)
  .line(points.moon)
  .attr("class", "dashed");
```

