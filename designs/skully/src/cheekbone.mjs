import { pluginBundle } from '@freesewing/plugin-bundle'
import { cheek } from './cheek.mjs'

function draftCheekbone({
  Point,
  Path,
  points,
  paths,
  complete,
  sa,
  store,
  paperless,
  macro,
  part,
}) {
  console.log('cheekbone')
  const textAttribute = 'text-xs center text-decoration="line-through"'
  const sizeFactor = store.get('sizeFactor')

  points.point0 = new Point(0, 0)
  points.point0Cp1 = points.point0.shift(26.9653561519379, 19.25431213546719 * sizeFactor)
  points.point1 = points.point0.shift(23.857094414377794, 57.23972922717229 * sizeFactor)
  points.point1Cp1 = points.point1.shift(135.7075072577942, 32.47486987518195 * sizeFactor)
  points.point1Cp2 = points.point1.shift(180.82587279494425, 29.902106313769938 * sizeFactor)

  paths.seam5 = new Path()
    .move(points.point1)
    .curve_(points.point1Cp1, points.point0)
    .setText(complete ? '5' : '', textAttribute)
    .addClass('hidden')
  paths.seam6 = new Path()
    .move(points.point0)
    .curve(points.point0Cp1, points.point1Cp2, points.point1)
    .setText(complete ? '6' : '', textAttribute)
    .attr('data-text-text-decoration', 'underline')
    .addClass('hidden')

  paths.seam = new Path().move(points.point0).join(paths.seam6).join(paths.seam5).close()

  // Complete?
  if (complete) {
    points.title = points.point0
      .shiftFractionTowards(points.point1, 0.65)
      .shiftFractionTowards(points.point1Cp2, 0.4)
    macro('title', {
      nr: 6,
      at: points.title,
      scale: 0.15,
      rotation: 325,
      title: 'cheekbone',
    })
    // points.logo = points.topLeft.shiftFractionTowards(points.bottomRight, 0.5)
    // snippets.logo = new Snippet('logo', points.logo)
    // points.text = points.logo
    //   .shift(-90, w / 8)

    if (sa) {
      paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
    }
  }

  // Paperless?
  if (paperless) {
    points.pointY = paths.seam.edge('top')

    macro('hd', {
      from: points.point0,
      to: points.point1,
      y: points.point0.y + sa + 15,
    })
    macro('hd', {
      from: points.point0,
      to: points.pointY,
      y: points.pointY.y - sa - 15,
    })
    macro('hd', {
      from: points.pointY,
      to: points.point1,
      y: points.pointY.y - sa - 15,
    })

    macro('vd', {
      from: points.point1,
      to: points.point0,
      x: points.point1.x + sa + 15,
    })
    macro('vd', {
      from: points.pointY,
      to: points.point0,
      x: points.point0.x - sa - 15,
    })
  }

  return part
}

export const cheekbone = {
  name: 'cheekbone',
  after: cheek,
  plugins: [pluginBundle],
  draft: draftCheekbone,
}
