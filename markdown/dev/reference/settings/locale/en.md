---
title: locale
---

The `locale` setting allows you to specify the language of the pattern.  It
should contain an
[ISO 639-1 2-letter language code](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)
that indicates what language the user wants. The default is `en`.

## Signature

```js
const settings = {
  String locale='en'
}
```

## Example

```js
import { Aaron } from "@freesewing/aaron"

const pattern = new Aaron({
  locale: "es"
})
```

## Notes

This will be used to set the `xml:lang` attribute in the `svg` tag when
rendering to SVG, and by [the i18n plugin](/reference/plugins/i18n/) to
translate the pattern.


