---
title: attr()
---

```js
Point point.attr(
  string name, 
  mixed value, 
  bool overwrite = false
)
```

This `Point.attr()` method calls `this.attributes.add()` under the hood, but returns the Point object.
This allows you to chain different calls together as in the example below.

If the third parameter is set to `true` it will call `this.attributes.set()` instead, thereby overwriting the value of the attribute.

<Example 
  part="point_attr"
  caption="An example of the Point.attr() method"
/>

```js
let { Point, points } = part.shorthand();

points.anchor = new Point(100, 25)
  .attr("data-text", "freesewingIsMadeByJoostDeCockAndContributors")
  .attr("data-text-class", "center");
```

