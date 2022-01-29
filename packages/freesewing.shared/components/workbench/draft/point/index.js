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
      className="opacity-0 stroke-lining fill-lining hover:opacity-25 hover:cursor-pointer"
      onClick={() => props.updateGist(
        ['xray', 'parts', props.partName, 'points', props.pointName],
        props.point
      )}
    />
  </g>
)


const Point = props => {
  const { point, pointName } = props
  const output = []
  if (props.gist.xray) output.push(<XrayPoint {...props} key={'xp-' + pointName} />)
  if (point.attributes && point.attributes.get('data-text'))
    output.push(<Text {...props} key={'point-' + pointName} />)
  if (point.attributes && point.attributes.get('data-circle'))
    output.push(<Circle point={point} key={'circle-' + pointName} />)

  return output.length < 1 ? null : output
}

export default Point
