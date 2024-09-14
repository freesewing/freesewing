---
title: Point.setCircle()
---

The `Point.setCircle()` method adds a circle to a Point. It yields similar
results as the [`Point.addCircle()`](/reference/api/point/addcircle) method,
the different is that `Point.setCircle()` will overwrite any previous circle
set.

Essentially, it mimics the difference between adding vs setting an attribute.

Refer to [Drawing circles](/howtos/code/drawing-circles) for more details on
how circles are handled.

## Signature

```js
Point point.setCircle(
  number radius,
  string className
)
```

<Tip compact>This method is chainable as it returns the `Point` object</Tip>

## Example

<Example caption="Examples of Point.setCircle(), compare this to [Point.addCircle()](/reference/api/point/addcircle)">
```js
({ Point, points, part }) => {

  points.a = new Point(30, 10)
    .setCircle(3, 'lining dashed')
    .setCircle(7, 'mark dashed')

  points.b = new Point(50, 10)
    .setCircle(1, 'interfacing')
    .setCircle(3, 'fabric')
    .setCircle(5, 'lining')
    .setCircle(7, 'mark')
    .setCircle(9, 'note')

  points.c = new Point(70, 10)
    .setCircle(3, 'interfacing')
    .setCircle(7, 'mark lashed')

  return part
}
```
</Example>
