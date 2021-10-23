--- 
title: idPrefix
---

Prefixes all IDs in the SVG with the string you pass it. (defaults to `fs-`).

When you embed multiple SVGs on a single page, the IDs can and will conflict,
especially when using `xlink:href` references (such as for text on paths and snippets).

This allows you to specify an ID prefix so you can sidestep ID collisions.

```js
import brian from "@freesewing/brian";

let pattern = new brian({
  idPrefix: "something-else"
})
```
