// Components
import { Point as ShowPoint, Text, Circle, utils } from 'pkgs/react-components/src/index.mjs'
import { Attributes, pointCoords, KeyValTable } from './shared.mjs'
import { round } from 'shared/utils.mjs'
import { TrashIcon, PrintIcon, SearchIcon } from 'shared/components/icons.mjs'

const { withinPartBounds, getId, getProps } = utils

const RevealPoint = ({ point, pointName, scale, part, id, inspector }) => {
  const r = 15 * scale
  const { x, y } = point
  const { topLeft, bottomRight } = part
  const classes = `stroke-sm stroke-lining`
  return (
    <g>
      <circle
        cx={x}
        cy={y}
        r={r}
        className={`${classes} fill-lining pulse-fill hover:cursor-pointer`}
        onClick={() => inspector.reveal(id)}
      />
      <path
        d={`
      M ${x} ${topLeft.y} L ${x} ${y - r}
      m 0 ${2 * r} L ${x} ${bottomRight.y}
      M ${topLeft.x} ${y} L ${x - r} ${y}
      m ${2 * r} 0 L ${bottomRight.x} ${y}`}
        className={`${classes} lashed`}
      />
    </g>
  )
}

const Cross = ({ point, color = 'primary' }) => (
  <path
    d={`M ${point.x - 2},${point.y - 2} l 4,4 m -4,0 l 4,-4`}
    className={`stroke-xs ${color}`}
  />
)

export const pointInfo = ({ id, pointName, stackName, point, inspector, t }) => ({
  id,
  title: (
    <div className="flex flex-row justify-between w-full">
      <span>
        <b>Point</b>: {pointName} | {stackName}
      </span>
      {pointCoords(point)}
    </div>
  ),
  openTitle: (
    <span>
      <b>Point</b>: {pointName} | {stackName}
    </span>
  ),
  buttons: [
    <button key={1} className="btn btn-error" onClick={(evt) => inspector.hide(id)}>
      <TrashIcon />
    </button>,
  ],
  openButtons: [
    <button
      className="btn btn-xs btn-ghost px-0"
      key="log"
      onClick={(evt) => {
        evt.stopPropagation()
        console.log(point)
      }}
    >
      <PrintIcon className="w-4 h-4" />
    </button>,
    <button
      className="btn btn-xs btn-ghost px-0"
      key="reveal"
      onClick={(evt) => {
        evt.stopPropagation()
        inspector.reveal(id)
      }}
    >
      <SearchIcon className="w-4 h-4" />
    </button>,
    <button
      className="btn btn-xs btn-ghost px-0"
      key="remove"
      onClick={(evt) => {
        evt.stopPropagation()
        inspector.hide(id)
      }}
    >
      <TrashIcon className="w-4 h-4" />
    </button>,
  ],
  children: (
    <KeyValTable
      rows={[
        [t('coordinates'), pointCoords(point)],
        [t('name'), pointName],
        ['Stack', stackName],
        [t('attributes'), <Attributes list={point.attributes.list} />],
        ['id', id],
      ]}
    />
  ),
  color: 'accent',
})

const InspectPoint = ({
  point,
  part,
  pointName,
  stackName,
  scale = 1,
  t,
  inspector,
  color = 'lining',
}) => {
  const id = utils.getId({ stackName, pointName, settings: { idPrefix: 'point-' } })

  return (
    <g>
      <circle cx={point.x} cy={point.y} r={2 * scale} className={`stroke-xs stroke-${color}`} />
      <circle
        cx={point.x}
        cy={point.y}
        r={2 * scale}
        className={`stroke-xs fill-${color} opacity-10`}
      />
      <Cross {...{ point, color }} />
      <circle
        cx={point.x}
        cy={point.y}
        r={5 * scale}
        className={`opacity-0 stroke-${color} fill-${color} hover:opacity-25 hover:cursor-pointer hover:opacity-30`}
        onClick={(evt) =>
          inspector.show(pointInfo({ id, stackName, pointName, point, inspector, t }))
        }
      />
      {inspector.data.reveal[id] ? (
        <RevealPoint {...{ point, pointName, scale, part, id, inspector }} />
      ) : null}
    </g>
  )
}

export const Point = ({
  stackName,
  pointName,
  part,
  point,
  settings,
  components,
  t,
  ui,
  update,
  inspector,
}) => {
  // Don't include parts outside the part bounding box
  if (!withinPartBounds(point, part)) return null

  return (
    <>
      <ShowPoint {...{ stackName, pointName, part, point, settings, components, t }} />
      <InspectPoint
        {...{ point, pointName, stackName, inspector, t, part }}
        scale={settings.scale}
      />
    </>
  )
}
