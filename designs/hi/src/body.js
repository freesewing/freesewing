export default function (part) {
  const {
    store,
    sa,
    Point,
    points,
    Path,
    paths,
    Snippet,
    snippets,
    options,
    complete,
    paperless,
    macro,
    utils,
  } = part.shorthand()

  let body01_02d = 117.67274991262845 * options.size
  let body02_03d = 124.91298035032229 * options.size
  // let body02_03d = body01_02d
  let body03_04d = 255.92397474640785 * options.size
  let body04_05d = 201.01260719168837 * options.size
  let body05_06d = 134.89080971660005 * options.size
  let body06_07d = 49.0386070356816 * options.size
  let body07_08d = 225.86340480918992 * options.size
  let body08_09d = 66.84760000179512 * options.size
  let body09_10d = 40.7278200374142 * options.size
  let body10_11d = 23.78799421977402 * options.size
  let body11_12d = 57.68530918700182 * options.size
  let body12_13d = 98.0662397820983 * options.size
  let body13_14d = 91.32736600274856 * options.size
  let body14_15d = 295.1097706682888 * options.size
  let body15_16d = 209.4263335058177 * options.size
  let body16_17d = 152.51537318250902 * options.size
  let body17_18d = 255.15294373571314 * options.size
  let body18_19d = 71.90453921693678 * options.size
  //let body19_01d = 61.33021195137026 * options.size

  let body01cp1d = 32.13103487929059 * options.size
  let body01cp2d = 23.72518967258217 * options.size
  let body02cp1d = 44.99353642469105 * options.size
  let body02cp2d = 42.33568754608812 * options.size
  let body03cp1d = 62.59332758369697 * options.size
  let body03cp2d = 40.89285869195256 * options.size
  let body04cp1d = 176.21501525125487 * options.size
  let body04cp2d = 130.11389715553065 * options.size
  let body05cp1d = 29.56689479806765 * options.size
  let body05cp2d = 104.66860665930352 * options.size
  let body06cp1d = 8.03497915367552 * options.size
  let body06cp2d = 34.57808908832297 * options.size
  let body07cp1d = 89.11908088619404 * options.size
  let body07cp2d = 25.54827831772624 * options.size
  let body08cp1d = 41.24120086757895 * options.size
  let body08cp2d = 158.23693200387828 * options.size
  let body09cp1d = 4.87663090668135 * options.size
  let body09cp2d = 25.76988630165065 * options.size
  let body10cp1d = 4.13950105689086 * options.size
  let body10cp2d = 13.2750849338149 * options.size
  let body11cp1d = 17.66659910678904 * options.size
  let body11cp2d = 17.66533107530116 * options.size
  let body12cp1d = 14.46914569005365 * options.size
  let body12cp2d = 39.51915145850176 * options.size
  let body13cp1d = 35.66832366400192 * options.size
  let body13cp2d = 48.53828530139895 * options.size
  let body14cp1d = 77.2603605608982 * options.size
  let body14cp2d = 37.42741381661305 * options.size
  let body15cp1d = 74.89746640634775 * options.size
  let body15cp2d = 101.16048880857042 * options.size
  let body16cp1d = 36.21092864039804 * options.size
  let body16cp2d = 63.69410844026312 * options.size
  let body17cp1d = 97.90988675818191 * options.size
  let body17cp2d = 62.08991689477443 * options.size
  let body18cp1d = 22.74982929606286 * options.size
  let body18cp2d = 16.57960183478481 * options.size
  let body19cp1d = 23.95674278778315 * options.size
  let body19cp2d = 24.49741270011998 * options.size

  let eyeBigDist = 180.18315182058507 * options.size
  let eyeSmallDist = 2.3629811679317316 * options.size

  let gillLength = 41.01907104018812 * options.size

  /*
  let body01_02a = 350.1382392835908
  let body02_03a = 219.2280235992150
  let body03_04a = 339.6914424367389
  let body04_05a = 327.5949161262267
  let body05_06a = 308.0581973147166
  let body06_07a =  73.6604388249373
  let body07_08a =  45.7462208380377
  let body08_09a = 337.5894682731302
  let body09_10a = 305.1280145118106
  let body10_11a =  62.0485099186233
  let body11_12a =  31.5926663325278
  let body12_13a = 351.3547159587854
  let body13_14a =  65.2915054300727
  let body14_15a = 146.7578208812976
  let body15_16a = 179.0692249048048
  let body16_17a = 173.6138831920282
  let body17_18a = 182.5463896677164
  let body18_19a = 168.3450180715549
  let body19_01a = 239.6348252240278

  let body01cp1a = 341.5263465356924
  let body01cp2a =  75.6503959063636
  let body02cp1a = 211.9535499171619
  let body02cp2a = 179.4884199670842
  let body03cp1a = 322.8538439425170
  let body03cp2a =  45.3745027878966
  let body04cp1a = 349.1071045662215
  let body04cp2a = 170.7775897297436
  let body05cp1a = 285.1596014648055
  let body05cp2a = 108.5890112443549
  let body06cp1a =  41.1852543570561
  let body06cp2a = 164.1413220186340
  let body07cp1a =  87.2041495377715
  let body07cp2a = 267.0316498407170
  let body08cp1a = 357.4386948546150
  let body08cp2a = 178.5040422857397
  let body09cp1a = 299.4140745661390
  let body09cp2a = 119.4139505554426
  let body10cp1a =  39.0878163024596
  let body10cp2a = 131.9955535201102
  let body11cp1a =  71.2799386715762
  let body11cp2a = 251.2819695388968
  let body12cp1a = 355.0877186628186
  let body12cp2a = 175.0877829918719
  let body13cp1a =  80.2392635965701
  let body13cp2a = 171.4909473733658
  let body14cp1a = 140.9298470364624
  let body14cp2a = 236.9514886304476
  let body15cp1a = 202.5529871921231
  let body15cp2a = 333.1212843908838
  let body16cp1a = 193.8904149121820
  let body16cp2a = 321.0219904969430
  let body17cp1a = 191.0428733832995
  let body17cp2a = 318.4852423703768
  let body18cp1a = 176.9688130385547
  let body18cp2a = 358.1542838646098
  let body19cp1a = 231.3360831292815
  let body19cp2a = 338.5586388459373

  let eyeBigAngle = 4.84999368439876
  let eyeSmallAngle = 331.26569123319354

  let gillAngle = 283.9416746517148
*/

  let body01_02a = 170.1382393
  let body02_03a = 39.2280236
  let body03_04a = 159.6914424
  let body04_05a = 147.5949161
  let body05_06a = 128.0581973
  let body06_07a = 253.6604388
  let body07_08a = 225.7462208
  let body08_09a = 157.5894683
  let body09_10a = 125.1280145
  let body10_11a = 242.0485099
  let body11_12a = 211.5926663
  let body12_13a = 171.354716
  let body13_14a = 245.2915054
  let body14_15a = 326.7578209
  let body15_16a = 359.0692249
  let body16_17a = 353.6138832
  let body17_18a = 2.546389668
  let body18_19a = 348.3450181
  //let body19_01a = 59.63482522

  let body01cp1a = 161.5263465
  let body01cp2a = 255.6503959
  let body02cp1a = 31.95354992
  // let body02cp2a = 359.48842
  // let body02cp2a = 2.48842
  let body02cp2a = 10

  let body03cp1a = 142.8538439
  let body03cp2a = 225.3745028
  let body04cp1a = 169.1071046
  let body04cp2a = 350.7775897
  let body05cp1a = 105.1596015
  let body05cp2a = 288.5890112
  let body06cp1a = 221.1852544
  let body06cp2a = 344.141322
  let body07cp1a = 267.2041495
  let body07cp2a = 87.03164984
  let body08cp1a = 177.4386949
  let body08cp2a = 358.5040423
  let body09cp1a = 119.4140746
  let body09cp2a = 299.4139506
  let body10cp1a = 219.0878163
  let body10cp2a = 311.9955535
  let body11cp1a = 251.2799387
  let body11cp2a = 71.28196954
  let body12cp1a = 175.0877187
  let body12cp2a = 355.087783
  let body13cp1a = 260.2392636
  let body13cp2a = 351.4909474
  let body14cp1a = 320.929847
  let body14cp2a = 56.95148863
  let body15cp1a = 22.55298719
  let body15cp2a = 153.1212844
  let body16cp1a = 13.89041491
  let body16cp2a = 141.0219905
  let body17cp1a = 11.04287338
  let body17cp2a = 138.4852424
  let body18cp1a = 356.968813
  let body18cp2a = 178.1542839
  let body19cp1a = 51.33608313
  let body19cp2a = 158.5586388

  let eyeBigAngle = 184.8499937
  let eyeSmallAngle = 151.2656912

  let gillAngle = 103.9416747

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

  //Adjust dart point:
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

  // Feeding:

  let c = 0.55191502449351
  let eyeBigX = 18.7757 * options.size
  let eyeBigY = 11.6262 * options.size
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

  paths.eyeBig = new Path()
    .move(points.eyeBigT)
    .curve(points.eyeBigTcp2, points.eyeBigLcp1, points.eyeBigL)
    .curve(points.eyeBigLcp2, points.eyeBigBcp1, points.eyeBigB)
    .curve(points.eyeBigBcp2, points.eyeBigRcp1, points.eyeBigR)
    .curve(points.eyeBigRcp2, points.eyeBigTcp1, points.eyeBigT)

  let eyeSmallX = 1.87089 * options.size * (options.aggressive ? 1.5 : 1)
  let eyeSmallY = 1.5368 * options.size * (options.aggressive ? 1.5 : 1)
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
    .setRender(false)

  paths.seam = new Path()
    .move(points.body01)
    .curve(points.body01cp1, points.body02cp2, points.body02)
    .curve(points.body02cp1, points.body03cp2, points.body03)
    .join(paths.allButDart)
    .close()
    .setRender(true)

  let gillPath = new Path()
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

  paths.gill1 = new Path().move(points.gill1start).line(points.gill1end)
  paths.gill2 = new Path().move(points.gill2start).line(points.gill2end)
  paths.gill3 = new Path().move(points.gill3start).line(points.gill3end)
  paths.gill4 = new Path().move(points.gill4start).line(points.gill4end)
  paths.gill5 = new Path().move(points.gill5start).line(points.gill5end)

  store.set('tailWidth', points.body13.dist(points.body14))
  store.set(
    'tailCpAngle',
    points.body13.angle(points.body13cp1) - points.body13.angle(points.body14)
  )
  store.set('tailCpDist', body13cp1d)

  store.set('topFinOpening', points.body16.dist(points.body17))
  store.set(
    'topFinOpeningLength',
    new Path().move(points.body16).curve(points.body16cp1, points.body17cp2, points.body17).length()
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
    new Path().move(points.body15).curve(points.body15cp1, points.body16cp2, points.body16).length()
  )

  // Reduce precision as size goes up coz performance
  store.set('tolerance', (options.size < 1) ? 1 : options.size*100)

  // Complete?
  if (complete) {
    points.bodyTailSnippet = new Path()
      .move(points.body13)
      .curve(points.body13cp1, points.body14cp2, points.body14)
      .shiftFractionAlong(0.25)
    snippets.bodyTail = new Snippet('bnotch', points.bodyTailSnippet)
    if (sa) {
      // paths.sa = paths.seam.offset(sa).trim().attr('class', 'fabric sa')
      paths.sa = paths.allButDart.close().offset(sa).attr('class', 'fabric sa')
    }

    macro('ld', {
      from: points.body13,
      to: points.body01,
      d: -5,
    })

    points.grainlineFrom = points.body13.shiftFractionTowards(points.body03,0.5)
    macro("grainline", {
      from: points.grainlineFrom,
      to: points.body03,
    })

    points.titleAnchor = points.body04.shiftFractionTowards(points.body17, 0.4)
    points.logoAnchor = points.body06.shiftFractionTowards(points.body16, 0.6)

    if (options.size < 0.35) {
      points.scaleboxAnchor = new Point(points.body06.x - 60 - sa, points.body11.y - 35 - sa)
    } else {
      points.scaleboxAnchor = points.titleAnchor.shiftFractionTowards(points.body14, 0.5)
    }
    snippets.logo = new Snippet('logo', points.logoAnchor).attr(
      'data-scale',
      options.size > 1 ? 1 : options.size
    )

    macro('title', {
      at: points.titleAnchor,
      nr: 1,
      title: 'body',
      scale: options.size,
    })

    if (paperless) {
      macro('hd', {
        from: points.body14,
        to: points.body15,
        y: points.body19.y + sa + 10,
      })
      macro('hd', {
        from: points.body15,
        to: points.body16,
        y: points.body19.y + sa + 10,
      })
      macro('hd', {
        from: points.body16,
        to: points.body17,
        y: points.body19.y + sa + 10,
      })
      macro('hd', {
        from: points.body17,
        to: points.body19,
        y: points.body19.y + sa + 10,
      })
      macro('hd', {
        from: points.body19,
        to: points.body01,
        y: points.body19.y + sa + 10,
        noStartMarker: true,
        noEndMarker: true,
      })
      macro('hd', {
        from: points.gill1start,
        to: points.gill5start,
        y: points.body19.y + sa + 20,
      })
      macro('hd', {
        from: points.eyeBig,
        to: points.body19,
        y: points.body19.y + sa + 20,
      })
      macro('hd', {
        from: points.eyeBigL,
        to: points.eyeBigR,
        y: points.eyeBigT.y - 10,
        noStartMarker: true,
        noEndMarker: true,
      })

      macro('hd', {
        from: points.body14,
        to: points.body13,
        y: points.body06.y - sa - 5,
      })
      macro('hd', {
        from: points.body13,
        to: points.body10,
        y: points.body06.y - sa - 5,
      })
      macro('hd', {
        from: points.body10,
        to: points.body06,
        y: points.body06.y - sa - 5,
      })
      points.finCurve = utils.beamsIntersect(
        points.body05,
        points.body05cp2,
        points.body04,
        points.body04cp1
      )
      macro('hd', {
        from: points.body06,
        to: points.finCurve,
        y: points.body06.y - sa - 5,
      })
      macro('hd', {
        from: points.finCurve,
        to: points.body03,
        y: points.body06.y - sa - 5,
      })
      macro('hd', {
        from: points.body03,
        to: points.body01,
        y: points.body06.y - sa - 5,
        noStartMarker: true,
        noEndMarker: true,
      })
      macro('hd', {
        from: points.body02,
        to: points.body03,
        y: points.body06.y - sa + 10,
      })
      macro('hd', {
        from: points.body02,
        to: points.body01,
        y: points.body06.y - sa + 20,
      })

      macro('vd', {
        from: points.body19,
        to: points.body14,
        x: points.body14.x - sa - 10,
      })
      macro('vd', {
        from: points.body15,
        to: points.body14,
        x: points.body14.x - sa - 20,
      })
      macro('vd', {
        from: points.body14,
        to: points.body13,
        x: points.body14.x - sa - 20,
      })
      macro('vd', {
        from: points.body14,
        to: points.body10,
        x: points.body14.x - sa - 30,
      })
      macro('vd', {
        from: points.body14,
        to: points.body08,
        x: points.body14.x - sa - 10,
      })
      macro('vd', {
        from: points.body10,
        to: points.body06,
        x: points.body14.x - sa - 30,
      })
      macro('vd', {
        from: points.body01,
        to: points.body19,
        x: points.body01.x + sa + 10,
      })
      macro('vd', {
        from: points.body02,
        to: points.body19,
        x: points.body01.x + sa + 20,
      })
      macro('vd', {
        from: points.body03,
        to: points.body01,
        x: points.body01.x + sa + 10,
      })
      macro('vd', {
        from: points.finCurve,
        to: points.body02,
        x: points.body01.x + sa + 20,
      })
      macro('vd', {
        from: points.body06,
        to: points.finCurve,
        x: points.body01.x + sa + 20,
      })
      if (options.size > 0.4) {
        macro('vd', {
          from: points.gill5end,
          to: points.gill5start,
          x: points.gill5start.x + 5,
          noStartMarker: true,
          noEndMarker: true,
        })
      }
    } else {
      macro('scalebox', { at: points.scaleboxAnchor })
    }
  }

  return part
}
