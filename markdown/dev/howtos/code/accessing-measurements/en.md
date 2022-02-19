---
title: Accessing measurements
for: developers
about: Shows you how to access user measurements from inside your pattern
---

Measurements are stored in `pattern.settings.measurements`.

You can pull them out of there with
the [shorthand](/howtos/code/shorthand/) call:

```js
const  { measurements, options } = part.shorthand()

let sleeveBonus = measurements.shoulderToWrist * (1 + options.sleeveLengthBonus);
```

<Note>

Keep in mind that [FreeSewing uses millimeter for everything](/guides/prerequisites/units).

</Note>
