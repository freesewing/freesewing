import { front } from './front.mjs'

function wahidFrontLining({
  points,
  Point,
  paths,
  Path,
  options,
  macro,
  snippets,
  Snippet,
  store,
  sa,
  expand,
  part,
}) {
  if (expand) {
    store.flag.preset('expandIsOn')
  } else {
    // Expand is off, do not draw the part but flag this to the user
    store.flag.note({
      msg: `wahid:cutFrontLining`,
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

  // Cleanup from Brian
  for (let i of Object.keys(paths)) delete paths[i]
  for (let i of Object.keys(snippets)) delete snippets[i]
  // Seam line
  paths.seam = new Path()
    .move(points.hem)
    .line(points.hips)
    .curve(points.hipsCp2, points.waistCp1, points.waist)
    .curve_(points.waistCp2, points.armhole)
    .curve(points.armholeCp2, points.armholeHollowCp1, points.armholeHollow)
    .curve(points.armholeHollowCp2, points.armholePitchCp1, points.armholePitch)
    .curve(points.armholePitchCp2, points.shoulderCp1, points.shoulder)
    .line(points.flbTop)
    .curve(points.flbCpTop, points.flbCp, points.dartTop)
    ._curve(points.dartWaistRightCpTop, points.dartWaistRight)
    .curve(points.dartWaistRightCpBottom, points.dartHipRightCpTop, points.dartHipRight)
    .line(points.dartEnd)
  if (options.hemStyle === 'classic') {
    paths.seam.curve(points.splitDartHemRightCp2, points.splitHemCp1, points.hem)
  } else paths.seam.line(points.hem)
  paths.seam.close().setClass('lining')

  if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'lining sa')

  /*
   * Annotations
   */
  // Cutlist
  store.cutlist.setCut({ cut: 2, from: 'lining' })

  // Grainline
  macro('grainline', {
    from: points.flbTop,
    to: new Point(points.flbTop.x, points.dartTop.y),
  })

  // Title
  points.title = points.armhole.shiftFractionTowards(points.dartTop, 0.5)
  macro('rmtitle')
  macro('title', {
    nr: '1b',
    at: points.title,
    title: 'frontLining',
  })

  // Logo
  points.logo = points.dartWaistRight.shiftFractionTowards(points.waist, 0.5)
  snippets.logo = new Snippet('logo', points.logo)

  return part
}

export const frontLining = {
  name: 'wahid.frontLining',
  from: front,
  draft: wahidFrontLining,
}
