---
title: clone()
---

```js
Snippet snippet.clone()
```

Returns a new Snippets object that is a deep copy of this one.

<Example part="snippet_clone">
An example of the Snippet.clone() method
</Example>


```js
let { Point, points, Snippet, snippets } = part.shorthand();

points.anchor = new Point(35, 35);
snippets.demo = new Snippet("logo", points.anchor)
  .attr("style", "color: #f006");

snippets.clone = snippets.demo
  .clone()
  .attr("data-scale", 0.5);
```
