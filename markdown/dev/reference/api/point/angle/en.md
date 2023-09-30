---
title: Point.angle()
---

The `Point.angle()` method returns the angle (in degrees) between this point
and the point passed into the method. An angle of 0° points to the right, and
the angle increases counterclockwise.

## Signature

```js
float point.angle(Point pointB)
```

## Example

<Example caption="An example of the Point.angle() method">
```js
({ Point, points, Path, paths, part }) => {

  points.sun = new Point(10, 5)
  points.moon = points.sun.shift(-15, 70)
  points.text = points.sun
    .shiftFractionTowards(points.moon, 0.8)
    .setText(
      points.sun.angle(points.moon)+"°",
      "text-sm fill-note center"
    )

  paths.line = new Path()
    .move(points.sun)
    .line(points.moon)
    .setClass("dashed")

  return part
}
```
</Example>
