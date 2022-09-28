---
title: Point.setCircle()
---

Sets a circle to a Point. Behaves the same as [addCircle](/reference/api/points/addcircle) but
the different is that it will overwrite any previous circle set.

Essentially, it mimics the difference between adding vs setting an attribute.

Refer to [Drawing circles](/howtos/code/drawing-circles) for more details on how circles are handled.

## Point.setCircle() signature

```js
Point point.setCircle(
  string text, 
  string className
)
```

## Point.setCircle() example

<Example part="point_setcircle">
Examples of Point.setCircle(), compare this to [Point.addCircle](/reference/api/point/addcircle)
</Example>

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

