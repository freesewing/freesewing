import { pluginBundle } from '@freesewing/plugin-bundle'
import { measurements, optionalMeasurements, options, BuildMainShape } from './shape.mjs'

function penelopeFront(params) {
  const { options, Path, points, paths, Snippet, snippets, complete, sa, paperless, macro, part } =
    params

  BuildMainShape(params, true)

  paths.seam = paths.leftSide
    .clone()
    .join(paths.bottom)
    .join(paths.sideSeam)
    .join(paths.waist)
    .attr('class', 'fabric')

  // Complete?
  if (complete) {
    macro('cutonfold', {
      from: points.lWaist,
      to: points.lLeg,
      margin: 5,
      offset: 10,
    })
    macro('title', {
      nr: 1,
      at: points.titleAnchor,
      title: 'front',
    })
    macro('grainline', {
      from: points.grainlineTop,
      to: points.grainlineBottom,
    })

    points.scaleBox = points.logoAnchor.shift(270, 100)
    macro('scalebox', { at: points.scaleBox })

    snippets.logo = new Snippet('logo', points.logoAnchor)

    if (sa) {
      paths.sa = new Path()
        .move(points.lHem)
        .join(paths.bottom.join(paths.sideSeam).join(paths.waistSA).offset(sa))
        .line(points.lWaist)
        .attr('class', 'fabric sa')
    }

    if (paperless) {
      macro('hd', {
        from: points.lHem,
        to: points.rHem,
        y: points.rHem.y - options.paperlessOffset,
      })
    }
  }

  return part
}

export const front = {
  name: 'penelope.front',
  measurements,
  optionalMeasurements,
  options,
  plugins: [pluginBundle],
  draft: penelopeFront,
}
