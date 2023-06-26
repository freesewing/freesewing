import { pluginBundle } from '@freesewing/plugin-bundle'

function draftBodyLiner({
  options,
  Point,
  Path,
  points,
  paths,
  complete,
  sa,
  paperless,
  macro,
  part,
}) {
  // Width is halved as this is cut on a fold
  const width = (options.size * 500) / 2
  const height = options.size * 300
  const depth = options.size * 150
  const taperWidth = width * options.taperRatio
  const openingWidth = taperWidth * options.openingRatio
  const openingHeight = height * options.openingRatio
  const frontFlapHeight = height * options.flapHeightRatio
  const frontFlapWidth = taperWidth * 0.8
  points.origin = new Point(0, 0)
  points.bodyTopRight = new Point(width, 0)
  points.sideFlapBackPoint = new Point(taperWidth + depth, height + depth)
  points.baseBackPoint = new Point(taperWidth, height)
  points.baseFrontRight = new Point(taperWidth, height + depth)
  points.frontFlapMidRight = new Point(width, 2 * height + depth)
  points.falseFrontFlapRight = new Point(frontFlapWidth, frontFlapHeight + 2 * height + depth)
  points.frontFlapPeakRight = points.frontFlapMidRight.shiftFractionTowards(
    points.falseFrontFlapRight,
    0.2
  )
  points.frontOpeningRight = new Point(openingWidth, openingHeight + height + depth)
  points.frontOpeningLeft = new Point(0, openingHeight + height + depth)
  points.lidTopRight = new Point(frontFlapWidth, -frontFlapHeight)
  points.lidTopLeft = new Point(0, -frontFlapHeight)

  paths.seam = new Path()
    .move(points.frontOpeningLeft)
    .line(points.frontOpeningRight)
    .line(points.frontFlapPeakRight)
    .line(points.frontFlapMidRight)
    .line(points.sideFlapBackPoint)
    .line(points.baseFrontRight)
    .line(points.baseBackPoint)
    .line(points.bodyTopRight)
    .line(points.lidTopRight)
    .line(points.lidTopLeft)
    .line(points.origin)
    .close()
    .attr('class', 'lining')

  // Complete?
  if (complete) {
    macro('cutonfold', {
      from: points.origin,
      to: points.frontOpeningLeft,
    })
    points.label = new Point(taperWidth / 2, height / 2)
    macro('title', {
      at: points.label,
      nr: '6',
      title: 'Body Lining',
    })

    paths.foldLineSideFlap = new Path()
      .move(points.baseFrontRight)
      .line(points.frontFlapMidRight)
      .setClass('dotted note')
      .addText('SideFlap Fold', 'center note')

    paths.foldLineBaseBack = new Path()
      .move(new Point(0, points.baseBackPoint.y))
      .line(points.baseBackPoint)
      .setClass('dotted note')
      .addText('Base Fold', 'center note')
    paths.foldLineBaseFront = new Path()
      .move(new Point(0, points.baseFrontRight.y))
      .line(points.baseFrontRight)
      .setClass('dotted note')
      .addText('Base Fold', 'center note')

    points.velcroPoint = new Path()
      .move(new Point(0, points.lidTopRight.y + 0.1 * height))
      .line(new Point(points.bodyTopRight.x, points.lidTopRight.y + 0.1 * height))
      .intersects(new Path().move(points.lidTopRight).line(points.bodyTopRight))[0]
    paths.velcro = new Path()
      .move(new Point(0, points.velcroPoint.y))
      .line(points.velcroPoint)
      .line(points.lidTopRight)
      .line(points.lidTopLeft)
      .close()
      .setClass('various fill-various')
    paths.velcroLabel = new Path()
      .move(new Point(0, points.velcroPoint.y))
      .line(new Point(points.velcroPoint.x, points.velcroPoint.y))
      .addText('Velcro hook', 'text-note center')
      .addClass('no-stroke')

    if (sa) {
      var baseFrenchSeams = new Path()
        .move(points.sideFlapBackPoint)
        .line(points.baseFrontRight)
        .line(points.baseBackPoint)
        .offset(2 * sa)
        .addText('French Seam')
      var openingBindingTop = new Path()
        .move(points.frontOpeningLeft)
        .line(points.frontOpeningRight)
        .offset(-sa)
      var openingBindingSideRough = new Path()
        .move(points.frontOpeningRight)
        .line(points.frontFlapPeakRight)
        .offset(-sa)
      paths.openingBinding = openingBindingTop
        .join(
          new Path()
            .move(openingBindingSideRough.start())
            .line(
              openingBindingSideRough.intersects(
                new Path()
                  .move(points.frontFlapPeakRight)
                  .line(points.frontFlapMidRight)
                  .line(points.baseFrontRight)
              )[0]
            )
        )
        .addText('Bind with seamtape', 'center text-sm')
        .setClass('lining sa')
      var frontSideSa = new Path()
        .move(points.frontFlapMidRight)
        .line(points.sideFlapBackPoint)
        .offset(sa)

      var sideFlapSa = new Path().move(points.baseBackPoint).line(points.bodyTopRight).offset(sa)

      paths.frontAndTopSa = new Path()
        .move(points.frontFlapMidRight)
        .join(frontSideSa)
        .join(baseFrenchSeams)
        .join(sideFlapSa)
        .line(points.bodyTopRight)
        .trim()
        .setClass('lining sa')
    }
  }

  // Paperless?
  if (paperless) {
    macro('hd', {
      from: points.origin,
      to: points.bodyTopRight,
      y: points.lidTopLeft.y - 2 * sa - 15,
    })
    macro('hd', {
      from: points.origin,
      to: points.sideFlapBackPoint,
      y: points.lidTopLeft.y - 2 * sa - 25,
    })
    macro('hd', {
      from: points.baseBackPoint,
      to: points.sideFlapBackPoint,
      y: points.baseBackPoint.y + 2 * sa + 15,
    })
    macro('hd', {
      from: points.lidTopLeft,
      to: points.lidTopRight,
      y: points.lidTopRight.y + 2 * sa + 15,
    })
    macro('hd', {
      from: points.frontOpeningLeft,
      to: points.frontOpeningRight,
      y: points.frontOpeningRight.y + 2 * sa + 15,
    })
    macro('hd', {
      from: points.frontOpeningLeft,
      to: points.frontFlapPeakRight,
      y: points.frontFlapPeakRight.y + 2 * sa,
    })
    macro('hd', {
      from: points.frontFlapPeakRight,
      to: points.frontFlapMidRight,
      y: points.frontFlapPeakRight.y + 2 * sa,
    })
    macro('vd', {
      from: points.bodyTopRight,
      to: points.baseBackPoint,
      x: points.sideFlapBackPoint.x + 2 * sa,
    })
    macro('vd', {
      from: points.baseBackPoint,
      to: points.sideFlapBackPoint,
      x: points.sideFlapBackPoint.x + 2 * sa,
    })
    macro('vd', {
      from: points.baseFrontRight,
      to: points.frontFlapMidRight,
      x: points.sideFlapBackPoint.x + 2 * sa,
    })
    macro('vd', {
      from: points.frontFlapMidRight,
      to: points.frontFlapPeakRight,
      x: points.sideFlapBackPoint.x + 2 * sa,
    })
  }

  return part
}

export const bodyLiner = {
  name: 'bodyLiner',
  options: {
    size: { pct: 100, min: 15, max: 200, menu: 'style' },
    taperRatio: { pct: 60, min: 50, max: 100, menu: 'style' },
    flapHeightRatio: { pct: 83, min: 60, max: 100, menu: 'style' },
    openingRatio: { pct: 66, min: 30, max: 90, menu: 'style' },
  },
  plugins: [pluginBundle],
  draft: draftBodyLiner,
}
