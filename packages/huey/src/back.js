import { sharedDimensions } from './shared'

export default function (part) {
  let {
    store,
    macro,
    Path,
    Point,
    points,
    paths,
    complete,
    paperless,
    sa,
    options,
    measurements
  } = part.shorthand()

  // Clear paths from Brian
  for (let p of Object.keys(paths)) delete paths[p]

  // Shorten body to take ribbing into account
  if (options.ribbing) {
    let rh = options.ribbingHeight * (measurements.hpsToWaistBack + measurements.waistToHips)
    for (let p of ['hem', 'cbHem']) points[p] = points[p].shift(90, rh)
    store.set('ribbingHeight', rh)
  }

  // Shape side seam
  points.hips.x = (measurements.hipsCircumference * (1 + options.hipsEase)) / 4
  points.hem.x = points.hips.x
  points.hemCp2 = new Point(points.hips.x, points.cbWaist.y)

  // Store length of the neck seam
  store.set(
    'backNeckSeamLength',
    new Path().move(points.neck).curve_(points.neckCp2, points.cbNeck).length()
  )

  // Paths
  paths.saBase = new Path()
    .move(points.hem)
    .curve_(points.hemCp2, points.armhole)
    .curve(points.armholeCp2, points.armholeHollowCp1, points.armholeHollow)
    .curve(points.armholeHollowCp2, points.armholePitchCp1, points.armholePitch)
    .curve(points.armholePitchCp2, points.shoulderCp1, points.shoulder)
    .line(points.neck)
    .curve_(points.neckCp2, points.cbNeck)
    .attr('class', 'note stroke-xxl')
  paths.hemBase = new Path().move(points.cbHem).line(points.hem).attr('class', 'note stroke-xxl')
  paths.saBase.render = false
  paths.hemBase.render = false

  paths.seam = paths.saBase
    .clone()
    .line(points.cbHem)
    .join(paths.hemBase)
    .close()
    .attr('class', 'fabric')

  // Complete?
  if (complete) {
    macro('cutonfold', {
      from: points.cbNeck,
      to: points.cbHem,
      grainline: true
    })
    if (sa) {
      paths.sa = paths.hemBase.offset(options.ribbing ? sa : 3 * sa).join(paths.saBase.offset(sa))
      paths.sa
        .move(paths.sa.end())
        .line(points.cbNeck)
        .move(paths.sa.start())
        .line(points.cbHem)
        .attr('class', 'fabric sa')
    }
  }

  // Paperless?
  if (paperless) sharedDimensions(part, 'back')

  return part
}
