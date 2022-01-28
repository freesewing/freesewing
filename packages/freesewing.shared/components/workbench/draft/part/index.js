import Path from '../path'
import Point from '../point'
import Snippet from '../snippet'
import { getProps } from '../utils'

const raiseEvent = (evt) => console.log('raiseEVent not implemtned', evt)

const Part = props => {
  const { partName, part, app, gist, updateGist } = props

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
              part: partName,
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
              partName: partName,
              type: 'coords',
              data: p
            })
          }
        />
      </React.Fragment>
    )
  }

  let grid = gist.paperless ? (
    <rect
      x={part.topLeft.x}
      y={part.topLeft.y}
      width={part.width}
      height={part.height}
      className="grid"
      fill={'url(#grid-' + partName + ')'}
    />
  ) : null

  let focus = []
  //if (gist.debug) {
  //  if (focus && typeof props.focus[props.name] !== 'undefined') {
  //    for (let i in props.focus[props.name].points)
  //      focus.push(focusPoint(props.focus[props.name].points[i], i))
  //    for (let i in props.focus[props.name].paths) {
  //      let name = props.focus[props.name].paths[i]
  //      focus.push(
  //        <path
  //          key={'fpa-' + name}
  //          d={props.part.paths[name].asPathstring()}
  //          className={'focus path c' + (i % 4)}
  //          onClick={() =>
  //            props.raiseEvent('clearFocus', {
  //              part: props.name,
  //              type: 'paths',
  //              name
  //            })
  //          }
  //        />
  //      )
  //    }
  //    for (let i in props.focus[props.name].coords)
  //      focus.push(focusCoords(props.focus[props.name].coords[i], i))
  //  }
  //}

  return (
    <g {...getProps(part)} id={`part-${partName}`}>
      {grid}
      {Object.keys(part.paths).map((pathName) => (
        <Path
          key={name}
          pathName={pathName}
          path={part.paths[pathName]}
          topLeft={props.part.topLeft}
          bottomRight={props.part.bottomRight}
          {...props}
        />
      ))}
      {Object.keys(props.part.points).map((name) => (
        <Point
          key={name}
          pointName={name}
          point={props.part.points[name]}
          topLeft={props.part.topLeft}
          bottomRight={props.part.bottomRight}
          {...props}
        />
      ))}
      {Object.keys(props.part.snippets).map((snippetName) => (
        <Snippet
          key={name}
          snippetName={snippetName}
          snippet={props.part.snippets[snippetName]}
          {...props}
        />
      ))}
      {focus}
    </g>
  )
}

export default Part
