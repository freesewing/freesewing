---
title: button
---

The `button` snippet is used to mark button placement.

It is provided by [plugin-annotations](/reference/plugins/annotations/).

## Example

<Example caption="An example of the button snippet">
```js
({ Point, Path, paths, Snippet, snippets, part }) => {

  snippets.demo = new Snippet('button', new Point(0,0))

  // Prevent clipping
  paths.diag = new Path()
    .move(new Point(-50,-4))
    .move(new Point(50,4))

  return part
}
```
</Example>

