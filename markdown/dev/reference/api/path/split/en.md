---
title: Path.split()
---

The `Path.split()` method splits a path in two halves, on a point along that
path that you pass it.

## Signature

```js
array path.split(Point splitPoint)
```

## Example

<Example caption="Example of the Path.split() method">
```js
({ Point, points, Path, paths, snippets, Snippet, part }) => {

  points.A = new Point(45, 60)
  points.B = new Point(10, 30)
  points.BCp2 = new Point(40, 20)
  points.C = new Point(90, 30)
  points.CCp1 = new Point(50, -30)
  points.D = new Point(50, 130)
  points.DCp1 = new Point(150, 30)

  paths.demo = new Path()
    .move(points.D)
    .curve(points.DCp1, points.DCp1, points.C)
    .curve(points.CCp1, points.BCp2, points.B)
    .line(points.A)

  points.split = paths.demo.shiftFractionAlong(0.75)
  snippets.split = new Snippet("notch", points.split)

  let halves = paths.demo.split(points.split)
  for (let i in halves) {
    paths[i] = halves[i]
      .attr("style", "stroke-width: 3; stroke-opacity: 0.5;")
      .attr("style", `stroke: hsl(${i * 70}, 100%, 50%)`)
  }

  return part
}
```
</Example>
