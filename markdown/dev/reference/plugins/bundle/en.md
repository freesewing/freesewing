---
title: "@freesewing/plugin-bundle"
---

The **@freesewing/plugin-bundle** plugin bundles the most common FreeSewing build-time plugins:

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

Almost all patterns use these plugins, so it made sense to bundle them.

## Installation

```bash
npm install @freesewing/plugin-bundle
```

## Usage

Like all [build-time plugins](/guides/plugins/types-of-plugins#build-time-plugins), you
load them by passing them to the [freesewing.Design](/reference/api/design) super-constructor:

```js
import freesewing from "@freesewing/core";
import plugins from "@freesewing/plugin-bundle";
import config from "../config";

const Pattern = new freesewing.Design(config, plugins);
```
