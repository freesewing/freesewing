---
title: Supporting paperless patterns
order:  270
---

The goal of paperless patterns is to create a pattern that we don't need to
print to be able to use it. Saving paper is always a good thing, but it's
also a way to democratize access to patterns.

While more and more of humanity is on the internet, access to printers and
printing paper is often harder to come by, especially in developing countries.

So before wrapping up, let's make the extra effort to make our bib design
support paperless pattern.

## The paperless setting

Users can request paperless patterns by setting [the `paperless`
setting](/reference/settings/paperless) to a *truthy* value.

Like other settings, we can destructure it to get access to it.
Then, much like with the `complete` setting, we will wrap our
paperless-specific code in a condition so it only runs when the user wants
that.

With paperless enabled, FreeSewing will automatically render a grid for each
pattern part with metric or imperial markings, depending on the units requested
by the user.

Such a grid is already a good starting point. In addition, we'll be using
different macros to add *dimensions* to the pattern.

While the grid gets added automatically, the dimensions we have to add ourselves.
Thankfully, there's macros that can help us with that, specifically:

- The `hd` macro adds a horizontal dimension
- The `vd` macro adds a vertical dimension
- The `ld` macro adds a linear dimension
- The `pd` macro adds a path dimension that follows a given path

<Note>
Refer to [the list of macros](/reference/macros/) for more details.
</Note>

<Example tutorial paperless caption="Making our pattern paperless is the icing on the cake. Time to wrap up, go over what we've learned, and give some pointers on where to go from here">
```design/src/bib.mjs
function draftBib({
  Path,
  Point,
  paths,
  points,
  measurements,
  options,
  macro,
  complete,
  snippets,
  Snippet,
  // highlight-start
  paperless,
  // highlight-end
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

  if (complete) {
    // Add snaps
    points.snapLeft = points.top.shiftFractionTowards(points.edgeTop, 0.5)
    points.snapRight = points.snapLeft.flipX()
    snippets.snapStud = new Snippet('snap-stud', points.snapLeft)
    snippets.snapSocket = new Snippet('snap-socket', points.snapRight)
      .attr('opacity', 0.5)

    // Add a logo
    points.logo = new Point(0, 0)
    snippets.logo = new Snippet("logo", points.logo)

    // Add a title
    points.title = points.bottom.shift(-90, 45)
    macro("title", {
      at: points.title,
      nr: 1,
      title: "bib",
      scale: 0.7
    })

    // Add a scalbox
    points.scalebox = points.title.shift(-90, 55)
    macro("scalebox", { at: points.scalebox })

    paths.bias = paths.seam
      .offset(-5)
      .addClass("various dashed")
      .addText("finishWithBiasTape", "center fill-various")

  // highlight-start
    /*
     * Note that we are putting our paperless block
     * inside our `complete` block since we should
     * only add this when the users wants a compete pattern
     */
    if (paperless) {
      // Add dimensions
      /*
       * The `hd` macro adds a Horizontal Dimension (hd)
       * It takes a from and to point, and a y value
       * at which to place the dimension
       */
      macro("hd", {
        from: points.bottomLeftStart,
        to: points.bottomRightEnd,
        y: points.bottomLeft.y + 15
      })
      /*
       * The `vd` macro adds a Vertical Dimension (vd)
       * It takes a from and to point, and an x value
       * at which to place the dimension
       */
      macro("vd", {
        from: points.bottomRightStart,
        to: points.bottom,
        x: points.bottomRight.x + 15
      })
      /*
       * Let's do a few more of these
       */
      macro("vd", {
        from: points.bottomRightStart,
        to: points.right,
        x: points.bottomRight.x + 30
      })
      macro("vd", {
        from: points.bottomRightStart,
        to: points.tipLeftTopStart,
        x: points.bottomRight.x + 45
      })
      macro("hd", {
        from: points.left,
        to: points.right,
        y: points.left.y + 25
      })
      /*
       * The `ld` macro adds a Linear Dimension (ld)
       * It takes a from and to point, and a d value
       * that sets its offset from the line from -> to
       */
      macro("ld", {
        from: points.tipLeftBottomEnd,
        to: points.tipLeftTopStart,
        d: 15
      })
    }
  // highlight-end

  }

  return part
}
```
</Example>
