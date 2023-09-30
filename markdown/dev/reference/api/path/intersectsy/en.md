---
title: Path.intersectsY()
---

The `Path.intersectsY()` method returns the Point object(s) where the path
intersects with a given Y-value.

<Warning>

This method can sometimes fail to find intersections in some curves
due to a limitation in an underlying Bézier library.
Please see [Bug #3367](https://github.com/freesewing/freesewing/issues/3367)
for more information.

</Warning>

## Signature

```js
array|false path.intersectsY(float y)
```

## Example

<Example caption="Example of the Path.intersectsY() method">
```js
({ Point, points, Path, paths, snippets, Snippet, getId,  part }) => {

    points.A = new Point(55, 40)
    points.B = new Point(10, 70)
    points.BCp2 = new Point(40, 20)
    points.C = new Point(90, 60)
    points.CCp1 = new Point(50, -30)
    points.D = new Point(50, 80)
    points.DCp1 = new Point(140, 50)

    points.top = new Point(10, 58)
    points.bot = new Point(130, 58)

    paths.line = new Path()
    .move(points.top)
    .line(points.bot)
    .attr("class", "lining dashed")

  paths.demo = new Path()
    .move(points.A)
    .line(points.B)
    .curve(points.BCp2, points.CCp1, points.C)
    .curve(points.DCp1, points.DCp1, points.D)

  for (let p of paths.demo.intersectsY(58)) {
    snippets[getId()] = new Snippet("notch", p)
  }

  return part
}
```
</Example>
