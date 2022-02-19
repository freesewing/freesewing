---
title: Add seam allowance and/or hem allowance
for: developers
about: Adding seam allowance or hem allowance is easy to do
---

<Note>

##### See this example in our source code

-   [packages/bruce/src/inset.js](https://github.com/freesewing/freesewing/blob/develop/packages/bruce/src/inset.js#L34)

</Note>

Adding seam allowance is something that has to happen in every pattern.
We might also have a hem where we need to add more seam allowance, or hem allowance.

When doing this, it's best to split up your path so in those sections that share the same
seam allowance.

In the example below we have two such paths:

-   `paths.saBase` is the path that will require regular seam allowance
-   `paths.hemBase` is the path that will require more seam allowance, or hem allowance

When creating them, we disable rendering, effectively hiding them.
Then we string together our real path and our seam allowance based on them:

```js
  paths.saBase = new Path()
    .move(points.bottomRight)
    .line(points.tip)
    .curve(points.tipCpBottom, points.tipCpTop, points.topLeft)
    .line(points.bottomLeft)
    .setRender(false)
  paths.hemBase = new Path()
    .move(points.bottomLeft)
    .line(points.bottomRight)
    .setRender(false)

  paths.seam = paths.saBase.join(paths.hemBase)
    .close()
    .attr('class', 'fabric')

  if (complete) {
    if (sa) {
      paths.sa = paths.saBase.offset(sa)
        .join(paths.hemBase.offset(sa * 2))
        .close()
        .attr('class', 'fabric sa')
    }
    // ...
  }
```

<Tip>

##### Use a multiple of `sa` for your hem allowance

Resist the temptation to use an absolute value for any seam allowance, including at the hem.

Always use a multiple of the `sa` value.

</Tip>
