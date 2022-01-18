--- 
title: idPrefix
---

The `idPrefix` setting allows you to specify a prefix that will be used
for all IDs in the SVG output. Its default value is `fs-`.

When you embed multiple SVGs on a single page, the IDs can and will conflict,
especially when using `xlink:href` references (such as for text on paths and snippets).

This allows you to specify an ID prefix so you can sidestep ID collisions.

```js
import Brian from "@freesewing/brian";

const pattern = new Brian({
  idPrefix: "something-else"
})
```
