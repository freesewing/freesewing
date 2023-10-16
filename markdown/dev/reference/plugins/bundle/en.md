---
title: plugin-bundle
---

Published as [@freesewing/plugin-bundle][1], this plugin bundles the most
commonly used FreeSewing time plugins in one handy package.

Specifically, loading this plugin will have the same effect as loading these
plugins individually:


- [plugin-annotations](/reference/plugins/annotations)
- [plugin-measurements](/reference/plugins/measurements) : Make extra, calculated measurements available to your patterns
- [plugin-mirror](/reference/plugins/mirror) : Mirror points and paths in your patterns
- [plugin-round](/reference/plugins/round) : Create rounded corners in your patterns
- [plugin-sprinkle](/reference/plugins/sprinkle) : Add multiple snippets to your patterns

## Installation

```bash
npm install @freesewing/plugin-bundle
```

## Usage

Either [add it as a part plugins](/reference/api/part/config/plugins) in your
design, or [add it to a pattern instance with
Pattern.use()](/reference/api/pattern/use).

To import the plugin for use:
```js
import { bundlePlugin } from '@freesewing/plugin-bundle'
// or
import { pluginBundle } from '@freesewing/plugin-bundle'
```

[1]: https://www.npmjs.com/package/@freesewing/plugin-bundle
