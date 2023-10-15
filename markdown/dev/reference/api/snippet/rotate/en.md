---
title: Snippet.rotate()
---

The `Snippet.rotate()` method allows you to scale a snippet. Under the hood, it
sets the `data-rotate` property.

## Signature

```js
Snippet snippet.rotate(rotation, overwrite=true)
```

<Tip compact>This method is chainable as it returns the `Snippet` object</Tip>

## Example

<Example caption="An example of the Snippet.rotate() method">
```js
({ Point, Path, paths, Snippet, snippets, part }) => {

  for (const i of [0,1,2,3,4,5,6]) {
    snippets[`demo${i}`] = new Snippet(
      "logo", 
      new Point(60*i, 0)
    ).rotate(60 * i)
  }

  // Prevent clipping
  paths.diag = new Path()
    .move(new Point(-30,-50))
    .move(new Point(400,50))

  return part
}
```
</Example>

