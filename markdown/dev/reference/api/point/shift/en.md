---
title: shift()
---

```js
Point point.shift(float degrees, float distance)
```

Returns a point that lies distance in the direction of degrees from this point.

<Example 
  part="point_shift"
  caption="An example of the Point.shift() method"
/>

```js
let { Point, points, macro } = part.shorthand();

points.A = new Point(90, 40)
  .attr("data-text", "Point A")
  .attr("data-text-class", "right");
points.B = points.A.shift(155, 70)
  .attr("data-text", "Point B is point A shifted 7cm\nat a 155 degree angle")
  .attr("data-text-lineheight", 6);

macro("ld", {
  from: points.B,
  to: points.A,
  d: -10
});
```
