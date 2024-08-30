---
title: cutlist.getCutFabrics()
---

The `cutlist.getCutFabrics()` store method will retrieve the stored
list of fabrics used by the pattern for given settings.

## Signature

```js
Array store.cutlist.getCutFabrics(settings)
```

The `custlist.getCutFabrics()` method returns an array of strings
containing the material names.

## Example

<Example caption="An example of the cutlist.getCutFabrics() store method">
```js
({ Point, points, Path, paths, store, context, part }) => {

	store.cutlist.addCut({cut: 2, from: 'fabric' })
	store.cutlist.addCut({cut: 2, from: 'lining' })

    const materials = store.cutlist.getCutFabrics(context.settings)

    let y = 0
    points.header = new Point(0, y).addText('Materials used:')
    for (let material of materials) {
      y += 8
      points[material] = new Point(5, y).addText(material)
    }

  // Prevent clipping
  paths.diag = new Path()
    .move(new Point(-10,-20))
    .move(new Point(80,35))

  return part
}
```
</Example>
