---
title: Point.dist()
---

The `Point.dist()` method returns the distance (in mm) between this point and
the point you pass it.

## Signature

```js
float point.dist(Point point)
```

## Example

<Example caption="An example of the Point.dist() method">
```js
({ Point, points, Path, paths, units, part }) => {

  points.from = new Point(10, 10)
  points.to = new Point(80, 70)

  points.text = points.from
    .shiftFractionTowards(points.to, 0.6)
    .setText(units(points.from.dist(points.to)), 'text-sm fill-note center')

  paths.line = new Path()
    .move(points.from)
    .line(points.to)
    .setClass('dashed')

  return part
}
```
</Example>
