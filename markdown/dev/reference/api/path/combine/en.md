---
title: Path.combine()
---

The `Path.combine()` method combines this path with one or more other paths
into a single Path instance.

Any gaps in the path (caused by move operations) will be left as-is, rather
than joined with a line.  If that's not what you want, you should use
[`Path.join()`](/reference/api/path/join) instead.

## Signature

```js
Path path.combine(path other)
```

## Examples

<Example caption="Example of the Path.combine() method">
```js
({ Point, points, Path, paths, part }) => {

  points.A1 = new Point(0, 0)
  points.A2 = new Point(60, 0)
  points.B1 = new Point(0, 10)
  points.B2 = new Point(60, 10)
  points.C1 = new Point(0, 20)
  points.C2 = new Point(60, 20)

  paths.path1 = new Path()
    .move(points.A1)
    .line(points.A2)
    .setClass("various")

  paths.path2 = new Path()
    .move(points.B1)
    .line(points.B2)
    .setClass("note")

  paths.path3 = new Path()
    .move(points.C1)
    .line(points.C2)
    .setClass("canvas")

  paths.combo = paths.path1
    .combine(paths.path2, paths.path3)
    .setClass("lining dotted")

  return part
}
```
</Example>


## Notes

`Path.combine()` method is _variadic_, so you can pass multiple paths to join
