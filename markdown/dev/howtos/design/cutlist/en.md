---
title: "Include Cutting Instructions"
---

To include cutting instructions with your part, use the [annotations plugin](/reference/plugins/annotations) to add the [`cutlist.addCut` method](/reference/plugins/cutlist#addcut) to your part's [`store`](/reference/api/store/extend)

<Tip>The [grainline macro](/reference/macros/grainline) and the [cutonfold macro](/reference/macros/cutonfold) will automatically add grain and fold information to the cutting instructions </Tip>

<Tip>These cutting instructions get used by the [title macro](/reference/macros/title), so be sure to add them before adding your part's title. </Tip>

<Note>
	<details>
	<summary>addCut() Parameters</summary>

Pass an object to the `store.cutlist.addCut` method with any of the following keys; any you don't provide will be filled with the defaults:

| Key | Type | Default | Description |
| :-- | :--- | :------ | :---------- |
| cut | Number\|false | 2 | the number of pieces to cut from the specified material. Pass `false` to clear all cutting instructions for the material |
| material | String | 'fabric' | the translation key of the material to cut from |
| identical | Boolean | false | should even numbers of pieces be cut in the same direction? false for mirrored |
| bias | Boolean | false | should the pieces in these cutting instructions be cut on the bias? false uses grainline instruction or leaves orientation as is |
| ignoreOnFold | Boolean | false | should these cutting instructions ignore any cutOnFold information set by the part |


You can use any `string` you want for your material, but here are some standard ones we have translation for

| Key   | Translation  |
|:--|:--|
| fabric | Main Fabric |
| lining | Lining |
| canvas | Canvas |
| lmhCanavas | Light to Medium Hair Canvas |
| heavyCanvas | Heavyweight Hair Canvas |
| interfacing | Interfacing |
| plastic | Plastic |
| ribbing | Ribbing |

</details>
</Note>


## Basic Usage
For simple cutting instructions, you can rely on the default method parameters

```js
import { pluginAnnotations } from '@freesewing/plugin-cutlist'

const part = {
	name: 'example.front',
	plugins: [pluginAnnotations],
	draft: ({part, store}) => {
		// add instructions to cut two mirrored from main fabric
		store.cutlist.addCut()
	}
}
```

## Intermediate Usage
For many designs, you'll want more than just "Cut 2 mirrored from Main Fabric"

### Specifying materials, number of pieces, orientation

You can override the default values to specify different materials, number of pieces to cut, and whether they should be mirrored or identical

```js
import { pluginAnnotations } from '@freesewing/plugin-cutlist'

const part = {
	name: 'example.front',
	plugins: [pluginAnnotations],
	draft: ({part, store}) => {
		// add instructions to cut three identical from lining
		store.cutlist.addCut({cut: 3, material: 'lining', identical: true})
	}
}
```

### Instructions for multiple materials
You can add as many sets of instructions as you need

```js
import { pluginAnnotations } from '@freesewing/plugin-cutlist'

const part = {
	name: 'example.front',
	plugins: [pluginAnnotations],
	draft: ({part, store}) => {
		// add instructions to cut four mirrored from main fabric
		store.cutlist.addCut({cut: 4})
		// add instructions to cut three identical from lining
		store.cutlist.addCut({cut: 3, material: 'lining', identical: true})
	}
}
```

## Advanced usage

### Cut some on the fold, some not
Sometimes you want some pieces cut on the fold and others cut as halves to seam together.

```js
import { pluginAnnotations } from '@freesewing/plugin-cutlist'

const part = {
	name: 'example.front',
	plugins: [pluginAnnotations],
	draft: ({part, points, Point, macro, store}) => {
		// set the cut on fold line
		points.p1 = new Point(0, 0)
		points.p2 = new Point(0, 10)

		// pieces should be cut on the fold
		macro('cutonfold', {from: points.p1, to: points.p2})

		// cut two on the fold
		store.cutlist.addCut()
		// cut two, not on the fold
		store.cutlist.addCut({cut: 2, ignoreOnFold: true})
	}
}
```


### Cut some on the grain, some on the bias
You set the grainline on a piece, but you also need some to be cut on the bias

```js
import { pluginAnnotations } from '@freesewing/plugin-cutlist'

const part = {
	name: 'example.front',
	plugins: [pluginAnnotations],
	draft: ({part, points, Point, macro, store}) => {
		// set the cut on fold line
		points.p1 = new Point(0, 0)
		points.p2 = new Point(0, 10)

		// the grain runs from p1 to p2
		macro('grainline', {from: points.p1, to: points.p2})

		// cut two mirrored on the grain
		store.cutlist.addCut()
		// cut two mirrored on the bias
		store.cutlist.addCut({cut: 2, bias: true})
	}
}
```
