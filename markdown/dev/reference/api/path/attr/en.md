---
title: attr()
---

```js
Path path.attr(
  string name, 
  mixed value, 
  bool overwrite = false
)
```

This `Path.attr()` method calls `this.attributes.add()` under the hood, but returns the Path object.

This allows you to chain different calls together as in the example below.

If the third parameter is set to `true` it will call `this.attributes.set()` instead, thereby overwriting the value of the attribute.

<Example part="path_attr">
Example of the Path.attr() method
</Example>

```js
let { Point, points, Path, paths } = part.shorthand();

points.B = new Point(10, 50);
points.BCp2 = new Point(40, 10);
points.C = new Point(90, 30);
points.CCp1 = new Point(50, 90);

paths.example = new Path()
  .move(points.B)
  .curve(points.BCp2, points.CCp1, points.C)
  .attr("class", "canvas")
  .attr("data-text", "freesewingIsMadeByJoostDeCockAndContributors")
  .attr("data-text-class", "text-xs center");
```
