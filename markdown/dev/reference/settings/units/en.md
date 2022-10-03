---
title: units
---

The `units` setting controls the units used on the pattern.
It can be either `metric` (the default) or `imperial`.

## Signature

```js
const settings = {
  String units='metric'
}
```

## Example

```js
import { Aaron } from "@freesewing/aaron"

const pattern = new Aaron({
  units: 'imperial'
})
```

## Notes

This setting only applies to formatting of the output.
Freesewing expects all input to be in millimeter.
