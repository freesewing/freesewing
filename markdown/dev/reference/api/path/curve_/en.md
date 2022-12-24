---
title: Path.curve_()
---

The `Path.curve_()` method draws a cubic Bézier curve from the current position
via two control points to a given endpoint.  However, the end control point is
identical to the end point.

## Signature

```js
Path path.curve_(Point cp1, Point to)
```

<Tip compact>This method is chainable as it returns the `Path` object</Tip>

## Example


<Example caption="Example of the Path.curve\_() method">

```js
({ Point, points, Path, paths, part }) => {

  points.from = new Point(10, 20)
  points.cp1 = new Point(40, 0)
  points.to = new Point(90, 20)

  paths.line = new Path()
    .move(points.from)
    .curve_(points.cp1, points.to)
    .setText("Path.curve_()", "text-sm center fill-note")
    .attr("data-text-dy", -1)

  return part
}
```
</Example>

## Notes

The main purpose of this method is to save your some typing,
as the two following calls yield the same result:

```js
.curve(point1, point2, point2)
.curve_(point1, point2)
```
