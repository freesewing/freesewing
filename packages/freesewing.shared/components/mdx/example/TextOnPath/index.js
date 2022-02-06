import React from 'react'
import { strings } from '@freesewing/i18n'

const TextOnPath = (props) => {
  let text = []
  // Handle translation
  let translated = ''
  for (let string of props.path.attributes.getAsArray('data-text')) {
    if (strings[props.language]['plugin.' + string])
      translated += strings[props.language]['plugin.' + string]
    else translated += string.toString().replace(/&quot;/g, '"')
    translated += ' '
  }
  let textPathProps = {
    xlinkHref: '#' + props.pathId,
    startOffset: '0%'
  }
  let align = props.path.attributes.get('data-text-class')
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
