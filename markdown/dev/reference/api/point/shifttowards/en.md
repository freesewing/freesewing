---
title: Point.shiftTowards()
---

The `Point.shiftTowards()` method returns a new `Point` that is shifted
`distance` (mm) in the direction of the `target`.

## Signature

```js
Point point.shiftTowards(Point target, float distance)
```

## Example

<Example caption="An example of the Point.shiftTowards() method">
```js
({ Point, points, Path, paths, macro, part }) => {

  points.A = new Point(90, 70).setText("Point A", "right text-sm")
  points.B = new Point(10, 10).setText("Point B", "text-sm")
  points.C = points.A.shiftTowards(points.B, 35)
    .setText("Point C is point A shifted 3.5 cm\nin the direction of point B", "center, text-sm")
    .attr("data-text-lineheight", 6)

  paths.direction = new Path()
    .move(points.A)
    .line(points.B)
    .addClass("note dashed")

  macro("ld", {
    from: points.C,
    to: points.A,
    d: -10
  })

  return part
}
```
</Example>


## Notes

If you need to move a point a percentage instead of a specific distance, use
[`Point.shiftFractionTowards()`](/reference/api/point/shiftfractiontowards/)
instead.
