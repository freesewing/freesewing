---
title: storeMacroIds()
---

Stores data for macro IDs generated via [`generateMacroIds()`](/reference/store-methods/generatemacroids).

## Signature

```mjs
Object store.storeMacroIds(
  String id,
  Array ids,
  macro = store.activeMacro,
  part = store.activePart,
)
```

The method takes a (macro) id and an object of ids and stores it in the store under the active macro and part.

Or, if you want to, you can pass in `macro` and `part` to not use the active macro or part.

## Example

```mjs
const ids = store.getMacroIds('macroId', ids)
```

Storing this data is a requirement to allow removal of macros.

