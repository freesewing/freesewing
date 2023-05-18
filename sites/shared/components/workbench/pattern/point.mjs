import { Text } from './text.mjs'
import { Circle } from './circle.mjs'
import { Tr, KeyTd, ValTd, Attributes, pointCoords } from './path.mjs'
import { withinPartBounds } from './utils.mjs'

const RevealPoint = ({ point, pointName, scale, part, partName, ui }) => {
  const r = 15 * scale
  const { x, y } = point
  const { topLeft, bottomRight } = part
  const i = Object.keys(ui.xray.reveal[partName].points).indexOf(pointName) % 10
  const classes = `stroke-sm stroke-color-${i} stroke-dashed`
  return (
    <g>
      <circle cx={x} cy={y} r={r} className={classes} />
      <path
        d={`
      M ${x} ${topLeft.y} L ${x} ${y - r}
      m 0 ${2 * r} L ${x} ${bottomRight.y}
      M ${topLeft.x} ${y} L ${x - r} ${y}
      m ${2 * r} 0 L ${bottomRight.x} ${y}`}
        className={classes}
      />
    </g>
  )
}
const pointInfo = ({ point, pointName, partName }) =>
  point ? (
    <div className="p-4 border bg-neutral bg-opacity-60 shadow rounded-lg">
      <h5 className="text-neutral-content text-center pb-4">Point info</h5>
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

const XrayPoint = ({ point, pointName, partName, scale, showInfo }) => (
  <g>
    <circle
      cx={point.x}
      cy={point.y}
      r={2 * scale}
      className="stroke-sm stroke-lining fill-lining fill-opacity-25"
    />
    <circle
      cx={point.x}
      cy={point.y}
      r={7.5 * scale}
      className="opacity-0 stroke-lining fill-lining hover:opacity-25 hover:cursor-pointer"
      onClick={(evt) => showInfo(evt, pointInfo({ point, pointName, partName }))}
    />
  </g>
)

export const Point = ({ point, pointName, partName, settings, part, ui, showInfo }) => {
  // Don't include parts outside the part bounding box
  if (!withinPartBounds(point, part)) return null
  const output = []
  if (ui.xray?.enabled) {
    // Xray for points
    output.push(
      <XrayPoint
        {...{ point, showInfo, pointName, partName }}
        scale={settings.scale}
        key={'xp-' + pointName}
      />
    )
    // Reveal (based on clicking the seach icon in sidebar
    if (ui.xray?.reveal?.[partName]?.points?.[pointName])
      output.push(<RevealPoint scale={settings.scale} key={'rp-' + pointName} />)
  }
  // Render text
  if (point.attributes && point.attributes.get('data-text'))
    output.push(
      <Text {...{ point, ui, pointName, partName, showInfo }} key={'point-' + pointName} />
    )
  // Render circle
  if (point.attributes && point.attributes.get('data-circle'))
    output.push(<Circle point={point} key={'circle-' + pointName} />)

  return output.length < 1 ? null : output
}
