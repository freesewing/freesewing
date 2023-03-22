---
title: Point.dy()
---

The `Point.dy()` method returns the delta (in mm) along the Y-axis between this
point and the point you pass it.

## Signature

```js
float point.dy(Point point)
```

## Example

<Example caption="An example of the Point.dy() method">
```js
({ Point, points, Path, paths, units, part }) => {

  points.from = new Point(10, 40)
  points.to = new Point(10, 10)

  paths.line = new Path()
    .move(points.from)
    .line(points.to)
    .setClass("dotted")
    .setText(units(points.from.dy(points.to)), 'center')

  // Prevents clipping
  paths.diag = new Path()
    .move(new Point(-10,40))
    .move(new Point(60,10))

  return part
}
```
</Example>
