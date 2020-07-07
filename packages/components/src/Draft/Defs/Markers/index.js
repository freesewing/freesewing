import React from 'react'

const Markers = (props) => {
  const markerProps = {
    orient: 'auto',
    refX: '0.0',
    refY: '0.0',
    style: { overflow: 'visible' }
  }
  const from = { d: 'M 0,0 L 12,-4 C 10,-2 10,2  12, 4 z' }
  const to = { d: 'M 0,0 L -12,-4 C -10,-2 -10,2  -12, 4 z' }
  const types = {
    grainline: 'note',
    cutonfold: 'note',
    dimension: 'mark'
  }
  let output = []
  for (let type in types) {
    output.push(
      <marker id={type + 'From'} key={type + '-from'} {...markerProps}>
        <path className={types[type] + ' fill-' + types[type]} {...from} />
      </marker>
    )
    output.push(
      <marker id={type + 'To'} key={type + '-to'} {...markerProps}>
        <path className={types[type] + ' fill-' + types[type]} {...to} />
      </marker>
    )
  }

  return output
}

export default Markers
