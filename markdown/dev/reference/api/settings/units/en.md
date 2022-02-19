---
title: units
---

The `units` setting controls the units used on the pattern.
It can be either `metric` (the default) or `imperial`.

Note that this is only used to format the output.
Freesewing expects mm as input.

```js
import Brian from "@freesewing/brian";

const pattern = new Brian({
  units: "imperial"
})
```
