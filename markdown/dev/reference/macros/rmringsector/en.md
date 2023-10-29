---
title: rmRingSector
---

The `rmringsector` macro removes the nodes added by [the ringsector macro](/reference/macros/ringsector).
It is the recommended way to remove (the effects of) a `ringsector` macro.

It is provided by the [ringsector plugin](/reference/plugins/ringsector).

<Note>
##### Not a core-plugins macro

The `rmringsector` macro is not provided by the [core-plugins](/reference/plugins/core),
so you need to load the [ringsector plugin](/reference/plugins/ringsector) explicitly
if you want to use it.
</Note>

## Signature

```js
macro('rmringsector', String id = 'ringsector')
```

