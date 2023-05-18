import { useTranslation } from 'next-i18next'
import { Tr, KeyTd, ValTd, Attributes, pointCoords, pathInfo } from './path.mjs'

const textInfo = ({ point, pointName, partName }) =>
  point ? (
    <div className="p-4 border bg-neutral bg-opacity-60 shadow rounded-lg">
      <h5 className="text-neutral-content text-center pb-4">Text info</h5>
      <table className="border-collapse h-fit">
        <tbody>
          <Tr>
            <KeyTd>Coordinates</KeyTd>
            <ValTd>{pointCoords(point)}</ValTd>
          </Tr>
          <Tr>
            <KeyTd>Name</KeyTd>
            <ValTd>{pointName}</ValTd>
          </Tr>
          <Tr>
            <KeyTd>Part</KeyTd>
            <ValTd>{partName}</ValTd>
          </Tr>
          <Tr>
            <KeyTd>Attributes</KeyTd>
            <ValTd>
              <Attributes list={point.attributes.list} />
            </ValTd>
          </Tr>
        </tbody>
      </table>
      <div className="flex flex-col flex-wrap gap-2 mt-4">
        <button className="btn btn-success" onClick={() => console.log(point)}>
          console.log(point)
        </button>
        <button className="btn btn-success" onClick={() => console.table(point)}>
          console.table(point)
        </button>
      </div>
    </div>
  ) : null

const XrayText = ({ point, pointName, partName, attr, showInfo }) => (
  <text x={point.x} y={point.y} {...attr}>
    <TextSpans
      className="stroke-transparent stroke-4xl opacity-10 hover:cursor-pointer hover:stroke-secondary"
      style={{ strokeOpacity: 0.25 }}
      onClick={(evt) => showInfo(evt, textInfo({ point, pointName, partName }))}
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

export const Text = ({ point, ui, pointName, partName, showInfo }) => {
  const attr = point.attributes.asPropsIfPrefixIs('data-text-')

  return (
    <>
      <text x={point.x} y={point.y} {...attr}>
        <TextSpans point={point} />
      </text>
      {ui.xray?.enabled && <XrayText {...{ points, pointName, partName, attr, showInfo }} />}
    </>
  )
}

const XrayTextOnPath = ({ pathId, path, partName, attr, translated, units, showInfo }) => (
  <tspan
    {...attr}
    dangerouslySetInnerHTML={{ __html: translated }}
    className={`${attr.className} no-fill stroke-transparent stroke-4xl opacity-10 hover:cursor-pointer hover:stroke-secondary`}
    style={{ strokeOpacity: 0.25 }}
    onClick={(evt) => showInfo(evt, pathInfo({ pathId, path, partName, units, showInfo }))}
  />
)

export const TextOnPath = ({ path, pathId, ui, showInfo }) => {
  const { t } = useTranslation(['plugin'])
  // Handle translation (and spaces)
  let translated = ''
  for (let string of path.attributes.getAsArray('data-text')) {
    translated += t(string).replace(/&quot;/g, '"') + ' '
  }
  const textPathProps = {
    xlinkHref: '#' + pathId,
    startOffset: '0%',
  }
  const align = path.attributes.get('data-text-class')
  if (align && align.indexOf('center') > -1) textPathProps.startOffset = '50%'
  else if (align && align.indexOf('right') > -1) textPathProps.startOffset = '100%'

  const attr = path.attributes.asPropsIfPrefixIs('data-text-')

  return (
    <text>
      <textPath {...textPathProps}>
        <tspan {...attr} dangerouslySetInnerHTML={{ __html: translated }} />
      </textPath>
      {ui.xray?.enabled && (
        <textPath {...textPathProps}>
          <XrayTextOnPath {...{ pathId, path, partName, units, showInfo, attr, translated }} />
        </textPath>
      )}
    </text>
  )
}
