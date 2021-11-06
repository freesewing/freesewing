---
title: Point.attr()
---

Adds an attribute to the point, and returns the original point. Setting the third parameter
to `true` will replace the value of the attribute instead of adding it.

## Point.attr() signature

```js
Point point.attr(
  string name, 
  mixed value, 
  bool overwrite = false
)
```

The `Point.attr()` method calls [`this.attributes.add()`](/reference/api/attributes/add/) under the hood, but returns the `Point` object.
This allows you to chain different calls together as in the example below.

If the third parameter is set to `true` it will call [`this.attributes.set()`](/reference/api/attributes/set/) instead, thereby overwriting the value of the attribute.

## Point.attr() example

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
