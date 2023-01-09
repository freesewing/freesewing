---
title: Point.shiftFractionTowards()
---

The `Point.shiftFractionTowards()` method returns a new `Point` that is shifted
towards the `target` by a `fraction` of the distance between this point and the
target.

This method accepts values larger than 1 to go beyond the target point, or
negative values to shift the point in the opposite direction.

## Signature

```js
Point point.shiftFractionTowards(Point target, float fraction)
```

## Point.shiftFractionTowards() example

<Example caption="An example of the Point.shiftFractionTowards() method">
```js
({ Point, points, Path, paths, macro, part }) => {

  points.A = new Point(90, 70).setText("Point A", "text-sm")
  points.B = new Point(10, 10).setText("Point B", "text-sm")
  points.C = points.A.shiftFractionTowards(points.B, 0.5)
    .setText(
      "Point C is point A shifted 50%\nin the direction of point B",
      "center text-sm"
    )
    .attr("data-text-lineheight", 6)

  paths.direction = new Path()
    .move(points.A)
    .line(points.B)
    .setClass("note dashed")

  macro("ld", {
    from: points.C,
    to: points.A,
    d: -10
  })

  macro("ld", {
    from: points.B,
    to: points.A,
    d: 20
  })

  return part
}
```
</Example>


## Notes

If you need to move a point by a specific distance instead of a percentage, use
[`Point.shiftTowards()`](/reference/api/point/shifttowards/) or
[`Point.shiftOutwards()`](/reference/api/point/shiftoutwards/) instead.
