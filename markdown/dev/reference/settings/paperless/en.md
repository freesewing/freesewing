---
title: paperless
---

The `paperless` setting allows you to generate a variant of the pattern
that does not require you to print it. It does that by including dimensions
on the pattern, as wel as a grid overlay.

## Signature

```js
const settings = {
  Boolean paperless=false
}
```

Set this to `true` to draft a paperless pattern. The default is `false`.

## Example

```js
import { Aaron } from "@freesewing/aaron"

const pattern = new Aaron({
  paperless: true
})
```
