---
title: notch
---

The `notch` snippet is intended for notches.

It is provided by [plugin-annotations](/reference/plugins/annotations/).

## Example

<Example caption="An example of the notch snippet">
```js
({ Point, Path, paths, Snippet, snippets, part }) => {

  snippets.demo = new Snippet('notch', new Point(0,0))

  // Prevent clipping
  paths.diag = new Path()
    .move(new Point(-50,-4))
    .move(new Point(50,4))

  return part
}
```
</Example>

