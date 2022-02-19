---
title: Storing the seam length to use in another part
for: developers
about: Shows how to store a seam length so you can true the seam of another part
---

<Note>

##### See this example in our source code

-   [packages/aaron/src/front.js](https://github.com/freesewing/freesewing/blob/develop/packages/aaron/src/front.js#L103)

</Note>

Often when designing patterns, we need to *true a seam* which means to make sure
that two parts that need to be joined together are the same distance.

The example below is from Aaron and stores the length of the armhole seam:

```js
  // Store length of armhole and neck opening
  store.set(
    'frontArmholeLength',
    new Path()
      .move(points.armhole)
      .curve(points.armholeCp2, points.strapRightCp1, points.strapRight)
      .length()
  )
```
