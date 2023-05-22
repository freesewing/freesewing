export const Circle = (props) =>
  props.point.attributes.getAsArray('data-circle').map((r, i) => {
    const circleProps = props.point.attributes.asPropsIfPrefixIs('data-circle-')
    const extraProps = {}
    for (const prop in circleProps) {
      const val = props.point.attributes.getAsArray(
        `data-circle-${prop === 'className' ? 'class' : prop}`
      )
      if (val.length >= i) extraProps[prop] = val[i]
      else extraProps[prop] = val.join(' ')
    }

    return <circle key={r} cx={props.point.x} cy={props.point.y} r={r} {...extraProps} />
  })
