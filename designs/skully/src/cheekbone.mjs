import { pluginBundle } from '@freesewing/plugin-bundle'
import { cheek } from './cheek.mjs'
import { convertPoints } from './pointsUtil.mjs'

function draftCheekbone({
  options,
  Point,
  Path,
  points,
  paths,
  Snippet,
  snippets,
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
    .setText('5', textAttribute)
    .addClass('hidden')
  paths.seam6 = new Path()
    .move(points.point0)
    .curve(points.point0Cp1, points.point1Cp2, points.point1)
    .setText('6', textAttribute)
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
    //   .attr('data-text', 'hello')
    //   .attr('data-text-class', 'center')

    if (sa) {
      paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
    }
  }

  // Paperless?
  if (paperless) {
    macro('hd', {
      from: points.bottomLeft,
      to: points.bottomRight,
      y: points.bottomLeft.y + sa + 15,
    })
    macro('vd', {
      from: points.bottomRight,
      to: points.topRight,
      x: points.topRight.x + sa + 15,
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
