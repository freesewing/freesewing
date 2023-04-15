---
title: Path.intersectsX()
---

The `Path.intersectsX()` method returns the Point object(s) where the path
intersects with a given X-value.

<Warning>

This method can sometimes fail to find intersections in some curves
due to a limitation in an underlying Bézier library.
Please see [Bug #3367](https://github.com/freesewing/freesewing/issues/3367)
for more information.

</Warning>

## Signature

```js
array|false path.intersectsX(float x)
```

## Example

<Example caption="Example of the Path.intersectsX() method">
```js
({ Point, points, Path, paths, snippets, Snippet, getId, part }) => {

  points.A = new Point(95, 50)
  points.B = new Point(10, 30)
  points.BCp2 = new Point(40, 20)
  points.C = new Point(90, 30)
  points.CCp1 = new Point(50, -30)
  points.D = new Point(50, 130)
  points.DCp1 = new Point(150, 30)

  points.top = new Point(60, -10)
  points.bot = new Point(60, 140)

  paths.line = new Path()
    .move(points.top)
    .line(points.bot)
    .attr("class", "lining dashed")

  paths.demo = new Path()
    .move(points.A)
    .line(points.B)
    .curve(points.BCp2, points.CCp1, points.C)
    .curve(points.DCp1, points.DCp1, points.D)

  for (let p of paths.demo.intersectsX(60)) {
    snippets[getId()] = new Snippet("notch", p)
  }

  return part
}
```
</Example>
