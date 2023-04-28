---
title: utils.beamIntersectsCurve()
---

The `utils.beamIntersectsCurve()` function finds the intersection between an endless
line and a curve described by points
`start`, `cp1`, `cp2, and `end\`.

<Warning>

This function can sometimes fail to find intersections in some curves
due to a limitation in an underlying Bézier library.
Please see [Bug #3367](https://github.com/freesewing/freesewing/issues/3367)
for more information.

</Warning>

## Signature

```js
array | false utils.beamIntersectsCurve(
  Point from,
  Point to,
  Point start,
  Point cp1,
  Point cp2,
  Point end
)
```

## Example

<Example caption="A Utils.beamIntersectsCurve() example">
```js
({ Point, points, Path, paths, Snippet, snippets, getId, utils, part }) => {

  points.A = new Point(10, 10)
  points.Acp = new Point(10, 40)
  points.B = new Point(110, 70)
  points.Bcp = new Point(110, 40)
  points.E = new Point(50, 14)
  points.D = new Point(55, 16)
  paths.curve = new Path()
    .move(points.A)
    .curve(points.Acp, points.Bcp, points.B)
  paths.line = new Path().move(points.E).line(points.D)

  for (let p of utils.beamIntersectsCurve(
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
