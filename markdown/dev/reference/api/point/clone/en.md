---
title: Point.clone()
---

The `Point.clone()` method returns a new `Point` with the same coordinates and
attributes as the original point.

## Signature

```js
Point point.clone()
```

<Tip compact>This method is chainable as it returns the `Point` object</Tip>

## Example

<Example caption="An example of the Point.clone() method">
```js
({ Point, points, Path, paths, Snippet, snippets, part }) => {

  points.A = new Point(25, 25)
    .setText("Point A", "text-xl")
    .attr("data-text-fill-opacity", "0.5")
  points.B = points.A.clone().setText("Point B")

  snippets.x = new Snippet("notch", points.A)

  // Avoid the text getting cropped
  paths.hidden = new Path()
    .move(new Point(20,10))
    .move(new Point(75,30))
    .addClass('hidden')

  return part
}
```
</Example>


## Notes

The [`Point.copy()`](/reference/api/point/copy/) method will only copy the
point's coordinates, whereas this `Point.clone()` method will also copy its
attributes.
