---
title: utils.stretchToScale()
---

The `utils.stretchToScale()` function calculates the scale for a given amount of
stretch.

## Signature

```js
float utils.stretchToScale(float stretch)
```

## Notes

The way people measure stretch intuitively is different from the way we handle stretch in code.

When people say fabric has _25% stretch_ they mean that 10 cm of fabric can
stretch to 12.5 cm.
In code that means we would need to scale non-stretch lengths by 80%
to get the correct lengths to use in patterns with 25% stretch fabric.

Pattern designers need a way to calculate the scaling factor to use for
their pattern part lengths, given a fabric stretch percentage.
This function does that by returning:

```js
1 / (1 + parseFloat(stretch))
```
