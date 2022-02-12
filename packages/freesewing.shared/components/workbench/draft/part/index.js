import Path from '../path'
import Point from '../point'
import Snippet from '../snippet'
import { getProps } from '../utils'

const XrayPart = props => {
  // Don't bother if this is the only part on display
  if (props.gist.only && props.gist.only.length === 1) return null
  const i = props.gist.xray?.reveal
    ? Object.keys(props.gist.xray?.reveal).indexOf(props.partName)%10
    : 0
  const { topLeft, bottomRight } = props.part

  return (
    <g>
      <path d={`
        M ${topLeft.x} ${topLeft.y}
        L ${topLeft.x} ${bottomRight.y}
        L ${bottomRight.x} ${bottomRight.y}
        L ${bottomRight.x} ${topLeft.y}
        z`} className={`fill-color-${i} opacity-10`} />
    </g>
  )
}

const Part = props => {
  const { partName, part, app, gist, updateGist } = props

  const grid = gist.paperless ? (
    <rect
      x={part.topLeft.x}
      y={part.topLeft.y}
      width={part.width}
      height={part.height}
      className="grid"
      fill={'url(#grid-' + partName + ')'}
    />
  ) : null

  return (
    <g {...getProps(part)} id={`part-${partName}`}>
      {grid}
      {props.gist?.xray?.reveal?.[partName] && <XrayPart {...props} />}
      {Object.keys(part.paths).map((pathName) => (
        <Path
          key={pathName}
          pathName={pathName}
          path={part.paths[pathName]}
          topLeft={props.part.topLeft}
          bottomRight={props.part.bottomRight}
          {...props}
        />
      ))}
      {Object.keys(props.part.points).map((pointName) => (
        <Point
          key={pointName}
          pointName={pointName}
          point={props.part.points[pointName]}
          topLeft={props.part.topLeft}
          bottomRight={props.part.bottomRight}
          {...props}
        />
      ))}
      {Object.keys(props.part.snippets).map((snippetName) => (
        <Snippet
          key={snippetName}
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
