import { useTranslation } from 'next-i18next'

const TextOnPath = (props) => {
  const { t } = useTranslation(['app'])
  const text = []
  // Handle translation (and spaces)
  let translated = ''
  for (let string of props.path.attributes.getAsArray('data-text')) {
    translated += t(string).replace(/&quot;/g, '"') + ' '
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
        <tspan
          {...props.path.attributes.asPropsIfPrefixIs('data-text-')}
          dangerouslySetInnerHTML={{__html: translated}}
        />
      </textPath>
    </text>
  )
}

export default TextOnPath
