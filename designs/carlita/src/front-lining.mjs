import { front } from './front.mjs'

function draftCarlitaFrontLining({
  sa,
  snippets,
  Snippet,
  store,
  points,
  macro,
  expand,
  paths,
  Path,
  part,
}) {
  if (expand) store.flag.preset('expandIsOn')
  else {
    // Expand is on, do not draw the part but flag this to the user
    store.flag.note({
      msg: `carlton:cutFrontLining`,
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

  const collar = paths.frontCollar.split(points.flbTop)
  const armhole = paths.frontArmhole

  // Clean up
  macro('rmad')
  for (const id in paths) {
    if (!['frontCollar'].includes(id)) delete paths[id]
  }
  for (const id in snippets) delete snippets[id]

  paths.seam = new Path()
    .move(points.psHem)
    .line(points.bustPoint)
    .curve_(points.bustPointCp1, points.armholePitch)
    .join(armhole)
    .line(points.s3CollarSplit)
    .join(collar[0])
    .line(points.flbHem)
    .line(points.psHem)
    .close()
    .addClass('lining')

  if (sa) paths.sa = paths.seam.offset(sa).addClass('sa lining')

  /*
   * Annotations
   */

  // Cut list
  store.cutlist.setCut({ cut: 2, from: 'lining' })

  // Title
  points.title = points.s3CollarSplit.shiftFractionTowards(points.bustPointRot2, 0.5)
  macro('rmtitle')
  macro('title', {
    at: points.title,
    nr: '1d',
    title: 'frontLining',
  })

  // Logo
  points.logo = points.s3CollarSplit.shiftFractionTowards(points.armholePitchRot1, 0.5)
  snippets.logo = new Snippet('logo', points.logo)

  // Grainline
  points.grainlineFrom = points.flbHem.shift(0, 10)
  points.grainlineTo = points.flbTop.shift(0, 10)
  macro('grainline', {
    from: points.grainlineFrom,
    to: points.grainlineTo,
  })

  // Notches
  snippets.bust = new Snippet('notch', points.bustPoint)

  // Dimensions
  macro('hd', {
    id: 'wHem',
    from: points.flbHem,
    to: points.psHem,
    y: points.psHem.y + sa + 15,
  })
  macro('hd', {
    id: 'wFull',
    from: points.flbTop,
    to: points.s3ArmholeSplit,
    y: points.s3CollarSplit.y - sa - 15,
  })

  return part
}

export const frontLining = {
  name: 'carlita.frontLining',
  from: front,
  draft: draftCarlitaFrontLining,
}
