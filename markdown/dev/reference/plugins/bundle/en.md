---
title: plugin-bundle
---

Published as [@freesewing/plugin-bundle][1], this plugin bundles the most
commonly used FreeSewing time plugins in one handy package.

Specifically, loading this plugin will have the same effect as loading these
plugins individually:

- [plugin-banner](/reference/plugins/banner) : Add repeating text to your patterns
- [plugin-bartack](/reference/plugins/bartack) : Add bartacks to your patterns
- [plugin-buttons](/reference/plugins/buttons) : Add buttons, buttonholes, and snaps to your patterns
- [plugin-cutonfold](/reference/plugins/cutonfold) : Add cut-on-fold indicators to your patterns
- [plugin-dimension](/reference/plugins/dimension) : Add dimensions to your (paperless) patterns
- [plugin-grainline](/reference/plugins/grainline) : Add grainline indicators to your patterns
- [plugin-logo](/reference/plugins/logo) : Add a FreeSewing logo to your patterns
- [plugin-measurements](/reference/plugins/measurements) : Make extra, calculated measurements available to your patterns
- [plugin-mirror](/reference/plugins/mirror) : Mirror points and paths in your patterns
- [plugin-notches](/reference/plugins/notches) : Add notches to your patterns
- [plugin-scalebox](/reference/plugins/scalebox) : Add scaleboxes to your pattern parts
- [plugin-round](/reference/plugins/round) : Create rounded corners in your patterns
- [plugin-sprinkle](/reference/plugins/sprinkle) : Add multiple snippets to your patterns
- [plugin-title](/reference/plugins/title) : Add pretty titles to your pattern parts

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
