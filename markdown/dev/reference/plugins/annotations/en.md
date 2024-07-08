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
- [rmsewTogether](/reference/macros/rmsewtogether)
- [rmtitle](/reference/macros/rmtitle)
- [pd](/reference/macros/pd)
- [pleat](/reference/macros/pleat)
- [scalebox](/reference/macros/scalebox)
- [sewTogether](/reference/macros/sewtogether)
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

