import { backPocketWelt } from './backpocketwelt.mjs'

function pacoBackPocketWeltInterfacing({
  points,
  Path,
  paths,
  snippets,
  options,
  complete,
  paperless,
  macro,
  part,
}) {
  // Clean up before returning.
  // See https://github.com/freesewing/freesewing/issues/2878
  for (const path in paths) delete paths[path]
  for (const snippet in snippets) delete snippets[snippet]
  macro('rmscalebox')
  macro('rmtitle')

  // Don't bother of we're not drafting back pockets
  if (!options.backPockets) return part.hide()

  paths.seam = new Path()
    .move(points.topLeft)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.topRight)
    .line(points.topLeft)
    .close()
    .attr('class', 'interfacing')

  if (complete) {
    points.title = points.topLeft.shiftFractionTowards(points.bottomRight, 0.4)
    macro('title', {
      at: points.title,
      nr: 8,
      title: 'pocketWeltInterfacing',
    })
    macro('sprinkle', {
      snippet: 'bnotch',
      on: ['pocketLeft', 'pocketRight', 'pocketBagWaistLeft', 'pocketBagWaistRight'],
    })

    if (paperless) {
      macro('hd', {
        from: points.bottomLeft,
        to: points.bottomRight,
        y: points.bottomLeft.y + 15,
      })
      macro('hd', {
        from: points.pocketLeft,
        to: points.pocketRight,
        y: points.topLeft.y - 15,
      })
      macro('vd', {
        from: points.bottomRight,
        to: points.topRight,
        x: points.topRight.x + 15,
      })
    }
  }

  return part
}

export const backPocketWeltInterfacing = {
  name: 'paco.backPocketWeltInterfacing',
  from: backPocketWelt,
  draft: pacoBackPocketWeltInterfacing,
}
