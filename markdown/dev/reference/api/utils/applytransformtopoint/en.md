---
title: utils.applyTransformToPoint()
---

The `utils.applyTransformToPoint()` function applies a specified transformation to the point's coordinates. Returns the transformed point as a [Point](/reference/api/point) object.

## Signature

```js
Point utils.applyTransformToPoint(string transform, Point A)
```

## Parameters

1st parameter is a SVG transform string. Eg: `scale(sfx, sfy)` where `sfx` and `sfy` are the scaling factors along the x-axis and y-axis respectively.

2nd parameter is the original point that is to be transformed. It is a [Point](/reference/api/point) object.

