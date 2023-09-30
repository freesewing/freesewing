---
title: units
---

The `units` setting controls the units of length used on the pattern.
It can be either `metric` (millimeters, the default) or `imperial` (inches).

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
FreeSewing expects all input to be in millimeter.
