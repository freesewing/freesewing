---
title: Point.flipX()
---

A point's `flipX()` method returns a new `Point` that mirrors the original point around the X-value of the point you pass it.
If you do not pass in a point, it will default to mirroring around an X-value of zero.

## Point.flipX() signature

```js
Point point.flipX(Point mirror = false)
```

## Point.flipX() example

<Example
  part="point_flipx"
  caption="An example of the Point.flipX() method"
/>

```js
let { Point, points, Path, paths } = part.shorthand();

points.top = new Point(50, 10);
points.out1 = new Point(70, 30);
points.in1 = new Point(55, 35);
points.out2 = new Point(75, 50);
points.in2 = new Point(60, 55);
points.out3 = new Point(80, 70);
points.in3 = new Point(55, 70);
points.trunkOut = new Point(55, 80);
points.trunkIn = new Point(50, 80);

points._out1 = points.out1.flipX(points.top);
points._in1 = points.in1.flipX(points.top);
points._out2 = points.out2.flipX(points.top);
points._in2 = points.in2.flipX(points.top);
points._out3 = points.out3.flipX(points.top);
points._in3 = points.in3.flipX(points.top);
points._trunkOut = points.trunkOut.flipX(points.top);

points.bottom = new Point(50, 80);

paths.tree = new Path()
  .move(points.top)
  .line(points.out1)
  .line(points.in1)
  .line(points.out2)
  .line(points.in2)
  .line(points.out3)
  .line(points.in3)
  .line(points.trunkOut)
  .line(points._trunkOut)
  .line(points._in3)
  .line(points._out3)
  .line(points._in2)
  .line(points._out2)
  .line(points._in1)
  .line(points._out1)
  .close();

paths.mirror = new Path()
  .move(points.top)
  .line(points.bottom)
  .attr("class", "note dashed");
```
