import { useTranslation } from 'next-i18next'
import { Tr, KeyTd, ValTd, Attributes, pointCoords, pathInfo } from './path.mjs'

const textInfo = (props) =>
  props.point ? (
    <div className="p-4 border bg-neutral bg-opacity-60 shadow rounded-lg">
      <h5 className="text-neutral-content text-center pb-4">Text info</h5>
      <table className="border-collapse h-fit">
        <tbody>
          <Tr>
            <KeyTd>Coordinates</KeyTd>
            <ValTd>{pointCoords(props.point)}</ValTd>
          </Tr>
          <Tr>
            <KeyTd>Name</KeyTd>
            <ValTd>{props.pointName}</ValTd>
          </Tr>
          <Tr>
            <KeyTd>Part</KeyTd>
            <ValTd>{props.partName}</ValTd>
          </Tr>
          <Tr>
            <KeyTd>Attributes</KeyTd>
            <ValTd>
              <Attributes list={props.point.attributes.list} />
            </ValTd>
          </Tr>
        </tbody>
      </table>
      <div className="flex flex-col flex-wrap gap-2 mt-4">
        <button className="btn btn-success" onClick={() => console.log(props.point)}>
          console.log(point)
        </button>
        <button className="btn btn-success" onClick={() => console.table(props.point)}>
          console.table(point)
        </button>
      </div>
    </div>
  ) : null

const XrayText = (props) => (
  <text x={props.point.x} y={props.point.y} {...props.attr}>
    <TextSpans
      {...props}
      className="stroke-transparent stroke-4xl opacity-10 hover:cursor-pointer hover:stroke-secondary"
      style={{ strokeOpacity: 0.25 }}
      onClick={(evt) => {
        evt.stopPropagation()
        props.showInfo(textInfo(props))
      }}
    />
  </text>
)

const TextSpans = ({ point, className = '', style = {}, onClick = null }) => {
  const { t } = useTranslation(['plugin'])
  let text = []
  // Handle translation
  let translated = ''
  for (const string of point.attributes.getAsArray('data-text')) {
    if (string) translated += t(string.toString()).replace(/&quot;/g, '"') + ' '
  }
  // Handle muti-line text
  if (translated.indexOf('\n') !== -1) {
    let key = 0
    let lines = translated.split('\n')
    text.push(<tspan key={'tspan-' + key}>{lines.shift()}</tspan>)
    for (let line of lines) {
      key++
      text.push(
        <tspan
          key={'tspan-' + key}
          x={point.x}
          dy={point.attributes.get('data-text-lineheight') || 12}
          className={className}
          style={style}
          onClick={onClick}
        >
          {line.toString().replace(/&quot;/g, '"')}
        </tspan>
      )
    }
  } else
    text.push(
      <tspan key="tspan-1" className={className} style={style} onClick={onClick}>
        {translated}
      </tspan>
    )

  return text
}

export const Text = (props) => {
  const attr = props.point.attributes.asPropsIfPrefixIs('data-text-')

  return (
    <>
      <text x={props.point.x} y={props.point.y} {...attr}>
        <TextSpans {...props} />
      </text>
      {props.gist._state?.xray?.enabled && <XrayText {...props} attr={attr} />}
    </>
  )
}

const XrayTextOnPath = (props) => (
  <tspan
    {...props.attr}
    dangerouslySetInnerHTML={{ __html: props.translated }}
    className={`${props.attr.className} no-fill stroke-transparent stroke-4xl opacity-10 hover:cursor-pointer hover:stroke-secondary`}
    style={{ strokeOpacity: 0.25 }}
    onClick={(evt) => {
      evt.stopPropagation()
      props.showInfo(pathInfo(props))
    }}
  />
)

export const TextOnPath = (props) => {
  const { t } = useTranslation(['plugin'])
  // Handle translation (and spaces)
  let translated = ''
  for (let string of props.path.attributes.getAsArray('data-text')) {
    translated += t(string).replace(/&quot;/g, '"') + ' '
  }
  const textPathProps = {
    xlinkHref: '#' + props.pathId,
    startOffset: '0%',
  }
  const align = props.path.attributes.get('data-text-class')
  if (align && align.indexOf('center') > -1) textPathProps.startOffset = '50%'
  else if (align && align.indexOf('right') > -1) textPathProps.startOffset = '100%'

  const attr = props.path.attributes.asPropsIfPrefixIs('data-text-')

  return (
    <text>
      <textPath {...textPathProps}>
        <tspan {...attr} dangerouslySetInnerHTML={{ __html: translated }} />
      </textPath>
      {props.gist._state?.xray?.enabled && (
        <textPath {...textPathProps}>
          <XrayTextOnPath {...props} attr={attr} translated={translated} />
        </textPath>
      )}
    </text>
  )
}
