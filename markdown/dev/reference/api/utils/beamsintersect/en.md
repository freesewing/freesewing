---
title: utils.beamsIntersect()
---

The `utils.beamsIntersect()` function finds the intersection between two endless
lines (beams). Returns a [Point](/reference/api/point) object for the
intersection, or `false` if the lines don't intersect.

## Signature

```js
Point | false utils.beamsIntersect(
  Point A, 
  Point B, 
  Point C, 
  Point D
)
```

## Example

<Example caption="A Utils.beamIntersect() example">
```js
({ Point, points, Path, paths, Snippet, snippets, utils, part }) => {

  points.A = new Point(10, 10)
  points.B = new Point(50, 40)
  points.C = new Point(45, 20)
  points.D = new Point(60, 15)

  paths.AB = new Path().move(points.A).line(points.B)
  paths.CD = new Path().move(points.C).line(points.D)

  snippets.x = new Snippet(
    "notch",
    utils.beamsIntersect(points.A, points.B, points.C, points.D)
  )

  return part
}
```
</Example>

