---
title: utils.pointOnCurve()
---

The `utils.pointOnCurve()` function returns `true` if the point `check` lies on a
curve described by points `start`, `cp1`, `cp2`, and `end`.

## Signature

```js
bool utils.pointOnCurve(
  Point start, 
  Point cp1, 
  Point cp2, 
  Point end, 
  Point check
)
```

## Example

<Example caption="A Utils.pointOnCurve() example">
```js
({ Point, points, Path, paths, Snippet, snippets, getId, utils, part }) => {

  points.start = new Point(10, 10)
  points.cp1 = new Point(90, 10)
  points.cp2 = new Point(10, 60)
  points.end = new Point(90, 60)
  
  const scatter = []
  for (let i = 1; i < 19; i++) {
    for (let j = 1; j < 14; j++) {
      scatter.push(new Point(i * 10, j * 10))
    }
  }
  let snippet
  for (let point of scatter) {
    if (
      utils.pointOnCurve(
        points.start,
        points.cp1,
        points.cp2,
        points.end,
        point
      )
    ) {
      snippet = "notch"
    } else snippet = "bnotch"
    snippets[getId()] = new Snippet(snippet, point)
  }
  paths.curve = new Path()
    .move(points.start)
    .curve(points.cp1, points.cp2, points.end)
    .addClass("fabric stroke-lg")

  return part
}
```
</Example>


## Notes

Keep in mind that calculations with Bézier curves are often approximations.
