export const body = {
  name: 'jane.body',
  measurements: [
    'chest',
    'hips',
    'hpsToWaistBack',
    'waistToKnee',
    'shoulderToShoulder',
    'neck',
    'hpsToBust',
    'waistToFloor',
  ],
  options: {
    bodyEase: { pct: 21, min: 21, max: 50, menu: 'fit' },
    neckDepthFront: { pct: 31, min: 25, max: 50, menu: 'style' },
    neckDepthBack: { pct: 18, min: 15, max: 50, menu: 'style' },
    neckWidth: { pct: 71, min: 65, max: 85, menu: 'style' },
    shiftLength: { pct: 2, min: 0, max: 20, menu: 'style' },
  },

  draft: function draftJaneBody({
    options,
    Point,
    Path,
    points,
    paths,
    Snippet,
    snippets,
    sa,
    paperless,
    macro,
    measurements,
    part,
    store,
  }) {
    //body
    const lengthBody =
      (measurements.waistToKnee + measurements.hpsToWaistBack) * (1 + options.shiftLength)

    const workingHip =
      measurements.chest > measurements.hips ? measurements.chest / 2 : measurements.hips / 2

    const widthBody = workingHip * (1 + options.bodyEase)

    const maxLength =
      lengthBody > measurements.waistToFloor + measurements.hpsToWaistBack
        ? measurements.waistToFloor + measurements.hpsToWaistBack
        : lengthBody

    points.topLeft = new Point(0, 0)
    points.topRight = new Point(widthBody, 0)
    points.bottomLeft = new Point(0, maxLength)
    points.bottomRight = new Point(widthBody, maxLength)

    points.gorestartLeft = points.bottomLeft.shiftTowards(points.topLeft, maxLength / 2)
    points.gorestartRight = points.bottomRight.shiftTowards(points.topRight, maxLength / 2)

    points.middle = points.topLeft.shiftTowards(points.topRight, widthBody / 2)
    points.leftShoulder = points.middle.shiftTowards(
      points.topLeft,
      measurements.shoulderToShoulder / 2
    )
    points.rightShoulder = points.middle.shiftTowards(
      points.topRight,
      measurements.shoulderToShoulder / 2
    )

    paths.body = new Path()
      .move(points.topRight)
      .line(points.topLeft)
      .line(points.bottomLeft)
      .line(points.bottomRight)
      .line(points.topRight)
      .addClass('fabric')
      .close()

    paths.leftGore = new Path()
      .move(points.leftShoulder)
      .line(points.gorestartLeft)
      .addClass('fabric dashed')
      .close()

    paths.rightGore = new Path()
      .move(points.rightShoulder)
      .line(points.gorestartRight)
      .addClass('fabric dashed')
      .close()

    //neckline

    const neckWidth = measurements.neck * options.neckWidth

    points.neckLeft = points.middle.shiftTowards(points.leftShoulder, neckWidth / 2)
    points.neckRight = points.middle.shiftTowards(points.rightShoulder, neckWidth / 2)

    points.middleHem = points.bottomLeft.shiftTowards(points.bottomRight, widthBody / 2)

    points.neckFront = points.middle
      .shiftTowards(points.middleHem, measurements.hpsToBust * options.neckDepthFront)
      .addText(`Front Neckline`, 'center')

    points.neckCp1 = points.neckRight.shift(90, points.neckFront.dy(points.neckRight) * 0.8)
    points.neckCp2 = points.neckFront.shift(180, points.neckFront.dy(points.neckRight) * 0.8)

    points.neckCp3 = points.neckLeft.shift(90, points.neckFront.dy(points.neckLeft) * 0.8)
    points.neckCp4 = points.neckFront.shift(0, points.neckFront.dy(points.neckLeft) * 0.8)

    paths.neckLineFront = new Path()
      .move(points.neckRight)
      .curve(points.neckCp1, points.neckCp2, points.neckFront)
      .curve(points.neckCp4, points.neckCp3, points.neckLeft)
      .addClass('fabric')

    points.neckBack = points.middle
      .shiftTowards(points.neckFront, measurements.hpsToBust * options.neckDepthBack)
      .addText(`Back Neckline`, 'center')

    points.neckBackCp1 = points.neckBack.shift(0, points.neckFront.dy(points.neckLeft) * 0.8)
    points.neckBackCp2 = points.neckBack.shift(180, points.neckFront.dy(points.neckRight) * 0.8)
    points.neckBackCp3 = points.neckLeft.shift(90, points.neckBack.dy(points.neckLeft) * 0.8)
    points.neckBackCp4 = points.neckRight.shift(90, points.neckBack.dy(points.neckRight) * 0.8)

    paths.necklineBack = new Path()
      .move(points.neckRight)
      .curve(points.neckBackCp4, points.neckBackCp2, points.neckBack)
      .curve(points.neckBackCp1, points.neckBackCp3, points.neckLeft)
      .addClass('fabric')

    points.topTopLeft = points.topLeft.shift(90, 20)
    points.topTopRight = points.topRight.shift(90, 20)
    paths.extraBoundary = new Path()
      .move(points.topLeft)
      .move(points.topRight)
      .move(points.topTopRight)
      .move(points.topTopLeft)
      .move(points.topLeft)
      .addClass('fabric hidden')
      .close()

    points.logo = points.middle.shiftTowards(points.middleHem, maxLength / 4)
    snippets.logo = new Snippet('logo', points.logo)

    store.cutlist.setCut({ cut: 2, from: 'fabric' })

    points.title = points.logo.shiftTowards(points.middle, maxLength / 12)
    macro('title', {
      at: points.title,
      nr: 1,
      title: 'body',
    })

    if (sa) {
      paths.sa = paths.body.offset(sa).setClass('fabric sa')
    }

    macro('cutonfold', {
      from: points.topLeft,
      to: points.topRight,
      grainline: false,
    })

    points.grainlineFrom = points.leftShoulder
    points.grainlineTo = new Point(points.grainlineFrom.x, points.bottomLeft.y)
    macro('grainline', {
      from: points.grainlineFrom,
      to: points.grainlineTo,
    })

    // Paperless?
    if (paperless) {
      macro('hd', {
        id: 'bodyWidth',
        from: points.topLeft,
        to: points.topRight,
        y: points.topLeft.y + sa + 10,
      })

      macro('vd', {
        id: 'bodyLength',
        from: points.topLeft,
        to: points.bottomLeft,
        x: points.topLeft.y + sa + 30,
      })

      macro('vd', {
        id: 'goreLength',
        from: points.topLeft,
        to: points.gorestartLeft,
        x: points.topLeft.y + sa + 40,
      })

      macro('hd', {
        id: 'goreWidth',
        from: points.rightShoulder,
        to: points.topRight,
        y: points.rightShoulder.y + sa + 20,
      })

      macro('vd', {
        id: 'backNeckDepth',
        from: points.middle,
        to: points.neckBack,
        x: points.middle.x + sa + 15,
      })

      macro('vd', {
        id: 'frontNeckDepth',
        from: points.middle,
        to: points.neckFront,
        x: points.middle.x + sa + 35,
      })

      macro('hd', {
        id: 'neckWidth',
        from: points.neckLeft,
        to: points.middle,
        y: points.leftShoulder.y + sa + 30,
      })
    }

    return part
  },
}
