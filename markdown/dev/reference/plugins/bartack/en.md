---
title: plugin-bartack
---

Published as [@freesewing/plugin-bartack][1], this plugin provides 
the [bartack](/reference/macros/bartack),
[bartackAlong](/reference/macros/bartackalong), and
the [bartackFractionAlong](/reference/macros/bartackfractionalong) macros
which allows you to add bartacks — a set
of tight zig-zag stitches used to enforce a seam — to your design.

## Installation

```sh
npm install @freesewing/plugin-bartack
```

## Usage

Either [add it as a part plugins](/reference/api/part/config/plugins) in your
design, or [add it to a pattern instance with
Pattern.use()](/reference/api/pattern/use).

To import the plugin for use:
```js
import { bartackPlugin } from '@freesewing/plugin-bartack'
// or
import { pluginBartack } from '@freesewing/plugin-bartack'
```

## Notes

The bartack plugin is part of our [plugin-bundle](/reference/plugins/bundle)

[1]: https://www.npmjs.com/package/@freesewing/plugin-bartack
