---
title: Slash and spread
for: developers
about: Slash and spread is easy enough on paper, here's how to do it in code
---

<Note>

##### See this example in our source code

-   [packages/jaeger/src/front.js](https://github.com/freesewing/freesewing/blob/8474477911daed3c383700ab29c9565883f16d66/packages/jaeger/src/front.js#L64)

</Note>

When we *slash and spread* a pattern, we cut out a triangle, and then rotate it
around the tip of the triangle.

And that's exactly what we do in code. We just need to know:

-   What point we want to rotate around
-   Which points we want to rotate
-   By how much we want to rotate

```js
let rotate = [
  'splitEdge',
  'neckEdge',
  'cfNeck',
  'cfNeckCp1',
  'neckCp2Front',
  'neck',
  'shoulder',
  'shoulderCp1',
  'armholePitchCp2',
  'armholePitch',
  'armholePitchCp1',
  'armholeHollowCp2',
  'armholeHollow',
  'armholeHollowCp1',
  'splitCp2',
  'frontNeckCpEdge'
]
for (let p of rotate) {
  points[p] = points[p].rotate(options.chestShapingMax * options.chestShaping * -1, points.split)
}
```
