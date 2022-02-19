---
title: embed
---

The `embed` setting controls the properties of the SVG document.
Set it to `true` to make SVG output suitable for embedding in a web page.

The default for `embed` is `false` which will include the `width` and `height`
attributes in the SVG tag, thereby making it suitable for printing.

When set to `true` the `width` and `height` attributes will not be added
which allows you to inject the SVG into an HTML document, where it will
responsively scale.

```js
import Brian from "@freesewing/brian";

const pattern = new Brian({
  embed: true
})
```

<Warning>

Do **not** use this for SVGs you want to print.

</Warning>
