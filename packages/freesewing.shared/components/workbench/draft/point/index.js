import Text from '../text'
import Circle from '../circle'

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

const XrayPoint = props => (
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
      onClick={() => props.updateGist(
        ['xray', 'parts', props.partName, 'points', props.pointName],
        props.point
      )}
    />
  </g>
)


const Point = props => {
  const { point, pointName, partName, gist } = props
  const output = []
  if (gist.xray) output.push(<XrayPoint {...props} key={'xp-' + pointName} />)
  if (gist.xray?.reveal?.[partName]?.points?.[pointName])
    output.push(<RevealPoint {...props} key={'rp-' + pointName} />)
  if (point.attributes && point.attributes.get('data-text'))
    output.push(<Text {...props} key={'point-' + pointName} />)
  if (point.attributes && point.attributes.get('data-circle'))
    output.push(<Circle point={point} key={'circle-' + pointName} />)

  return output.length < 1 ? null : output
}

export default Point
