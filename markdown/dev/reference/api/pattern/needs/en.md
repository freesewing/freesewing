---
title: Pattern.needs()
---

A pattern's `needs()` method will return `true` or `false` 
depending on whether a pattern part is a requirement for the 
pattern to be drafted in its current configuration. In other
words, it will return `true` of the part is *needed*. 

A part is needed if:

 - it is requested by the user in [the `only` pattern setting](/reference/settings/only/)
 - it is a dependency of a part requested by the user in [the `only` pattern setting](/reference/settings/only/)
 - [the `only` pattern setting](/reference/settings/only/) is not set or is `false`, and the part is not hidden

<Note>

You don't typically use this method. Instead, you configure part
dependencies in your [configuration file](/reference/config/).

</Note>

## Pattern.needs() signature

```js
bool pattern.needs(string partName)
``` 

## Pattern.needs() example

```js
import Aaron from "@freesewing/aaron"
import models from "@freesewing/models"

const pattern = new Aaron({
  settings: {
    embed: true,
  },
  measurements: models.manSize38
})

if (pattern.needs('front')) console.log('Front is needed')
else console.log('Front is not needed')
``` 



