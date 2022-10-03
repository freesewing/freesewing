---
title: utils.pointOnLine()
---

The `utils.pointOnLine()` function returns `true` if the point `check` lies on a
line segment from point `from` to point `to`.

## Signature

```js
bool utils.pointOnLine(
  Point from, 
  Point to, 
  Point check, 
  float precision = 1e6
)
```

The fourth parameter controls the precision. 
See [pointOnBeam](/reference/api/utils/pointonbeam).

## Example

<Example caption="A Utils.pointOnLine() example">
```js
({ Point, points, Path, paths, Snippet, snippets, getId, utils, part }) => {

  points.from1 = new Point(10, 10)
  points.to1 = new Point(90, 60)
  points.from2 = new Point(10, 30)
  points.to2 = new Point(90, 80)
  points.b1 = new Point(170, 110)
  points.b2 = new Point(170, 130)
  
  const scatter = []
  for (let i = 1; i < 36; i++) {
    for (let j = 1; j < 27; j++) {
      scatter.push(new Point(i * 10, j * 10))
    }
  }
  let snippet
  for (let point of scatter) {
    if (utils.pointOnLine(points.from1, points.to1, point)) snippet = "notch"
    else snippet = "bnotch"
    snippets[getId()] = new Snippet(snippet, point)
    if (utils.pointOnLine(points.from2, points.to2, point, 0.01)) {
      snippet = "notch"
    } else snippet = "bnotch"
    snippets[getId()] = new Snippet(snippet, point)
  }
  paths.line1 = new Path()
    .move(points.from1)
    .line(points.to1)
    .addClass("fabric stroke-lg")
  paths.lne1 = new Path()
    .move(points.to1)
    .line(points.b1)
    .addClass("fabric dashed")
  paths.line2 = new Path()
    .move(points.from2)
    .line(points.to2)
    .addClass("fabric stroke-lg")
  paths.lne2 = new Path()
    .move(points.to2)
    .line(points.b2)
    .addClass("fabric dashed")

  return part
}
```
</Example>

