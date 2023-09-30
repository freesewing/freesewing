---
title: Point.translate()
---

The `Point.translate()` method returns a new `Point` with a [translate
transform](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/translate)
applied.

## Signature

```js
Point point.translate(float deltaX, float deltaY)
```

In other words, this will:

- Add `deltaX` to the point's X-coordinate
- Add `deltaY` to the point's Y-coordinate

Positive values for `deltaX` will move the point to the right.
Positive values for `deltaY` will move the point downwards.

## Example

<Example caption="An example of the Point.translate() method">
```js
({ Point, points, Snippet, snippets, macro, part }) => {

  points.A = new Point(10, 10).setText("Point A", "text-sm")
  points.B = points.A.translate(120, 60)
    .setText(
      "Point B is point A with a\ntranslate(120, 60)\ntransform applied",
      "right text-sm"
    )
    .attr("data-text-dy", -6)
    .attr("data-text-lineheight", 6)

  snippets.A = new Snippet("x", points.A)
  snippets.B = new Snippet("x", points.B)

  macro("ld", {
    from: points.A,
    to: points.B,
    text: "translate(120,60)",
    noStartMarker: true
  })

  return part
}
```
</Example>
