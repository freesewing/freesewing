---
title: only
---

The `only` setting allows you to specify one or more parts to
draft/render, rather than the entire pattern.

It accepts either a single part name as a string, or an array of
one or more part names.

```js
import Brian from "@freesewing/brian";

const pattern = new Brian({
  only: ["front", "sleeve"]
})
```
