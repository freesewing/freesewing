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

## Notes

### The returned array will hold null for edge cases

Typically, the returned array will hold a `Path` object for each half.
But in some cases, one of the array entries can hold `null` if the split failed to find a path.
For example because you are splitting a `Path` on its start or end point.

```mjs
// Return value for a normal case
[Path, Path]
// Return value when calling Path.split() on/near the path's start point
[null, Path]
// Return value when calling Path.split() on/near the path's end point
[Path, null]
// Return value when calling Path.split() with a point not on the path
[null, null]
```

### This method will snap the split point to start or end points
This method will also _snap_ to the start or end point if you are splitting a path
(very) close to it, as it checks with [`Point.sitsRoughlyOn()`](/reference/api/point/sitsroughlyon).

