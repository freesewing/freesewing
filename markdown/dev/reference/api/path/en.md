---
title: Path
---

A path represents an SVG path, which are the lines and curves on our pattern.

## Signature

```js
Path new Path()
```

The Path constructor takes no arguments.

## Properties

A Path objects comes with the following properties:

- `attributes` : An [Attributes](/reference/api/attributes) instance holding
  the path's attributes
- `hidden` : When this is `true` the path will be hidden (excluded it from the
  output).  See [Path.hide()](/reference/api/path/hide),
  [Path.unhide()](/reference/api/path/unhide), and
  [Path.setHidden()](/reference/api/path/sethidden) for various methods that
  allow setting this in a chainable way.

<Related>
See [Using Attributes](/howtos/code/attributes)
for information about custom Attributes that can be used with Paths.
</Related>
## Example

<Example caption="Example of the Path contructor">
```js
({ Point, points, Path, paths, part }) => {

  paths.example = new Path()
    .move(new Point(0,0))
    .line(new Point(100,0))

  return part
}
```
</Example>

## Methods

A Path object exposes the following methods:

<ReadMore list />
