---
title: Pattern.use()
---

The `Pattern.use()` method will load a FreeSewing plugin.
Plugins are a way to extend a pattern's functionality.
For more details, refer to [the plugin guide](/guides/plugins/).

<Note>This method is chainable as it returns the Pattern object</Note>

## Pattern.use() signature

```js
Pattern pattern.use(object plugin)
// or
Pattern pattern.use(object plugin, object plugin_data)
```

See [the plugin guide](/guides/plugins/) for details on how to structure
you plugin object.

## Pattern.use() example

```js
import { Aaron } from "@freesewing/aaron"
import { pluginTheme } from "@freesewing/plugin-theme"

// Load some public test measurements from the FreeSewing backend
const measurements = (
  await (
    await fetch("https://backend3.freesewing.org/curated-sets/1.json")
  ).json()
).measurements

const pattern = new Aaron({ measurements }).use(pluginTheme)

const svg = pattern.draft().render()
```
