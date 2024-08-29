---
title: plugin-bin-pack
---

Published as [@freesewing/plugin-bin-pack][1], this plugin provides
an optimized [pack()](/reference/store-methods/pack) store method which
automatically lays out pattern parts.

## Installation

```sh
npm install @freesewing/plugin-bin-pack
```

## Usage

Either [add it as a part plugins](/reference/api/part/config/plugins) in your
design, or [add it to a pattern instance with
Pattern.use()](/reference/api/pattern/use).

To import the plugin for use:
```js
import { packPlugin } from '@freesewing/plugin-bin-pack'
// or
import { binPackPlugin } from '@freesewing/plugin-bin-pack'
// or
import { binpackPlugin } from '@freesewing/plugin-bin-pack'
```

## Notes

This plugin is part of [core-plugins](/reference/plugins/core),
so there is no need to load it manually unless you wish to forego
loading of core plugins yet still want to load this plugin.

[1]: https://www.npmjs.com/package/@freesewing/plugin-bin-pack
