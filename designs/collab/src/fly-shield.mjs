/*
 * This is the exported part object
 */
export const flyShield = {
  name: 'collab:flyShield', // The name in the form of design::name
  draft: draftFlyShield, // The method to call for drafting this part
}

/*
 * This function drafts the fly shield.
 * Giving it a descriptive name is optional, but helps with debugging.
 */
function draftFlyShield({
  Point,
  points,
  Path,
  paths,
  part,
  complete,
  sa,
  paperless,
  macro,
  absoluteOptions,
}) {
  /*
   * Save ourselves some typing by storing width and height
   */
  const w = absoluteOptions.flyWidth
  const h = absoluteOptions.flyLength * 1.05 // A bit longer than the fly so the seam will catch

  /*
   * Fly shield is a simple rectangle folder in half
   */
  points.topLeft = new Point(0, 0)
  points.topMid = new Point(w, 0)
  points.topRight = new Point(2 * w, 0)
  points.bottomLeft = new Point(0, h)
  points.bottomMid = new Point(w, h)
  points.bottomRight = new Point(2 * w, h)

  /*
   * The seam line
   */
  paths.seam = new Path()
    .move(points.topLeft)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.topRight)
    .line(points.topLeft)
    .close()
    .addClass('fabric')

  // Complete?
  if (complete) {
    /*
     * Indicate this needs to be folded in half
     */
    paths.fold = new Path().move(points.bottomMid).line(points.topMid).addClass('note help')

    /*
     * Print a message that it needs to be holded in half
     */
    macro('banner', {
      path: paths.fold,
      text: 'foldHere',
      className: 'text-sm fill-note',
    })

    /*
     * Add a title
     */
    points.title = points.topMid.shiftFractionTowards(points.bottomMid, 0.5)
    macro('title', {
      at: points.title,
      nr: 4,
      title: 'flyShield',
      scale: 0.6,
      align: 'center',
    })

    /*
     * Add the grainline
     */
    points.grainlineTop = points.topLeft.shiftFractionTowards(points.topMid, 0.5)
    points.grainlineBottom = new Point(points.grainlineTop.x, points.bottomLeft.y)
    macro('grainline', {
      from: points.grainlineBottom,
      to: points.grainlineTop,
    })

    /*
     * Add seam allowance only when requested
     */
    if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
  }

  /*
   * Add dimensions for paperless only when requested
   */
  if (paperless) {
    macro('hd', {
      from: points.bottomLeft,
      to: points.bottomRight,
      y: points.bottomLeft.y + sa + 15,
    })
    macro('vd', {
      from: points.bottomRight,
      to: points.topRight,
      x: points.bottomRight.x + sa + 15,
    })
  }

  return part
}
