---
title: bnotch
---

The `bnotch` snippet is intended for notches at the back, or when you
need an alternative to the default `notch`.

It is provided by [plugin-notches](/reference/plugins/notches/).

## Example

<Example caption="An example of the bnotch snippet">
```js
({ Point, Path, paths, Snippet, snippets, part }) => {

  snippets.demo = new Snippet('bnotch', new Point(0,0))

  // Prevent clipping
  paths.diag = new Path()
    .move(new Point(-50,-4))
    .move(new Point(50,4))

  return part
}
```
</Example>

