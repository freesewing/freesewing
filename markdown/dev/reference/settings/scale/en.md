---
title: scale
---

The `scale` setting is an overall scaling factor that will influence a variety of
factors to better support very small patterns.

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

This was a feature requested by those users who are generating patterns
for dolls. At such small sizes, many snippets, text, or logos become
so large (in comparison to the pattern) that they are problematic.

For most elements, `scale` simply changes the size of the element
linearly by the value of `scale`.
For example, the size of the _logo_ at a `scale` of 0.5 is exactly half the
size of the _logo_ at a `scale` of 1.0.

For elements that depend on specific lengths or starting/ending points
(for example, dimensions, _cutonfold_, and _grainline_),
the element lengths are not changed.
However, other aspects of the elements, like text size and line weight,
do get scaled.

Similarly, for _bartacks_ the lengths of the bartacks do not change,
but the bartack widths and line weights are scaled.

For the _scalebox_ and _miniscale_, as `scale` decreases these scale boxes
are replaced with other scale boxes with smaller dimensions.
The text in the smaller scale boxes is also replaced so that each scale box
always reports its correct dimensions.
For example, the default size scale box text might say,
"The inside of this box should measure 10 cm x 5 cm".
But, when `scale` is reduced,
the text in the smaller scale box might instead say,
"The inside of this box should measure 6 cm x 3 cm."
