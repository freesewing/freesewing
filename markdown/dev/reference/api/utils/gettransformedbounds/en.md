---
title: utils.getTransformedBounds()
---

The `utils.getTransformedBounds()` function re-calculates the bounding box of an object (a stack or a part) after applying the passed-in transform(s).

The object passed in should have its `topLeft` and `bottomRight` properties set.
It will return on object that with (only) the updated `topLeft` and `bottomRight` properties set.

## Signature

```js
Object utils.getTransformedBounds(
  Object stack,
  Array transforms
)
```

<Note compact>
This is a low-level function to facilitate intervening in the pattern layout late in the draft process.
It is unlikely you will want to use this.
</Note>
