---
title: Point.dx()
---

The `Point.dx()` method returns the delta (in mm) along the X-axis between this
point and the point you pass it.

## Signature

```js
float point.dx(Point point)
```

## Example

<Example caption="An example of the Point.dx() method">
```js
({ Point, points, Path, paths, units, part }) => {

  points.from = new Point(10, 10)
  points.to = new Point(76.6, 10)

  paths.line = new Path()
    .move(points.from)
    .line(points.to)
    .setClass("dotted")
    .setText(units(points.from.dx(points.to)), 'center')

  return part
}
```
</Example>
