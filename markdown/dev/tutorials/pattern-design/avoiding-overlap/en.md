---
title: Avoiding overlap
order: 220
---

While you've only drawn the end of one strap, it's pretty obvious they overlap.
Which is a big no-no in sewing patterns, so you're going to have to address that.

Specifically, we're going to rotate our strap out of the way until it no longer overlaps.
The rest of your bib should stay as it is, so let's start by making a list of points we need
to rotate:

```js
let rotateThese = [
  "edgeTopLeftCp",
  "edgeTop",
  "tipRight",
  "tipRightTop",
  "tipRightTopStart",
  "tipRightTopCp1",
  "tipRightTopCp2",
  "tipRightTopEnd",
  "tipRightBottomStart",
  "tipRightBottomCp1",
  "tipRightBottomCp2",
  "tipRightBottomEnd",
  "tipRightBottom",
  "top",
  "topCp2"
]
```

Now you can rotate them. How far? Until the strap no longer overlaps:

```js
while (points.tipRightBottomStart.x > -1) {
  for (let p of rotateThese) points[p] = points[p].rotate(1, points.edgeLeft)
}
```

We're rotating all the points in the `rotateThese` array around the `edgeLeft` points.
We're using increments of 1 degree until the `tipRightBottomStart` point is 1mm passed the center of our bib.

While we're at it, let's add a point where the closure's snap should go:

```js
points.snapLeft = points.top.shiftFractionTowards(points.edgeTop, 0.5)
```

<Example pattern="tutorial" part="step8">
The right part looks a bit wonky now, but we'll get to that
</Example>


Now let's mirror this on the other side, and replace our `neck` and `rect` paths with a new path.

