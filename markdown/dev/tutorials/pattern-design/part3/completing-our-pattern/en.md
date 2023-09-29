---
title: Completing our pattern
order: 260
---

When we say we're going to *complete* our pattern, we mean we're going to add
things like a title and a scalebox and so on.

These things or not always wanted on a pattern. For example, if you're cutting
out patterns with a laser cutter, or tracing them with a projects, you
typically only want to have the pattern outline.

## The complete setting

Users can indicate their desire to have either a bare-bones pattern, or rather
when that's completed with all bells and whistles with [the
`complete` setting](/reference/settings/complete).

To make sure we respect the user's choice, we must wrap all of these
embellishments in a code block that only executes when the `complete` setting
is *truthy*.

To access the setting, we can destructure it:

```design/src/bib.mjs
function draftBib({
  Path,
  Point,
  paths,
  points,
  measurements,
  options,
  macro,
  // highlight-start
  complete,
  // highlight-end
  part,
}) {

  // Our earlier work is not shown for brevety

  // highlight-start
  if (complete) {
    // Complete pattern here
  }
  // highlight-end

  return part
}
```

## Adding snippets

Snippets are little re-useable things to embellish our pattern with.
Things like buttons or buttonholes, a logo, or snaps.

To use them, much like points and paths, we need to destructure both
the `Snippet` constructor as well as the `snippets` object to hold
our snippets:

```design/src/bib.mjs
function draftBib({
  Path,
  Point,
  //highlight-start
  Snippet,
  //highlight-end
  paths,
  points,
  // highlight-start
  snippets,
  // highlight-end
  measurements,
  options,
  macro,
  complete,
  part,
}) {

  // Our earlier work is not shown for brevety

  if (complete) {
    // Complete pattern here
  }

  return part
}
```

We'll be using them below to add a `snap-stud`, `snap-socket`, and a `logo`
snippet.

<Note>
You can find all possible snippets in [our documentation](/reference/api/snippet/).
</Note>

## The completed design

Let's put this and few other things together to complete our design:

<Example tutorial caption="Almost done. But there's one more thing the user can ask for: a **paperless** pattern">
```design/src/bib.mjs
function draftBib({
  Path,
  Point,
  Snippet,
  paths,
  points,
  snippets,
  measurements,
  options,
  macro,
  complete,
  part,
}) {

  // Construct the quarter neck opening
  let tweak = 1
  let target = (measurements.head * options.neckRatio) /4
  let delta
  do {
    points.right = new Point(tweak * measurements.head / 10, 0)
    points.bottom = new Point(0, tweak * measurements.head / 12)

    points.rightCp1 = points.right.shift(90, points.bottom.dy(points.right)/2)
    points.bottomCp2 = points.bottom.shift(0, points.bottom.dx(points.right)/2)

    paths.quarterNeck = new Path()
      .move(points.right)
      .curve(points.rightCp1, points.bottomCp2, points.bottom)
      .hide() // Add this line

    delta = paths.quarterNeck.length() - target
    if (delta > 0) tweak = tweak * 0.99
    else tweak = tweak * 1.02
  } while (Math.abs(delta) > 1)

  // Construct the complete neck opening
  points.rightCp2 = points.rightCp1.flipY()
  points.bottomCp1 = points.bottomCp2.flipX()
  points.left = points.right.flipX()
  points.leftCp1 = points.rightCp2.flipX()
  points.leftCp2 = points.rightCp1.flipX()
  points.top = points.bottom.flipY()
  points.topCp1 = points.bottomCp2.flipY()
  points.topCp2 = points.bottomCp1.flipY()

  // Drawing the bib outline
  const width = measurements.head * options.widthRatio
  const length = measurements.head * options.lengthRatio

  points.topLeft = new Point(
    width / -2,
    points.top.y - (width / 2 - points.right.x)
  )
  points.topRight = points.topLeft.shift(0, width)
  points.bottomLeft = points.topLeft.shift(-90, length)
  points.bottomRight = points.topRight.shift(-90, length)

  // Shape the straps
  points.edgeLeft = new Point(points.topLeft.x, points.left.y)
  points.edgeRight = new Point(points.topRight.x, points.right.y)
  points.edgeTop = new Point(0, points.topLeft.y)

  points.edgeLeftCp = points.edgeLeft.shiftFractionTowards(points.topLeft, 0.5)
  points.edgeRightCp = points.edgeLeftCp.flipX()
  points.edgeTopLeftCp = points.edgeTop.shiftFractionTowards(
    points.topLeft,
    0.5
  )
  points.edgeTopRightCp = points.edgeTopLeftCp.flipX()

  // Round the straps
  const strap = points.edgeTop.dy(points.top)

  points.tipRight = points.edgeTop.translate(strap / 2, strap / 2)
  points.tipRightTop = new Point(points.tipRight.x, points.edgeTop.y)
  points.tipRightBottom = new Point(points.tipRight.x, points.top.y)

  macro("round", {
    from: points.edgeTop,
    to: points.tipRight,
    via: points.tipRightTop,
    prefix: "tipRightTop",
  })
  macro("round", {
    from: points.tipRight,
    to: points.top,
    via: points.tipRightBottom,
    prefix: "tipRightBottom",
  })
  const rotateThese = [
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
  while (points.tipRightBottomStart.x > -1) {
    for (const p of rotateThese) points[p] = points[p].rotate(1, points.edgeLeft)
  }

  // Snap anchor
  points.snapLeft = points.top.shiftFractionTowards(points.edgeTop, 0.5)

  // Add points for second strap
  points.edgeTopRightCp = points.edgeTopLeftCp.flipX()
  points.topCp1 = points.topCp2.flipX()
  points.tipLeftTopStart = points.tipRightTopStart.flipX()
  points.tipLeftTopCp1 = points.tipRightTopCp1.flipX()
  points.tipLeftTopCp2 = points.tipRightTopCp2.flipX()
  points.tipLeftTopEnd = points.tipRightTopEnd.flipX()
  points.tipLeftBottomStart = points.tipRightBottomStart.flipX()
  points.tipLeftBottomCp1 = points.tipRightBottomCp1.flipX()
  points.tipLeftBottomCp2 = points.tipRightBottomCp2.flipX()
  points.tipLeftBottomEnd = points.tipRightBottomEnd.flipX()
  points.snapRight = points.snapLeft.flipX()

  // Round the bottom corners
  macro("round", {
    from: points.topLeft,
    to: points.bottomRight,
    via: points.bottomLeft,
    radius: points.bottomRight.x / 4,
    prefix: "bottomLeft"
  })
  macro("round", {
    from: points.bottomLeft,
    to: points.topRight,
    via: points.bottomRight,
    radius: points.bottomRight.x / 4,
    prefix: "bottomRight"
  })

  // Create one path for the bib outline
  paths.seam = new Path()
    .move(points.edgeLeft)
    .line(points.bottomLeftStart)
    .curve(points.bottomLeftCp1, points.bottomLeftCp2, points.bottomLeftEnd)
    .line(points.bottomRightStart)
    .curve(points.bottomRightCp1, points.bottomRightCp2, points.bottomRightEnd)
    .line(points.edgeRight)
    .curve(
      points.edgeRightCp,
      points.edgeTopRightCp,
      points.tipLeftTopStart
    )
    .curve(
      points.tipLeftTopCp1,
      points.tipLeftTopCp2,
      points.tipLeftTopEnd
    )
    .curve(
      points.tipLeftBottomCp1,
      points.tipLeftBottomCp2,
      points.tipLeftBottomEnd
    )
    .curve(
      points.topCp1,
      points.rightCp2,
      points.right
    )
    .curve(
      points.rightCp1,
      points.bottomCp2,
      points.bottom
    )
    .curve(
      points.bottomCp1,
      points.leftCp2,
      points.left
    )
    .curve(
      points.leftCp1,
      points.topCp2,
      points.tipRightBottomEnd
    )
    .curve(
      points.tipRightBottomCp2,
      points.tipRightBottomCp1,
      points.tipRightBottomStart
    )
    .curve(
      points.tipRightTopCp2,
      points.tipRightTopCp1,
      points.tipRightTopStart
    )
    .curve(
      points.edgeTopLeftCp,
      points.edgeLeftCp,
      points.edgeLeft
    )
    .close()
    .addClass("fabric")

  // highlight-start
  if (complete) {
    /*
     * Let's add the points where
     * the closure's snaps should go.
     */
    // Add snaps
    points.snapLeft = points.top
      .shiftFractionTowards(points.edgeTop, 0.5)
    points.snapRight = points.snapLeft
      .flipX()

    /*
     * Now, let's use our newfound snippet powers
     * to add the snaps to these points.
     * First the left snap (the stud part)
     */
    snippets.snapStud = new Snippet(
      'snap-stud',
      points.snapLeft
    )

    /*
     * The right snap (the socket part)
     * should go on the back of the fabric.
     * To try to make that more obvious to the user
     * let's set its `opacity` attribute to 0.5
     * this way it will be semi-transparent.
     */
    snippets.snapSocket = new Snippet(
      'snap-socket',
      points.snapRight
    ).attr('opacity', 0.5)

    /*
     * Another snippet we should add is our logo.
     * A logo is not required, but we love skully.
     */
    // Add a logo
    points.logo = new Point(0, 0)
    snippets.logo = new Snippet(
      "logo",
      points.logo
    )

    /*
     * We already know how to use macros
     * This one adds a title to our part
     */
    // Add a title
    points.title = points.bottom
      .shift(-90, 45)
    macro("title", {
      at: points.title,
      nr: 1,
      title: "bib",
      scale: 0.7
    })

    /*
     * This macro adds a scalebox to our part
     */
    // Add a scalbox
    points.scalebox = points.title
      .shift(-90, 55)
    macro(
      "scalebox",
      { at: points.scalebox }
    )

    /*
     * Our bib should be finished with bias tape.
     * To add it, we're using Path.offset()
     * You will learn to LOVE this methid
     * when designing pattern with seam allowance
     * as it draws a path parallel to another one
     */
    paths.bias = paths.seam
      .offset(-5)
      .addClass("various dashed")
      .addText(
        "finishWithBiasTape",
        "center fill-various"
      )

  }
  // highlight-end

  return part
}
```
</Example>
