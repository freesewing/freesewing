---
title: Accessing user options
for: developers
about: Shows you how to access user options from inside your pattern
---

Options are stored in `pattern.settings.options`.

You can pull them out of there with
the [shorthand](/howtos/code/shorthand/) call:

```js
const  { measurements, options } = part.shorthand()

let sleeveBonus = measurements.shoulderToWrist * (1 + options.sleeveLengthBonus);
```
