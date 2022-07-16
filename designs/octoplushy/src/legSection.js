import mirror from '@freesewing/plugin-mirror'
import { Store } from '@material-ui/icons'

export default function (partNumber, part) {
  console.log({ part: part })
  const {
    options,
    Point,
    Path,
    points,
    paths,
    Snippet,
    snippets,
    complete,
    sa,
    paperless,
    macro,
    utils,
    store,
  } = part.shorthand()

  if (partNumber > (options.type == 'squid' ? 1 : 0)) {
    return part
  }

  const c = 0.55191502449351
  const w = options.sizeConstant * options.size
  const h = options.sizeConstant * options.size * 0.5
  const sections = options.type == 'squid' ? 10 : 8

  let sectionWidth = (w * 2) / sections
  let neckWidth = sectionWidth * options.neckWidth
  let legWidth = (w * options.legWidth * options.bottomTopLegRatio *3.1415 /2) * options.bottomTopLegRatio
  let legLength = ((w * 2) / 3.1415) * options.legLength
  switch (options.type) {
    case 'octopus':
      legLength *= 2
      legLength *= 1 - (1 - options.bottomLegReduction) / 2
      break
    case 'squid':
      legLength *= 1.8
      if (partNumber == 1) {
        legLength *= 1.2
      }
      break
    case 'octoplushy':
      legLength *= options.bottomLegReduction
  }

  // let legSkirtWidth = store.get('legSkirtWidth')

  console.log({ legSection: w })
  console.log({ sectionWidth: sectionWidth })
  console.log({ neckWidth: neckWidth })
  console.log({ botlegWidth: legWidth })
  console.log({ legLength: legLength })
  // console.log({ legSkirtWidth: legSkirtWidth })

  points.legMiddle = new Point(0, 0)

  points.skirtLeft2 = points.legMiddle.shift(
    270 - 360 / sections / 2,
    w * options.legWidth * options.bottomTopLegRatio / 2 / Math.sin(utils.deg2rad(360 / sections / 2))
  )
  if( options.type == 'octoplushy'){
    points.skirtLeft2 = points.skirtLeft2.shift( 90,(points.skirtLeft2.y -points.legMiddle.y) -store.get('legSkirtRadius') )
  }

  points.legMiddleCp1 = points.legMiddle.shiftFractionTowards(points.skirtLeft2,c)
  points.skirtLeft3 = new Point(-1 *legWidth/2, points.skirtLeft2.y)
  points.skirtLeft = points.skirtLeft3.clone()
  let pHelper = points.skirtLeft.shift(store.get('legSkirtToTopAngle'), 10)
  console.log({ legSkirtHip: points.skirtLeft.x})
  console.log({ legSkirtHip: pHelper.x})
  console.log({ legSkirtHip: legWidth/-2 })
  console.log({ legSkirtHip: points.skirtLeft.dist(points.legMiddle) })
  if( Math.round(pHelper.x *1000) <= Math.round(legWidth/-2 *1000) ) {
    points.legTopLeft = points.skirtLeft.clone()
  } else {
    points.legTopLeft = utils.beamIntersectsX(
      points.skirtLeft,
      points.skirtLeft.shift(store.get('legSkirtToTopAngle'), 10),
      legWidth / -2
    )
  }
  console.log({legTopLeft:points.legTopLeft})
  points.legTopLeftCp2 = points.legTopLeft.shift(90, (points.legTopLeft.y - points.skirtLeft.y) * c)
  points.legTopLeftCp1 = points.legTopLeft.shift(270, legLength / 10)
  points.legBottomLeft = points.legTopLeft.shift(270, legLength).shift(0, legWidth / 4)
  // points.legBottomLeftCp2 = points.legBottomLeft.shift(90, legLength / 10)
  // points.legBottomLeftCp1 = points.legBottomLeft.shift(270, (legWidth / 4) * c)
  // points.legBottom = points.legBottomLeft.shift(270, legWidth / 4).shift(0, legWidth / 4)
  // points.legBottomCp2 = points.legBottom.shift(180, (legWidth / 4) * c)
  points.legBottom = points.legTopLeft.shift(270, legLength +legWidth / 4).shift(0, legWidth / 2)

  points.legBottomLeft = points.legBottom.shift(90, (legWidth/2)*(1-options.legTaper)).shift(180, (legWidth/2)*(1-options.legTaper))
  points.legBottomLeftCp2 = points.legBottomLeft.shift(90, legLength / 10)
  points.legBottomLeftCp1 = points.legBottomLeft.shift(270, (legWidth/2)*(1-options.legTaper) * c)
  points.legBottomCp2 = points.legBottom.shift(180, (legWidth/2)*(1-options.legTaper) * c)

  if (options.type == 'squid') {
    points.tentacleLeft = utils.beamIntersectsX(
      points.legBottomLeft,
      points.legBottomLeft.shift(180 + 70, 100),
      points.skirtLeft.x - neckWidth * 1
    )
    points.tentacleLeftCp2 = points.tentacleLeft.shift(
      90,
      points.legBottomLeft.dist(points.tentacleLeft) / 3
    )
    points.tentacleLeftCp1 = points.tentacleLeft.shift(
      270,
      points.legBottomLeft.dist(points.tentacleLeft) / 3
    )

    if (partNumber == 1) {
      points.legBottomLeftCp1 = points.legBottomLeft.shift(270, legWidth * c)
      points.legBottom = points.legBottom.flipY(points.tentacleLeft)
      points.legBottomCp2 = points.legBottomCp2.flipY(points.tentacleLeft)
    }
  }
  points.legMiddleCp2 = points.legMiddleCp1.flipX(points.legMiddle)
  points.skirtRight = points.skirtLeft.flipX(points.legMiddle)
  points.legTopRight = points.legTopLeft.flipX(points.legMiddle)
  points.legTopRightCp1 = points.legTopLeftCp2.flipX(points.legMiddle)
  points.legTopRightCp2 = points.legTopLeftCp1.flipX(points.legMiddle)
  points.legBottomRight = points.legBottomLeft.flipX(points.legMiddle)
  points.legBottomRightCp1 = points.legBottomLeftCp2.flipX(points.legMiddle)
  points.legBottomRightCp2 = points.legBottomLeftCp1.flipX(points.legMiddle)
  points.legBottom = points.legBottom.flipX(points.legMiddle)
  points.legBottomCp1 = points.legBottomCp2.flipX(points.legMiddle)

  if (options.type == 'squid') {
    points.tentacleRight = points.tentacleLeft.flipX(points.sectionTop)
    points.tentacleRightCp1 = points.tentacleLeftCp2.flipX(points.sectionTop)
    points.tentacleRightCp2 = points.tentacleLeftCp1.flipX(points.sectionTop)
  }

  paths.legBottom = new Path()
    .move(points.legBottomLeft)
    .curve(points.legBottomLeftCp1, points.legBottomCp2, points.legBottom)
    .curve(points.legBottomCp1, points.legBottomRightCp2, points.legBottomRight)
    .setRender(false)
  if (options.type == 'squid') {
    if (partNumber == 1) {
      paths.legBottom = new Path()
        .move(points.legBottomLeft)
        .curve(points.legBottomLeftCp1, points.tentacleLeftCp2, points.tentacleLeft)
        .curve(points.tentacleLeftCp1, points.legBottomCp2, points.legBottom)
        .curve(points.legBottomCp1, points.tentacleRightCp2, points.tentacleRight)
        .curve(points.tentacleRightCp1, points.legBottomRightCp2, points.legBottomRight)
        .setRender(false)
    }
  }

  if( points.skirtLeft.sitsRoughlyOn(points.legTopLeft)) {
    paths.topLeft = new Path()
      .move(points.legMiddle)
      .curve(points.legMiddleCp1, points.skirtLeft, points.skirtLeft)
  } else {
    paths.topLeft = new Path()
      .move(points.legMiddle)
      .curve(points.legMiddleCp1, points.skirtLeft, points.skirtLeft)
      .curve(points.skirtLeft, points.legTopLeftCp2, points.legTopLeft)
  }    
  if( points.skirtRight.sitsRoughlyOn(points.legTopRight)) {
    paths.topRight = new Path()
    .move(points.legTopRight)
    .curve(points.skirtRight,points.legMiddleCp2,points.legMiddle)
  } else {
    paths.topRight = new Path()
    .move(points.legTopRight)
    .curve(points.legTopRightCp1, points.skirtRight, points.skirtRight)
    .curve(points.skirtRight,points.legMiddleCp2,points.legMiddle)
  }    
  paths.section = new Path()
    .move(points.legMiddle)
    .join(paths.topLeft)
    .curve(points.legTopLeftCp1, points.legBottomLeftCp2, points.legBottomLeft)
    .join(paths.legBottom)
    .curve(points.legBottomRightCp1, points.legTopRightCp2, points.legTopRight)
    .join(paths.topRight)
    .close()

  // Complete?
  if (complete) {
    for( var i = 0; i < 4; i++ ){
      // snippets[`legLeft${i}`] =  new Snippet('notch', points.legTopLeft.shiftFractionTowards(points.legBottomLeft, i/4))
      // snippets[`legRight${i}`] =  new Snippet('notch', points.legTopRight.shiftFractionTowards(points.legBottomRight, i/4))
    }
    // points.logo = points.topLeft.shiftFractionTowards(points.bottomRight, 0.5)
    // snippets.logo = new Snippet('logo', points.logo)
    // points.text = points.logo
    //   .shift(-90, w / 8)
    //   .attr('data-text', partNumber)
    //   .attr('data-text-class', 'center')

    if (sa) {
      paths.sa = paths.section.offset(sa).attr('class', 'fabric sa')
    }
  }

  return part
}
