---
title: pack()
---

The `pack()` store method is used to arrange items into a
pattern layout.
The core library uses this method to arrange stacks of parts to
generate layouts for drafted patterns.

`pack()` is implemented as a store method to allow you to override this
method and implement your own algorithm to generate the layout.

## Signature

```js
Object store.pack(
  Array items,
  Pattern pattern,
)
```

## Example

```js
const result = store.pack(parts, pattern)

const layout_width = result.width
const layout_height = result.height
```

## Notes

An optimized `pack()` store method is provided by
[plugin-bin-pack](/reference/plugins/bin-pack)
which is part of [core-plugins](/reference/plugins/core) and loaded
by the core library by default.

The core library also provides a basic, unoptimized `pack()` store method
that is used if core plugins are not loaded.
