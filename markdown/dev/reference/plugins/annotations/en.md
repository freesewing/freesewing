---
title: plugin-annotations
---

Published as [@freesewing/plugin-annotations][1], this plugin provides a
variety of macros and snippets to annotate designs. 

The annotations plugin provides the following snippets:

- [button](/reference/snippets/button)
- [buttonhole](/reference/snippets/button)
- [buttonhole-start](/reference/snippets/button)
- [buttonhole-end](/reference/snippets/button)
- [logo](/reference/snippets/logo)
- [notch](/reference/snippets/button)
- [bnotch](/reference/snippets/button)

The annotations plugin provides the following macros:

- [banner](/reference/macros/banner)
- [bannerbox](/reference/macros/bannerbox)
- [bartack](/reference/macros/bartack)
- [bartackAlong](/reference/macros/bartackalong)
- [bartackFractionAlong](/reference/macros/bartackfractionalong)
- [crossbox](/reference/macros/crossbox)
- [cutonfold](/reference/macros/cutonfold)
- [hd](/reference/macros/hd)
- [ld](/reference/macros/ld)
- [rmad](/reference/macros/rmad)
- [rmd](/reference/macros/rmd)
- [pd](/reference/macros/pd)
- [pleat](/reference/macros/pleat)
- [scalebox](/reference/macros/scalebox)
- [sewTogether](/reference/macros/setogether)
- [title](/reference/macros/title)
- [vd](/reference/macros/vd)

## Installation

```sh
npm install @freesewing/plugin-annotations
```

## Usage

Either [add it as a part plugin](/reference/api/part/config/plugins) in your
design, or [add it to a pattern instance with
Pattern.use()](/reference/api/pattern/use).

To import the plugin for use:
```js
import { annotationsPlugin } from '@freesewing/plugin-banner'
// or
import { pluginAnnotations } from '@freesewing/plugin-banner'
```

## Notes

The annotations plugin is part of our [plugin-bundle](/reference/plugins/bundle)

[1]: https://www.npmjs.com/package/@freesewing/plugin-annotations
