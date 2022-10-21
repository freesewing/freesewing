---
title: Point.addCircle()
---

The `Point.addCircle()` method adds a circle to a Point. Under the hood, this
will call `Point.attr()` as circles are added by setting attributes. Refer to
[Drawing circles](/howtos/code/drawing-circles) for more details.

## Signature

```js
Point point.addCircle(
  number radius, 
  string className
)
```

<Tip compact>This method is chainable as it returns the `Point` object</Tip>

## Example

<Example caption="Examples of Point.addCircle(), compare this to [Point.setCircle](/reference/api/point/setcircle)">
```js
({ Point, points, part }) => {
  points.a = new Point(30, 10)
    .addCircle(3, 'lining dashed')
    .addCircle(7, 'mark dashed')

  points.b = new Point(50, 10)
    .addCircle(1, 'interfacing')
    .addCircle(3, 'fabric')
    .addCircle(5, 'lining')
    .addCircle(7, 'mark')
    .addCircle(9, 'note')

  points.c = new Point(70, 10)
    .addCircle(3, 'interfacing')
    .addCircle(7, 'mark lashed')

  return part
}
```
</Example>


