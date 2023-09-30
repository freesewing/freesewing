---
title: Path.attr()
---

This `Path.attr()` method can be used to add attributes to the Path object.
It calls `this.attributes.add()` under the hood, and returns the Path object.

If the third parameter is set to `true` it will call `this.attributes.set()`
instead, thereby overwriting the value of the attribute.

## Signature

```js
Path path.attr(
  string name,
  mixed value,
  bool overwrite = false
)
```

<Tip compact>This method is chainable as it returns the `Path` object</Tip>

## Example

<Example caption=" Example of the Path.attr() method">
```js
({ Point, points, Path, paths, part }) => {

  points.from = new Point(10, 20)
  points.cp1 = new Point(20, -10)
  points.cp2 = new Point(50, 50)
  points.to = new Point(70, 20)

  paths.example = new Path()
    .move(points.from)
    .curve(points.cp1, points.cp2, points.to)
    .attr("class", "canvas")
    .setText("FreeSewing rocks", "text-xs center")

  return part
}
```
</Example>


## Notes

Methods like
[`Path.addClass`](/reference/api/path/addclass),
[`Path.setClass`](/reference/api/path/setclass),
[`Path.addText`](/reference/api/path/addtext), and
[`Path.setText`](/reference/api/path/settext)
all call this method under the hood.

See [Using Attributes](/howtos/code/attributes)
for information about custom Attributes that can be used with Paths.
