---
title: copy()
---

```js
Point point.copy()
```

Returns a new point with the same coordinates as this point.

<Example 
  part="point_copy"
  caption="An example of the Point.copy() method"
/>

```js
let { Point, points, Snippet, snippets } = part.shorthand();

points.A = new Point(50, 25)
  .attr("data-text", "Point A")
  .attr("data-text-class", "text-xl");
points.B = points.A.copy().attr("data-text", "Point B");

snippets.x = new Snippet("notch", points.A);
```

