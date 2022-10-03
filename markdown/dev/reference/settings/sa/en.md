---
title: sa
---

The `sa` setting controls the seam allowance. Either provide value in
millimeter or set it to `false` or `0` to disable seam allowance altogether.

## Signature

```js
const settings = {
  Number|Boolean sa=false
}
```

By default, the `sa` setting is `false` and seam allowance is no included.

## Example

```js
import { Aaron } from "@freesewing/aaron"

const pattern = new Aaron({
  sa: 10
})
```

## Notes

This is ignored if [settings.complete](/reference/api/settings/complete) is `false`

<Comment by="joost">
This is not strictly enforced and left of to the designer, so different designs
may behave differently with regards to including seam allowance when `complete` is
set to `false`.
</Comment>
