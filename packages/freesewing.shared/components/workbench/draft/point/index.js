import Text from '../text'
import Circle from '../circle'

const Point = (props) => {
  const output = []
  if (props.point.attributes && props.point.attributes.get('data-text'))
    output.push(<Text {...props} key={'point-' + props.name} />)
  if (props.point.attributes && props.point.attributes.get('data-circle'))
    output.push(<Circle point={props.point} key={'circle-' + props.name} />)

  return output.length < 1 ? null : output
}

export default Point
