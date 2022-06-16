const Circle = (props) => (
  <circle
    cx={props.point.x}
    cy={props.point.y}
    r={props.point.attributes.get('data-circle')}
    {...props.point.attributes.asPropsIfPrefixIs('data-circle-')}
  />
)

export default Circle
