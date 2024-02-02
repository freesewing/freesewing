---
title: Pattern.draftPartForSet()
---

A pattern's `draftPartForSet()` method will draft a part using a
given set of settings.

<Note>This method is chainable as it returns the Pattern object</Note>

## Pattern.draftPartForSet() signature

```js
Pattern pattern.draftPartForSet(part, set)
```

## Pattern.draftPartForSet() example

```js
import { Aaron } from "@freesewing/aaron"

// Load a public test settings set from the FreeSewing backend
const set = (
  await (
    await fetch("https://backend3.freesewing.org/curated-sets/1.json")
  ).json()
)

const pattern = new Aaron()

for (const part in pattern.parts) {
  const svg = pattern.draftPartForSet(part, set).render()
}
```
