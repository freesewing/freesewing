---
title: Path.join()
---

The `Path.join()` method joins this path with one or more other paths.

Any gaps in the path (caused by move operations) will be filled-in with a line.
If that's not what you want, you should use
[`Path.combine()`](/reference/api/path/combine) instead.


## Signature

```js
Path path.join(path other, bool closed = false)
```

The second argument will optionally be used to close the joined path.
By default the joined path is left unclosed.

## Examples

<Example caption="Example of the Path.join() method">
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

  paths.joint = paths.path1
    .join(paths.path2, paths.path3)
    .setClass("lining dotted")

  return part
}
```
</Example>


## Notes

- `Path.join()` is _variadic_, so you can pass multiple paths to join
- You cannot join a closed path to another path
