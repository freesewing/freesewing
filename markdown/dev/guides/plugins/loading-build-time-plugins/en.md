---
title: Loading build-time plugins
order: 20
---

Build-time plugins are loaded at build time, by passing them to
the [`freesewing.Design`](/reference/api/#design) constructor:

```js
import freesewing from "@freesewing/core"
import plugins from "@freesewing/plugin-bundle"
import config from "../config"

const Pattern = new freesewing.Design(config, plugins)
```

If you have multiple plugins to load, you can pass them as an array:

```js
import freesewing from "@freesewing/core"
import plugins from "@freesewing/plugin-bundle"
import gorePlugin from "@freesewing/plugin-gore"
import config from "../config"

const Pattern = new freesewing.Design(config, [plugins, gorePlugin] )
```
