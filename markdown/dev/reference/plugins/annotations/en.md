---
title: plugin-annotations
---

Published as [@freesewing/plugin-annotations][1], this plugin provides a
variety of snippets, macros, and store methods to annotate designs. 

It is part of [core-plugins](/reference/plugins/core) (so it is available by default).

## Snippets
The annotations plugin provides the following snippets:

- [bnotch](/reference/snippets/button)
- [button](/reference/snippets/button)
- [buttonhole](/reference/snippets/button)
- [buttonhole-end](/reference/snippets/button)
- [buttonhole-start](/reference/snippets/button)
- [eyelet](/reference/snippets/eyelet)
- [logo](/reference/snippets/logo)
- [notch](/reference/snippets/button)
- [snap-stud](/reference/snippets/snap-stud)
- [snap-socket](/reference/snippets/snap-socket)

## Macros
The annotations plugin provides the following macros:

- [banner](/reference/macros/banner)
- [bannerbox](/reference/macros/bannerbox)
- [bartack](/reference/macros/bartack)
- [bartackAlong](/reference/macros/bartackalong)
- [bartackFractionAlong](/reference/macros/bartackfractionalong)
- [crossbox](/reference/macros/crossbox)
- [cutonfold](/reference/macros/cutonfold)
- [grainline](/reference/macros/grainline)
- [hd](/reference/macros/hd)
- [ld](/reference/macros/ld)
- [rmad](/reference/macros/rmad)
- [rmahd](/reference/macros/rmahd)
- [rmald](/reference/macros/rmald)
- [rmapd](/reference/macros/rmapd)
- [rmavd](/reference/macros/rmavd)
- [rmbanner](/reference/macros/rmbanner)
- [rmbannerbox](/reference/macros/rmbannerbox)
- [rmbartack](/reference/macros/rmbartack)
- [rmbartackAlong](/reference/macros/rmbartackalong)
- [rmbartackFractionAlong](/reference/macros/rmbartackfractionalong)
- [rmcrossbox](/reference/macros/rmcrossbox)
- [rmcutonfold](/reference/macros/rmcutonfold)
- [rmgrainline](/reference/macros/rmgrainline)
- [rmahd](/reference/macros/rmahd)
- [rmald](/reference/macros/rmald)
- [rmapd](/reference/macros/rmapd)
- [rmavd](/reference/macros/rmavd)
- [rmhd](/reference/macros/rmhd)
- [rmld](/reference/macros/rmld)
- [rmpd](/reference/macros/rmpd)
- [rmvd](/reference/macros/rmvd)
- [rmpleat](/reference/macros/rmpleat)
- [rmscalebox](/reference/macros/rmscalebox)
- [rmsewTogether](/reference/macros/rmsetogether)
- [rmtitle](/reference/macros/rmtitle)
- [pd](/reference/macros/pd)
- [pleat](/reference/macros/pleat)
- [scalebox](/reference/macros/scalebox)
- [sewTogether](/reference/macros/setogether)
- [title](/reference/macros/title)
- [vd](/reference/macros/vd)

## Store methods
The annotations plugin also provides store methods:

- [flag.error()](/reference/store-methods/flag.error)
- [flag.fixme()](/reference/store-methods/flag.fixme)
- [flag.info()](/reference/store-methods/flag.info)
- [flag.note()](/reference/store-methods/flag.note)
- [flag.preset()](/reference/store-methods/flag.preset)
- [flag.tip()](/reference/store-methods/flag.tip)
- [flag.warn()](/reference/store-methods/flag.warn)
- [unflag.error()](/reference/store-methods/unflag.error)
- [unflag.fixme()](/reference/store-methods/unflag.fixme)
- [unflag.info()](/reference/store-methods/unflag.info)
- [unflag.note()](/reference/store-methods/unflag.note)
- [unflag.preset()](/reference/store-methods/unflag.preset)
- [unflag.tip()](/reference/store-methods/unflag.tip)
- [unflag.warn()](/reference/store-methods/unflag.warn)

## Installation

<Note>

This plugin is part of [core-plugins](/reference/plugins/core), so there is no
need to install it manually unless you want to forego loading of core plugins,
yet still want to load this plugin.
</Note>

```sh
npm install @freesewing/plugin-annotations
```

## Usage

<Note>

This plugin is part of [core-plugins](/reference/plugins/core), so there is no
need to load it manually unless you want to forego loading of core plugins,
yet still want to load this plugin.
</Note>

Either [add it as a part plugin](/reference/api/part/config/plugins) in your
design, or [add it to a pattern instance with
Pattern.use()](/reference/api/pattern/use).

To import the plugin for use:
```js
import { plugin } from '@freesewing/plugin-annotations'
```

## Methods

### store.cutlist.addCut

The `store.cutlist.addCut()` method will add a set of cutting instructions for the part

#### Signature
```js
store.cutlist.addCut(Object so)
````

Pass an object to the `store.cutlist.addCut` method with any of the following keys; any you don't provide will be filled with the defaults:

| Key | Type | Default | Description |
| :-- | :--- | :------ | :---------- |
| cut | Number\|false | 2 | the number of pieces to cut from the specified material. Pass `false` to clear all cutting instructions for the material |
| material | String | 'fabric' | the translation key of the material to cut from |
| identical | Boolean | false | should even numbers of pieces be cut in the same direction? false for mirrored |
| bias | Boolean | false | should the pieces in these cutting instructions be cut on the bias |
| ignoreOnFold | Boolean | false | should these cutting instructions ignore any cutOnFold information set by the part |

<Note>
	<details>
		<summary> You can use any `string` you want for your material, but here are some standard ones we have translation for </summary>
		<div>

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

</div>
</details>
</Note>

#### Example

```js
import {pluginCutlist} from '@freesewing/plugin-cutlist'

const part = {
	name: 'example.front',
	plugins: [pluginCutlist],
	draft: ({part, store}) => {
		// add instructions to cut two from main fabric
		store.cutlist.addCut()
		// add instructions to cut four on the bias from lining
		store.cutlist.addCut({cut: 4, material: 'lining', bias: true, })
		return part
	}
}
```

You can also add multiple sets of cutting instructions for the same material
```js
import {pluginCutlist} from '@freesewing/plugin-cutlist'

const part = {
	name: 'example.front',
	plugins: [pluginCutlist],
	draft: ({part, store}) => {
		// add instructions to 1 from lining
		store.cutlist.addCut({cut: 1, material: 'lining'})
		// add instructions to cut 1 on the bias from lining
		store.cutlist.addCut({cut: 1, material: 'lining', bias: true, })
		return part
	}
}
```

### store.cutlist.removeCut

The `store.cutlist.removeCut()` method will remove cutting instructions from the part

#### Signature

```js
store.cutlist.removeCut(String material)
```

#### Example
```js
import {pluginCutlist} from '@freesewing/plugin-cutlist'

const part = {
	name: 'example.front',
	plugins: [pluginCutlist],
	draft: ({part, store}) => {
		// remove all cutting instructions for all materials
		store.cutlist.removeCut()

		// remove cutting instructions for just one material
		store.cutlist.removeCut('fabric')
		return part
	}
}
```
### store.cutlist.setGrain

The `store.cutlist.setGrain()` method will record the angle of the grainline annotation. This method is called internally by [`plugin-grainline`](/reference/plugins/grainline) to store information for cutting layout tools. You shouldn't have to call it, but it's there if you need it.

#### Signature

```js
store.cutlist.setGrain(Number grainAngle)
```

#### Example
```js
import {pluginCutlist} from '@freesewing/plugin-cutlist'

const part = {
	name: 'example.front',
	plugins: [pluginCutlist],
	draft: ({part, store}) => {
		// set the grainline angle
		store.cutlist.setGrain(0)
		return part
	}
}
```

### store.cutlist.setCutOnFold
The `store.cutlist.setCutOnFold()` method will record the points that make up the cut on fold line. This method is called internally by [`plugin-cutonfold`](/reference/plugins/cutonfold) to store information for cutting layout tools. You shouldn't have to call it, but it's there if you need it.

#### Signature

```js
store.cutlist.setCutOnFold(Point p1, Point p2)
```

#### Example
```js
import {pluginCutlist} from '@freesewing/plugin-cutlist'

const part = {
	name: 'example.front',
	plugins: [pluginCutlist],
	draft: ({part, points, Point, store}) => {
		// set the cut on fold line
		points.p1 = new Point(0, 0)
		points.p2 = new Point(0, 10)
		store.cutlist.setCutOnFold(points.p1, points.p2)
		return part
	}
}
```

## Notes

The annotations plugin is part of our [plugin-bundle](/reference/plugins/bundle)

[1]: https://www.npmjs.com/package/@freesewing/plugin-annotations
