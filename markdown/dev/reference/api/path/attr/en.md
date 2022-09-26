---
title: Path.attr()
---

This `Path.attr()` method can be used to add attributes to the Path object.
It calls `this.attributes.add()` under the hood, and returns the Path object.

If the third parameter is set to `true` it will call `this.attributes.set()` 
instead, thereby overwriting the value of the attribute.

```js
Path path.attr(
  string name, 
  mixed value, 
  bool overwrite = false
)
```

<Tip compact>This method is chainable as it returns the `Path` object</Tip>

<Example part="path_attr">
Example of the Path.attr() method
</Example>

```js
({ Point, points, Path, paths, part }) => {

  points.from = new Point(10, 50);
  points.cp1 = new Point(40, 10);
  points.cp2 = new Point(90, 30);
  points.to = new Point(50, 90);

  paths.example = new Path()
    .move(points.from)
    .curve(points.cp1, points.cp2, points.to)
    .addClass("canvas")
    .attr("data-text", "freesewingIsMadeByJoostDeCockAndContributors")
    .attr("data-text-class", "text-xs center");

  return part
```

<Note>

Methods like `addClass`, `setClass`, `addCircle`, `setCircle`, `adddText`, and `setText`
all call this method under the hood.

</Note>
