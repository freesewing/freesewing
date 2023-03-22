---
title: Point.attr()
---

The `Point.attr()` method adds an attribute to the point, and returns the
original point. Setting the third parameter to `true` will replace the value of
the attribute instead of adding it.

## Signature

```js
Point point.attr(
  string name,
  mixed value,
  bool overwrite = false
)
```

If the third parameter is set to `true` it will call [`this.attributes.set()`](/reference/api/attributes/set/) instead, thereby overwriting the value of the attribute.


<Tip compact>This method is chainable as it returns the `Point` object</Tip>

## Example

<Example caption="An example of the Point.attr() method">
```js
({ Point, points, Path, paths, part }) => {

  points.anchor = new Point(100, 25)
    .attr('data-text', 'FreeSewing')
    .attr('data-text', 'rocks')

  // Avoid the text getting cropped
  paths.hidden = new Path()
    .move(points.anchor)
    .line(points.anchor.shift(0, 80))
    .addClass('hidden')

  return part
}
```
</Example>

## Notes

See [Using Attributes](/howtos/code/attributes)
for information about custom Attributes that can be used with Points.
