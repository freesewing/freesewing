---
title: Add instructions to your design
for: developers
about: While documentation is good, sometimes you want to add some instructions to your design itself
---

<Note>

##### See this example in our source code

- [designs/aaron/src/back.js](https://github.com/freesewing/freesewing/blob/3ca5d0edfe54c7ac20aaf3af2f3544aee72f9b99/designs/aaron/src/back.js#L66)

</Note>

Adding instructions to your pattern is _just_ a matter of adding text.
The tricky part is to make sure your text can be translated.

Below is a rather involved example from Aaron:

```js
points.bindingAnchor = new Point(points.armhole.x / 4, points.armhole.y)
  .attr('data-text', 'cutTwoStripsToFinishTheArmholes')
  .attr('data-text', ':\n')
  .attr('data-text', `2x: ${units(sa * 6 || 60)} x ${units(armholeLength * 0.95 + 2 * sa)}`)
  .attr('data-text', '\n \n')
  .attr('data-text', 'cutOneStripToFinishTheNeckOpening')
  .attr('data-text', ':\n')
  .attr('data-text', 'width')
  .attr('data-text', ':')
  .attr(
    'data-text',
    `${units((sa || 10) * 6)} x ${units(neckOpeningLength * 2 * 0.95 + 2 * sa)}`
  )
```

If you want to add text along a path, you can do that too:

```js
paths.breakLine.attr('data-text', 'breakLine').attr('data-text-class', 'center')
paths.flb.attr('data-text', 'facingLiningBoundary')
```

<Tip>

Refer to [the sprinkle macro documentation](/reference/api/macros/sprinkle/) for details on how
to use this macro

</Tip>
