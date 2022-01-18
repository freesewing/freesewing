---
title: Point.flipY()
---

A point's `flipY()` method returns a new `Point` that mirrors the original point around the Y-value of the point you pass it.
If you do not pass in a point, it will default to mirroring around an Y-value of zero.

## Point.flipY() signature

```js
Point point.flipY(Point mirror = false)
```

## Point.flipY() example

<Example
  part="point_flipy"
  caption="An example of the Point.flipY() method"
/>

```js
let { Point, points, Path, paths } = part.shorthand();

points.start = new Point(0, 50);
points.churchTowerWallLeft = new Point(10, 50);
points.churchTowerRoofLeft = new Point(10, 30);
points.churchTowerTop = new Point(15, 10);
points.churchTowerRoofRight = new Point(20, 30);
points.churchRoofRight = new Point(50, 30);
points.churchWallRight = new Point(50, 50);
points.houseWallLeft = new Point(65, 50);
points.houseRoofLeft = new Point(65, 35);
points.houseRoofTop = new Point(75, 25);
points.houseRoofRight = new Point(85, 35);
points.houseWallRight = new Point(85, 50);
points.end = new Point(95, 50);

points.mirror = new Point(0, 60);
points.mirrorLineEnd = new Point(95, 60);

points._start = points.start.flipY(points.mirror);
points._churchTowerWallLeft = points.churchTowerWallLeft.flipY(points.mirror);
points._churchTowerRoofLeft = points.churchTowerRoofLeft.flipY(points.mirror);
points._churchTowerTop = points.churchTowerTop.flipY(points.mirror);
points._churchTowerRoofRight = points.churchTowerRoofRight.flipY(
  points.mirror
);
points._churchRoofRight = points.churchRoofRight.flipY(points.mirror);
points._churchWallRight = points.churchWallRight.flipY(points.mirror);
points._houseWallLeft = points.houseWallLeft.flipY(points.mirror);
points._houseRoofLeft = points.houseRoofLeft.flipY(points.mirror);
points._houseRoofTop = points.houseRoofTop.flipY(points.mirror);
points._houseRoofRight = points.houseRoofRight.flipY(points.mirror);
points._houseWallRight = points.houseWallRight.flipY(points.mirror);
points._end = points.end.flipY(points.mirror);

paths.skylineTop = new Path()
  .move(points.start)
  .line(points.churchTowerWallLeft)
  .line(points.churchTowerRoofLeft)
  .line(points.churchTowerTop)
  .line(points.churchTowerRoofRight)
  .line(points.churchRoofRight)
  .line(points.churchWallRight)
  .line(points.houseWallLeft)
  .line(points.houseRoofLeft)
  .line(points.houseRoofTop)
  .line(points.houseRoofRight)
  .line(points.houseWallRight)
  .line(points.end);
```
