---
title: Path.length()
---

The `Path.length()` method returns the length of the path.

## Signature

```js
float path.length(bool withMoves = false)
```

## Example

<Example caption="Example of the Path.length() method">
```js
({ Point, points, Path, paths, units, part }) => {

  points.A1 = new Point(0, 0)
  points.A2 = new Point(160, 0)
  points.B1 = new Point(0, 10)
  points.B2 = new Point(160, 10)
  points.C1 = new Point(0, 20)
  points.C2 = new Point(160, 20)

  paths.path1 = new Path()
    .move(points.A1)
    .line(points.A2)
    .move(points.B1)
    .line(points.B2)
    .move(points.C1)
    .line(points.C2)
    .setClass("various")

  points.label1 = new Point(25, 8).addText('Total length = ' + units(paths.path1.length()))
  points.label2 = new Point(25, 18).addText('Total length with moves = ' + units(paths.path1.length(true)))


  return part
}
```
</Example>

## Notes

By default, `Path.length()` will measure the combined length of all drawing operations in the Path, but skip
over gaps in the path (caused by move operations). 
If you want the full length of the Path, including move operations, pass `true` to `Path.length()`.

