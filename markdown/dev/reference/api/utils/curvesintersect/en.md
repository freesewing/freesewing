---
title: utils.curvesIntersect()
---

The `utils.curvesIntersect()` function finds the intersections between two curves
described by 4 points each.

## Signature

```js
array | false utils.curvesIntersect(
  Point startA, 
  Point Cp1A,
  Point Cp2A,
  Point endA,
  Point startB, 
  Point Cp1B,
  Point Cp2B,
  Point endB)
```

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
  
  for (const p of utils.curvesIntersect(
    points.A,
    points.Acp,
    points.Bcp,
    points.B,
    points.C,
    points.Ccp,
    points.Dcp,
    points.D
  )) {
    snippets[getId()] = new Snippet("notch", p)
  }

  return part
}
```
</Example>

