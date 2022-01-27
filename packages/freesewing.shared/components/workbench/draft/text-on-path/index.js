const TextOnPath = (props) => {
  const text = []
  // Handle translation
  let translated = ''
  for (let string of props.path.attributes.getAsArray('data-text')) {
    translated += props.app.t(string, false, props.locale).replace(/&quot;/g, '"') + ' '
  }
  const textPathProps = {
    xlinkHref: '#' + props.pathId,
    startOffset: '0%'
  }
  const align = props.path.attributes.get('data-text-class')
  if (align && align.indexOf('center') > -1) textPathProps.startOffset = '50%'
  else if (align && align.indexOf('right') > -1) textPathProps.startOffset = '100%'

  return (
    <text>
      <textPath {...textPathProps}>
        <tspan {...props.path.attributes.asPropsIfPrefixIs('data-text-')}>{translated}</tspan>
      </textPath>
    </text>
  )
}

export default TextOnPath
