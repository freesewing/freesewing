---
title: pleat
---

The `pleat` macro is used to mark a sewing pattern to attach and reinforce 
and attachment between two pieces. This is regularly done by sewing along
the outside of the pieces that needs to be joined, and then sewing along the 
diagonals too.

It is provided by [plugin-annotations](/reference/plugins/annotations/).

## Signature

```js
macro('pleat', {
  Point from,
  Point to,
  String Prefix = 'pleat',
  Number margin = 35,
  Boolean reverse = false,
})
```

## Example

<Example caption="An example of the pleat macro">
```js
({ Point, points, Path, paths, macro, part }) => {
  points.seamTL = new Point(0,0)
  points.seamTR = new Point(70,0)

  paths.seam = new Path()
    .move(points.seamTL)
    .line(points.seamTR)
    
  points.from = new Point(30,0)
  points.t0 = new Point(40,0)

  macro('pleat', {
    from: points.from,
    to: points.to,
  })

  return part
}
```
</Example>
