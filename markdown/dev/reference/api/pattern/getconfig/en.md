---
title: Pattern.getConfig()
---

You can call `Pattern.getConfig()` to retrieve a pattern's runtime configuration.

Doing so will resolve all dependencies, load all the plugins, and do all other
housekeeping tasks that are typically done behind the scenes when you call
`Pattern.draft()`. But it will stop short of drafting the pattern, and instead
return a Pattern's internal configuration.

You can use this to see what options a pattern provides, what
measurments it requires, and so on.

## Pattern.getConfig() signature

```js
object pattern.getConfig()
```

## Pattern.getConfig() example

```js
import { Aaron } from "@freesewing/aaron"
import { cisFemaleAdult34 } from "@freesewing/models"

const pattern = new Aaron({
  measurements: cisFemaleAdult34
})

const config = pattern.getConfig()
```
