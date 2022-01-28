import Text from '../text'
import Circle from '../circle'

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
      className="fillhovertrap"
      onClick={() => props.updateGist(
        ['xray', parts, 'props.partName', 'points', props.name],
        props.point
      )}
    />
  </g>
)


const Point = props => {
  const { point, name } = props
  const output = []
  if (props.gist.xray) output.push(<XrayPoint {...props} key={'xp-' + props.name} />)
  if (point.attributes && point.attributes.get('data-text'))
    output.push(<Text {...props} key={'point-' + name} />)
  if (point.attributes && point.attributes.get('data-circle'))
    output.push(<Circle point={point} key={'circle-' + name} />)

  return output.length < 1 ? null : output
}

export default Point
