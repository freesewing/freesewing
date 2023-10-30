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

// Load some public test measurements from the FreeSewing backend
const measurements = (
  await (
    await fetch("https://backend3.freesewing.org/curated-sets/1.json")
  ).json()
).measurements

const pattern = new Aaron({ measurements })

const svg = pattern.draft().render()
```
