---
title: Path.smurve_()
---

The `Path.smurve_()` method draws a smooth curve from the current point an endpoint.
In addition, the end point's control point lies on top of the end point.

A smooth curve means it will use the reflection of the end control point of the previous curve.

## Signature

```js
Path path.smurve_(Point cp2, Point end)
```

<Tip compact>This method is chainable as it returns the `Path` object</Tip>

## Example

<Example caption="Example of the Path.smurve_() method">
```js
({ Point, points, Path, paths, part }) => {

  points.aFrom = new Point(10, 10)
  points.aCp1 = new Point(40, 40)
  points.aCp2 = new Point(70, -20)
  points.aTo = new Point(100, 10)

  points.bTo = new Point(10,50)

  paths.smurve = new Path()
    .move(points.aFrom)
    .curve(points.aCp1, points.aCp2,points.aTo)
    .smurve_(points.bTo)
    .reverse() // Puts text at the end
    .setText('Path.smurve()')

  return part
}
```
</Example>
