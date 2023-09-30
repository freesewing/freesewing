---
title: buttonhole
---

The `buttonhole` snippet is used to mark buttonhole placement.
This particular snippet places the buttonhole centrally on its
anchor point.

It is provided by [plugin-annotations](/reference/plugins/annotations/).


## Example

<Example caption="An example of the buttonhole snippet">
```js
({ Point, Path, paths, Snippet, snippets, part }) => {

  snippets.demo = new Snippet('buttonhole', new Point(0,0))

  // Show alignment
  paths.anchor = new Path()
    .move(new Point(-5, 0))
    .line(new Point(5, 0))
    .addClass('dotted note stroke-sm')

  // Prevent clipping
  paths.diag = new Path()
    .move(new Point(-50,-4))
    .move(new Point(50,4))

  return part
}
```
</Example>

## Notes

We provide three buttonhole snippets with a different alignment:

- [buttonhole](/reference/snippets/buttonhole/): Anchor point is the middle of the buttonhole
- [buttonhole-start](/reference/snippets/buttonhole-start/): Anchor point is the start of the buttonhole
- [buttonhole-end](/reference/snippets/buttonhole-end/): Anchor point is the end of the buttonhole
