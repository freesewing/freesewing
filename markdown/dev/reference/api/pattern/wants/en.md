---
title: wants()
---

A pattern's `wants()` method will return `true` or `false` 
depending on whether a pattern part is requested in the 
current pattern configuration. In other words, it will 
return `true` of the part is *wanted* by the user. 

A part is wanted if:

 - it is requested by the user in [the `only` pattern setting](/reference/settings/only/)
 - [the `only` pattern setting](/reference/settings/only/) is not set or is `false`, and the part is not hidden

<Note>

You don't typically use this method. Instead, you configure part
dependencies in your [configuration file](/reference/config/).

</Note>

## Pattern.wants() signature

```js
bool pattern.wants(string partName)
``` 

## Pattern.wants() example

```js
import Aaron from "@freesewing/aaron"
import models from "@freesewing/models"

const pattern = new Aaron({
  settings: {
    embed: true,
  },
  measurements: models.manSize38
})

if (pattern.wants('front')) console.log('Front is wanted')
else console.log('Front is not wanted')
``` 

