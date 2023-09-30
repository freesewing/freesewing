---
title: utils.linesIntersect()
---

The `utils.linesInersect()` function finds the intersection between two line
segments. Returns a [Point](../point) object for the intersection, or `false`
if the lines don't intersect.

## Signature

```js
Point | false utils.linesIntersect(
  Point A, 
  Point B, 
  Point C, 
  Point D
)
```

## Example

<Example caption="A Utils.linesIntersect() example">
```js
({ Point, points, Path, paths, Snippet, snippets, utils, part }) => {

  points.A = new Point(10, 10)
  points.B = new Point(50, 40)
  points.C = new Point(15, 30)
  points.D = new Point(60, 15)
  
  paths.AB = new Path().move(points.A).line(points.B)
  paths.CD = new Path().move(points.C).line(points.D)
  
  snippets.X = new Snippet(
    "notch",
    utils.linesIntersect(points.A, points.B, points.C, points.D)
  )

  return part
}
```
</Example>

