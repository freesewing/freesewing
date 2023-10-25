import { front } from './front.mjs'

function draftCarlitaSide({
  sa,
  snippets,
  Snippet,
  store,
  points,
  macro,
  Point,
  paths,
  Path,
  part,
}) {
  // Give points their original names
  for (let i of store.get('side')) points[i] = points[i + 'Rot2'].clone()

  // Clean up
  for (let i in paths) {
    if (['frontArmhole', 'frontCollar'].indexOf(i) === -1) delete paths[i]
  }
  for (let i in snippets) delete snippets[i]

  points.anchor = points.armholePitchRot2.clone()

  paths.saBase = new Path()
    .move(points.hem)
    .line(points.seat)
    .curve(points.seatCp2, points.waistCp1, points.waist)
    .curve_(points.waistCp2, points.armhole)
    .curve(points.armholeCp2, points.armholeHollowCp1, points.armholeHollow)
    .curve(points.armholeHollowCp2, points.armholePitchCp1, points.armholePitch)
    ._curve(points.bustPointCp1, points.bustPoint)
    .curve(points.bustPointCp2, points.psWaistCp1, points.psWaist)
    .line(points.psHem)
  paths.seam = paths.saBase.clone().line(points.hem).close().attr('class', 'fabric')

  if (sa)
    paths.sa = paths.saBase
      .offset(sa)
      .line(points.psHem.shift(-90, 3 * sa).shift(180, sa))
      .line(points.hem.shift(-90, 3 * sa).shift(0, sa))
      .close()
      .addClass('fabric sa')

  /*
   * Annotations
   */

  // Title
  points.title = points.bustPoint.shiftFractionTowards(points.waist, 0.5)
  macro('title', {
    at: points.title,
    nr: '1b',
    title: 'side',
  })

  // Logo
  points.logo = points.psHem.shiftFractionTowards(points.seat, 0.5)
  snippets.logo = new Snippet('logo', points.logo)

  // Grainline
  points.grainlineFrom = points.psHem.shiftFractionTowards(points.hem, 0.5)
  points.grainlineTo = new Point(points.grainlineFrom.x, points.armholePitchCp1.y)
  macro('grainline', {
    from: points.grainlineFrom,
    to: points.grainlineTo,
  })

  // Notches
  points.sideSeamWaist = new Point(points.psHemRot2.x, points.cfWaist.y)
  points.sideSeamHips = new Point(points.psHemRot2.x, points.cfHips.y)
  snippets.bust = new Snippet('notch', points.bustPoint)
  snippets.sideSeamWaist = new Snippet('notch', points.sideSeamWaist)
  snippets.sideSeamHips = new Snippet('notch', points.sideSeamHips)

  // Dimensions
  macro('vd', {
    id: 'hHemToWaist',
    from: points.psHem,
    to: points.psWaist,
    x: points.psWaist.x - sa - 15,
  })
  macro('vd', {
    id: 'hHemToBustPoint',
    from: points.psHem,
    to: points.bustPoint,
    x: points.bustPoint.x - sa - 15,
  })
  macro('vd', {
    id: 'hHemToSeat',
    from: points.hem,
    to: points.seat,
    x: points.hem.x + sa + 15,
  })
  macro('vd', {
    id: 'hHemToPrincessSeamEnd',
    from: points.hem,
    to: points.armhole,
    x: points.hem.x + sa + 30,
  })
  macro('vd', {
    id: 'hFull',
    from: points.hem,
    to: points.armholePitch,
    x: points.hem.x + sa + 45,
  })
  macro('hd', {
    id: 'wAtWaist',
    from: points.psWaist,
    to: points.waist,
  })
  macro('hd', {
    id: 'wBustToWaist',
    from: points.bustPoint,
    to: points.waist,
    y: points.bustPoint.y,
  })
  macro('hd', {
    id: 'wBustToPrincessSeamTip',
    from: points.bustPoint,
    to: points.armholePitch,
    y: points.armholePitch.y - sa - 15,
  })
  macro('hd', {
    id: 'wFull',
    from: points.bustPoint,
    to: points.armhole,
    y: points.armholePitch.y - sa - 30,
  })
  macro('hd', {
    id: 'wHem',
    from: points.psHem,
    to: points.hem,
    y: points.hem.y + 3 * sa + 15,
  })

  return part
}

export const side = {
  name: 'carlita.side',
  from: front,
  draft: draftCarlitaSide,
}
