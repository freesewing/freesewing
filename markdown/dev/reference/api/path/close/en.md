---
title: Path.close()
---

The `Path.close()` method closes a path by drawing a straight line from the current position to the path's start.

## Signature

```js
Path path.close()
```

<Tip compact>This method is chainable as it returns the `Path` object</Tip>

## Example

<Example caption="Example of the Path.close() method">
```js
({ Point, points, Path, paths, part }) => {

  points.from = new Point(10, 20)
  points.cp2 = new Point(60, 30)
  points.to = new Point(90, 20)

  paths.line = new Path()
    .move(points.from)
    ._curve(points.cp2, points.to)
    .close()
    .reverse() // To keep text from being upside-down
    .setText('Path._close()', 'text-sm right fill-note')

  return part
}
```
</Example>
