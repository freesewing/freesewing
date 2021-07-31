---
title: draft()
---

```js
Pattern pattern.draft()
``` 

Does the actual work of drafting the pattern.

Your draft method should return the pattern object, thus making it chainable.

```js
import freesewing from "@freesewing/core"
import aaron from "@freesewing/aaron"
import models from "@freesewing/models"

let pattern = new aaron({
  settings: {
    embed: true,
    measurements: models.manSize38
  } 
})

let svg = pattern.draft().render()
``` 

