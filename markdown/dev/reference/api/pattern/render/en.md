---
title: Pattern.render()
---

The `Pattern.render()` method will render the pattern to SVG and return
that SVG as a string. It should only be called after calling
[Pattern.draft()](/reference/api/pattern/draft/) first.

## Pattern.render() signature

```js
string pattern.render()
```

## Pattern.render() example

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
