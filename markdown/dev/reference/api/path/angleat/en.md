---
title: Path.angleAt()
---

The `Path.angleAt()` method returns the (tangent) angle of a path at a specific point.

If the given point is a sharp corner, this method prefers returning the angle directly before the corner.

If the given point does not lie (approximately) on the path, this method returns `false`.

## Signature

```js
number|false path.angleAt(Point point)
```

## Example

<Example caption="Example of the Path.angleAt() method">
```js
({ Point, points, Path, paths, snippets, Snippet, part }) => {

points.A = new Point(45, 60)
points.B = new Point(10, 30)
points.BCp2 = new Point(40, 20)
points.C = new Point(90, 30)
points.CCp1 = new Point(50, -30)
points.D = new Point(50, 80)
points.DCp1 = new Point(70, 30)

paths.demo = new Path()
.move(points.D)
.curve(points.DCp1, points.DCp1, points.C)
.curve(points.CCp1, points.BCp2, points.B)
.line(points.A)

points.testPoint = paths.demo.shiftFractionAlong(0.55)
snippets.point = new Snippet("notch", points.testPoint)

let angle = paths.demo.angleAt(points.testPoint)
//draw a tangent path
paths.tangent = new Path()
  .move(points.testPoint.shift(angle, -30))
  .line(points.testPoint.shift(angle, 30))
  .attr("class", "lining dashed")

return part
}
```
</Example>
                               
## Notes

Keep in mind that calculations with Bézier curves are often approximations.
