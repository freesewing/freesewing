export default function (part) {
  const {
    store,
    sa,
    Point,
    points,
    Path,
    paths,
    absoluteOptions,
    options,
    complete,
    paperless,
    macro,
    utils,
    measurements,
    snippets,
    Snippet,
    raise,
  } = part.shorthand()

  // This pattern needs a rewrite
  raise.warning(
    'Theo in its current incarnation is deprecated. A complete rewrite based on our Titan block is on [our v3 roadmap](https://github.com/freesewing/freesewing/discussions/1278). Until that time, if it works, great. If not ¯\\\\__(ツ)\\__/¯'
  )

  const calculateSlashCorner = () => {
    points[901] = utils.beamsIntersect(points[20], points[19], points[26], points[4])
    points[902] = points[901].clone()
    const step = -0.1
    let i = 0
    while (points[901].dist(points[902]) < 25) {
      i++
      points[902] = points[901].rotate(i * step, points[26])
    }

    return i * step
  }

  // Store
  store.set('lengthBonus', measurements.inseam * options.lengthBonus)
  store.set('backReduction', (measurements.hips / -4) * options.wedge)
  store.set('legWidth', (measurements.knee * (1 + options.legWidth)) / 2)
  store.set('backRise', measurements.hips * options.backRise)

  // Points
  points[0] = new Point(0, 0)
  points[1] = new Point(
    0,
    measurements.crotchDepth - measurements.waistToHips - absoluteOptions.waistbandWidth
  )
  points[2] = new Point(0, points[1].y + measurements.inseam + store.get('lengthBonus'))
  points[201] = points[2].shift(-90, 10)
  points[202] = new Point(store.get('legWidth') / 4, points[201].y)
  points[203] = points[202].flipX()
  points[3] = new Point(0, points[1].y + measurements.inseam / 2 + 50)
  points[4] = new Point(0, points[1].y - (measurements.crotchDepth - measurements.waistToHips) / 4)
  points[5] = new Point(10 - measurements.seat / 8, points[1].y)
  points[9] = new Point(
    points[5].x - measurements.seat / 16 - 5 + store.get('backReduction'),
    points[5].y
  )
  points[16] = new Point(points[5].x - points[1].dx(points[5]) / 4, points[5].y)
  points[1601] = points[16].shift(135, 45)
  points[1602] = points[1601].shift(45, 25)
  points[1603] = points[1601].shift(-135, 45)
  points[17] = new Point(points[16].x, points[4].y)
  points[18] = new Point(points[16].x, 0)
  points[19] = new Point(points[16].x, points[16].y + points[16].dy(points[18]) / 2)
  points[20] = new Point(points[18].x + 20, points[18].y)
  points[1901] = points[20].shiftOutwards(points[19], 25)
  points[21] = points[19].shiftOutwards(points[20], 10)
  points[22] = new Point(
    points[9].x + points[5].dx(points[9]) / 2 - 5 + store.get('backReduction'),
    points[9].y
  )
  points[23] = new Point(points[22].x, points[22].y + 5)
  points[24] = new Point(points[20].x + measurements.hips / 4 + 45, points[20].y)
  points[25] = points[21].shiftFractionTowards(points[24], 0.5)
  points[2501] = points[25].shiftTowards(points[24], 120)
  points[2502] = points[2501].rotate(-90, points[25])
  points[2503] = points[25].shiftTowards(points[24], 12.5)
  points[2504] = points[25].shiftTowards(points[21], 12.5)
  points[26] = new Point(points[17].x + measurements.seat / 4 + 30, points[17].y)
  points[2601] = points[24].shiftFractionTowards(points[26], 1, 4)
  points[27] = new Point(points[2].x + store.get('legWidth') / 2 + 20, points[2].y)
  points[2701] = new Point(points[27].x, points[27].y - 50)
  points[2702] = points[2701].flipX()
  points[28] = points[27].flipX()
  points[29] = new Point(points[3].x + store.get('legWidth') / 2 + 15 + 20, points[3].y)
  points[2901] = points[27].shiftFractionTowards(points[29], 1.6)
  points[30] = points[29].flipX()
  points[3001] = points[28].shiftFractionTowards(points[30], 1.6)

  // Slash and rotate around point 26
  let corner = calculateSlashCorner()
  const rotateThese = [24, 2501, 2502, 2503, 2504, 25, 21, 20, 19, 1901, 2601]
  for (let id of rotateThese) {
    let newId = '90' + id
    points[newId] = points[id].rotate(corner, points[26])
  }

  // These need to be moved 1cm to the left as per instructions after slash
  points[901601] = points[1601].shift(180, 10)
  points[901602] = points[1602].shift(180, 10)
  points[901603] = points[1603].shift(180, 10)
  // Add endpoint for pleat line
  points[900] = utils.beamsIntersect(points[9021], points[9024], points[0], points[1])

  // Points without seam allowance
  points[-21] = points[9021].shiftTowards(points[902504], 10)
  points[-2101] = points[-21].shift(points[9020].angle(points[9021]), -10)
  points[-24] = points[9024].shiftTowards(points[9021], 10)
  points[-2104] = points[-24].shift(points[9024].angle(points[26]), 10)
  points[-2501] = points[902504].shiftTowards(points[902502], 10)
  points[-2502] = points[902503].shiftTowards(points[902502], 10)
  points[-2503] = points[902504].shiftTowards(points[902502], 60)
  points[-2504] = points[902503].shiftTowards(points[902502], 60)
  points[-26] = points[26].shift(points[9024].angle(points[9021]), 10)
  points[-2601] = points[-2104].shiftFractionTowards(points[-26], 1.4)
  points[-2901] = points[2901].shift(points[2901].angle(points[29]) - 90, 10)
  points[-29] = points[29].shift(points[2901].angle(points[29]) - 90, 10)
  points[-2701] = points[2701].shift(180, 10)

  points[-27] = new Path().move(points[27])._curve(points[202], points[201]).shiftAlong(10)
  points[-28] = points[-27].flipX()
  points[-2702] = points[-2701].flipX()
  points[-30] = points[-29].flipX()
  points[-3001] = points[3001].shift(points[30].angle(points[3001]) + 90, -10)
  points[-23] = new Path().move(points[23])._curve(points[901603], points[901601]).shiftAlong(10)
  points[-2301] = new Path().move(points[-23])._curve(points[-3001], points[-30]).shiftAlong(10)
  points[-900] = new Point(points[900].x, points[900].y + 10)
  points[-901603] = points[901603].shift(points[901603].angle(points[901601]) + 90, -10)
  points[-901601] = points[901601].shift(points[901603].angle(points[901601]) + 90, -10)
  points[-901602] = points[901602].shift(points[901603].angle(points[901601]) + 90, -10)
  points[-901901] = points[901901].shift(points[901601].angle(points[9019]) + 90, -10)
  points[-9019] = points[9019].shift(points[901901].angle(points[9019]) + 90, -10)

  // Extra SA at back seam
  points[9021] = points[-21].shift(points[-2501].angle(points[-2101]), 40)

  // Extra SA at hem
  points[-2710] = points[-27].shift(-90, 60)
  points[-2810] = points[-2710].flipX()
  points[-20110] = points[201].shift(-90, 60)
  points[-20210] = points[202].shift(-90, 60)
  points[-20310] = points[203].shift(-90, 60)

  // Raise waistband
  points[66601] = points[-2101].shiftTowards(points[-21], store.get('backRise'))

  // Original dart without raise
  points[66602] = utils.beamsIntersect(points[66601], points[-2104], points[902502], points[-2501])
  points[66603] = utils.beamsIntersect(points[66601], points[-2104], points[902502], points[-2502])
  points[66605] = points[-2101].shiftTowards(points[-21], store.get('backRise') + 10)
  points[66606] = new Point(
    points[66602].x + points[66601].dx(points[66605]),
    points[66602].y + points[66601].dy(points[66605])
  )
  points[66607] = utils.beamsIntersect(points[66606], points[66605], points[901601], points[9021])

  // Construct the back dart with raise
  points.dartTop = points[66601].shiftFractionTowards(points[-2104], 0.5)
  points.dartTip = points.dartTop.shift(
    points[-2104].angle(points[66601]) + 90,
    points.dartTop.dist(points[902502])
  )
  points.dartTopLeft = points.dartTop.shiftTowards(
    points[66601],
    points[66602].dist(points[66603]) / 2
  )
  points.dartTopRight = points.dartTop.shiftTowards(
    points[-2104],
    points[66602].dist(points[66603]) / 2
  )

  // Reconstruct back pocket with raise
  points.pocketCenterLeft = points.dartTopLeft.shiftTowards(points.dartTip, 60)
  points.pocketCenterRight = points.dartTopRight.shiftTowards(points.dartTip, 60)
  points.pocketEdgeLeft = points.pocketCenterLeft.shift(
    points.pocketCenterLeft.angle(points.dartTip) - 90,
    70
  )
  points.pocketEdgeRight = points.pocketCenterRight.shift(
    points.pocketCenterRight.angle(points.dartTip) + 90,
    70
  )

  // Extend back pleat to include rise
  points[-900] = utils.beamsIntersect(points[900], points[-900], points[66601], points[66602])

  // Paths
  // This is the original Aldrich path, which includes seam allowance
  paths.aldrich = new Path()
    .move(points[23])
    ._curve(points[901603], points[901601])
    .curve(points[901602], points[901901], points[9019])
    .line(points[9021])
    .line(points[902504])
    .line(points[902502])
    .line(points[902503])
    .line(points[9024])
    .line(points[26])
    .curve(points[902601], points[2901], points[29])
    .curve(points[29], points[2701], points[27])
    .curve(points[27], points[202], points[201])
    .curve_(points[203], points[28])
    .curve_(points[2702], points[30])
    .curve_(points[3001], points[23])
    .close()
  paths.aldrich.render = false

  // This is the path we use, no seam allowance
  paths.hemBase = new Path()
    .move(points[-27])
    ._curve(points[202], points[201])
    .curve_(points[203], points[-28])
  paths.saBase1 = new Path()
    .move(points[-28])
    .curve_(points[-2702], points[-30])
    .curve_(points[-3001], points[-2301])
    ._curve(points[-901603], points[-901601])
    .curve(points[-901602], points[-901901], points[-9019])
    .line(points[66601])
    .line(points.dartTopLeft)
  paths.saBase2 = new Path()
    .move(points.dartTopRight)
    .line(points[-2104])
    .line(points[-26])
    .curve(points[-2601], points[-2901], points[-29])
    .curve(points[-29], points[-2701], points[-27])
  paths.seam = paths.saBase1
    .clone()
    .line(points.dartTip)
    .line(points.dartTopRight)
    .join(paths.saBase2)
    .join(paths.hemBase)
    .close()
    .attr('class', 'fabric')
  paths.hemBase.render = false
  paths.saBase1.render = false
  paths.saBase2.render = false

  // Store length of the inseam and side seam
  store.set(
    'backInseamLength',
    new Path().move(points[-2301]).curve_(points[-3001], points[-30]).length() +
      new Path().move(points[30])._curve(points[-2702], points[-28]).length()
  )
  store.set(
    'backSideseamLength',
    points[-2104].dist(points[-26]) +
      new Path().move(points[-26]).curve(points[-2601], points[-2901], points[-29]).length() +
      new Path().move(points[-29])._curve(points[-2701], points[-27]).length()
  )

  // Complete pattern?
  if (complete) {
    if (sa) {
      paths.sa = paths.saBase1
        .offset(-1 * sa)
        .join(paths.saBase2.offset(-1 * sa))
        .join(paths.hemBase.offset(-3 * sa))
        .close()
        .attr('class', 'fabric sa')
    }
    paths.pocket = new Path()
      .move(points.pocketEdgeLeft)
      .line(points.pocketCenterLeft)
      .move(points.pocketCenterRight)
      .line(points.pocketEdgeRight)
      .attr('class', 'fabric dashed')

    points.grainlineTop = new Point(0, points[-2104].y)
    points.grainlineBottom = points[2].clone()
    macro('grainline', {
      from: points.grainlineBottom,
      to: points.grainlineTop,
    })
    points.title = new Point(0, points[-2301].y)
    macro('title', { at: points.title, title: 'back', nr: 1 })
    points.logo = points.title.shift(-90, 70)
    snippets.logo = new Snippet('logo', points.logo)
    points.scalebox = points.logo.shift(-90, 70)
    macro('scalebox', { at: points.scalebox })
    macro('sprinkle', {
      snippet: 'notch',
      on: ['pocketEdgeLeft', 'pocketEdgeRight'],
    })
  }

  // Paperless?
  if (paperless) {
    macro('ld', {
      from: points[66601],
      to: points.dartTopLeft,
      d: sa + 15,
    })
    macro('ld', {
      from: points.dartTopLeft,
      to: points.dartTopRight,
      d: sa + 15,
    })
    macro('ld', {
      from: points[66601],
      to: points[-2104],
      d: sa + 30,
    })
    macro('ld', {
      from: points.pocketEdgeLeft,
      to: points.pocketCenterLeft,
      d: 15,
    })
    macro('ld', {
      from: points.pocketCenterRight,
      to: points.pocketEdgeRight,
      d: 15,
    })
    macro('ld', {
      from: points.dartTip,
      to: points.dartTop,
      d: 30,
    })
    macro('ld', {
      from: points.dartTip,
      to: points.pocketCenterRight,
      d: -15,
    })
    macro('hd', {
      from: points[-2301],
      to: points[66601],
      y: points[66601].y - sa - 45,
    })
    macro('hd', {
      from: points[66601],
      to: points[-2104],
      y: points[66601].y - sa - 45,
    })
    macro('hd', {
      from: points[-2301],
      to: points[-2104],
      y: points[66601].y - sa - 60,
    })
    macro('vd', {
      from: points[-2301],
      to: points[66601],
      x: points[-2301].x - sa - 15,
    })
    macro('vd', {
      from: points[201],
      to: points[-2301],
      x: points[-2301].x - sa - 15,
    })
    macro('vd', {
      from: points[201],
      to: points[66601],
      x: points[-2301].x - sa - 30,
    })
    macro('hd', {
      from: points[-28],
      to: points[-27],
      y: points[201].y + 3 * sa + 15,
    })
    macro('vd', {
      from: points[-27],
      to: points[-2104],
      x: points[-2104].x + sa + 15,
    })
  }

  return part
}
