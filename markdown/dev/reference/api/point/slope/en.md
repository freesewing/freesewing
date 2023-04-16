---
title: Point.slope()
---

The `Point.slope()` method returns the slope of a line made by this Point and that Point.

## Signature

```js

point.slope(otherPoint)

```

## Example

<Example caption="An example of the Point.slope() method">

```js

({ Point, points, Path, paths, Snippet, snippets, part }) => {

 points.A = new Point(0,0)
 points.B = new Point(40,30)

 const slope = points.A.slope(points.B)

paths.line = new Path()
.move(points.A)
.line(points.B)
.attr("class", "canvas")
.setText("Slope: " + slope,  "text-xs center")



  return part
}

```
</Example>


