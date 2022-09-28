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
```

See [the plugin guide](/guides/plugins/) for details on how to structure
you plugin object.

## Pattern.use() example

```js
import { Aaron } from "@freesewing/aaron"
import { cisFemaleAdult34 } from "@freesewing/models"
import { pluginTheme } from "@freesewing/plugin-theme"

const pattern = new Aaron({
  measurements: cisFemaleAdult34
}).use(pluginTheme)

const svg = pattern.draft().render()
```
