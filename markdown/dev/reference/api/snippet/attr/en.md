---
title: Snippet.attr()
---

The `Snippet.attr()` method can be used to add attributes to the Snippet
object.  It calls `this.attributes.add()` under the hood, and returns the
Snippet object.

If the third parameter is set to `true` it will call `this.attributes.set()`
instead, thereby overwriting the value of the attribute.

## Signature

```js
Snippet snippet.attr(
  string name, 
  mixed value, 
  bool overwrite = false
)
```

<Tip compact>This method is chainable as it returns the `Snippet` object</Tip>

## Example

<Example caption="An example of the Snippet.attr() method">
```js
({ Point, points, Path, paths, Snippet, snippets, part }) => {

  snippets.logo = new Snippet('logo', new Point(0,0))
    .attr("data-scale", 0.75)
    .attr("data-rotate", 180)

  // Prevent clipping
  paths.diag = new Path()
    .move(new Point(-25,-10))
    .move(new Point(25,35))

  return part
}
```
</Example>

<Related>
See [Using Attributes](/howtos/code/attributes)
for information about what Attributes can be used with Snippets.
</Related>
