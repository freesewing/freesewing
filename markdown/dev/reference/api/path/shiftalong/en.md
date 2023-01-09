---
title: Path.shiftAlong()
---

The `Path.shiftAlong()` method returns a point that lies at distance travelled
along the path.

## Signature

```js
Point path.shiftAlong(float distance[, int stepsPerMm=10])
```

The second parameter controls the precision by which the path will be _walked_.
By default, we'll divide it into 10 steps per mm.

If you don't need that precision, you can pass a lower number.
If you need more precision, you can pass a higher number.
For most cases, the default will be fine.

## Example

<Example caption="Example of the Path.shiftAlong() method">
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
    .shiftAlong(20)
    .attr("data-text", "2 cm")
    .attr("data-text-class", "center fill-note")
    .attr("data-text-lineheight", 6)
  points.x2 = paths.example
    .shiftAlong(90)
    .attr("data-text", "9 cm")
    .attr("data-text-class", "center fill-note")
    .attr("data-text-lineheight", 6)

  snippets.x1 = new Snippet("notch", points.x1)
  snippets.x2 = new Snippet("notch", points.x2)

  return part
}
```
</Example>
