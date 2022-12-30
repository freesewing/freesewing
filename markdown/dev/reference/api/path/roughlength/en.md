---
title: Path.roughLength()
---

The `Path.roughLength()` method returns a (very) rough estimate of the path's length.

## Signature

```js
Number path.roughLength()
```

## Example

<Example caption="Example of the Path.attr() method">
```js
({ Point, points, Path, paths, macro, units, part }) => {

  points.B = new Point(10, 30)
  points.BCp2 = new Point(40, 20)
  points.C = new Point(120, 30)
  points.CCp1 = new Point(50, -30)

  paths.example = new Path()
    .move(points.B)
    .curve(points.BCp2, points.CCp1, points.C)

  macro("pd", {
    path: paths.example,
    d: -10,
    text: `Path.roughLength() = ${units(paths.example.roughLength())}`
  })
  macro("pd", {
    path: paths.example,
    d: 10,
    text: `Path.length() = ${units(paths.example.length())}`
  })


  return part
}
```
</Example>

## Notes

The `Path.roughLength()` is not intended to give an estimate that is accurate, but rather differentiates between paths that are a few millimeter long, or meters long.

It calculates the length without *walking the (cubic) Bézier curve* making it very fast and very inaccurate (for curves).
It is typically used to determine how much precision to apply when walking a curve.
