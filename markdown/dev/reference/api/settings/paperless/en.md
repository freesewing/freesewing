--- 
title: paperless
---

The `paperless` options allows you to generate a variant of the pattern
that does not require you to print it. It does that by including dimensions
on the pattern, as wel as a grid overlay.

Set this to `true` to draft a paperless pattern. The default is `false`.

```js
import Brian from "@freesewing/brian";

const pattern = new Brian({
  paperless: true
})
```

