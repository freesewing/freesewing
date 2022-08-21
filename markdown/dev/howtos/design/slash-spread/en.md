---
title: Slash and spread
for: developers
about: Slash and spread is easy enough on paper, here's how to do it in code
---

<Note>

##### See this example in our source code

- [designs/jaeger/src/front.js](https://github.com/freesewing/freesewing/blob/3ca5d0edfe54c7ac20aaf3af2f3544aee72f9b99/designs/jaeger/src/front.js#L64)

</Note>

When we _slash and spread_ a pattern, we cut out a triangle, and then rotate it
around the tip of the triangle.

And that's exactly what we do in code. We just need to know:

- What point we want to rotate around
- Which points we want to rotate
- By how much we want to rotate

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
