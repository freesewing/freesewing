---
title: scale
---

The `scale` setting is an overall scaling factor that will influence a variety of
factors to better support very large or very small patterns.

To be clear, `scale` does not change the size of the pattern itself.
It merely controls things like the various stroke width, the size of arrows
on dimensions, the size of the text on the pattern, and so on.

## Signature

```js
const settings = {
  Number scale=1
}
```

## Example

```js
import { Aaron } from "@freesewing/aaron"

const pattern = new Aaron({
  scale: 0.5
})
```

## Notes

This is a feature request by those users that our generating pattern
for dolls. At such small sizes, many snippets, text, or logos become
so large (in comparison to the pattern) that they are problematic.
