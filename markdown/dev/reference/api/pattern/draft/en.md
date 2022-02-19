---
title: Pattern.draft()
---

A pattern's `draft()` method will draft all the different pattern parts
making sure to do so in the right order, handle dependencies, resolve
options to their absolute values and a number of other housekeeping things
that are required for the pattern to be drafted.

<Note>This method is chainable as it returns the Pattern object</Note>

## Pattern.draft() signature

```js
Pattern pattern.draft()
```

## Pattern.draft() example

```js
import Aaron from "@freesewing/aaron"
import models from "@freesewing/models"

const pattern = new Aaron({
  settings: {
    embed: true,
  },
  measurements: models.manSize38
})

const svg = pattern.draft().render()
```
