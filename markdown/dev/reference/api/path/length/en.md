---
title: Path.length()
---

The `Path.length()` method returns the length of the path.

## Signature

```js
float path.length()
```

## Example

<Example caption="Example of the Path.length() method">
```js
({ Point, points, Path, paths, macro, utils, part }) => {

  points.A = new Point(45, 60)
  points.B = new Point(10, 30)
  points.BCp2 = new Point(40, 20)
  points.C = new Point(90, 30)
  points.CCp1 = new Point(50, -30)

  paths.AB = new Path()
    .move(points.A)
    .line(points.B)

  paths.BC = new Path()
    .move(points.B)
    .curve(points.BCp2, points.CCp1, points.C)

  const lengthAB = paths.AB.length()
  const lengthBC = paths.BC.length()

  paths.AB.addText(utils.round(lengthAB) + " mm")
  paths.BC.addText(utils.round(lengthBC) + " mm")

  return part
}
```
</Example>
