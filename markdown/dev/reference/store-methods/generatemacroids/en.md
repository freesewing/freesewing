---
title: generateMacroIds()
---

The `generateMacroIds()` store method generates IDs to be used in macros.
It is the recommended way for macros that add nodes to the pattern (by nodes we
mean points, paths and so on) to avoid naming clashes.

## Signature

```mjs
Object store.generateMacroIds(
  Array keys,
  String id,
  macro = store.activeMacro
)
```

The method takes a list of strings, and an ID which is typically the ID passed
to the macro.  You can optionally specify the macro name via `macro` although
you almost certainly want to rely on the default behavior which is to load  the
active macro name from the store.

## Example

```mjs
const ids = store.generateMacroIds(
  [
   'start',
   'end',
   'middle'
  ],
  'macroId'
)
```


