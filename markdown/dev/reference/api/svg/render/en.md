---
title: Svg.render()
---

The `Svg.render()` method will render a drafted
[Pattern](/reference/core/pattern) as SVG.

## Signature

```js
string svg.render()
```

## Svg.render() example

```
import { Aaron } from "@freesewing/aaron"

// Load some public test measurements from the FreeSewing backend
const measurements = (
  await (
    await fetch("https://backend3.freesewing.org/curated-sets/1.json")
  ).json()
).measurements

const pattern = new Aaron({ measurements })

const svg = new Svg(pattern).render()
```
