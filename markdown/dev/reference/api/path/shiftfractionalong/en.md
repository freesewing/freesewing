---
title: Path.shiftFractionAlong()
---

The `Path.shiftFractionAlong()` returns a point that lies at fraction of the
length of the path travelled along the path.

## Signature

```js
Point path.shiftFractionAlong(float fraction[, int stepsPerMm=25])
```

The second parameter controls the precision by which the path will be _walked_.
By default, we'll divide it into 10 steps per mm.

If you don't need that precision, you can pass a lower number.
If you need more precision, you can pass a higher number.
For most cases, the default will be fine.

## Example

<Example caption="Example of the Path.shiftFractionAlong() method">
```js
({ Point, points, Path, paths, Snippet, snippets, part }) => {

  points.A = new Point(45, 60)
  points.B = new Point(10, 30)
  points.BCp2 = new Point(40, 20)
  points.C = new Point(90, 30)
  points.CCp1 = new Point(50, -30)

  paths.example = new Path()
    .move(points.A)
    .line(points.B)
    .curve(points.BCp2, points.CCp1, points.C)

  points.x1 = paths.example
    .shiftFractionAlong(0.2)
    .setText("0.2", "center")
  points.x2 = paths.example
    .shiftFractionAlong(0.9)
    .setText("0.9", "center")

  snippets.xl = new Snippet("notch", points.x1)
  snippets.x2 = new Snippet("notch", points.x2)

  return part
}
```
</Example>
