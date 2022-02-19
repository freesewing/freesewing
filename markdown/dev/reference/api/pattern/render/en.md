---
title: Pattern.render()
---

A pattern's `render()` method will render the pattern to SVG and return
the SVG as a string. It should only ever be called after calling
[Pattern.draft()](/reference/api/pattern/draft/) first.

# Pattern.render() signature

```js
string pattern.render()
```

# Pattern.render() example

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
