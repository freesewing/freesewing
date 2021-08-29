---
title: translate()
---
 
```js
Point point.translate(float deltaX, float deltaY)
```

Returns a point with 
[a translate transform](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/translate) 
applied. 

In other words, this will:

 - Add `deltaX` to the point's X-coordinate
 - Add `deltaY` to the point's Y-coordinate

<Example 
  part="point_translate"
  caption="An example of the Point.translate() method"
/>

```js
let { Point, points, Snippet, snippets, macro } = part.shorthand();

points.A = new Point(10, 10).attr("data-text", "Point A");
points.B = points.A.translate(120, 60)
  .attr(
    "data-text",
    "Point B is point A with a\ntranslate(120, 60)\ntransform applied"
  )
  .attr("data-text-class", "right")
  .attr("data-text-dy", -6)
  .attr("data-text-lineheight", 6);

snippets.A = new Snippet("x", points.A);
snippets.B = new Snippet("x", points.B);

macro("ld", {
  from: points.A,
  to: points.B,
  text: "translate(120,60)",
  noStartMarker: true
});
```
