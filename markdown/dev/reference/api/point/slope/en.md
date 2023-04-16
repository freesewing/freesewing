---
title: Point.slope()
---

The `Point.slope()` method returns the slope (dy/dx) of a line made by this Point and that Point. 

## Signature

```js

point.slope(otherPoint)

```

## Example

<Example caption="An example of the Point.slope() method">

```js

({ Point, points, Path, paths, Snippet, snippets, part, macro }) => {

 points.A = new Point(0,0)
 points.B = new Point(200,150)

 const slope = points.A.slope(points.B)

    macro('hd', {
      from: points.A,
      to: points.B,
      y: points.B.y,
    })
    macro('vd', {
      to: points.B,
      from: points.A,
      x: 0,
    })

paths.line = new Path()
.move(points.A)
.line(points.B)
.attr("class", "canvas")
.setText("Slope: " + slope,  "center text-lg")







  return part
}

```
</Example>


