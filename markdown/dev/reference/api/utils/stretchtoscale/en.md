---
title: stretchToScale()
---

```js
float utils.stretchToScale(float stretch)
```

The way people measure stretch intuitively is different from the way we handle stretch in code.

When people say *25% stretch* they mean that 10cm fabric gets stretched to 12.5cm fabric.
In code and on our patterns, that means we need to scale things by 80%.

This method does that by returning:

```js
1 / (1 + parseFloat(stretch));
```
