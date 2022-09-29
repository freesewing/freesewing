---
title: Snippet.clone()
---

The `Snippet.clone()` method returns a new Snippets object that is a deep copy
of this one.

## Signature

```js
Snippet snippet.clone()
```

## Example

<Example caption="An example of the Snippet.clone() method">
```js
({ Point, Path, paths, Snippet, snippets, part }) => {

  snippets.demo = new Snippet("logo", new Point(0,0))
    .attr("style", "color: #f006")
  
  snippets.clone = snippets.demo
    .clone()
    .attr("data-scale", 0.5)

  // Prevent clipping
  paths.diag = new Path()
    .move(new Point(-25,-30))
    .move(new Point(25,15))

  return part
}
```
</Example>

