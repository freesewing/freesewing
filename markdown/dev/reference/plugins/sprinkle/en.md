---
title: plugin-sprinkle
---

Published as [@freesewing/plugin-sprinkle][1], this plugin provides [the
sprinkle macro](/reference/macros/sprinkle) which is a faster way to add
several of the same snippets to your designs (think of it as _sprinkling_ them
onto your design).

## Installation

```sh
npm install @freesewing/plugin-sprinkle
```

## Usage

Either [add it as a part plugins](/reference/api/part/config/plugins) in your
design, or [add it to a pattern instance with
Pattern.use()](/reference/api/pattern/use).

To import the plugin for use:
```js
import { sprinklePlugin } from '@freesewing/plugin-sprinkle'
// or
import { pluginSprinkle } from '@freesewing/plugin-sprinkle'
```

## Notes

The sprinkle plugin is part of our [core-plugins bundle](/reference/plugins/core)

[1]: https://www.npmjs.com/package/@freesewing/plugin-sprinkle
