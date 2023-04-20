---
title: utils.curveIntersectsX()
---

The `utils.curveIntersectsX()` function finds the point(s) where a curve
intersects a given X-value.

<Warning>

This function can sometimes fail to find intersections in some curves
due to a limitation in an underlying Bézier library.
Please see [Bug #3367](https://github.com/freesewing/freesewing/issues/3367)
for more information.

</Warning>

## Signature

```js
array | Point | false utils.curveIntersectsX(
  Point start,
  Point cp1,
  Point cp2,
  Point end,
  float x)
```

This returns `false` if no intersections are found,
a [Point](/reference/api/point) object if
a single intersection is found, and an array
of [Point](/reference/api/point) objects if
multiple intersections are found.

## Example

<Example caption="A Utils.curveIntersectX() example">
```js
({ Point, points, Path, paths, Snippet, snippets, utils, part }) => {

  points.start = new Point(10, 15)
  points.cp1 = new Point(80, 10)
  points.cp2 = new Point(-50, 80)
  points.end = new Point(110, 70)

  paths.curve = new Path()
    .move(points.start)
    .curve(points.cp1, points.cp2, points.end)

  for (let x of [30, 40]) {
    points["from" + x] = new Point(x, 10)
    points["to" + x] = new Point(x, 80)
    paths["line" + x] = new Path()
      .move(points["from" + x])
      .line(points["to" + x])
      .addClass("lining dashed")
  }

  snippets.i40 = new Snippet(
    "notch",
    utils.curveIntersectsX(points.start, points.cp1, points.cp2, points.end, 40)
  )

  for (let p of utils.curveIntersectsX(
    points.start,
    points.cp1,
    points.cp2,
    points.end,
    30
  ))
  snippets[p.y] = new Snippet("notch", p)

  return part
}
```
</Example>


## Notes

This is a low-level (and faster) variant
of [`Path.intersectsX()`](/reference/api/path/intersectsx).
Instead of a path, you describe a single curve by passing the four
points that describes it.
