import { pluginBundle } from '@freesewing/plugin-bundle'

function draftFrontPanel({
  options,
  Point,
  Path,
  Snippet,
  points,
  paths,
  complete,
  sa,
  snippets,
  paperless,
  macro,
  part,
}) {
  // Width is halved as this is cut on a fold
  const width = (options.size * 500) / 2
  const height = options.size * 300
  const taperWidth = width * options.taperRatio
  const openingWidth = taperWidth * options.openingRatio
  const openingHeight = height * options.openingRatio
  const frontFlapHeight = height * options.flapHeightRatio
  const frontFlapWidth = taperWidth * 0.8
  points.origin = new Point(0, 0)
  points.frontFlapMidRight = new Point(width, height)
  points.frontFlapBottom = new Point(taperWidth, 0)
  points.falseFrontFlapRight = new Point(frontFlapWidth, frontFlapHeight + height)
  points.frontFlapPeakRight = points.frontFlapMidRight.shiftFractionTowards(
    points.falseFrontFlapRight,
    0.2
  )
  points.frontOpeningRight = new Point(openingWidth, openingHeight)
  points.frontOpeningLeft = new Point(0, openingHeight)

  paths.seam = new Path()
    .move(points.frontOpeningLeft)
    .line(points.frontOpeningRight)
    .line(points.frontFlapPeakRight)
    .line(points.frontFlapMidRight)
    .line(points.frontFlapBottom)
    .line(points.origin)
    .close()
    .attr('class', 'fabric')

  // Complete?
  if (complete) {
    macro('cutonfold', {
      from: points.origin,
      to: points.frontOpeningLeft,
    })

    points.label = new Point(openingWidth / 4, openingHeight / 2)
    macro('title', {
      at: points.label,
      title: 'Front Panel',
      nr: '2',
    })

    paths.FrontOrganiserAlignment = new Path()
      .move(new Point(points.frontOpeningRight.x, 0))
      .line(points.frontOpeningRight)
      .setClass('note dotted')
    paths.velcro = paths.FrontOrganiserAlignment.join(
      new Path()
        .move(new Point(points.falseFrontFlapRight.x, points.frontOpeningRight.y))
        .line(new Point(points.falseFrontFlapRight.x, 0))
    ).setClass('various fill-various')
    var midVelcroX = (points.frontOpeningRight.x + points.falseFrontFlapRight.x) / 2
    paths.velcroLabel = new Path()
      .move(new Point(midVelcroX, points.frontOpeningRight.y))
      .line(new Point(midVelcroX, 0))
      .addText('Velcro loop', 'note center')
      .addClass('no-stroke')
    snippets.webbingNotch = new Snippet('notch', new Point(midVelcroX, 0))

    if (sa) {
      var saPath = new Path()
        .move(points.frontFlapMidRight)
        .line(points.frontFlapBottom)
        .line(points.origin)
        .offset(sa * 2)
      paths.sa = new Path().move(points.frontFlapMidRight).join(saPath).setClass('fabric sa')
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
                  .line(points.frontFlapBottom)
              )[0]
            )
        )
        .addText('Bind with seamtape', 'center text-sm')
        .setClass('fabric sa')
      var lidBindingRough = new Path()
        .move(points.frontFlapPeakRight)
        .line(points.frontFlapMidRight)
        .offset(-sa)
      lidBindingRough = new Path()
        .move(lidBindingRough.start())
        .line(lidBindingRough.start().shiftFractionTowards(lidBindingRough.end(), 3))
      paths.lidBinding = new Path()
        .move(
          lidBindingRough.intersects(
            new Path().move(points.frontOpeningRight).line(points.frontFlapPeakRight)
          )[0]
        )
        .line(
          lidBindingRough.intersects(
            new Path().move(points.frontFlapMidRight).line(points.frontFlapBottom)
          )[0]
        )
        .addText('Bind with lid', 'center text-sm')
        .setClass('fabric sa')
    }
  }

  // Paperless?
  if (paperless) {
    macro('hd', {
      from: points.origin,
      to: points.frontFlapBottom,
      y: points.origin.y - 2 * sa - 15,
    })
    macro('hd', {
      from: points.frontFlapBottom,
      to: points.frontFlapMidRight,
      y: points.origin.y - 2 * sa - 15,
    })
    macro('hd', {
      from: points.frontFlapMidRight,
      to: points.frontFlapPeakRight,
      y: points.frontFlapPeakRight.y + 2 * sa + 15,
    })
    macro('hd', {
      from: points.frontFlapPeakRight,
      to: points.frontOpeningRight,
      y: points.frontFlapPeakRight.y + 2 * sa + 15,
    })
    macro('hd', {
      from: points.frontOpeningRight,
      to: points.frontOpeningLeft,
      y: points.frontFlapPeakRight.y + 2 * sa + 15,
    })
    macro('vd', {
      from: points.origin,
      to: points.frontOpeningLeft,
      x: points.origin.x - 15,
    })
    macro('vd', {
      from: points.origin,
      to: points.frontFlapMidRight,
      x: points.frontFlapMidRight.x + 15,
    })
    macro('vd', {
      from: points.frontFlapMidRight,
      to: points.frontFlapPeakRight,
      x: points.frontFlapMidRight.x + 15,
    })
  }

  return part
}

export const frontPanel = {
  name: 'frontPanel',
  options: {
    size: { pct: 100, min: 15, max: 200, menu: 'style' },
    taperRatio: { pct: 60, min: 50, max: 100, menu: 'style' },
    flapHeightRatio: { pct: 83, min: 60, max: 100, menu: 'style' },
    openingRatio: { pct: 66, min: 30, max: 90, menu: 'style' },
  },
  plugins: [pluginBundle],
  draft: draftFrontPanel,
}
