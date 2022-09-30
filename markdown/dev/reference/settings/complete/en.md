---
title: complete
---

The `complete` setting controls the level of detail that is included on a
pattern. Set `complete` to `false` to limiting the level of detail on the
pattern.  This has different uses, such as generating patterns to be cut out
with a laser cutter.

## Signature

```js
const settings = {
  Boolean complete=true
}
```

The default `complete` setting is `true`.
Set this to `false` to draft a base outline of the pattern, rather than a fully detailed pattern.


## Example
```js
import Aaron from "@freesewing/aaron"

const pattern = new Aaron({
  complete: false
})
```

## Notes

Setting `complete` to `false` will force [sa](/reference/api/settings/sa) to
also be set to `false`.

