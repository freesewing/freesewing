---
title: snap-stud
---

The `snap-stud` snippet is used to mark the stud part of a snap button.

It is provided by [plugin-annotations](/reference/plugins/annotations/).
## Example

<Example caption="An example of the snap-stud snippet">
```js
({ Point, Path, paths, Snippet, snippets, part }) => {

  snippets.demo = new Snippet('snap-stud', new Point(0,0))

  // Prevent clipping
  paths.diag = new Path()
    .move(new Point(-50,-4))
    .move(new Point(50,4))

  return part
}
```
</Example>

