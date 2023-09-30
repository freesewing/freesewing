---
title: Path.setHidden()
---

The `Path.setHidden()` method either hides or unhides the path depending on the
value you pass it.

## Signature

```js
Path path.setHidden(bool hidden = false)
```

<Tip compact>This method is chainable as it returns the `Path` object</Tip>

## Example

<Example caption="Example of the Path.setHidden() method">
```js
({ Point, points, Path, paths, part }) => {

  points.top = new Point(50, 0)
  points.left = new Point (20,50)
  points.right = new Point (80,50)

  paths.a = new Path().move(points.top).line(points.right).setText('a')
  paths.b = new Path().move(points.right).line(points.left).setText('b').setHidden(true)
  paths.c = new Path().move(points.left).line(points.top).setText('c')

  return part
}
```
</Example>
