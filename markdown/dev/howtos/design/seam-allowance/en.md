---
title: Add seam allowance and/or hem allowance
---

Adding seam allowance is something that has to happen in every pattern.
We might also have a hem where we need to add more seam allowance, or hem allowance.

When doing this, it's best to split up your path into sections that share the same
seam allowance.

In the example below we have two such paths:

- `paths.saBase` is the path that will require regular seam allowance
- `paths.hemBase` is the path that will require more seam allowance, or hem allowance

When creating them, we hide the new paths to avoid drawing the same path multiple times.
Then we string together our real path and our seam allowance based on them:

```js
  paths.saBase = new Path()
    .move(points.bottomRight)
    .line(points.tip)
    .curve(points.tipCpBottom, points.tipCpTop, points.topLeft)
    .line(points.bottomLeft)
    .hide()
  paths.hemBase = new Path()
    .move(points.bottomLeft)
    .line(points.bottomRight)
    .hide()

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
