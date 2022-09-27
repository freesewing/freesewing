---
title: Path
order: 30
---

A path represents an SVG path; The lines and curves on our pattern.

The Path constructor takes no arguments:

```js
Path new Path();
```

A Path objects comes with the following properties:

- `attributes` : An [Attributes](/reference/api/attributes) instance holding
  the path's attributes
- `hidden` : When this is `true` the path will be hidden (excluded it from the
  output).  See [Path.hide()](/reference/api/path/hide),
  [Path.unhide()](/reference/api/path/unhide), and
  [Path.setHidden()](/reference/api/path/sethidden) for various methods that
  allow setting this in a chainable way.

In addition, a Path object exposes the following methods:

<ReadMore list />
