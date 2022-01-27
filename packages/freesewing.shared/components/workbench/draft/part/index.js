import Path from '../path'
import Point from '../point'
import Snippet from '../snippet'
import { getProps } from '../utils'

const Part = (props) => {
  const focusPoint = (point, i) => {
    const p = props.part.points[point]
    const pathString = `M ${p.x} ${props.part.topLeft.y} `
      + `L ${p.x} ${props.part.bottomRight.y} `
      + `M ${props.part.topLeft.x} ${p.y} `
      + `L ${props.part.bottomRight.x} ${p.y} `
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
  if (props.develop) {
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
          locale={props.locale}
          path={props.part.paths[name]}
          focus={props.focus}
          topLeft={props.part.topLeft}
          bottomRight={props.part.bottomRight}
          develop={props.develop}
          raiseEvent={props.raiseEvent}
          app={props.app}
        />
      ))}
      {Object.keys(props.part.points).map((name) => (
        <Point
          key={name}
          name={name}
          part={props.name}
          locale={props.locale}
          point={props.part.points[name]}
          focus={props.focus}
          topLeft={props.part.topLeft}
          bottomRight={props.part.bottomRight}
          develop={props.develop}
          raiseEvent={props.raiseEvent}
          app={props.app}
        />
      ))}
      {Object.keys(props.part.snippets).map((name) => (
        <Snippet key={name} name={name} snippet={props.part.snippets[name]} />
      ))}
      {focus}
    </g>
  )
}

export default Part
