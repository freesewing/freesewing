---
title: Add instructions to your design
for: developers
about: While documentation is good, sometimes you want to add some instructions to your design itself
---

<Note>

##### See this example in our source code

-   [packages/jaeger/src/front.js](https://github.com/freesewing/freesewing/blob/38d101b0415a4cbf3f9f86e006bd8cb7c43c703b/packages/jaeger/src/front.js#L411)

</Note>

Adding instructions to your pattern is *just* a matter of adding text.
The tricky part is to make sure your text can be translated.

Below is a rather involved example from Aaron:

```js
points.bindinAnchor = new Point(points.armhole.x / 4, points.armhole.y)
  .attr('data-text', 'cutTwoStripsToFinishTheArmholes')
  .attr('data-text', ':\n')
  .attr('data-text', 'width')
  .attr('data-text', ':')
  .attr('data-text', units(sa * 6 || 60))
  .attr('data-text', '\n')
  .attr('data-text', 'length')
  .attr('data-text', ':')
  .attr('data-text', units(armholeLength * 0.95 + 2 * sa))
  .attr('data-text', '\n&#160;\n')
  .attr('data-text', 'cutOneStripToFinishTheNeckOpening')
  .attr('data-text', ':\n')
  .attr('data-text', 'width')
  .attr('data-text', ':')
  .attr('data-text', units(sa * 6))
  .attr('data-text', '\n')
  .attr('data-text', 'length')
  .attr('data-text', ':')
  .attr('data-text', units(neckOpeningLength * 2 * 0.95 + 2 * sa))
  .attr('data-text-lineheight', 6)
```

If you want to add text along a path, you can do that too:

```js
paths.breakLine.attr('data-text', 'breakLine').attr('data-text-class', 'center')
paths.flb.attr('data-text', 'facingLiningBoundary')
```

<Tip>

Refer to [the sprinkle macro documentation](/reference/macros/sprinkle/) for details on how
to use this macro

</Tip>
