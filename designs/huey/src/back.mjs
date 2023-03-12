import { pluginBundle } from '@freesewing/plugin-bundle'
import { back as brianBack } from '@freesewing/brian'
import { sharedDimensions } from './shared.mjs'

function draftHueyBack({
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
  measurements,
  part,
}) {
  // Clear paths from Brian
  for (let i in paths) {
    if (['backArmhole', 'backCollar'].indexOf(i) === -1) delete paths[i]
  }

  // Shorten body to take ribbing into account
  if (options.ribbing) {
    let rh = options.ribbingHeight * (measurements.hpsToWaistBack + measurements.waistToHips)
    for (let p of ['hem', 'cbHem']) points[p] = points[p].shift(90, rh)
    store.set('ribbingHeight', rh)
  }

  // Shape side seam
  points.hips.x = (measurements.hips * (1 + options.hipsEase)) / 4
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
    .join(paths.backArmhole)
    .line(points.s3CollarSplit)
    .join(paths.backCollar)
    .attr('class', 'note stroke-xxl')
  paths.hemBase = new Path().move(points.cbHem).line(points.hem).attr('class', 'note stroke-xxl')
  paths.saBase.hide()
  paths.hemBase.hide()

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
      grainline: true,
    })
    macro('scalebox', { at: new Point(points.armholePitch.x / 2, points.cbWaist.y) })
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

export const back = {
  name: 'huey.back',
  from: brianBack,
  hide: {
    from: true,
  },
  measurements: ['hips'],
  options: {
    ribbing: { bool: true, menu: 'style' },
    ribbingHeight: { pct: 10, min: 5, max: 15, menu: 'style' },
    hipsEase: { pct: 8, min: 4, max: 12, menu: 'fit' },
  },
  plugins: [pluginBundle],
  draft: draftHueyBack,
}
