---
title: Path.hide()
---

The `Path.hide()` hides the path so it does not appear in the output.

## Signature

```js
Path path.hide()
```

<Tip compact>This method is chainable as it returns the `Path` object</Tip>

## Example

<Example caption="Example of the Path.hide() method">
```js
({ Point, points, Path, paths, part }) => {

  points.top = new Point(50, 0)
  points.left = new Point (20,50)
  points.right = new Point (80,50)

  paths.a = new Path().move(points.top).line(points.right).setText('a')
  paths.b = new Path().move(points.right).line(points.left).setText('b').hide()
  paths.c = new Path().move(points.left).line(points.top).setText('c')

  return part
}
```
</Example>
