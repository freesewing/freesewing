import { measurements, optionalMeasurements, options, BuildMainShape } from './shape.mjs'

export const front = {
  name: 'penelope.front',
  measurements,
  optionalMeasurements,
  options,
  draft: (params) => {
    const { options, Path, points, paths, Snippet, snippets, sa, macro, store, part } = params

    BuildMainShape(params, true)

    paths.seam = paths.leftSide
      .clone()
      .join(paths.bottom)
      .join(paths.sideSeam)
      .join(paths.waist)
      .attr('class', 'fabric')

    macro('cutonfold', {
      from: points.lWaist,
      to: points.lLeg,
      id: 'front',
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

    store.cutlist.addCut({ cut: 1, from: 'fabric' })

    if (sa) {
      paths.sa = new Path()
        .move(points.lHem)
        .join(paths.bottom.join(paths.sideSeam).join(paths.waistSA).offset(sa))
        .line(points.lWaist)
        .attr('class', 'fabric sa')
    }

    macro('hd', {
      from: points.lLeg,
      to: points.rLeg,
      y: points.rHem.y + sa + options.paperlessOffset,
      id: 'legWidth',
    })
    macro('hd', {
      from: points.lHem,
      to: points.rHem,
      y: points.rHem.y + sa + options.paperlessOffset * 2,
      id: 'hemWidth',
    })

    return part
  },
}
