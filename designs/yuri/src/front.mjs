import { sharedDimensions } from './shared'

export default function (part) {
  const {
    store,
    Point,
    Path,
    points,
    paths,
    complete,
    paperless,
    sa,
    options,
    measurements,
    macro,
    snippets,
    Snippet,
  } = part.shorthand()

  // Clear paths from Brian
  for (const i in paths) {
    if (['frontArmhole', 'frontCollar'].indexOf(i) === -1) delete paths[i]
  }

  // Shape side seam
  points.hips.x = (measurements.hips * (1 + options.hipsEase)) / 4
  points.hem.x = points.hips.x
  points.hemCp2 = new Point(points.hips.x, points.cfWaist.y)

  // add some points for Yuri
  points.cfBottom = new Point(0, points.cfHem.y * 1.27)
  points.bottom = new Point(points.hem.x * 1.23, points.cfBottom.y * 0.97)
  points.bottomCp2 = new Point(points.bottom.x, points.cfWaist.y)
  points.button = new Point(
    points.s3CollarSplit.x - (2 / 3) * measurements.shoulderToShoulder,
    points.s3CollarSplit.y + measurements.hpsToBust * 1.17
  )
  // end Yuri points

  // Store length of the neck seam
  store.set(
    'frontNeckSeamLength',
    new Path()
      .move(points.neck)
      .curve(points.neckCp2Front, points.cfNeckCp1, points.cfNeck)
      .length()
  )
  store.set('neckCutoutFront', points.cfNeck.y)

  // Paths
  paths.saBase = new Path()
    .move(points.bottom)
    .line(points.armhole)
    .curve(points.armholeCp2, points.armholeHollowCp1, points.armholeHollow)
    .curve(points.armholeHollowCp2, points.armholePitchCp1, points.armholePitch)
    .join(paths.frontArmhole)
    .line(points.s3CollarSplit)
    .attr('class', 'note stroke-xxl')
  paths.buttonBase = new Path()
    .move(points.s3CollarSplit)
    .line(points.button)
    .line(points.cfBottom)
    .attr('class', 'note stroke-xxl')
  paths.hemBase = new Path()
    .move(points.cfBottom)
    .line(points.bottom)
    .attr('class', 'note stroke-xxl')
  paths.saBase.render = false
  paths.hemBase.render = false
  paths.buttonBase.render = false

  paths.seam = paths.saBase
    .clone()
    .join(paths.buttonBase)
    .join(paths.hemBase)
    .close()
    .attr('class', 'fabric')

  // Complete?
  if (complete) {
    macro('grainline', {
      from: points.s3CollarSplit,
      to: new Point(points.s3CollarSplit.x, points.bottom.y),
    })
    snippets.buttonhole = new Snippet('buttonhole-start', points.button.shift(0, 25))
      .attr('data-rotate', '90')
      .attr('data-scale', '2.5')
    snippets.button = new Snippet(
      'button',
      paths.buttonBase.shiftFractionAlong(0.146).shift(0, 30)
    ).attr('data-scale', '3.3')

    if (sa) {
      paths.sa = paths.hemBase
        .offset(3 * sa)
        .join(paths.saBase.offset(sa))
        .join(paths.buttonBase.offset(3 * sa))
      paths.sa = paths.sa.line(paths.sa.start()).close().attr('class', 'fabric sa')
    }
  }

  // Paperless?
  if (paperless) sharedDimensions(part, 'front')

  return part
}
