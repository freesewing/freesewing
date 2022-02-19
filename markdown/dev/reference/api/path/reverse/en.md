---
title: reverse()
---

```js
Path path.reverse()
```

Returns a path that is the reversed version of this path. As in, start becomes end, and end becomes start.

<Note>

The reversed path is a shallow copy.
It will in other words not inherit the attributes of the original path.

If you want a deep copy, including the attributes, use `Path.clone().reverse()`.

</Note>

<Example part="path_reverse">
Example of the Path.reverse() method
</Example>

```js
let { Point, points, Path, paths } = part.shorthand();

points.B = new Point(10, 30);
points.BCp2 = new Point(40, 20);
points.C = new Point(90, 30);
points.CCp1 = new Point(50, -30);

paths.example = new Path()
  .move(points.B)
  .curve(points.BCp2, points.CCp1, points.C)
  .attr("data-text", "freesewingIsMadeByJoostDeCockAndContributors")
  .attr("data-text-class", "text-xs fill-note");

paths.reverse = paths.example
  .reverse()
  .attr("data-text", "freesewingIsMadeByJoostDeCockAndContributors")
  .attr("data-text-class", "text-xs fill-lining");
```
