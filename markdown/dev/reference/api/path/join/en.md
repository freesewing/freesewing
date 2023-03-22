---
title: Path.join()
---

The `Path.join()` method joins this path with another path.


## Signature

```js
Path path.join(path other)
```

## Examples

<Example caption="Example of the Path.join() method">
```js
({ Point, points, Path, paths, part }) => {

  points.A = new Point(45, 60)
  points.B = new Point(10, 30)
  points.BCp2 = new Point(40, 20)
  points.C = new Point(90, 30)
  points.CCp1 = new Point(50, -30)

  paths.path1 = new Path()
    .move(points.A)
    .line(points.B)
    .setClass("various")

  paths.path2 = new Path()
    .move(points.B)
    .curve(points.BCp2, points.CCp1, points.C)
    .setClass("note")

  paths.joint = paths.path1
    .join(paths.path2)
    .setClass("lining dotted")

  return part
}
```
</Example>


## Notes

You cannot join a closed path to another path
