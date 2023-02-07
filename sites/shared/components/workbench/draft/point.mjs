import { Text } from './text.mjs'
import { Circle } from './circle.mjs'
import { Tr, KeyTd, ValTd, Attributes, pointCoords } from './path.mjs'
import { withinPartBounds } from './utils.mjs'

const RevealPoint = (props) => {
  const r = 15 * props.gist.scale
  const { x, y } = props.point
  const { topLeft, bottomRight } = props.part
  const i =
    Object.keys(props.gist._state.xray.reveal[props.partName].points).indexOf(props.pointName) % 10
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
const pointInfo = (props) =>
  props.point ? (
    <div className="p-4 border bg-neutral bg-opacity-60 shadow rounded-lg">
      <h5 className="text-neutral-content text-center pb-4">Point info</h5>
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

const XrayPoint = (props) => (
  <g>
    <circle
      cx={props.point.x}
      cy={props.point.y}
      r={2 * props.gist.scale}
      className="stroke-sm stroke-lining fill-lining fill-opacity-25"
    />
    <circle
      cx={props.point.x}
      cy={props.point.y}
      r={7.5 * props.gist.scale}
      className="opacity-0 stroke-lining fill-lining hover:opacity-25 hover:cursor-pointer"
      onClick={(evt) => {
        props.showInfo(pointInfo(props))
        evt.stopPropagation()
      }}
    />
  </g>
)

export const Point = (props) => {
  const { point, pointName, partName, gist, part } = props
  // Don't include parts outside the part bounding box
  if (!withinPartBounds(point, part)) return null
  const output = []
  if (gist._state?.xray?.enabled) {
    // Xray for points
    output.push(<XrayPoint {...props} key={'xp-' + pointName} />)
    // Reveal (based on clicking the seach icon in sidebar
    if (gist._state?.xray?.reveal?.[partName]?.points?.[pointName])
      output.push(<RevealPoint {...props} key={'rp-' + pointName} />)
  }
  // Render text
  if (point.attributes && point.attributes.get('data-text'))
    output.push(<Text {...props} key={'point-' + pointName} />)
  // Render circle
  if (point.attributes && point.attributes.get('data-circle'))
    output.push(<Circle point={point} key={'circle-' + pointName} />)

  return output.length < 1 ? null : output
}
