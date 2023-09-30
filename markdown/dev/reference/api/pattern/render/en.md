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
import { cisFemaleAdult34 } from "@freesewing/models"

const pattern = new Aaron({
  measurements: cisFemaleAdult34
})

const svg = pattern.draft().render()
```
