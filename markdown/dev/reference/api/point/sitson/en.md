---
title: Point.sitsOn()
---

The `Point.sitsOn()` method returns `true` if this point has the _exact_ same
coordinates as the point you pass to it.

## Signature

```js
bool point.sitsOn(Point check)
```

## Example

<Example caption="An example of the Point.sitsOn() method">
```js
({ Point, points, Path, paths, Snippet, snippets, part }) => {

  let s
  for (let i = 0; i < 10; i++) {
    points[`a${i}`] = new Point(i * 10, 40)
    points[`b${i}`] = new Point(i * 10, i * 8)
    if (points[`a${i}`].sitsOn(points[`b${i}`])) s = "notch"
    else s = "bnotch"
    snippets[`b${i}`] = new Snippet(s, points[`b${i}`])
    snippets[`a${i}`] = new Snippet(s, points[`a${i}`])
  }

  // Prevent clipping
  paths.diag = new Path()
    .move(new Point(0,0))
    .move(new Point(90,70))

  return part
}
```
</Example>

## Notes

This method uses strict comparison. So points with an X-coordinate of `10` and
`10.0001` are considered to be different.

To check if two points have the same coordinates rounded to the nearest
millimeter, use [`Point.sitsRoughlyOn()`](/reference/api/point/sitsroughlyon/)
instead.
