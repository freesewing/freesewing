---
title: utils.generateStackTransform()
---

The `utils.generateStackTransform()` function will generate the SVG transform to implement a given layout configuration on [a stack](/reference/api/stack).

## Signature

```js
Array generateStackTransform(
  Number x = 0,
  Number y = 0,
  Number rotate = 0,
  Boolean flipX = false,
  Boolean flipY = false,
  Stack stack
)
```

## Parameters

The first and second parameters set the value of the *translate transform* along the X and Y axis in millimeter.
In other words, it moves the stack.

The third parameter sets the *rotate transform* in degrees.
In other words, it rotates the stack.

The fourth and fifth parameters flip the part along the X or Y axis respectively.

<Note compact>
This is a low-level function to facilitate intervening in the pattern layout late in the draft process.
It is unlikely you will want to use this.
</Note>

