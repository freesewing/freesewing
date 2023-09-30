---
title: Path.end()
---

The `Path.end()` method returns the Point object at the end of the path.

## Signature

```js
Point path.end()
```

<Tip compact>This method is chainable as it returns the `Path` object</Tip>

## Example

<Example caption="Example of the Path.end() method">
```js
({ Point, points, Path, paths, snippets, Snippet, part }) => {

  points.A = new Point(45, 60)
  points.B = new Point(10, 30)
  points.BCp2 = new Point(40, 20)
  points.C = new Point(90, 30)
  points.CCp1 = new Point(50, -30)

  paths.demo = new Path()
    .move(points.A)
    .line(points.B)
    .curve(points.BCp2, points.CCp1, points.C)

  snippets.end = new Snippet("notch", paths.demo.end())

  return part
}
```
</Example>
