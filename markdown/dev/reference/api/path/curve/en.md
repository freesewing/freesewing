---
title: Path.curve()
---

The `Path.curve()` method draws a cubic Bézier curve from the current position
via two control points to a given endpoint.

## Signature

```js
Path path.curve(Point cp1, Point cp2, Point to)
```

<Tip compact>This method is chainable as it returns the `Path` object</Tip>

## Example

<Example caption="Example of the Path.curve() method">
```js
({ Point, points, Path, paths, part }) => {

  points.from = new Point(10, 20)
  points.cp1 = new Point(40, 0)
  points.cp2 = new Point(60, 40)
  points.to = new Point(90, 20)

  paths.line = new Path()
    .move(points.from)
    .curve(points.cp1, points.cp2, points.to)
    .setText("Path.curve()", "text-sm center fill-note")

  return part
}
```
</Example>
