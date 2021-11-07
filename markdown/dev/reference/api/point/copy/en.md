---
title: Point.copy()
---
A point's `copy()` method returns a new point with the same coordinates as the original point.
This method does _not_ copy any attributes the original point may have.

## Point.copy() signature

```js
Point point.copy()
```

<Note>

###### Copy vs clone

this `Point.copy()` method will only copy the point's coordinates.
To also copy the attributes, use [`Point.clone()`](reference/api/point/clone/) instead.

</Note>

## Point.copy() example

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
