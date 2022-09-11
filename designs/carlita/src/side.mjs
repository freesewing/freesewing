import { front } from './front.mjs'

function draftCarlitaSide({
  paperless,
  sa,
  snippets,
  Snippet,
  store,
  complete,
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

  if (complete) {
    points.title = points.bustPoint.shiftFractionTowards(points.waist, 0.5)
    macro('title', {
      at: points.title,
      nr: '1b',
      title: 'side',
    })

    points.logo = points.psHem.shiftFractionTowards(points.seat, 0.5)
    snippets.logo = new Snippet('logo', points.logo)

    points.grainlineFrom = points.psHem.shiftFractionTowards(points.hem, 0.5)
    points.grainlineTo = new Point(points.grainlineFrom.x, points.armholePitchCp1.y)
    macro('grainline', {
      from: points.grainlineFrom,
      to: points.grainlineTo,
    })
    snippets.bust = new Snippet('notch', points.bustPoint)

    if (sa) {
      paths.sa = paths.saBase
        .offset(sa)
        .line(points.psHem.shift(-90, 3 * sa).shift(180, sa))
        .line(points.hem.shift(-90, 3 * sa).shift(0, sa))
        .close()
        .attr('class', 'fabric sa')
    }

    if (paperless) {
      macro('vd', {
        from: points.psHem,
        to: points.psWaist,
        x: points.psWaist.x - sa - 15,
      })
      macro('vd', {
        from: points.psHem,
        to: points.bustPoint,
        x: points.bustPoint.x - sa - 15,
      })
      macro('vd', {
        from: points.hem,
        to: points.seat,
        x: points.hem.x + sa + 15,
      })
      macro('vd', {
        from: points.hem,
        to: points.waist,
        x: points.hem.x + sa + 30,
      })
      macro('vd', {
        from: points.hem,
        to: points.armhole,
        x: points.hem.x + sa + 45,
      })
      macro('vd', {
        from: points.hem,
        to: points.armholePitch,
        x: points.hem.x + sa + 60,
      })
      macro('hd', {
        from: points.psWaist,
        to: points.waist,
      })
      macro('hd', {
        from: points.bustPoint,
        to: points.waist,
        y: points.bustPoint.y,
      })
      macro('hd', {
        from: points.bustPoint,
        to: points.armholePitch,
        y: points.armholePitch.y - sa - 15,
      })
      macro('hd', {
        from: points.bustPoint,
        to: points.armhole,
        y: points.armholePitch.y - sa - 30,
      })
      macro('hd', {
        from: points.psHem,
        to: points.hem,
        y: points.hem.y + 3 * sa + 15,
      })
    }
  }

  return part
}

export const side = {
  name: 'carlita.side',
  from: front,
  draft: draftCarlitaSide,
}
