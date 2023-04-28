import { sleeve as brianSleeve } from '@freesewing/brian'
import { front } from './front.mjs'
import { back } from './back.mjs'
import { cuffEase, sleeveLengthBonus, ribbingHeight } from './options.mjs'
import { hidePresets } from '@freesewing/core'

function hugoSleeve({
  utils,
  store,
  sa,
  Point,
  points,
  Path,
  paths,
  Snippet,
  snippets,
  options,
  measurements,
  complete,
  paperless,
  macro,
  part,
}) {
  // Top of raglan sleeve
  points.raglanTop = new Point(0, points.sleeveTip.y - store.get('shoulderLength'))

  // Move and rotate front neck opening part
  let anchor = store.get('neckOpeningAnchorFront')
  let neckOpeningFront = store.get('neckOpeningPartFront')
  neckOpeningFront = neckOpeningFront.translate(
    anchor.dx(points.raglanTop),
    anchor.dy(points.raglanTop)
  )
  let cp2 = neckOpeningFront.ops[1].cp1
  let cp1 = neckOpeningFront.ops[1].cp2
  let to = neckOpeningFront.ops[0].to
  let angle = points.raglanTop.angle(cp1)
  points.raglanTopCp2 = cp1.rotate(180 - angle, points.raglanTop)
  points.raglanTipFrontCp1 = cp2.rotate(180 - angle, points.raglanTop)
  points.raglanTipFront = to.rotate(180 - angle, points.raglanTop)

  // Move and rotate back neck opening part
  anchor = store.get('neckOpeningAnchorBack')
  let neckOpeningBack = store.get('neckOpeningPartBack')
  neckOpeningBack = neckOpeningBack.translate(
    anchor.dx(points.raglanTop),
    anchor.dy(points.raglanTop)
  )
  cp2 = neckOpeningBack.ops[1].cp1
  cp1 = neckOpeningBack.ops[1].cp2
  to = neckOpeningBack.ops[0].to
  points.raglanTopCp1 = cp1.flipX() //rotate(180 - angle, points.raglanTop);
  points.raglanTipBackCp2 = cp2.flipX() //rotate(180 - angle, points.raglanTop);
  points.raglanTipBack = to.flipX() //rotate(180 - angle, points.raglanTop);
  angle = points.raglanTop.angle(points.raglanTopCp1)
  points.raglanTopCp1 = points.raglanTopCp1.rotate(360 - angle, points.raglanTop)
  points.raglanTipBackCp2 = points.raglanTipBackCp2.rotate(360 - angle, points.raglanTop)
  points.raglanTipBack = points.raglanTipBack.rotate(360 - angle, points.raglanTop)

  let ragDiff = 0
  let runs = 0
  do {
    // Curve raglan seam to accomodate shoulder slope
    points.raglanMidFront = points.raglanTipFront.shiftFractionTowards(points.capQ4Base, 0.5)
    points.raglanMidBack = utils.beamsIntersect(
      points.raglanTipBack,
      points.capQ1Base,
      points.raglanMidFront,
      points.raglanMidFront.shift(0, 100)
    )
    points.raglanFrontCp1 = points.raglanTipFront.shiftFractionTowards(points.capQ4Base, 0.25)
    points.raglanFrontCp2 = points.raglanTipFront.shiftFractionTowards(points.capQ4Base, 0.75)
    points.raglanBackCp1 = points.raglanTipBack.shiftFractionTowards(points.capQ1Base, 0.8)
    points.raglanBackCp2 = points.raglanTipBack.shiftFractionTowards(points.capQ1Base, 0.3)
    let slope = store.get('shoulderSlopeDeltaY')
    let angleFront = points.raglanTipFront.angle(points.capQ4Base)
    let angleBack = points.raglanTipBack.angle(points.capQ1Base)
    points.slopeFront = points.raglanMidFront.shift(angleFront + 90, slope / 2)
    points.slopeBack = points.raglanMidBack.shift(angleBack - 90, slope / 2)
    points.slopeFrontCp1 = points.raglanFrontCp1.shift(angleFront + 90, slope / 2)
    points.slopeFrontCp2 = points.raglanFrontCp2.shift(angleFront + 90, slope / 2)
    points.slopeBackCp1 = points.raglanBackCp1.shift(angleBack - 90, slope / 2)
    points.slopeBackCp2 = points.raglanBackCp2.shift(angleBack - 90, slope / 2)
    points.capQ4BaseCp = utils.beamsIntersect(
      points.slopeFrontCp2,
      points.capQ4Base,
      points.bicepsLeft,
      points.capQ4Cp2
    )
    points.capQ1BaseCp = utils.beamsIntersect(
      points.slopeBackCp1,
      points.capQ1Base,
      points.bicepsRight,
      points.capQ1Cp2
    )

    // Now make sure the length matches the front raglan seam
    let raglen = new Path()
      .move(points.raglanTipBack)
      .curve(points.raglanTipBackCp2, points.raglanTopCp1, points.raglanTop)
      .curve(points.raglanTopCp2, points.raglanTipFrontCp1, points.raglanTipFront)
      .curve(points.raglanTipFront, points.slopeFrontCp1, points.slopeFront)
      .curve(points.slopeFrontCp2, points.capQ4Base, points.capQ4Base)
      .length()
    ragDiff = store.get('raglen') - raglen
    let tipPoints = [
      'raglanTipFront',
      'raglanTipFrontCp1',
      'raglanTopCp2',
      'raglanTop',
      'raglanTopCp1',
      'raglanTipBackCp2',
      'raglanTipBack',
    ]
    for (let pid of tipPoints) points[pid] = points[pid].shift(90, ragDiff)
    // Fix sleeve length
    let lenTotal =
      store.get('shoulderLength') +
      measurements.shoulderToWrist * (1 + options.sleeveLengthBonus) -
      options.ribbingHeight
    let lenDelta = points.raglanTop.dist(points.centerWrist) - lenTotal
    let wristPoints = ['wristLeft', 'centerWrist', 'wristRight']
    for (let pid of wristPoints) points[pid] = points[pid].shift(90, lenDelta)
    runs++
  } while (Math.abs(ragDiff) > 5 && runs < 10)

  paths.seam = new Path()
    .move(points.raglanTipBack)
    .curve(points.raglanTipBackCp2, points.raglanTopCp1, points.raglanTop)
    .curve(points.raglanTopCp2, points.raglanTipFrontCp1, points.raglanTipFront)
    .curve(points.raglanTipFront, points.slopeFrontCp1, points.slopeFront)
    .curve(points.slopeFrontCp2, points.capQ4Cp2, points.bicepsLeft)
    .line(points.wristLeft)
    .line(points.wristRight)
    .line(points.bicepsRight)
    .curve(points.capQ1Cp1, points.slopeBackCp1, points.slopeBack)
    .curve(points.slopeBackCp2, points.raglanTipBack, points.raglanTipBack)
    .close()
    .attr('class', 'fabric')

  // Complete pattern?
  if (complete) {
    macro('grainline', {
      from: points.centerWrist,
      to: points.raglanTop,
    })
    //points.title = new Point(points.armhole.x/2, points.armhole.y);
    macro('title', { at: points.gridAnchor, nr: 3, title: 'sleeve' })
    //points.sleeveNotch = points.raglanTipFront.shiftFractionTowards(points.armholeHollow, 0.5);
    //snippets.sleeveNotch = new Snippet("notch", points.sleeveNotch);
    //store.set('frontRaglanTipToNotch', points.raglanTipFront.dist(points.sleeveNotch));
    points.logo = points.gridAnchor.shift(-90, 70)
    snippets.logo = new Snippet('logo', points.logo)
    points.scalebox = points.logo.shift(-90, 70)
    macro('scalebox', { at: points.scalebox })
    points.frontNotch = new Path()
      .move(points.raglanTipFront)
      .curve(points.raglanTipFront, points.slopeFrontCp1, points.slopeFront)
      .curve(points.slopeFrontCp2, points.capQ4Cp2, points.bicepsLeft)
      .shiftAlong(store.get('notchFront'))
    snippets.frontNotch = new Snippet('notch', points.frontNotch)
    snippets.shoulderNotch = new Snippet('notch', points.raglanTop)
    points.backNotch = new Path()
      .move(points.raglanTipBack)
      .curve(points.raglanTipBack, points.slopeBackCp2, points.slopeBack)
      .curve(points.slopeBackCp1, points.capQ1Cp1, points.bicepsRight)
      .shiftAlong(store.get('notchBack'))
    snippets.backNotch = new Snippet('bnotch', points.backNotch)
    if (sa) {
      paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
    }
  }

  // Paperless?
  if (paperless) {
    macro('vd', {
      from: points.wristLeft,
      to: points.bicepsLeft,
      x: points.bicepsLeft.x - 15 - sa,
    })
    macro('vd', {
      from: points.bicepsLeft,
      to: points.raglanTipFront,
      x: points.bicepsLeft.x - 15 - sa,
    })
    macro('vd', {
      from: points.bicepsRight,
      to: points.raglanTop,
      x: points.bicepsRight.x + 15 + sa,
    })
    macro('vd', {
      from: points.bicepsRight,
      to: points.raglanTipBack,
      x: points.bicepsRight.x + 30 + sa,
    })
    macro('hd', {
      from: points.raglanTipFront,
      to: points.raglanTop,
      y: points.raglanTipBack.y - 15 - sa,
    })
    macro('hd', {
      from: points.raglanTop,
      to: points.raglanTipBack,
      y: points.raglanTipBack.y - 15 - sa,
    })
    macro('hd', {
      from: points.bicepsLeft,
      to: points.raglanTop,
      y: points.raglanTipBack.y - 30 - sa,
    })
    macro('hd', {
      from: points.bicepsLeft,
      to: points.bicepsRight,
      y: points.raglanTipBack.y - 45 - sa,
    })
    macro('hd', {
      from: points.wristLeft,
      to: points.wristRight,
      y: points.wristLeft.y + 15 + sa,
    })
  }
  return part
}

export const sleeve = {
  name: 'hugo.sleeve',
  from: brianSleeve,
  hide: hidePresets.HIDE_TREE,
  after: [front, back],
  options: { cuffEase, sleeveLengthBonus, ribbingHeight },
  draft: hugoSleeve,
}
