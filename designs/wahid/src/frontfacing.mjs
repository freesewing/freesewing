import { front } from './front.mjs'

function wahidFrontFacing({
  points,
  Point,
  paths,
  Path,
  options,
  macro,
  snippets,
  Snippet,
  store,
  expand,
  sa,
  part,
}) {
  if (expand) {
    store.flag.preset('expandIsOn')
  } else {
    // Expand is off, do not draw the part but flag this to the user
    store.flag.note({
      msg: `wahid:cutFrontFacing`,
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

  // Cleanup from front part
  for (let i of Object.keys(paths).filter((name) => name !== 'grainline')) delete paths[i]
  for (let i of Object.keys(snippets)) delete snippets[i]
  // Seam line
  paths.seam = new Path()
    .move(points.dartStart)
    .line(points.dartHipLeft)
    .curve(points.dartHipLeftCpTop, points.dartWaistLeftCpBottom, points.dartWaistLeft)
    .curve_(points.dartWaistLeftCpTop, points.dartTop)
    .curve(points.flbCp, points.flbCpTop, points.flbTop)
    .line(points.neck)
    .curve(points.neckCp2, points.closureTopCp1, points.closureTop)
  if (options.hemStyle === 'classic') {
    paths.seam
      .line(points.closureBottom)
      .line(points.hemTip)
      ._curve(points.splitDartHemLeftCp1, points.splitDartHemLeft)
  } else if (options.hemStyle === 'rounded') {
    paths.seam
      .line(points.roundStart)
      .curve(points.roundCp1, points.roundCp2, points.roundEnd)
      .line(points.dartHemLeft)
  } else {
    paths.seam.line(points.closureBottom).line(points.dartHemLeft)
  }
  paths.seam.close().attr('class', 'fabric')
  if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')

  /*
   * Annotations
   */
  // Cutlist
  store.cutlist.setCut({ cut: 2, from: 'fabric' })

  // Title
  points.title = new Point(points.dartWaistLeft.x / 2, points.waist.y)
  macro('title', {
    nr: '1a',
    at: points.title,
    title: 'frontFacing',
  })

  // Logo
  points.logo = points.closureTop.shiftFractionTowards(points.dartWaistLeft, 0.5)
  snippets.logo = new Snippet('logo', points.logo)

  // Grainline
  macro('grainline', {
    to: points.neck,
    from: new Point(points.neck.x, points.cfHem.y),
  })

  return part
}

export const frontFacing = {
  name: 'wahid.frontFacing',
  from: front,
  draft: wahidFrontFacing,
}
