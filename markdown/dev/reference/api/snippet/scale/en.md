---
title: Snippet.scale()
---

The `Snippet.scale()` method allows you to scale a snippet. Under the hood, it
sets the `data-scale` property.

## Signature

```js
Snippet snippet.scale(scale, overwrite=true)
```

<Tip compact>This method is chainable as it returns the `Snippet` object</Tip>

## Example

<Example caption="An example of the Snippet.clone() method">
```js
({ Point, Path, paths, Snippet, snippets, part }) => {

  for (const i of [1,2,3,4,5,6]) {
    snippets[`demo${i}`] = new Snippet(
      "logo", 
      new Point(30*i, 0)
    ).scale(i/10)
  }

  // Prevent clipping
  paths.diag = new Path()
    .move(new Point(0,-30))
    .move(new Point(200,20))

  return part
}
```
</Example>

