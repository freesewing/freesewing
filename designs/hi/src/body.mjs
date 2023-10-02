const length = 1000

export const body = {
  name: 'hi.body',
  options: {
    length,
    size: {
      pct: 100,
      min: 5,
      max: 500,
      menu: 'style',
      toAbs: (val, { options }) => (options?.length ? options.length * val : length * val),
      fromAbs: (val, { options }) =>
        options?.length
          ? Math.round((10000 * val) / options.length) / 10000
          : Math.round((10000 * val) / length) / 10000,
    },
    nosePointiness: { pct: 0, min: -5, max: +10, menu: 'style' },
    aggressive: { bool: false, menu: 'style' },
  },
  draft: ({
    store,
    sa,
    Point,
    points,
    Path,
    paths,
    Snippet,
    snippets,
    complete,
    options,
    macro,
    utils,
    part,
  }) => {
    const multiplier = (length / 1000) * options.size
    store.set('multiplier', multiplier)

    const body01_02d = 117.67274991262845 * multiplier
    const body02_03d = 124.91298035032229 * multiplier
    const body03_04d = 255.92397474640785 * multiplier
    const body04_05d = 201.01260719168837 * multiplier
    const body05_06d = 134.89080971660005 * multiplier
    const body06_07d = 49.0386070356816 * multiplier
    const body07_08d = 225.86340480918992 * multiplier
    const body08_09d = 66.84760000179512 * multiplier
    const body09_10d = 40.7278200374142 * multiplier
    const body10_11d = 23.78799421977402 * multiplier
    const body11_12d = 57.68530918700182 * multiplier
    const body12_13d = 98.0662397820983 * multiplier
    const body13_14d = 91.32736600274856 * multiplier
    const body14_15d = 295.1097706682888 * multiplier
    const body15_16d = 209.4263335058177 * multiplier
    const body16_17d = 152.51537318250902 * multiplier
    const body17_18d = 255.15294373571314 * multiplier
    const body18_19d = 71.90453921693678 * multiplier

    const body01cp1d = 32.13103487929059 * multiplier
    const body01cp2d = 23.72518967258217 * multiplier
    const body02cp1d = 44.99353642469105 * multiplier
    const body02cp2d = 42.33568754608812 * multiplier
    const body03cp1d = 62.59332758369697 * multiplier
    const body03cp2d = 40.89285869195256 * multiplier
    const body04cp1d = 176.21501525125487 * multiplier
    const body04cp2d = 130.11389715553065 * multiplier
    const body05cp1d = 29.56689479806765 * multiplier
    const body05cp2d = 104.66860665930352 * multiplier
    const body06cp1d = 8.03497915367552 * multiplier
    const body06cp2d = 34.57808908832297 * multiplier
    const body07cp1d = 89.11908088619404 * multiplier
    const body07cp2d = 25.54827831772624 * multiplier
    const body08cp1d = 41.24120086757895 * multiplier
    const body08cp2d = 158.23693200387828 * multiplier
    const body09cp1d = 4.87663090668135 * multiplier
    const body09cp2d = 25.76988630165065 * multiplier
    const body10cp1d = 4.13950105689086 * multiplier
    const body10cp2d = 13.2750849338149 * multiplier
    const body11cp1d = 17.66659910678904 * multiplier
    const body11cp2d = 17.66533107530116 * multiplier
    const body12cp1d = 14.46914569005365 * multiplier
    const body12cp2d = 39.51915145850176 * multiplier
    const body13cp1d = 35.66832366400192 * multiplier
    const body13cp2d = 48.53828530139895 * multiplier
    const body14cp1d = 77.2603605608982 * multiplier
    const body14cp2d = 37.42741381661305 * multiplier
    const body15cp1d = 74.89746640634775 * multiplier
    const body15cp2d = 101.16048880857042 * multiplier
    const body16cp1d = 36.21092864039804 * multiplier
    const body16cp2d = 63.69410844026312 * multiplier
    const body17cp1d = 97.90988675818191 * multiplier
    const body17cp2d = 62.08991689477443 * multiplier
    const body18cp1d = 22.74982929606286 * multiplier
    const body18cp2d = 16.57960183478481 * multiplier
    const body19cp1d = 23.95674278778315 * multiplier
    const body19cp2d = 24.49741270011998 * multiplier

    const eyeBigDist = 180.18315182058507 * multiplier
    const eyeSmallDist = 2.3629811679317316 * multiplier

    const gillLength = 41.01907104018812 * multiplier

    const body01_02a = 170.1382393
    const body02_03a = 39.2280236
    const body03_04a = 159.6914424
    const body04_05a = 147.5949161
    const body05_06a = 128.0581973
    const body06_07a = 253.6604388
    const body07_08a = 225.7462208
    const body08_09a = 157.5894683
    const body09_10a = 125.1280145
    const body10_11a = 242.0485099
    const body11_12a = 211.5926663
    const body12_13a = 171.354716
    const body13_14a = 245.2915054
    const body14_15a = 326.7578209
    const body15_16a = 359.0692249
    const body16_17a = 353.6138832
    const body17_18a = 2.546389668
    const body18_19a = 348.3450181

    let body01cp1a = 161.5263465
    const body01cp2a = 255.6503959
    const body02cp1a = 31.95354992
    const body02cp2a = 10

    const body03cp1a = 142.8538439
    const body03cp2a = 225.3745028
    const body04cp1a = 169.1071046
    const body04cp2a = 350.7775897
    const body05cp1a = 105.1596015
    const body05cp2a = 288.5890112
    const body06cp1a = 221.1852544
    const body06cp2a = 344.141322
    const body07cp1a = 267.2041495
    const body07cp2a = 87.03164984
    const body08cp1a = 177.4386949
    const body08cp2a = 358.5040423
    const body09cp1a = 119.4140746
    const body09cp2a = 299.4139506
    const body10cp1a = 219.0878163
    const body10cp2a = 311.9955535
    const body11cp1a = 251.2799387
    const body11cp2a = 71.28196954
    const body12cp1a = 175.0877187
    const body12cp2a = 355.087783
    const body13cp1a = 260.2392636
    const body13cp2a = 351.4909474
    const body14cp1a = 320.929847
    const body14cp2a = 56.95148863
    const body15cp1a = 22.55298719
    const body15cp2a = 153.1212844
    const body16cp1a = 13.89041491
    const body16cp2a = 141.0219905
    const body17cp1a = 11.04287338
    const body17cp2a = 138.4852424
    const body18cp1a = 356.968813
    const body18cp2a = 178.1542839
    const body19cp1a = 51.33608313
    const body19cp2a = 158.5586388

    const eyeBigAngle = 184.8499937
    const eyeSmallAngle = 151.2656912

    const gillAngle = 103.9416747

    points.body01 = new Point(0, 0)
    points.body02 = points.body01.shift(body01_02a, body01_02d)
    points.body03 = points.body02.shift(body02_03a, body02_03d)
    points.body04 = points.body03.shift(body03_04a, body03_04d)
    points.body05 = points.body04.shift(body04_05a, body04_05d)
    points.body06 = points.body05.shift(body05_06a, body05_06d)
    points.body07 = points.body06.shift(body06_07a, body06_07d)
    points.body08 = points.body07.shift(body07_08a, body07_08d)
    points.body09 = points.body08.shift(body08_09a, body08_09d)
    points.body10 = points.body09.shift(body09_10a, body09_10d)
    points.body11 = points.body10.shift(body10_11a, body10_11d)
    points.body12 = points.body11.shift(body11_12a, body11_12d)
    points.body13 = points.body12.shift(body12_13a, body12_13d)
    points.body14 = points.body13.shift(body13_14a, body13_14d)
    points.body15 = points.body14.shift(body14_15a, body14_15d)
    points.body16 = points.body15.shift(body15_16a, body15_16d)
    points.body17 = points.body16.shift(body16_17a, body16_17d)
    points.body18 = points.body17.shift(body17_18a, body17_18d)
    points.body19 = points.body18.shift(body18_19a, body18_19d)

    points.body01cp1 = points.body01.shift(body01cp1a, body01cp1d)
    points.body02cp1 = points.body02.shift(body02cp1a, body02cp1d)
    points.body03cp1 = points.body03.shift(body03cp1a, body03cp1d)
    points.body04cp1 = points.body04.shift(body04cp1a, body04cp1d)
    points.body05cp1 = points.body05.shift(body05cp1a, body05cp1d)
    points.body06cp1 = points.body06.shift(body06cp1a, body06cp1d)
    points.body07cp1 = points.body07.shift(body07cp1a, body07cp1d)
    points.body08cp1 = points.body08.shift(body08cp1a, body08cp1d)
    points.body09cp1 = points.body09.shift(body09cp1a, body09cp1d)
    points.body10cp1 = points.body10.shift(body10cp1a, body10cp1d)
    points.body11cp1 = points.body11.shift(body11cp1a, body11cp1d)
    points.body12cp1 = points.body12.shift(body12cp1a, body12cp1d)
    points.body13cp1 = points.body13.shift(body13cp1a, body13cp1d)
    points.body14cp1 = points.body14.shift(body14cp1a, body14cp1d)
    points.body15cp1 = points.body15.shift(body15cp1a, body15cp1d)
    points.body16cp1 = points.body16.shift(body16cp1a, body16cp1d)
    points.body17cp1 = points.body17.shift(body17cp1a, body17cp1d)
    points.body18cp1 = points.body18.shift(body18cp1a, body18cp1d)
    points.body19cp1 = points.body19.shift(body19cp1a, body19cp1d)

    points.body01cp2 = points.body01.shift(body01cp2a, body01cp2d)
    points.body02cp2 = points.body02.shift(body02cp2a, body02cp2d)
    points.body03cp2 = points.body03.shift(body03cp2a, body03cp2d)
    points.body04cp2 = points.body04.shift(body04cp2a, body04cp2d)
    points.body05cp2 = points.body05.shift(body05cp2a, body05cp2d)
    points.body06cp2 = points.body06.shift(body06cp2a, body06cp2d)
    points.body07cp2 = points.body07.shift(body07cp2a, body07cp2d)
    points.body08cp2 = points.body08.shift(body08cp2a, body08cp2d)
    points.body09cp2 = points.body09.shift(body09cp2a, body09cp2d)
    points.body10cp2 = points.body10.shift(body10cp2a, body10cp2d)
    points.body11cp2 = points.body11.shift(body11cp2a, body11cp2d)
    points.body12cp2 = points.body12.shift(body12cp2a, body12cp2d)
    points.body13cp2 = points.body13.shift(body13cp2a, body13cp2d)
    points.body14cp2 = points.body14.shift(body14cp2a, body14cp2d)
    points.body15cp2 = points.body15.shift(body15cp2a, body15cp2d)
    points.body16cp2 = points.body16.shift(body16cp2a, body16cp2d)
    points.body17cp2 = points.body17.shift(body17cp2a, body17cp2d)
    points.body18cp2 = points.body18.shift(body18cp2a, body18cp2d)
    points.body19cp2 = points.body19.shift(body19cp2a, body19cp2d)

    // Adjust dart point:
    points.body02 = points.body01.shift(body01_02a - 1.7, body01_02d)

    // Front dart adjustments:
    points.body01cp2 = points.body01.shift(
      points.body01.angle(points.body19) +
        (points.body19.angle(points.body01) - points.body19.angle(points.body19cp1)),
      body01cp2d
    )
    body01cp1a = Math.min(
      points.body01.angle(points.body01cp2) + 90 * (-1 + options.nosePointiness),
      points.body01.angle(points.body02) - 5
    )

    points.body01cp1 = points.body01.shift(body01cp1a, body01cp1d)

    // Make both sides of the dart equal:
    points.body03 = points.body02.shift(body02_03a, body01_02d)

    points.body02cp1 = points.body02.shift(
      points.body02.angle(points.body03) -
        (points.body02.angle(points.body02cp2) - points.body02.angle(points.body01)),
      body02cp2d
    )
    points.body03cp2 = points.body03.shift(
      points.body03.angle(points.body02) +
        (points.body01.angle(points.body02) - points.body01.angle(points.body01cp1)),
      body01cp1d
    )

    // Nose adjustment:
    points.body03cp1 = points.body03.shift(
      body03cp1a + Math.max(-10, 50 * options.nosePointiness),
      body03cp1d
    )

    // Tail adjustment:
    let tailCpAngle =
      (points.body13.angle(points.body13cp1) -
        points.body13.angle(points.body14) +
        (points.body14.angle(points.body13) - points.body14.angle(points.body14cp2))) /
      2
    points.body14cp2 = points.body14.shift(
      points.body14.angle(points.body13) - tailCpAngle,
      body13cp1d
    )
    points.body13cp1 = points.body13.shift(
      points.body13.angle(points.body14) + tailCpAngle,
      body13cp1d
    )

    points.eyeBig = points.body01.shift(eyeBigAngle, eyeBigDist)
    points.eyeSmall = points.eyeBig.shift(
      eyeSmallAngle,
      eyeSmallDist * (-0.5 + (options.aggressive ? 0 : 1))
    )

    const c = 0.55191502449351
    const eyeBigX = 18.7757 * multiplier
    const eyeBigY = 11.6262 * multiplier
    points.eyeBigT = points.eyeBig.shift(90, eyeBigY / 2)
    points.eyeBigB = points.eyeBig
      .shift(270, eyeBigY / 2)
      .shift(0, options.aggressive ? eyeBigX / 3 : 0)
    points.eyeBigR = points.eyeBig
      .shift(0, eyeBigX / 2)
      .shift(270, options.aggressive ? eyeBigY / 3 : 0)
    points.eyeBigL = points.eyeBig.shift(180, eyeBigX / 2)
    points.eyeBigTcp1 = points.eyeBigT.shift(0, (eyeBigY / 2) * c)
    points.eyeBigTcp2 = points.eyeBigT.shift(180, (eyeBigY / 2) * c)
    points.eyeBigBcp1 = points.eyeBigB.shift(180, (eyeBigY / 2) * c)
    points.eyeBigBcp2 = points.eyeBigB.shift(0, (eyeBigY / 2) * c)
    points.eyeBigRcp1 = points.eyeBigR.shift(270, (eyeBigX / (options.aggressive ? 3 : 2)) * c)
    points.eyeBigRcp2 = points.eyeBigR.shift(90, (eyeBigX / 2) * c)
    points.eyeBigLcp1 = points.eyeBigL.shift(90, (eyeBigX / 2) * c)
    points.eyeBigLcp2 = points.eyeBigL.shift(270, (eyeBigX / 2) * c)

    if (complete)
      paths.eyeBig = new Path()
        .move(points.eyeBigT)
        .curve(points.eyeBigTcp2, points.eyeBigLcp1, points.eyeBigL)
        .curve(points.eyeBigLcp2, points.eyeBigBcp1, points.eyeBigB)
        .curve(points.eyeBigBcp2, points.eyeBigRcp1, points.eyeBigR)
        .curve(points.eyeBigRcp2, points.eyeBigTcp1, points.eyeBigT)

    const eyeSmallX = 1.87089 * multiplier * (options.aggressive ? 1.5 : 1)
    const eyeSmallY = 1.5368 * multiplier * (options.aggressive ? 1.5 : 1)
    points.eyeSmallT = points.eyeSmall.shift(270, eyeSmallY / 2)
    points.eyeSmallB = points.eyeSmall.shift(90, eyeSmallY / 2)
    points.eyeSmallR = points.eyeSmall.shift(0, eyeSmallX / 2)
    points.eyeSmallL = points.eyeSmall.shift(180, eyeSmallX / 2)
    points.eyeSmallTcp1 = points.eyeSmallT.shift(0, (eyeSmallY / 2) * c)
    points.eyeSmallTcp2 = points.eyeSmallT.shift(180, (eyeSmallY / 2) * c)
    points.eyeSmallBcp1 = points.eyeSmallB.shift(180, (eyeSmallY / 2) * c)
    points.eyeSmallBcp2 = points.eyeSmallB.shift(0, (eyeSmallY / 2) * c)
    points.eyeSmallRcp1 = points.eyeSmallR.shift(270, (eyeSmallX / 2) * c)
    points.eyeSmallRcp2 = points.eyeSmallR.shift(90, (eyeSmallX / 2) * c)
    points.eyeSmallLcp1 = points.eyeSmallL.shift(90, (eyeSmallX / 2) * c)
    points.eyeSmallLcp2 = points.eyeSmallL.shift(270, (eyeSmallX / 2) * c)

    if (complete)
      paths.eyeSmall = new Path()
        .move(points.eyeSmallT)
        .curve(points.eyeSmallTcp2, points.eyeSmallLcp1, points.eyeSmallL)
        .curve(points.eyeSmallLcp2, points.eyeSmallBcp1, points.eyeSmallB)
        .curve(points.eyeSmallBcp2, points.eyeSmallRcp1, points.eyeSmallR)
        .curve(points.eyeSmallRcp2, points.eyeSmallTcp1, points.eyeSmallT)

    paths.allButDart = new Path()
      .move(points.body03)
      .curve(points.body03cp1, points.body04cp2, points.body04)
      .curve(points.body04cp1, points.body05cp2, points.body05)
      .curve(points.body05cp1, points.body06cp2, points.body06)
      .curve(points.body06cp1, points.body07cp2, points.body07)
      .curve(points.body07cp1, points.body08cp2, points.body08)
      .curve(points.body08cp1, points.body09cp2, points.body09)
      .curve(points.body09cp1, points.body10cp2, points.body10)
      .curve(points.body10cp1, points.body11cp2, points.body11)
      .curve(points.body11cp1, points.body12cp2, points.body12)
      .curve(points.body12cp1, points.body13cp2, points.body13)
      .curve(points.body13cp1, points.body14cp2, points.body14)
      .curve(points.body14cp1, points.body15cp2, points.body15)
      .curve(points.body15cp1, points.body16cp2, points.body16)
      .curve(points.body16cp1, points.body17cp2, points.body17)
      .curve(points.body17cp1, points.body18cp2, points.body18)
      .curve(points.body18cp1, points.body19cp2, points.body19)
      .curve(points.body19cp1, points.body01cp2, points.body01)
      .hide()

    paths.seam = new Path()
      .move(points.body01)
      .curve(points.body01cp1, points.body02cp2, points.body02)
      .curve(points.body02cp1, points.body03cp2, points.body03)
      .join(paths.allButDart)
      .close()

    const gillPath = new Path()
      .move(points.body17)
      .curve(points.body17cp1, points.body18cp2, points.body18)
    points.gill1start = gillPath.shiftFractionAlong(0.018)
    points.gill2start = gillPath.shiftFractionAlong(0.08 * 1 + 0.018)
    points.gill3start = gillPath.shiftFractionAlong(0.08 * 2 + 0.018)
    points.gill4start = gillPath.shiftFractionAlong(0.08 * 3 + 0.018)
    points.gill5start = gillPath.shiftFractionAlong(0.08 * 4 + 0.018)
    points.gill1end = points.gill1start.shift(gillAngle, gillLength * (1 + 0 * 0.08))
    points.gill2end = points.gill2start.shift(gillAngle, gillLength * (1 + 1 * 0.08))
    points.gill3end = points.gill3start.shift(gillAngle, gillLength * (1 + 2 * 0.08))
    points.gill4end = points.gill4start.shift(gillAngle, gillLength * (1 + 3 * 0.08))
    points.gill5end = points.gill5start.shift(gillAngle, gillLength * (1 + 4 * 0.08))

    if (complete) {
      paths.gill1 = new Path().move(points.gill1start).line(points.gill1end)
      paths.gill2 = new Path().move(points.gill2start).line(points.gill2end)
      paths.gill3 = new Path().move(points.gill3start).line(points.gill3end)
      paths.gill4 = new Path().move(points.gill4start).line(points.gill4end)
      paths.gill5 = new Path().move(points.gill5start).line(points.gill5end)
    }

    points.finCurve = utils.beamsIntersect(
      points.body05,
      points.body05cp2,
      points.body04,
      points.body04cp1
    )

    store.set('tailWidth', points.body13.dist(points.body14))
    store.set(
      'tailCpAngle',
      points.body13.angle(points.body13cp1) - points.body13.angle(points.body14)
    )
    store.set('tailCpDist', body13cp1d)

    store.set('topOfFinOpening', points.body16.dist(points.body17))
    store.set(
      'topOfFinOpeningLength',
      new Path()
        .move(points.body16)
        .curve(points.body16cp1, points.body17cp2, points.body17)
        .length()
    )

    store.set(
      'faceTopLength',
      new Path()
        .move(points.body17)
        .curve(points.body17cp1, points.body18cp2, points.body18)
        .curve(points.body18cp1, points.body19cp2, points.body19)
        .length()
    )

    store.set(
      'bellyLength',
      new Path()
        .move(points.body17)
        .curve(points.body17cp1, points.body18cp2, points.body18)
        .curve(points.body18cp1, points.body19cp2, points.body19)
        .length()
    )
    store.set(
      'bellyTailLength',
      new Path()
        .move(points.body15)
        .curve(points.body15cp1, points.body16cp2, points.body16)
        .length()
    )

    // Reduce precision as size goes up coz performance
    store.set('tolerance', multiplier < 1 ? 1 : multiplier * 100)

    points.grainlineFrom = points.body13.shiftFractionTowards(points.body03, 0.5)
    macro('grainline', {
      from: points.grainlineFrom,
      to: points.body03,
    })

    store.cutlist.addCut({ cut: 2, material: 'color1UpperBody' })

    points.bodyTailSnippet = new Path()
      .move(points.body13)
      .curve(points.body13cp1, points.body14cp2, points.body14)
      .shiftFractionAlong(0.25)
    snippets.bodyTail = new Snippet('bnotch', points.bodyTailSnippet)

    paths.aboveMouth = new Path()
      .move(points.body17)
      .curve(points.body17cp1, points.body18cp2, points.body18)
      .attr('data-text-class', 'text-xs')
    macro('banner', {
      path: paths.aboveMouth,
      text: 'aboveMouth',
      id: 'aboveMouth',
      dy: 0,
      spaces: 0,
      repeat: 1,
    })
    paths.belly = new Path()
      .move(points.body15)
      .curve(points.body15cp1, points.body16cp2, points.body16)
      .attr('data-text-class', 'text-xs')
    macro('banner', {
      path: paths.belly,
      text: 'belly',
      id: 'belly',
      dy: 0,
      spaces: 10,
      repeat: 3,
    })
    paths.topOfFin = new Path()
      .move(points.body16)
      .curve(points.body16cp1, points.body17cp2, points.body17)
      .attr('class', 'hidden')
      .attr('data-text-class', 'text-xs')
    macro('banner', {
      path: paths.topOfFin,
      text: 'topOfFin',
      id: 'topOfFin',
      dy: 0,
      spaces: 10,
      repeat: 3,
    })
    paths.tail = new Path()
      .move(points.body13)
      .curve(points.body13cp1, points.body14cp2, points.body14)
      .attr('class', 'hidden')
      .attr('data-text-class', 'text-xs')
    macro('banner', {
      path: paths.tail,
      text: 'tail',
      id: 'tail',
      dy: 0,
      spaces: 14,
      repeat: 3,
    })

    macro('ld', {
      from: points.body13,
      to: points.body01,
      d: -5,
      id: 'bodyLength',
      force: complete,
    })

    points.titleAnchor = points.body04.shiftFractionTowards(points.body17, 0.4)
    points.logoAnchor = points.body06.shiftFractionTowards(points.body16, 0.6)
    points.gridAnchor = points.logoAnchor.clone()

    if (multiplier < 0.35) {
      points.scaleboxAnchor = new Point(points.body06.x - 60 - sa, points.body11.y - 35 - sa)
    } else {
      points.scaleboxAnchor = points.titleAnchor.shiftFractionTowards(points.body14, 0.5)
    }
    snippets.logo = new Snippet('logo', points.logoAnchor).attr(
      'data-scale',
      multiplier > 1 ? 1 : multiplier
    )

    macro('title', {
      at: points.titleAnchor,
      nr: 1,
      title: 'body',
      scale: multiplier,
    })

    macro('hd', {
      from: points.body14,
      to: points.body15,
      y: points.body19.y + sa + 10,
      id: 'tailToBody',
    })
    macro('hd', {
      from: points.body15,
      to: points.body16,
      y: points.body19.y + sa + 10,
      id: 'bodyWidth',
    })
    macro('hd', {
      from: points.body16,
      to: points.body17,
      y: points.body19.y + sa + 10,
      id: 'finWidth',
    })
    macro('hd', {
      from: points.body17,
      to: points.body19,
      y: points.body19.y + sa + 10,
      id: 'finToMiddle',
    })
    macro('hd', {
      from: points.body19,
      to: points.body01,
      y: points.body19.y + sa + 10,
      noStartMarker: true,
      noEndMarker: true,
      id: 'middleToTip',
    })
    macro('hd', {
      from: points.gill1start,
      to: points.gill5start,
      y: points.body19.y + sa + 20,
      id: 'gillWidth',
    })
    macro('hd', {
      from: points.eyeBig,
      to: points.body19,
      y: points.body19.y + sa + 20,
      id: 'eyeToMiddle',
    })
    macro('hd', {
      from: points.eyeBigL,
      to: points.eyeBigR,
      y: points.eyeBigT.y - 10,
      id: 'eyeWidth',
      noStartMarker: true,
      noEndMarker: true,
    })
    macro('hd', {
      from: points.body14,
      to: points.body13,
      y: points.body06.y - sa - 5,
      id: 'tailWidth',
    })
    macro('hd', {
      from: points.body13,
      to: points.body10,
      y: points.body06.y - sa - 5,
      id: 'tailTo1stFin',
    })
    macro('hd', {
      from: points.body10,
      to: points.body06,
      y: points.body06.y - sa - 5,
      id: '1stFinTo2ndFin',
    })
    macro('hd', {
      from: points.body06,
      to: points.finCurve,
      y: points.body06.y - sa - 5,
      id: '2ndFinToBody',
    })
    macro('hd', {
      from: points.finCurve,
      to: points.body03,
      y: points.body06.y - sa - 5,
      id: '2ndFinToTip',
    })
    macro('hd', {
      from: points.body03,
      to: points.body01,
      y: points.body06.y - sa - 5,
      id: 'tipToMiddle',
      noStartMarker: true,
      noEndMarker: true,
    })
    macro('hd', {
      from: points.body02,
      to: points.body03,
      y: points.body06.y - sa + 10,
      id: 'topDartDepth',
    })
    macro('hd', {
      from: points.body02,
      to: points.body01,
      y: points.body06.y - sa + 20,
      id: 'bottomDartDepth',
    })

    macro('vd', {
      from: points.body19,
      to: points.body14,
      x: points.body14.x - sa - 10,
      id: 'heightTail',
    })
    macro('vd', {
      from: points.body15,
      to: points.body14,
      x: points.body14.x - sa - 20,
      id: 'bodyToTail',
    })
    macro('vd', {
      from: points.body14,
      to: points.body13,
      x: points.body14.x - sa - 20,
      id: 'tailHeight',
    })
    macro('vd', {
      from: points.body14,
      to: points.body10,
      x: points.body14.x - sa - 30,
      id: 'tailTo1stFin',
    })
    macro('vd', {
      from: points.body14,
      to: points.body08,
      x: points.body14.x - sa - 10,
      id: 'tailToBetweenFins',
    })
    macro('vd', {
      from: points.body10,
      to: points.body06,
      x: points.body14.x - sa - 30,
      id: 'heightFinToFin',
    })
    macro('vd', {
      from: points.body01,
      to: points.body19,
      x: points.body01.x + sa + 10,
      id: 'middleToDart',
    })
    macro('vd', {
      from: points.body02,
      to: points.body19,
      x: points.body01.x + sa + 20,
      id: 'middleToBackOfDart',
    })
    macro('vd', {
      from: points.body03,
      to: points.body01,
      x: points.body01.x + sa + 10,
      id: 'dartToDart',
    })
    macro('vd', {
      from: points.finCurve,
      to: points.body02,
      x: points.body01.x + sa + 20,
      id: 'dartToFinCurve',
    })
    macro('vd', {
      from: points.body06,
      to: points.finCurve,
      x: points.body01.x + sa + 20,
      id: 'finCurveToFin',
    })
    if (multiplier > 0.4) {
      macro('vd', {
        from: points.gill5end,
        to: points.gill5start,
        x: points.gill5start.x + 5,
        id: 'gillHeight',
        noStartMarker: true,
        noEndMarker: true,
      })
    }

    macro('scalebox', { at: points.scaleboxAnchor })

    if (sa) {
      paths.sa = paths.allButDart.close().offset(sa).attr('class', 'fabric sa')
    }

    return part
  },
}
