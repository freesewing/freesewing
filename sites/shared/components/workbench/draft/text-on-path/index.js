import { useTranslation } from 'next-i18next'
import { pathInfo } from '../path/index'

const XrayTextOnPath = props => (
    <tspan
      {...props.attr}
      dangerouslySetInnerHTML={{__html: props.translated}}
      className={`${props.attr.className} no-fill stroke-transparent stroke-4xl opacity-10 hover:cursor-pointer hover:stroke-secondary`}
      style={{strokeOpacity: 0.25}}
      onClick={(evt) => { evt.stopPropagation(); props.showInfo(pathInfo(props)) }}
    />
)

const TextOnPath = (props) => {
  const { t } = useTranslation(['app'])
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

  const attr = props.path.attributes.asPropsIfPrefixIs('data-text-')

  return (
    <text>
      <textPath {...textPathProps}>
        <tspan {...attr} dangerouslySetInnerHTML={{__html: translated}} />
      </textPath>
      {props.gist._state?.xray?.enabled && (
        <textPath {...textPathProps}>
          <XrayTextOnPath {...props} attr={attr} translated={translated}/>
        </textPath>
      )}
    </text>
  )
}

export default TextOnPath
