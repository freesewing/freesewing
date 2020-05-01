import React from 'react'
import Markers from './Markers'
import Snippets from './Snippets'
import Grid from './Grid'

const Defs = (props) => {
  let paperlessGrids = null
  if (props.paperless) {
    paperlessGrids = []
    for (let p in props.parts) {
      let anchor = { x: 0, y: 0 }
      if (typeof props.parts[p].points.gridAnchor !== 'undefined')
        anchor = props.parts[p].points.gridAnchor
      else if (typeof props.parts[p].points.anchor !== 'undefined')
        anchor = props.parts[p].points.anchor
      paperlessGrids.push(
        <pattern id={'grid-' + p} key={'grid-' + p} xlinkHref="#grid" x={anchor.x} y={anchor.y} />
      )
    }
  }
  return (
    <defs>
      <Markers />
      <Snippets />
      <Grid units={props.units} />
      {paperlessGrids}
    </defs>
  )
}

export default Defs
