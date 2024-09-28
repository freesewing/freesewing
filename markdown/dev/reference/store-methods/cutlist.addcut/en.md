---
title: cutlist.addCut()
---

The `cutlist.addCut()` store method will add a set of cutting instructions for the part.
This information is not use by the core library, it is merely stored.

## Signature

`cutlist.addCut()` accepts either an object or an array of objects
with the following signature:

```js
undefined store.cutlist.addCut({
  Number cut,
  String from,
  Bool identical = false,
  Bool onBias = false,
  Bool onFold = false,
})
```

Pass an object or an array of objects to the `cutlist.addCut()`
method with any of the following keys;
any you don't provide will be filled with the defaults:

| Key | Type | Default | Description |
| :-- | :--- | :------ | :---------- |
| `cut` | Number\|false | 2 | The number of parts to cut from the specified material. Pass `false` to clear cutting instructions for the material |
| `from` | String | 'fabric' | The (translation key of the) material to cut from |
| `identical` | Boolean | false | Should even numbers of parts be cut in the same direction? The default (`false`) is to mirror them |
| `onBias` | Boolean | false | Should the parts be cut on the bias? |
| `onFold` | Boolean | false | Should the parts be cut on the fold? |

<Note>

You can use any `string` you want for your material, but here are some standard ones we provide translations for:

| Key   | Translation  |
|:--|:--|
| fabric | Main Fabric |
| lining | Lining |
| canvas | Canvas |
| interfacing | Interfacing |
| ribbing | Ribbing |

</Note>

## Example

<Example caption="An example of the cutlist.addCut() store method">
```js
({ Point, Path, paths, macro, store, part }) => {

	store.cutlist.addCut({cut: 2, from: 'fabric' })
	store.cutlist.addCut({cut: 2, from: 'lining' })

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
