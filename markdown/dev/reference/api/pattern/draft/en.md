---
title: Pattern.draft()
---

A pattern's `draft()` method will draft the different pattern parts
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
import { Aaron } from "@freesewing/aaron"
import { cisFemaleAdult34 } from "@freesewing/models"

const pattern = new Aaron({
  measurements: cisFemaleAdult34
})

const svg = pattern.draft().render()
```
