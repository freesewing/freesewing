---
title: Storing the seam length to use in another part
---

Often when designing patterns, we need to _true a seam_ which means to make sure
that two parts that need to be joined together are the same distance.

The example below is from Aaron and stores the length of the armhole seam:

```mjs
// Store length of armhole and neck opening
store.set(
  'frontArmholeLength',
  new Path()
    .move(points.armhole)
    .curve(points.armholeCp2, points.strapRightCp1, points.strapRight)
    .length()
)
// Seam length is now available in other parts via:
store.get('frontArmholeLength')
```
