--- 
title: locale
---

A 2-letter language code that indicates what language the user wants.

This will be used to set the `xml:lang` attribute in the `svg` tag when rendering to SVG,
and by [the i18n plugin](/reference/plugins/i18n/) to translate the pattern.

```js
import brian from "@freesewing/brian";

let pattern = new brian({
  locale: "es"
})
```
