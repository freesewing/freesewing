---
title: Point.clone()
---

Returns a new `Point` with the same coordinates and attributes as the original point.

## Point.clone() signature

```js
Point point.clone()
```

<Note>

###### Copy vs clone

The [`Point.copy()`](reference/api/point/copy/) method will only copy the point's coordinates, whereas this
`Point.clone()` method will also copy its attributes.

</Note>

## Point.clone() example

<Example
  part="point_clone"
  caption="An example of the Point.clone() method"
/>

```js
  let { Point, points, Snippet, snippets } = part.shorthand();

  points.A = new Point(25, 25)
    .attr("data-text", "Point A")
    .attr("data-text-class", "text-xl")
    .attr("data-text-fill-opacity", "0.5");
  points.B = points.A.clone().attr("data-text", "Point B");

  snippets.x = new Snippet("notch", points.A);
```
