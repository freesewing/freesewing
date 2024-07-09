---
title: core-plugins
---

Published as [@freesewing/core-plugins][1], our core plugins bundles the most
commonly used FreeSewing plugins in one bundle that is loaded by the core
library by default. 

Specifically, loading this plugin will have the same effect as loading these
plugins individually:


- [plugin-annotations](/reference/plugins/annotations)
- [plugin-measurements](/reference/plugins/measurements) : Make extra, calculated measurements available to your patterns
- [plugin-mirror](/reference/plugins/mirror) : Mirror points and paths in your patterns
- [plugin-round](/reference/plugins/round) : Create rounded corners in your patterns
- [plugin-sprinkle](/reference/plugins/sprinkle) : Add multiple snippets to your patterns
- [plugin-binpack](https://github.com/freesewing/freesewing/tree/develop/plugins/plugin-bin-pack) : The default bin packing algorithm used to handle auto-generated layouts in core

## Installation

```bash
npm install @freesewing/core-plugins
```

## Usage

The core plugins are loaded by default so there is nothing to be done to use them.

If you do not want to load the core plugins, pass `noCorePlugins: true` to your Design constructor:

```mjs
const design = new Design({ 
  parts: myParts, 
  noCorePlugins: true 
})
```

[1]: https://www.npmjs.com/package/@freesewing/core-plugins
