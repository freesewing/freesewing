---
title: complete
---

The `complete` setting controls the level of details that's included on your pattern.
This has different uses, such as generating patterns to be cut out with a laser cutter.

The default `complete` setting is `true`.
Set this to `false` to draft a base outline of the pattern, rather than a fully detailed pattern.

<Note>
Setting this to `false` will force [sa](/reference/api/settings/sa) to be set to `false`.
</Note>

```js
import Brian from "@freesewing/brian";

const pattern = new Brian({
  complete: false
})
```
