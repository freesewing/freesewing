---
title: cutlist.setCut()
---

The `cutlist.setCut()` store method will remove all cutting instructions
from the part
and then add a set of cutting instructions for the part.
This information is not use by the core library, it is merely stored.

## Signature

`cutlist.setCut()` accepts either an object or an array of objects
with the following signature:

```js
undefined store.cutlist.setCut({
  Number cut,
  String from,
  Bool identical = false,
  Bool onBias = false,
  Bool onFold = false,
})
```

<Related>

Please see [cutlist.addCut()](/reference/store-methods/cutlist.addcut)
for detailed information about the object properties used by
`cutlist.setCut()`.

</Related>

## Example

<Example caption="An example of the cutlist.setCut() store method">
```js
({ Point, Path, paths, macro, store, part }) => {

	store.cutlist.addCut({cut: 2, from: 'fabric' })
	store.cutlist.setCut({cut: 2, from: 'lining' })

  macro('title', {
    nr: 9,
    title: 'The title',
    at: new Point(0,0),
    scale: 0.5,
  })

  // Prevent clipping
  paths.diag = new Path()
    .move(new Point(-10,-20))
    .move(new Point(80,35))

  return part
}
```
</Example>

