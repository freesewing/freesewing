---
title: utils.curveIntersectsY()
---

The `utils.curveIntersectsY()` function finds the point(s) where a curve
intersects a given Y-value.

<Warning>

This function can sometimes fail to find intersections in some curves
due to a limitation in an underlying Bézier library.
Please see [Bug #3367](https://github.com/freesewing/freesewing/issues/3367)
for more information.

</Warning>

## Signature

```js
array | Point | false utils.curveIntersectsY(
  Point start,
  Point cp1,
  Point cp2,
  Point end,
  float y)
```

This returns `false` if no intersections are found,
a [Point](/reference/api/point/) object if
a single intersection is found, and an array
of [Point](/reference/api/point/) objects if
multiple intersections are found.


## Example
<Example caption="A Utils.curveIntersectY() example">
```js
({ Point, points, Path, paths, Snippet, snippets, utils, part }) => {

  points.start = new Point(10, 45)
  points.cp1 = new Point(50, 10)
  points.cp2 = new Point(0, 80)
  points.end = new Point(110, 70)

  paths.curve = new Path()
    .move(points.start)
    .curve(points.cp1, points.cp2, points.end)

  for (let y of [40, 50]) {
    points["from" + y] = new Point(10, y)
    points["to" + y] = new Point(110, y)
    paths["line" + y] = new Path()
      .move(points["from" + y])
      .line(points["to" + y])
      .addClass("lining dashed")
  }

  snippets.i50 = new Snippet(
    "notch",
    utils.curveIntersectsY(points.start, points.cp1, points.cp2, points.end, 50)
  )

  for (let p of utils.curveIntersectsY(
    points.start,
    points.cp1,
    points.cp2,
    points.end,
    40
  ))
  snippets[p.x] = new Snippet("notch", p)

  return part
}
```
</Example>

## Notes

This is a low-level (and faster) variant
of [`Path.intersectsY()`](/reference/api/path/intersectsy).
Instead of a path, you describe a single curve by passing the four
points that describes it.
