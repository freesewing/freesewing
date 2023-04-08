---
title: utils.lineIntersectsCurve()
---

The `utils.lineIntersectsCurve()` function finds the intersection between a line
segment from point `from` to point `to` and a curve described by points
`start`, `cp1`, `cp2, and `end\`.

<Warning>

This function can sometimes fail to find intersections in some curves
due to a limitation in an underlying Bézier library.
Please see [Bug #3367](https://github.com/freesewing/freesewing/issues/3367)
for more information.

</Warning>

## Signature

```js
array | false utils.lineIntersectsCurve(
  Point from,
  Point to,
  Point start,
  Point cp1,
  Point cp2,
  Point end
)
```

## Example

<Example caption="A Utils.lineIntersectsCurve() example">
```js
({ Point, points, Path, paths, Snippet, snippets, getId, utils, part }) => {

  points.A = new Point(10, 10)
  points.Acp = new Point(310, 40)
  points.B = new Point(110, 70)
  points.Bcp = new Point(-210, 40)
  points.E = new Point(20, -5)
  points.D = new Point(100, 85)
  paths.curve = new Path()
    .move(points.A)
    .curve(points.Acp, points.Bcp, points.B)
  paths.line = new Path().move(points.E).line(points.D)

  for (let p of utils.lineIntersectsCurve(
    points.D,
    points.E,
    points.A,
    points.Acp,
    points.Bcp,
    points.B
  )) {
    snippets[getId()] = new Snippet("notch", p)
  }

  return part
}
```
</Example>
