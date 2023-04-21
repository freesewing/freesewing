import { pluginBundle } from '@freesewing/plugin-bundle'

function draftCheek({
  options,
  Point,
  Path,
  points,
  paths,
  Snippet,
  snippets,
  complete,
  measurements,
  sa,
  store,
  paperless,
  macro,
  part,
}) {
  const textAttribute = 'text-xs center'
  const sizeFactor = (('head' in measurements ? measurements.head : 596) / 929.5) * options.size * 2
  store.set('sizeFactor', sizeFactor)

  points.point0 = new Point(0, 0)
  points.point1 = points.point0.shift(254.78244159705943, 22.5254232590644 * sizeFactor)
  points.point1Cp1 = points.point1.shift(321.2022157426192, 7.140882368447221 * sizeFactor)
  points.point2 = points.point0.shift(260.1018837009255, 44.64105174612264 * sizeFactor)
  points.point2Cp1 = points.point2.shift(243.25309471936828, 16.615062563830442 * sizeFactor)
  points.point2Cp2 = points.point2.shift(322.6411575424251, 21.283352555459906 * sizeFactor)
  points.point3 = points.point0.shift(261.38174456728586, 76.35866165668438 * sizeFactor)
  points.point3Cp1 = points.point3.shift(333.3176703576494, 12.168666812761435 * sizeFactor)
  points.point3Cp2 = points.point3.shift(85.91520774712568, 11.731692674119953 * sizeFactor)
  points.point4 = points.point0.shift(299.45265842618784, 86.78060596475459 * sizeFactor)
  points.point4Cp1 = points.point4.shift(84.35380802294482, 49.11521286943584 * sizeFactor)
  points.point4Cp2 = points.point4.shift(184.39630340760462, 19.40463369919666 * sizeFactor)
  points.point5 = points.point0.shift(342.8506386745285, 121.04758752176764 * sizeFactor)
  points.point5Cp1 = points.point5.shift(137.52316754335672, 29.889370057597382 * sizeFactor)
  points.point5Cp2 = points.point5.shift(196.75764739545923, 56.96390931984925 * sizeFactor)
  points.point6 = points.point0.shift(1.1205493505415198, 54.26948752485138 * sizeFactor)
  points.point6Cp2 = points.point6.shift(316.18924774003017, 44.726876316259826 * sizeFactor)
  points.point7 = points.point0.shift(357.37806779049225, 43.287782602138435 * sizeFactor)
  points.point7Cp1 = points.point7.shift(299.1399624138707, 19.59910745416729 * sizeFactor)
  points.point8 = points.point0.shift(317.5381963475652, 36.1375990486363 * sizeFactor)
  points.point8Cp1 = points.point8.shift(173.12090742697325, 12.479807891149623 * sizeFactor)
  points.point8Cp2 = points.point8.shift(353.1201304168364, 15.075322060904695 * sizeFactor)
  points.point9 = points.point0.shift(336.14503661026947, 8.388980629373263 * sizeFactor)
  points.point9Cp2 = points.point9.shift(255.27121271777986, 18.645853640957277 * sizeFactor)

  points.point5a = new Path()
    .move(points.point6)
    .curve(points.point6Cp2, points.point5Cp1, points.point5)
    .shiftAlong(65 * sizeFactor)

  const sp = new Path()
    .move(points.point5)
    .curve(points.point5Cp1, points.point6Cp2, points.point6)
    .split(points.point5a)

  points.point5aCp1 = sp[1].ops[1].cp1.clone()
  points.point6Cp2 = sp[1].ops[1].cp2.clone()

  points.point5 = points.point5.rotate(357, points.point0)
  points.point5Cp2 = points.point5.shift(196.75764739545923, 56.96390931984925 * sizeFactor)

  paths.eyeBottom = new Path()
    .move(points.point7)
    .curve(points.point7Cp1, points.point8Cp2, points.point8)
    .curve(points.point8Cp1, points.point9Cp2, points.point9)
    .setText(complete ? 'eyeBottom' + ' (4)' : '', textAttribute)
    .addClass('hidden')

  paths.mouthTop = new Path()
    .move(points.point3)
    .curve(points.point3Cp1, points.point4Cp2, points.point4)
    .setText(complete ? 'mouthTop' + ' (16)' : '', textAttribute)
    .addClass('hidden')

  paths.upperJaw = new Path()
    .move(points.point4)
    .curve(points.point4Cp1, points.point5Cp2, points.point5)
    .setText(complete ? 'upperJaw' + ' (16)' : '', textAttribute)
    .addClass('hidden')

  paths.nose = new Path()
    .move(points.point1)
    .curve(points.point1Cp1, points.point2Cp2, points.point2)
    .setText(complete ? 'nose (10)' : '', textAttribute)
    .addClass('hidden')

  store.set('templeToJaw', points.point5.dist(points.point5a))
  store.set('upperJaw', paths.upperJaw.length())

  paths.seam1 = new Path()
    .move(points.point9)
    .line(points.point0)
    .setText(complete ? '1' : '', textAttribute)
    .addClass('hidden')
  paths.seam2 = new Path()
    .move(points.point6)
    .line(points.point7)
    .setText(complete ? '2' : '', textAttribute)
    .addClass('hidden')
  paths.seam5 = new Path()
    .move(points.point5a)
    .curve(points.point5aCp1, points.point6Cp2, points.point6)
    .setText(complete ? '5' : '', textAttribute)
    .addClass('hidden')
  paths.seam7 = new Path()
    .move(points.point0)
    .line(points.point1)
    .setText(complete ? '7' : '', textAttribute)
    .addClass('hidden')
  paths.seam8 = new Path()
    .move(points.point2)
    .curve(points.point2Cp1, points.point3Cp2, points.point3)
    .setText(complete ? '8' : '', textAttribute)
    .addClass('hidden')

  paths.seam = new Path()
    .move(points.point0)
    .join(paths.seam7)
    .join(paths.nose)
    .join(paths.seam8)
    .join(paths.mouthTop)
    .join(paths.upperJaw)
    .line(points.point5a)
    .join(paths.seam5)
    .join(paths.seam2)
    .join(paths.eyeBottom)
    .join(paths.seam1)
    .close()

  store.set('templeWidth', points.point6.dist(points.point7))
  store.set('noseBridgeWidth', points.point0.dist(points.point9))
  store.set('templeWidth', points.point6.dist(points.point7))
  store.set('mouthTop', paths.mouthTop.length())
  store.set('eyeBottom', paths.eyeBottom.length())
  store.set('noseSide', paths.nose.length())
  store.set('noseHeight', points.point1.dist(points.point2))

  // Complete?
  if (complete) {
    points.title = points.point4Cp2.shiftFractionTowards(points.point0, 0.3)
    macro('title', {
      nr: 1,
      at: points.title,
      scale: 0.5,
      title: 'cheek',
    })

    snippets.n1 = new Snippet('notch', points.point9)
    snippets.n2 = new Snippet('notch', points.point5)
    snippets.n3 = new Snippet('notch', points.point5a)
    snippets.n4 = new Snippet('notch', points.point1)
    snippets.n5 = new Snippet('bnotch', points.point7)
    snippets.n6 = new Snippet('bnotch', points.point2)

    points.logo = points.point7
      .shiftFractionTowards(points.point5, 0.5)
      .shiftFractionTowards(points.point4, 0.25)
    snippets.logo = new Snippet('logo', points.logo).attr('data-scale', 0.3)

    if (sa) {
      paths.sa = paths.seam.offset(sa).trim().attr('class', 'fabric sa')
    }
  }

  // Paperless?
  if (paperless) {
    points.noseX = paths.nose.edge('right')
    points.eyeBottomY = paths.eyeBottom.edge('bottom')
    points.upperJaw = paths.upperJaw.shiftFractionAlong(0.42)
    console.log({ uj: points.upperJaw, p6: points.point6 })

    macro('hd', {
      from: points.noseX,
      to: points.point4,
      y: points.noseX.y + 5,
    })
    macro('hd', {
      from: points.point6,
      to: points.point5,
      y: points.point6.y - sa - 15,
    })
    macro('hd', {
      from: points.point6,
      to: points.point5a,
      y: points.point6.y - sa - 5,
    })
    macro('hd', {
      from: points.point7,
      to: points.point5,
      y: points.point6.y - sa - 25,
    })
    macro('hd', {
      from: points.point3,
      to: points.point7,
      y: points.point6.y - sa - 35,
    })
    macro('hd', {
      from: points.point2,
      to: points.point7,
      y: points.point6.y - sa - 25,
    })
    macro('hd', {
      from: points.point1,
      to: points.point7,
      y: points.point6.y - sa - 15,
    })
    macro('hd', {
      from: points.point0,
      to: points.point7,
      y: points.point6.y - sa - 5,
    })
    macro('hd', {
      from: points.point9,
      to: points.point7,
      y: points.point6.y - sa + 5,
    })
    macro('hd', {
      from: points.point3,
      to: points.point4,
      y: points.point4.y + sa + 15,
    })
    macro('hd', {
      from: points.point4,
      to: points.point5,
      y: points.point4.y + sa + 15,
    })

    macro('vd', {
      from: points.eyeBottomY,
      to: points.point4,
      x: points.point4.x,
    })
    macro('vd', {
      from: points.point6,
      to: points.point5a,
      x: points.point5.x + sa + 10,
    })
    macro('vd', {
      from: points.point6,
      to: points.point5,
      x: points.point5.x + sa + 20,
    })
    macro('vd', {
      from: points.point5,
      to: points.point4,
      x: points.point5.x + sa + 20,
    })
    macro('vd', {
      from: points.point3,
      to: points.point2,
      x: points.point2.x - sa - 10,
    })
    macro('vd', {
      from: points.point3,
      to: points.point1,
      x: points.point2.x - sa - 20,
    })
    macro('vd', {
      from: points.point1,
      to: points.point0,
      x: points.point2.x - sa - 20,
    })
    macro('vd', {
      from: points.point6,
      to: points.upperJaw,
      x: points.point6.x,
    })
  }

  return part
}

export const cheek = {
  name: 'cheek',
  options: {
    size: { pct: 75, min: 10, max: 300, menu: 'fit' },
  },
  optionalMeasurements: ['head'],
  plugins: [pluginBundle],
  draft: draftCheek,
}
