---
title: attr()
---

```js
Snippet snippet.attr(
  string name, 
  mixed value, 
  bool overwrite = false
)
```

This `Snippet.attr()` method calls [`Attributes.add()`](./attributes#add) under the hood,
but returns the Snippet object.  This allows you to chain different calls together.

If the third parameter is set to `true` it will call [`Attributes.set()`](./attributes#set) instead,
thereby overwriting the value of the attribute.

<Example part="snippet_attr">
An example of the Snippet.attr() method
</Example>

```js
let { Point, points, Snippet, snippets } = part.shorthand();

points.anchor = new Point(50, 15);
snippets.demo = new Snippet("logo", points.anchor)
  .attr("data-scale", 0.8)
  .attr("data-rotate", 180);
```
