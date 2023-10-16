---
title: snap-socket
---

The `snap-socket` snippet is used to mark the socket part of a snap button.

It is provided by [plugin-annotations](/reference/plugins/annotations/).

## Example

<Example caption="An example of the snap-socket snippet">
```js
({ Point, Path, paths, Snippet, snippets, part }) => {

  snippets.demo = new Snippet('snap-socket', new Point(0,0))

  // Prevent clipping
  paths.diag = new Path()
    .move(new Point(-50,-4))
    .move(new Point(50,4))

  return part
}
```
</Example>

