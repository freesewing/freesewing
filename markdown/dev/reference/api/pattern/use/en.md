---
title: Pattern.use()
---

A pattern's `use()` method will load a FreeSewing plugin.
Plugins are a way to extend a pattern's functionality, and can be
loaded both at build-time and at run-time. This method only applies
to run-time plugins. For more details, refer to [the plugin guide](/guides/plugins/).

<Note>This method is chainable as it returns the Pattern object</Note>

## Pattern.use() signature

```js
Pattern pattern.use(object plugin)
```

See [the plugin guide](/guides/plugins/) for details on how to structure
you plugin object.

## Pattern.use() example

```js
import Aaron from "@freesewing/aaron"
import models from "@freesewing/models"
import theme from "@freesewing/theme"

const pattern = new Aaron({
  settings: {
    embed: true,
  },
  measurements: models.manSize38
}).use(theme)

const svg = pattern.draft().render()
```
