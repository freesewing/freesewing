--- 
title: only
---

Allows you to specify one or more parts to draft/render, rather than the entire pattern.

Accepts a part name as string, or an array of part names.

```js
import brian from "@freesewing/brian";

let pattern = new brian({
  only: ["front", "sleeve"]
})
```
