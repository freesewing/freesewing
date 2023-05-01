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
  points.sideFlapFrontPoint = new Point(taperWidth + depth, height)
  points.sideFlapBackPoint = new Point(taperWidth, height)
  points.baseFrontRight = new Point(taperWidth, height + depth)
  points.frontFlapMidRight = new Point(width, 2 * height + depth)
  points.falseFrontFlapRight = new Point(frontFlapWidth, frontFlapHeight + 2 * height + depth)
  points.frontFlapPeakRight = points.frontFlapMidRight.shiftFractionTowards(
    points.falseFrontFlapRight,
    0.2
  )
  points.frontOpeningRight = new Point(openingWidth, openingHeight + height + depth)
  points.frontOpeningLeft = new Point(0, openingHeight + height + depth)

  paths.seam = new Path()
    .move(points.frontOpeningLeft)
    .line(points.frontOpeningRight)
    .line(points.frontFlapPeakRight)
    .line(points.frontFlapMidRight)
    .line(points.baseFrontRight)
    .line(points.sideFlapBackPoint)
    .line(points.sideFlapFrontPoint)
    .line(points.bodyTopRight)
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
      nr: '5',
      title: 'Body Lining',
    })

    paths.foldLineSideFlap = new Path()
      .move(points.bodyTopRight)
      .line(points.sideFlapBackPoint)
      .setClass('dotted note')
      .addText('SideFlap Fold', 'center note')

    paths.foldLineBaseBack = new Path()
      .move(new Point(0, points.sideFlapBackPoint.y))
      .line(points.sideFlapBackPoint)
      .setClass('dotted note')
      .addText('Base Fold', 'center note')
    paths.foldLineBaseFront = new Path()
      .move(new Point(0, points.baseFrontRight.y))
      .line(points.baseFrontRight)
      .setClass('dotted note')
      .addText('Base Fold', 'center note')

    if (sa) {
      points.temp = points.baseFrontRight.shiftFractionTowards(points.sideFlapBackPoint, -0.2)
      var baseFrenchSeams = new Path()
        .move(points.baseFrontRight)
        .line(points.sideFlapBackPoint)
        .line(points.sideFlapFrontPoint)
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
      var openingBinding = openingBindingTop
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
        .line(points.baseFrontRight)
        .offset(sa)

      var sideFlapSa = new Path()
        .move(points.sideFlapFrontPoint)
        .line(points.bodyTopRight)
        .offset(sa)

      paths.openingBinding = openingBinding
      paths.baseSa = new Path()
        .move(points.baseFrontRight)
        .join(baseFrenchSeams)
        .addText('French Seam', 'center text-lg')
        .join(sideFlapSa)
        .join(
          new Path()
            .move(points.bodyTopRight)
            .line(points.origin)
            .offset(2 * sa)
        )
        .trim()
        .setClass('lining sa')
      paths.frontAndTopSa = new Path()
        .move(points.frontFlapMidRight)
        .line(frontSideSa.start())
        .line(frontSideSa.intersects(paths.baseSa)[0])
        .trim()
        .setClass('lining sa')
    }
  }

  // Paperless?
  if (paperless) {
    macro('hd', {
      from: points.bodyTopRight,
      to: points.sideFlapFrontPoint,
      y: points.bodyTopRight.y - 2 * sa - 15,
    })
    macro('hd', {
      from: points.origin,
      to: points.sideFlapFrontPoint,
      y: points.bodyTopRight.y - 2 * sa - 25,
    })
    macro('hd', {
      from: points.sideFlapBackPoint,
      to: points.sideFlapFrontPoint,
      y: points.sideFlapBackPoint.y - 15,
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
      to: points.sideFlapFrontPoint,
      x: points.sideFlapFrontPoint.x + 2 * sa,
    })
    macro('vd', {
      from: points.sideFlapFrontPoint,
      to: points.baseFrontRight,
      x: points.sideFlapFrontPoint.x + 2 * sa,
    })
    macro('vd', {
      from: points.baseFrontRight,
      to: points.frontFlapMidRight,
      x: points.sideFlapFrontPoint.x + 2 * sa,
    })
    macro('vd', {
      from: points.frontFlapMidRight,
      to: points.frontFlapPeakRight,
      x: points.sideFlapFrontPoint.x + 2 * sa,
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
