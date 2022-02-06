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

  /*
   * We need dangerouslySetInnerHTML here to make sure we have a way to
   * add whitespace that works both in the browser as in SVG.
   * Whitespace = &#160;
   */
  return (
    <text>
      <textPath {...textPathProps}>
        <tspan
          {...props.path.attributes.asPropsIfPrefixIs('data-text-')}
          dangerouslySetInnerHTML={{ __html: translated }}
        />
      </textPath>
    </text>
  )
}

export default TextOnPath
