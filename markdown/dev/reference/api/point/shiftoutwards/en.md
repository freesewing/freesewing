---
title: Point.shiftOutwards()
---

The `Point.shiftOutwards()` method returns a new `Point` that is shifted
`distance` (mm) beyond the `target` in the direction of the target point.

## Signature

```js
Point point.shiftOutwards(Point target, float distance)
```

## Example

<Example caption="An example of the Point.shiftOutwards() method">
```js
({ Point, points, Path, paths, macro, part }) => {

  points.A = new Point(90, 70).setText("Point A", "text-sm right")
  points.B = new Point(10, 10).setText("Point B", "text-sm")
  points.C = points.A.shiftOutwards(points.B, 30)
    .setText("Point C is point A shifted 3 cm\nbeyond point B", "text-sm")
    .attr("data-text-lineheight", 6)

  paths.direction = new Path()
    .move(points.A)
    .line(points.C)
    .addClass("note dashed")

  macro("ld", {
    from: points.C,
    to: points.B,
    d: -10
  })

  return part
}
```
</Example>
