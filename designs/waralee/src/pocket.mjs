import { pantsProto } from './pantsproto.mjs'

function waraleePocket(part) {
  const {
    options,
    measurements,
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
  } = part.shorthand()

  if (false == options.frontPocket) {
    return part
  }

  const c = 0.55191502449351

  let pocketDepth =
    (measurements.crotchDepth - measurements.waistToHips) * options.frontPocketDepthFactor
  let frontPocketSize =
    options.frontPocketSize * measurements.crotchDepth /*- measurements.waistToHips*/

  if ('welt' == options.frontPocketStyle) {
    points.topLeft = new Point(0, 0)
    points.bottomLeft = points.topLeft.shift(270, pocketDepth)

    points.topRight = points.topLeft.shift(0, pocketDepth * (1 / 3))
    points.bottomRight = points.topRight.shift(290, pocketDepth * (5 / 6))

    points.bottomLeftCP = points.bottomLeft.shift(0, pocketDepth * (1 / 6))
    points.bottomRightCP = points.bottomRight.shift(225, pocketDepth * (1 / 4))

    paths.seam = new Path()
      .move(points.topLeft)
      .line(points.bottomLeft)
      .curve(points.bottomLeftCP, points.bottomRightCP, points.bottomRight)
      .line(points.topRight)
      .line(points.topLeft)
      .close()
      .attr('class', 'fabric')
  } else {
    points.topLeft = new Point(0, 0)
    points.topRight = points.topLeft.shift(0, frontPocketSize)
    points.bottomLeft = points.topLeft.shift(270, frontPocketSize * 1.5)
    points.bottomRight = points.topRight.shift(270, frontPocketSize * 1.5)
    points.bottomLeftCornerUp = points.bottomLeft.shift(90, frontPocketSize / 4)
    points.bottomLeftCornerUpCp1 = points.bottomLeftCornerUp.shift(270, (frontPocketSize / 4) * c)
    points.bottomLeftCornerOver = points.bottomLeft.shift(0, frontPocketSize / 4)
    points.bottomLeftCornerOverCp2 = points.bottomLeftCornerOver.shift(
      180,
      (frontPocketSize / 4) * c
    )
    points.bottomRightCornerUp = points.bottomRight.shift(90, frontPocketSize / 4)
    points.bottomRightCornerUpCp2 = points.bottomRightCornerUp.shift(270, (frontPocketSize / 4) * c)
    points.bottomRightCornerOver = points.bottomRight.shift(180, frontPocketSize / 4)
    points.bottomRightCornerOverCp1 = points.bottomRightCornerOver.shift(
      0,
      (frontPocketSize / 4) * c
    )

    paths.seam = new Path()
      .move(points.topLeft)
      .line(points.bottomLeftCornerUp)
      .curve(
        points.bottomLeftCornerUpCp1,
        points.bottomLeftCornerOverCp2,
        points.bottomLeftCornerOver
      )
      .line(points.bottomRightCornerOver)
      .curve(
        points.bottomRightCornerOverCp1,
        points.bottomRightCornerUpCp2,
        points.bottomRightCornerUp
      )
      .line(points.topRight)
      .line(points.topLeft)
      .close()
      .attr('class', 'fabric')
  }

  // Complete?
  if (complete) {
    points.title = points.topLeft.shift(270, 75).shift(0, 50)
    macro('title', {
      nr: 3,
      at: points.title,
      title: 'pocket',
    })

    points.logo = points.title.shift(270, 75)
    snippets.logo = new Snippet('logo', points.logo)
    points.text = points.logo
      .shift(-90, 25)
      .attr('data-text', 'Waralee')
      .attr('data-text-class', 'center')

    if ('welt' == options.frontPocketStyle) {
      macro('cutonfold', {
        from: points.topLeft,
        to: points.bottomLeft,
        margin: 5,
        offset: 10,
      })
    }
    if (sa) {
      if ('welt' == options.frontPocketStyle) {
        paths.sa = new Path()
          .move(points.bottomLeft)
          .join(
            new Path()
              .move(points.bottomLeft)
              .curve(points.bottomLeftCP, points.bottomRightCP, points.bottomRight)
              .line(points.topRight)
              .line(points.topLeft)
              .offset(sa)
          )
          .line(points.topLeft)
          .attr('class', 'fabric sa')
      } else {
        paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
      }
    }
  }

  // Paperless?
  if (paperless) {
    if ('welt' == options.frontPocketStyle) {
      macro('hd', {
        from: points.topLeft,
        to: points.topRight,
        y: points.topLeft.y + 15,
      })
      macro('hd', {
        from: points.bottomLeft,
        to: points.bottomRight,
        y: points.bottomRight.y,
      })
      macro('vd', {
        from: points.topLeft,
        to: points.bottomLeft,
        x: points.topLeft.x + 15,
      })
      macro('vd', {
        from: points.topRight,
        to: points.bottomRight,
        x: points.bottomRight.x,
      })
      macro('vd', {
        from: points.bottomRight,
        to: points.bottomLeft,
        x: points.bottomRight.x,
      })
    } else {
      macro('hd', {
        from: points.topLeft,
        to: points.topRight,
        y: points.topLeft.y + 15,
      })
      macro('vd', {
        from: points.topLeft,
        to: points.bottomLeftCornerOver,
        x: points.bottomLeftCornerOver.x,
      })
    }
  }

  return part
}

export const pocket = {
  name: 'waralee.pocket',
  after: pantsProto,
  draft: waraleePocket,
}
