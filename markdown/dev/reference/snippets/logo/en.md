---
title: logo
---

The `logo` snippet inserts the FreeSewing logo.

It is provided by [plugin-annotations](/reference/plugins/annotations/).

## Example

<Example caption="An example of the logo snippet">
```js
({ Point, Path, paths, Snippet, snippets, part }) => {

  snippets.demo = new Snippet('logo', new Point(0,0))

  // Prevent clipping
  paths.diag = new Path()
    .move(new Point(-100,-40))
    .move(new Point(100,20))

  return part
}
```
</Example>

