---
title: Path.line()
---

The `Path.line()` method draws a straight line from the current position to a
given point.

## Signature

```js
Path path.line(Point to)
```

<Tip compact>This method is chainable as it returns the `Path` object</Tip>

## Example

<Example caption="Example of the Path.line() method">
```js
({ Point, points, Path, paths, part }) => {

  points.from = new Point(10, 10)
  points.to = new Point(90, 10)

  paths.line = new Path()
    .move(points.from)
    .line(points.to)
    .setText("Path.line()", "text-sm center fill-note")

  return part
}
```
</Example>
