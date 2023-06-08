// Components
import { Point as ShowPoint, utils } from 'pkgs/react-components/src/index.mjs'
import { Attributes, pointCoords, KeyValTable } from './shared.mjs'
import { TrashIcon, PrintIcon, SearchIcon } from 'shared/components/icons.mjs'

const RevealPoint = ({ point, scale, part, id, inspector }) => {
  const r = 15 * scale
  const { x, y } = point
  const { topLeft, bottomRight } = part
  const classes = `stroke-sm stroke-contrast`
  return (
    <g>
      <circle
        cx={x}
        cy={y}
        r={r}
        className={`${classes} fill-contrast pulse-fill hover:cursor-pointer`}
        onClick={() => inspector.reveal(id)}
      />
      <path
        d={`
      M ${x} ${topLeft.y} L ${x} ${y - r}
      m 0 ${2 * r} L ${x} ${bottomRight.y}
      M ${topLeft.x} ${y} L ${x - r} ${y}
      m ${2 * r} 0 L ${bottomRight.x} ${y}`}
        className={`stroke-xl stroke-contrast lashed opacity-30`}
      />
    </g>
  )
}

const Cross = ({ point, color = 'primary' }) => (
  <path
    d={`M ${point.x - 1.5},${point.y - 1.5} l 3,3 m -3,0 l 3,-3`}
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
  color = 'contrast',
}) => {
  const id = utils.getId({ stackName, pointName, settings: { idPrefix: 'point-' } })

  return (
    <g>
      <Cross {...{ point, color }} />
      <circle
        cx={point.x}
        cy={point.y}
        r={5 * scale}
        className={`opacity-0 stroke-${color} fill-${color} hover:opacity-25 hover:cursor-pointer hover:opacity-30`}
        onClick={() => inspector.show(pointInfo({ id, stackName, pointName, point, inspector, t }))}
      />
      <circle
        cx={point.x}
        cy={point.y}
        r={2 * scale}
        className={`stroke-sm hover:stroke-3xl stroke-${color}`}
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
  if (!utils.withinPartBounds(point, part)) return null

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
