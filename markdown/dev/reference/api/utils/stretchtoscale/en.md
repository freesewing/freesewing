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

When people say _25% stretch_ they mean that 10cm fabric gets stretched to 12.5cm fabric.
In code and on our patterns, that means we need to scale things by 80%.

This function does that by returning:

```js
1 / (1 + parseFloat(stretch))
```
