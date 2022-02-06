import React from 'react'
import Path from '../Path'
import Point from '../Point'
import Snippet from '../Snippet'
import { getProps } from '../utils'

const Part = (props) => {
  const focusPoint = (point, i) => {
    let p = props.part.points[point]
    let pathString = `M ${p.x} ${props.part.topLeft.y} `
    pathString += `L ${p.x} ${props.part.bottomRight.y} `
    pathString += `M ${props.part.topLeft.x} ${p.y} `
    pathString += `L ${props.part.bottomRight.x} ${p.y} `
    let classes = 'focus point c' + (i % 4) // Cycle through 4 CSS classes
    return (
      <React.Fragment key={'fp' + point}>
        <path d={pathString} className={classes} />
        <circle
          cx={p.x}
          cy={p.y}
          r="5"
          className={classes}
          onClick={() =>
            props.raiseEvent('clearFocus', {
              part: props.name,
              type: 'points',
              name: point
            })
          }
        />
      </React.Fragment>
    )
  }

  const focusCoords = (p, i) => {
    let pathString = `M ${p.x} ${props.part.topLeft.y} `
    pathString += `L ${p.x} ${props.part.bottomRight.y} `
    pathString += `M ${props.part.topLeft.x} ${p.y} `
    pathString += `L ${props.part.bottomRight.x} ${p.y} `
    let classes = 'focus coords c' + (i % 4) // Cycle through 4 CSS classes
    return (
      <React.Fragment key={'cp' + i}>
        <path d={pathString} className={classes} />
        <circle
          cx={p.x}
          cy={p.y}
          r="5"
          className={classes}
          onClick={() =>
            props.raiseEvent('clearFocus', {
              part: props.name,
              type: 'coords',
              data: p
            })
          }
        />
      </React.Fragment>
    )
  }

  let grid = props.paperless ? (
    <rect
      x={props.part.topLeft.x}
      y={props.part.topLeft.y}
      width={props.part.width}
      height={props.part.height}
      className="grid"
      fill={'url(#grid-' + props.name + ')'}
    />
  ) : null

  let focus = []
  if (props.design) {
    if (props.focus && typeof props.focus[props.name] !== 'undefined') {
      for (let i in props.focus[props.name].points)
        focus.push(focusPoint(props.focus[props.name].points[i], i))
      for (let i in props.focus[props.name].paths) {
        let name = props.focus[props.name].paths[i]
        focus.push(
          <path
            key={'fpa-' + name}
            d={props.part.paths[name].asPathstring()}
            className={'focus path c' + (i % 4)}
            onClick={() =>
              props.raiseEvent('clearFocus', {
                part: props.name,
                type: 'paths',
                name
              })
            }
          />
        )
      }
      for (let i in props.focus[props.name].coords)
        focus.push(focusCoords(props.focus[props.name].coords[i], i))
    }
  }

  return (
    <g {...getProps(props.part)} id={`part-${props.name}`}>
      {grid}
      {Object.keys(props.part.paths).map((name) => (
        <Path
          key={name}
          name={name}
          part={props.name}
          language={props.language}
          path={props.part.paths[name]}
          focus={props.focus}
          topLeft={props.part.topLeft}
          bottomRight={props.part.bottomRight}
          design={props.design}
          raiseEvent={props.raiseEvent}
        />
      ))}
      {Object.keys(props.part.points).map((name) => (
        <Point
          key={name}
          name={name}
          part={props.name}
          language={props.language}
          scale={props.scale}
          point={props.part.points[name]}
          focus={props.focus}
          topLeft={props.part.topLeft}
          bottomRight={props.part.bottomRight}
          design={props.design}
          raiseEvent={props.raiseEvent}
        />
      ))}
      {Object.keys(props.part.snippets).map((name) => (
        <Snippet key={name} name={name} snippet={props.part.snippets[name]} scale={props.scale} />
      ))}
      {focus}
    </g>
  )
}

export default Part
