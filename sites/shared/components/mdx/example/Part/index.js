import React from 'react'
import Path from '../Path'
import Point from '../Point'
import Snippet from '../Snippet'
import { getProps } from '../utils'

const Part = ({ part, paperless=false, develop=false, language='en', raiseEvent=()=>false }) => {
  const focusPoint = (point, i) => {
    const p = part.points[point]
    const pathString = `M ${p.x} ${part.topLeft.y} `
      + `L ${p.x} ${part.bottomRight.y} `
      + `M ${part.topLeft.x} ${p.y} `
      + `L ${part.bottomRight.x} ${p.y} `
    const classes = 'focus point c' + (i % 8) // Cycle through 8 colors
    return (
      <React.Fragment key={'fp' + point}>
        <path d={pathString} className={classes} />
        <circle
          cx={p.x}
          cy={p.y}
          r="5"
          className="contrast"
          onClick={() =>
            raiseEvent('clearFocus', {
              part: part.name,
              type: 'points',
              name: point
            })
          }
        />
      </React.Fragment>
    )
  }

  const focusCoords = (p, i) => {
    let pathString = `M ${p.x} ${part.topLeft.y} `
    pathString += `L ${p.x} ${part.bottomRight.y} `
    pathString += `M ${part.topLeft.x} ${p.y} `
    pathString += `L ${part.bottomRight.x} ${p.y} `
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
            raiseEvent('clearFocus', {
              part: part.name,
              type: 'coords',
              data: p
            })
          }
        />
      </React.Fragment>
    )
  }

  let grid = paperless ? (
    <rect
      x={part.topLeft.x}
      y={part.topLeft.y}
      width={part.width}
      height={part.height}
      className="grid"
      fill={'url(#grid-' + part.name + ')'}
    />
  ) : null

  let focus = []
  if (develop) {
    if (focus && typeof focus[name] !== 'undefined') {
      for (let i in focus[name].points)
        focus.push(focusPoint(focus[name].points[i], i))
      for (let i in focus[name].paths) {
        let name = focus[name].paths[i]
        focus.push(
          <path
            key={'fpa-' + name}
            d={part.paths[name].asPathstring()}
            className={'focus path c' + (i % 4)}
            onClick={() =>
              raiseEvent('clearFocus', {
                part: name,
                type: 'paths',
                name
              })
            }
          />
        )
      }
      for (let i in focus[name].coords)
        focus.push(focusCoords(focus[name].coords[i], i))
    }
  }

  return (
    <g {...getProps(part)} id={`part-${part.name}`}>
      {grid}
      {Object.keys(part.paths).map((name) => (
        <Path
          key={name}
          name={name}
          part={part.name}
          language={language}
          path={part.paths[name]}
          focus={focus}
          topLeft={part.topLeft}
          bottomRight={part.bottomRight}
          develop={develop}
          raiseEvent={raiseEvent}
        />
      ))}
      {Object.keys(part.points).map((name) => (
        <Point
          key={name}
          name={name}
          part={part.name}
          language={language}
          point={part.points[name]}
          focus={focus}
          topLeft={part.topLeft}
          bottomRight={part.bottomRight}
          develop={develop}
          raiseEvent={raiseEvent}
        />
      ))}
      {Object.keys(part.snippets).map((name) => (
        <Snippet key={name} name={name} snippet={part.snippets[name]} />
      ))}
      {focus}
    </g>
  )
}

export default Part
