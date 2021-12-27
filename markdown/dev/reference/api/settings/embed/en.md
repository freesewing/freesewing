--- 
title: embed
---

Set to `true` to make SVG output suitable for embedding in a web page.

This removes the `width` and `height` attributes from the SVG tag, which allows
you to inject the SVG into an HTML document, and it will responsively scale.

```js
import brian from "@freesewing/brian";

let pattern = new brian({
  embed: true
})
```

<Warning>

Do **not** use this for SVGs you want to print.

</Warning>

