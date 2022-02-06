import Text from '../text'
import Circle from '../circle'
import { round, formatMm } from 'shared/utils.js'

const RevealPoint = props => {
  const r = 15 * props.gist.scale
  const { x, y } = props.point
  const { topLeft, bottomRight } = props.part
  const i = Object.keys(props.gist.xray.reveal[props.partName].points).indexOf(props.pointName)%10
  const classes = `stroke-sm stroke-color-${i} stroke-dashed`
  return (
    <g>
      <circle
        cx={x}
        cy={y}
        r={r}
        className={classes}
    />
    <path d={`
      M ${x} ${topLeft.y} L ${x} ${y - r}
      m 0 ${2*r} L ${x} ${bottomRight.y}
      M ${topLeft.x} ${y} L ${x - r} ${y}
      m ${2*r} 0 L ${bottomRight.x} ${y}`} className={classes} />
    </g>
  )
}

// Length for the indicators
const lead = 20
// Length for the text on indicators
// this is longer to prevent text from being cropped
const longLead = 40

const Coord = ({id, val, pointName}) => (
  <text>
    <textPath xlinkHref={`#${id}`} startOffset="50%">
      <tspan className="center fill-note text-sm" dy={0}>
        {round(val)}
      </tspan>
    </textPath>
    <textPath xlinkHref={`#${id}`} startOffset="50%">
      <tspan className="center fill-note text-xs" dy={5}>
        {pointName}
      </tspan>
    </textPath>
  </text>
)

const PosX = ({ id, point, scale, pointName }) => (
  <g>
    <path id={id+'_x'} d={`
      M ${point.x - (point.x < 0 ? 0 : lead*scale)} ${point.y}
      l ${lead * scale} 0
    `}
      className="stroke-note stroke-sm"
      markerStart={point.x < 0 ? "url(#grainlineFrom)" : ''}
      markerEnd={point.x < 0 ? '' : "url(#grainlineTo)"}
    />
    <path id={id+'_xlong'} d={`
      M ${point.x - (point.x < 0 ? longLead/2.4*scale : longLead*scale)} ${point.y}
      l ${longLead * scale * 1.4} 0
    `}
      className="hidden"
    />
    <Coord id={`${id}_xlong`} val={point.x} pointName={pointName}/>
  </g>
)


const PosY = ({ id, point, scale, pointName }) => (
  <g>
    <path id={id+'_y'} d={`
      M ${point.x} ${point.y + (point.y < 0 ? lead*scale : 0)}
      l 0 ${lead * scale * -1}
    `}
      className="stroke-note stroke-sm"
      markerStart={point.y < 0 ? '' : "url(#grainlineFrom)"}
      markerEnd={point.y < 0 ? "url(#grainlineTo)" : ''}
    />
    <path id={id+'_ylong'} d={`
      M ${point.x} ${point.y + (point.y < 0 ? longLead/1.25*scale : longLead*scale/5)}
      l 0 ${longLead * scale * -1}
    `}
      className="hidden"
    />
    <Coord id={`${id}_ylong`} val={point.y} pointName={pointName} />
  </g>
)


const ActiveXrayPoint = props => {
  const id = `${props.partName}_${props.pointName}_xray_point`
  const r = 15 * props.gist.scale
  const { x, y } = props.point
  const { topLeft, bottomRight } = props.part
  const i = Object.keys(props.gist.xray.parts[props.partName].points).indexOf(props.pointName)%10
  const classes = `stroke-sm stroke-color-${i} stroke-dashed`
  const posProps = {
    id,
    point: props.point,
    pointName: props.pointName,
    scale: props.gist.scale,
  }

  return <g><PosX {...posProps} /><PosY {...posProps} /></g>
}

const PassiveXrayPoint = props => (
  <g>
    <circle
      cx={props.point.x}
      cy={props.point.y}
      r={2 * props.gist.scale}
      className="stroke-sm stroke-lining fill-lining fill-opacity-25" />
    <circle
      cx={props.point.x}
      cy={props.point.y}
      r={7.5 * props.gist.scale}
      className="opacity-0 stroke-lining fill-lining hover:opacity-25 hover:cursor-pointer"
      onClick={props.gist?.xray?.parts?.[props.partName]?.points?.[props.pointName]
        ? () => props.unsetGist(
          ['xray', 'parts', props.partName, 'points', props.pointName]
        )
        : () => props.updateGist(
          ['xray', 'parts', props.partName, 'points', props.pointName],
          1
        )
      }
    />
  </g>
)


const Point = props => {
  const { point, pointName, partName, gist } = props
  const output = []
  // Passive indication for points
  if (gist.xray) output.push(<PassiveXrayPoint {...props} key={'xp-' + pointName} />)
  // Active indication for points (point that have been clicked on)
  if (gist.xray?.parts?.[partName]?.points?.[pointName])
    output.push(<ActiveXrayPoint {...props} key={'rp-' + pointName} />)
  // Reveal (based on clicking the seach icon in sidebar
  if (gist.xray?.reveal?.[partName]?.points?.[pointName])
    output.push(<RevealPoint {...props} key={'rp-' + pointName} />)
  // Render text
  if (point.attributes && point.attributes.get('data-text'))
    output.push(<Text {...props} key={'point-' + pointName} />)
  // Render circle
  if (point.attributes && point.attributes.get('data-circle'))
    output.push(<Circle point={point} key={'circle-' + pointName} />)

  return output.length < 1 ? null : output
}

export default Point
