import { frontBase } from './front-base.mjs'

function draftWaistband({
  Point,
  points,
  Path,
  paths,
  store,
  part,
  measurements,
  options,
  complete,
  sa,
  paperless,
  snippets,
  Snippet,
  macro,
  absoluteOptions,
}) {
  /*
   * We start from center back and make our way towards the front in both directions
   */
  points.cbTop = new Point(0, 0)
  points.cbBottom = new Point(points.cbTop.x, absoluteOptions.waistbandWidth * 2)

  /*
   * First add the back parts
   */
  points.leftSideTop = points.cbTop.shift(180, store.get('backHipLength'))
  points.leftSideBottom = new Point(points.leftSideTop.x, points.cbBottom.y)
  points.rightSideTop = points.leftSideTop.flipX()
  points.rightSideBottom = points.leftSideBottom.flipX()

  /*
   * Now continue with the fronts
   */
  points.leftFrontTop = points.leftSideTop.shift(180, store.get('frontHipLength'))
  points.leftFrontBottom = new Point(points.leftFrontTop.x, points.cbBottom.y)
  points.rightFrontTop = points.leftFrontTop.flipX()
  points.rightFrontBottom = points.leftFrontBottom.flipX()

  /*
   * Add the overlap at the button side (right)
   */
  points.leftEdgeTop = points.leftFrontTop.shift(180, absoluteOptions.flyWidth)
  points.leftEdgeBottom = new Point(points.leftEdgeTop.x, points.cbBottom.y)

  /*
   * Edge of the waistband on the buttonhole side
   */
  points.topLeft = new Point(absoluteOptions.flyWidth * -1, 0)
  points.bottomLeft = new Point(points.topLeft.x, absoluteOptions.waistbandWidth * 2)

  /*
   * Fly shield edge on the buttonhole side
   */
  points.flyTop = new Point(0, 0)
  points.flyBottom = new Point(0, points.bottomLeft.y)

  /*
   * Edge of the waistband on the button side
   */
  points.topRight = new Point(store.get('hips'), points.topLeft.y)
  points.bottomRight = new Point(points.topRight.x, points.bottomLeft.y)

  /*
   * Fold in the middle
   */
  points.midLeft = new Point(points.leftEdgeTop.x, points.cbBottom.y / 2)
  points.midRight = new Point(points.rightFrontTop.x, points.midLeft.y)

  /*
   * Seamline
   */
  paths.seam = new Path()
    .move(points.leftEdgeTop)
    .line(points.leftEdgeBottom)
    .line(points.rightFrontBottom)
    .line(points.rightFrontTop)
    .line(points.leftEdgeTop)
    .close()
    .addClass('fabric')

  // Complete?
  if (complete) {
    /*
     * Add the fold line
     */
    paths.fold = new Path().move(points.midLeft).line(points.midRight).addClass('help note')
    /*
     * Include a message that this is where to fold the waistband
     */
    macro('banner', {
      path: paths.fold,
      text: 'foldHere',
      className: 'text-sm fill-note',
      repeat: 50,
    })

    /*
     * Add the logo
     */
    points.logo = points.midLeft.shiftFractionTowards(points.midRight, 0.65)
    snippets.logo = new Snippet('logo', points.logo).scale(0.666)

    /*
     * Add the title
     */
    points.title = points.logo.shift(0, 70)
    macro('title', {
      at: points.title,
      nr: 7,
      title: 'waistband',
      align: 'center',
      scale: 0.666,
    })

    /*
     * Indicate the fly edge line
     */
    paths.flyEdge = new Path()
      .move(points.leftFrontBottom)
      .line(points.leftFrontTop)
      .addClass('note dashed')
      .addText('flyEdge', 'text-sm fill-note center')

    /*
     * Add the button hole
     */
    points.buttonhole = points.midLeft
      .shiftFractionTowards(points.leftFrontBottom, 0.5)
      .shift(180, absoluteOptions.waistbandWidth / 12)
    snippets.buttonhole = new Snippet('buttonhole-start', points.buttonhole)
      .attr('data-scale', absoluteOptions.waistbandWidth / 16)
      .attr('data-rotate', 90)

    /*
     * Add the button
     */
    points.button = new Point(
      points.rightFrontTop.x - absoluteOptions.flyWidth / 2,
      points.buttonhole.y
    )
    snippets.button = new Snippet('button', points.button).attr(
      'data-scale',
      absoluteOptions.waistbandWidth / 16
    )

    /*
     * Add notches to indicate the location of the seams
     */
    macro('sprinkle', {
      snippet: 'notch',
      on: [
        'leftSideTop',
        'rightSideTop',
        'leftFrontTop',
        'cbTop',
        'leftSideBottom',
        'rightSideBottom',
        'leftFrontBottom',
        'cbBottom',
      ],
    })

    /*
     * Indicate the location of the belt loops
     */
    const loopSpacing = {
      1: 0.26,
      2: 0.52,
      3: 0.78,
    }
    for (const loop of [1, 2, 3]) {
      points[`loopLeft${loop}`] = points.topLeft.shiftFractionTowards(points.cbTop, 0.26 * loop)
      points[`loopRight${loop}`] = points[`loopLeft${loop}`].flipX(points.cbTop)
    }
    // Shift the first point on the button side to take the waistband overlap into account

    macro('hd', {
      from: points.topLeft,
      to: points.loopLeft1,
      y: points.loopLeft1.y - sa - 15,
    })
    macro('hd', {
      from: points.loopLeft1,
      to: points.loopLeft2,
      y: points.loopLeft1.y - sa - 15,
    })
    macro('hd', {
      from: points.loopLeft2,
      to: points.loopLeft3,
      y: points.loopLeft1.y - sa - 15,
    })
    macro('hd', {
      from: points.loopRight3,
      to: points.loopRight2,
      y: points.loopLeft1.y - sa - 15,
    })
    macro('hd', {
      from: points.loopRight2,
      to: points.loopRight1,
      y: points.loopLeft1.y - sa - 15,
    })
    macro('hd', {
      from: points.loopRight1,
      to: points.button,
      y: points.loopLeft1.y - sa - 15,
    })

    /*
     * Only add SA when requested
     */
    if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
  }

  /*
   * Only add paperless indicators when requested
   */
  if (paperless) {
    let y = points.topLeft.y - 15 - sa
    // Length
    //macro('hd', { y, from: points.topLeft, to: points.flyTop })
    //macro('hd', { y, from: points.flyTop, to: points.flyTop })
    //macro('hd', { y, from: points.flyTop, to: points.topRight })
    y -= 15
    macro('hd', { y, from: points.topLeft, to: points.topRight })
    // Button
    macro('hd', {
      from: points.button,
      to: points.bottomRight,
      y: points.bottomRight.y + 15 + sa,
    })
    macro('vd', {
      from: points.bottomRight,
      to: points.button,
      x: points.bottomRight.x + 15 + sa,
    })
    // Buttonhole
    let x = points.topLeft.x - 15 - sa
    macro('vd', { x, from: points.bottomLeft, to: points.buttonhole })
    // Width
    x -= 15
    macro('vd', { x, from: points.bottomLeft, to: points.midLeft })
    x -= 15
    macro('vd', { x, from: points.bottomLeft, to: points.topLeft })
  }

  return part
}

export const waistband = {
  name: 'collab:waistband',
  draft: draftWaistband,
  after: frontBase,
}
