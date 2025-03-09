// eslint-disable-next-line no-unused-vars
import React from 'react'
import { translateStrings } from './utils.mjs'

export const TextSpans = ({ point, strings }) => {
  const translated = translateStrings(point.attributes.list['data-text'], strings)
  console.log({ translated, strings })
  const text = []
  if (translated.indexOf('\n') !== -1) {
    // Handle muti-line text
    let key = 0
    let lines = translated.split('\n')
    text.push(<tspan key={'tspan-' + key}>{lines.shift()}</tspan>)
    for (let line of lines) {
      key++
      text.push(
        <tspan
          key={'tspan-' + key}
          x={point.x}
          dy={point.attributes.list['data-text-lineheight']?.[0] || 12}
        >
          {line.toString().replace(/&quot;/g, '"')}
        </tspan>
      )
    }
  } else text.push(<tspan key="tspan">{translated}</tspan>)

  return text
}

export const Text = ({ point, strings }) => (
  <text x={point.x} y={point.y} {...point.attributes.textProps}>
    <TextSpans point={point} strings={strings} />
  </text>
)

export const TextOnPath = ({ path, pathId, strings }) => {
  const textPathProps = {
    xlinkHref: '#' + pathId,
    startOffset: '0%',
  }
  const translated = translateStrings(path.attributes.text, strings)
  const align = path.attributes.list['data-text-class']
    ? path.attributes.list['data-text-class'].join(' ')
    : false
  if (align && align.indexOf('center') > -1) textPathProps.startOffset = '50%'
  else if (align && align.indexOf('right') > -1) textPathProps.startOffset = '100%'

  return (
    <text>
      <textPath {...textPathProps}>
        <tspan {...path.attributes.textProps} dangerouslySetInnerHTML={{ __html: translated }} />
      </textPath>
    </text>
  )
}
