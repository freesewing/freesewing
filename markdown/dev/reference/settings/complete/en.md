--- 
title: complete
---

Set this to `false` to draft a base outline of the pattern, rather than a fully detailed pattern.
This has different uses, such as generating patterns to be cut out with a laser cutter.

The default is `true`.  Setting this to `false` will force [sa](#sa) to be set to `false`.

```js
import brian from "@freesewing/brian";

let pattern = new brian({
  complete: false
})
```
