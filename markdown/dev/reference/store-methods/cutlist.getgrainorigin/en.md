---
title: cutlist.getGrainOrigin()
---

The `cutlist.getGrainOrigin()` store method will retrieve stored
information about which macro set the grainline.

This method is called internally by
[the `rmCutOnFold` macro](/reference/macros/rmcutonfold)
and
[the `rmGrainline` macro](/reference/macros/rmgrainline)
to retrieve information for cutting layout tools.
In other words, you typically have no reason to call this method manually.

## Signature

```js
String store.cutlist.getGrainOrigin()
```
