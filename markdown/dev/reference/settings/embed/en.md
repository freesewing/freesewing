---
title: embed
---

The `embed` setting controls whether to generate an SVG document suitable for
printing, or for embedding on a web page.

## Signature

```js
const settings = {
  Boolean embed=false
}
```

The default for `embed` is `false` which will include the `width` and `height`
attributes in the SVG tag, thereby making it suitable for printing.

When set to `true` the `width` and `height` attributes will not be added which
allows you to inject the SVG into an HTML document, where it will responsively
scale.

## Example

```js
import { Aaron } from "@freesewing/aaron"

const pattern = new Aaron({
  embed: true
})
```
