import { addButtons } from './shared'

export default (part) => {
  const { sa, store, Point, points, Path, paths, complete, paperless, macro, options } =
    part.shorthand()

  const width = store.get('buttonPlacketWidth')
  switch (options.buttonholePlacement){
	  case 'leftOverRight':
  points.placketTopFold1 = points.cfNeck.shift(0, width / 2)
  points.placketTopFold2 = points.cfNeck.shift(0, width * 1.5)
  points.placketTopEdge = points.cfNeck.shift(0, width * 2.5)
  points.placketBottomFold1 = points.cfHem.shift(0, width / 2)
  points.placketBottomFold2 = points.cfHem.shift(0, width * 1.5)
  points.placketBottomEdge = points.cfHem.shift(0, width * 2.5)
  points.placketBottomMatch = points.cfHem.shift(180, width / 2)
  points.placketTopMatch = points.cfNeck.shift(180, width / 2)
  break
  case 'rightOverLeft':
  points.placketTopFold1 = points.cfNeck.shift(180, width / 2)
  points.placketTopFold2 = points.cfNeck.shift(180, width * 1.5)
  points.placketTopEdge = points.cfNeck.shift(180, width * 2.5)
  points.placketBottomFold1 = points.cfHem.shift(180, width / 2)
  points.placketBottomFold2 = points.cfHem.shift(180, width * 1.5)
  points.placketBottomEdge = points.cfHem.shift(180, width * 2.5)
  points.placketBottomMatch = points.cfHem.shift(0, width / 2)
  points.placketTopMatch = points.cfNeck.shift(0, width / 2)
  }
  paths.seam.line(points.placketTopEdge).line(points.placketBottomEdge).line(points.cfHem).close()

  // Complete pattern?
  if (complete) {
    // Placket help lines
    paths.frontCenter = new Path().move(points.cfNeck).line(points.cfHem).attr('class', 'help')
    paths.placketFold1 = new Path()
      .move(points.placketTopFold1)
      .line(points.placketBottomFold1)
      .attr('class', 'dotted')
    paths.placketFold2 = new Path()
      .move(points.placketTopFold2)
      .line(points.placketBottomFold2)
      .attr('class', 'dotted')
    paths.placketMatch = new Path()
      .move(points.placketBottomMatch)
      .line(points.placketTopMatch)
      .attr('class', 'stroke-sm help')
      .attr('data-text', 'matchHere')
      .attr('data-text-class', 'text-xs center')
    macro('sprinkle', {
      snippet: 'notch',
      on: [
        'placketTopFold1',
        'placketTopFold2',
        'placketBottomFold1',
        'placketBottomFold2',
        'cfNeck',
        'cfHem',
      ],
    })

    // Buttons
    addButtons(part)

    // Title
switch (options.buttonholePlacement){
	case 'leftOverRight':
    // Title
    macro('title', { at: points.title, nr: 1, title: 'frontRight' })
	break
	case 'rightOverLeft':
	macro('title', { at: points.title, nr: 2, title: 'frontLeft' })
}

    if (sa) {
      paths.saFromArmhole
        .line(new Point(points.placketTopEdge.x, points.placketTopEdge.y - sa))
        .line(points.placketTopEdge)
        .move(points.placketBottomEdge)
        .line(points.placketBottomEdge.shift(-90, sa * 3))
        .line(paths.hemSa.start())
    }
  }

  // Paperless?
  if (paperless) {
    if (complete) {
      points.button0 = points.placketTopEdge
      let j
      for (let i = 0; i < options.buttons; i++) {
        j = i + 1
	switch (options.buttonholePlacement){
		  case 'leftOverRight':
        macro('vd', {
          from: points['button' + j],
          to: points['button' + i],
          x: points.placketTopEdge.x + 15 + sa,
        })
		break
		case 'rightOverLeft':
        macro('vd', {
          from: points['button' + j],
          to: points['button' + i],
          x: points.placketTopEdge.x - 15 - sa,
	})
	}
      }
    }
    macro('hd', {
      from: points.hps,
      to: points.placketTopEdge,
      y: points.hps.y - sa - 15,
    })
    macro('hd', {
      from: points.s3ArmholeSplit,
      to: points.placketTopEdge,
      y: points.hps.y - sa - 30,
    })
    macro('hd', {
      from: points.armhole,
      to: points.placketTopEdge,
      y: points.hps.y - sa - 45,
    })
	switch (options.buttonholePlacement){
		  case 'leftOverRight':
    macro('vd', {
      from: points.placketTopEdge,
      to: points.s3CollarSplit,
      x: points.placketTopEdge.x + sa + 15,
    })
    macro('vd', {
      from: points.placketBottomEdge,
      to: points.placketTopEdge,
      x: points.placketTopEdge.x + sa + 15,
    })
	break
	case 'rightOverLeft':
    macro('vd', {
      from: points.placketTopEdge,
      to: points.s3CollarSplit,
      x: points.placketTopEdge.x - sa - 15,
    })
    macro('vd', {
      from: points.placketBottomEdge,
      to: points.placketTopEdge,
      x: points.placketTopEdge.x - sa - 15,
    })
	}
  }

  return part
}
