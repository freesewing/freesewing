---
title: utils.curvesIntersect()
---

The `utils.curvesIntersect()` function finds the intersections between two curves
described by 4 points each.

<Warning>

This function can sometimes fail to find intersections in some curves
due to a limitation in an underlying Bézier library.
Please see [Bug #3367](https://github.com/freesewing/freesewing/issues/3367)
for more information.

</Warning>

## Signature

```js
array | Point | false utils.curvesIntersect(
  Point startA,
  Point Cp1A,
  Point Cp2A,
  Point endA,
  Point startB,
  Point Cp1B,
  Point Cp2B,
  Point endB)
```

This returns `false` if no intersections are found,
a [Point](/reference/api/point) object if
a single intersection is found, and an array
of [Point](/reference/api/point) objects if
multiple intersections are found.

## Example

<Example caption="A Utils.curvesIntersect() example">
```js
({ Point, points, Path, paths, Snippet, snippets, utils, getId, part }) => {

  points.A = new Point(10, 10)
  points.Acp = new Point(310, 40)
  points.B = new Point(110, 70)
  points.Bcp = new Point(-210, 40)

  points.C = new Point(20, -5)
  points.Ccp = new Point(60, 300)
  points.D = new Point(100, 85)
  points.Dcp = new Point(70, -220)
  paths.curveA = new Path()
    .move(points.A)
    .curve(points.Acp, points.Bcp, points.B)
  paths.curveB = new Path()
    .move(points.C)
    .curve(points.Ccp, points.Dcp, points.D)

  const intersections = utils.curvesIntersect(
    points.A,
    points.Acp,
    points.Bcp,
    points.B,
    points.C,
    points.Ccp,
    points.Dcp,
    points.D
    )

  if (intersections) {
    if (intersections instanceof Array) {
      for (const p of intersections)
        snippets[getId()] = new Snippet('notch', p)
    } else {
      snippets[getId()] = new Snippet('notch', intersections)
    }
  }

  return part
}
```
</Example>
