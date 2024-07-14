---
title: Path.circleSegment()
---

The `Path.circleSegment()` method draws a circle segment
starting from the current endpoint of the path around the given origin with a given angle.

A positive angle results in a counter-clockwise arc.

A negative angle results in a clockwise arc.

<Tip>
The new endpoint of this path is the same point
that 
```js
path.end().rotate(deg, origin)
```
would return.
</Tip>

## Signature

```js
Path path.circleSegment(deg, origin)
```

<Tip compact>This method is chainable as it returns the `Path` object</Tip>

## Example

<Example caption="Example of the Path.circleSegment() method">
```js
({ Point, points, Path, paths, part }) => {

points.from = new Point(10, 20)
points.origin = new Point(40, 0)

paths.line = new Path()
.move(points.from)
.circleSegment(90, points.origin)
.setText("→ Path.circleSegment() →", "text-sm center fill-note")

paths.helper = new Path()
.move(paths.line.start())
.line(points.origin)
.line(paths.line.end())
.setClass('dotted stroke-sm')

return part
}
```
</Example>
