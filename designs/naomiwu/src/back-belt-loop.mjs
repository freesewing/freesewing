/*
 * This is the exported part object
 */
export const backBeltLoop = {
  name: 'naomiwu.backBeltLoop', // The name in design::part format
  draft: draftBackBeltLoop, // The method to call to draft this part
}

/*
 * This function drafts the waistband of the skirt
 */
function draftBackBeltLoop({
  Point,
  points,
  Path,
  paths,
  store,
  part,
  sa,
  expand,
  units,
  macro,
  absoluteOptions,
}) {
  const w = absoluteOptions.beltLoopWidth * 4.5
  const h = absoluteOptions.waistbandWidth * 1.5

  if (expand) {
    store.flag.preset('expandIsOn')
  } else {
    // Expand is off, do not draw the part but flag this to the user
    store.flag.note({
      msg: `naomiwu:cutBackBeltLoop`,
      replace: {
        width: units(w + 4 * sa),
        length: units(h + 2 * sa),
      },
      suggest: {
        text: 'flag:show',
        icon: 'expand',
        update: {
          settings: ['expand', 1],
        },
      },
    })
    // Also hint about expand
    store.flag.preset('expandIsOff')

    return part.hide()
  }

  /*
   * It's a rectangle
   */
  points.topLeft = new Point(0, 0)
  points.topRight = new Point(w, 0)
  points.bottomLeft = new Point(0, h)
  points.bottomRight = new Point(w, h)

  /*
   * Seamline
   */
  paths.seam = new Path()
    .move(points.topLeft)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.topRight)
    .line(points.topLeft)
    .close()
    .addClass('fabric')

  /*
   * Only add SA when requested (note that this adds extra SA at the sides for hemming)
   */
  if (sa)
    paths.sa = new Path()
      .move(points.topLeft.shift(180, sa))
      .line(points.bottomLeft.shift(180, sa))
      .line(points.bottomRight.shift(0, sa))
      .line(points.topRight.shift(0, sa))
      .line(points.topLeft.shift(180, sa))
      .close()
      .offset(sa)
      .addClass('fabric sa')

  /*
   * Annotations
   */

  // Cutlist
  store.cutlist.setCut({ cut: 6, from: 'fabric' })

  /*
   * Add the title
   */
  points.title = points.topLeft.shiftFractionTowards(points.bottomRight, 0.5)
  macro('title', {
    at: points.title,
    nr: 15,
    title: 'beltLoop',
    align: 'center',
    scale: 0.666,
  })

  /*
   * Add a grainline indicator
   */
  points.grainlineTop = points.topLeft.shift(0, 7)
  points.grainlineBottom = points.bottomLeft.shift(0, 7)
  macro('grainline', {
    from: points.grainlineBottom,
    to: points.grainlineTop,
    classes: {
      line: 'stroke-sm note',
      text: 'text-sm fill-note center',
    },
  })

  /*
   * Dimensions
   */
  macro('hd', {
    id: 'wFull',
    from: points.bottomLeft,
    to: points.bottomRight,
    y: points.bottomLeft.y + 15 + sa,
  })
  macro('vd', {
    id: 'hFull',
    from: points.bottomRight,
    to: points.topRight,
    x: points.topRight.x + 15 + 2 * sa,
  })

  return part
}
