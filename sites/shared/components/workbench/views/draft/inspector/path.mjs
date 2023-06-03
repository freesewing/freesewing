// Components
import { Path as ShowPath, utils } from 'pkgs/react-components/src/index.mjs'
import { Attributes, pointCoords, KeyValTable } from './shared.mjs'
import { round, formatMm } from 'shared/utils.mjs'
import { TrashIcon, PrintIcon, SearchIcon } from 'shared/components/icons.mjs'
import { Path as CorePath } from '@freesewing/core'

const { withinPartBounds, getId, getProps } = utils

const CpCircle = ({ point }) => (
  <circle cx={point.x} cy={point.y} r={2.5} className="stroke-contrast dotted stroke-sm no-fill" />
)

const EpCircle = ({ point }) => (
  <circle cx={point.x} cy={point.y} r={2.5} className="stroke-note no-fill stroke-sm" />
)

const InspectCurveOp = ({ op }) => {
  const from = op.ops[0].to
  const { cp1, cp2, to } = op.ops[1]

  return (
    <>
      <path d={`M ${from.x},${from.y} L ${cp1.x},${cp1.y}`} className="contrast dotted stroke-sm" />
      <path d={`M ${to.x},${to.y} L ${cp2.x},${cp2.y}`} className="contrast dotted stroke-sm" />
      <CpCircle point={cp1} />
      <CpCircle point={cp2} />
      <EpCircle point={from} />
      <EpCircle point={to} />
    </>
  )
}

const Op = ({ op, len, i }) => (
  <tr
    className={`${['move', 'close'].includes(op.type) ? 'text-base-300' : ''} bg-primary w-full ${
      i % 2 === 0 ? 'bg-opacity-0' : 'bg-opacity-10'
    }`}
  >
    <td className="text-right px-1">{op.type}</td>
    <td className="text-center px-1">{pointCoords(op.to)}</td>
    <td className="text-center px-1">{op.cp1 ? pointCoords(op.cp1) : ''}</td>
    <td className="text-center px-1">{op.cp2 ? pointCoords(op.cp2) : ''}</td>
    <td className="text-center px-1">{len ? formatMm(len) : ''}</td>
  </tr>
)

const Ops = ({ ops, path }) => (
  <table className="text-sm border-collapse h-fit border w-full border-primary shadow">
    <thead className="bg-primary bg-opacity-30">
      <th className="text-right">Type</th>
      <th>To</th>
      <th>Cp1</th>
      <th>Cp2</th>
      <th>Length</th>
    </thead>
    <tbody>
      {path.ops.map((op, i) => {
        const len = typeof ops[i - 1] === 'undefined' ? 0 : ops[i - 1].length
        return <Op op={op} key={i} i={i} len={len} />
      })}
    </tbody>
  </table>
)

const RevealPath = ({ path, pathName, id, inspector }) => (
  <path d={path.d} className="stroke-3xl text-warning pulse-stroke" />
)

const InspectOp = ({ stackName, pathName, op, i, inspector, t, path }) => {
  const id = utils.getId({ stackName, pathName, settings: { idPrefix: `pathOp-${i}-` } })
  const info = {
    id,
    title: (
      <div className="flex flex-row justify-between w-full">
        <span>
          <b className="capitalize">{op.ops[1].type}</b>: {pathName} | {stackName}
        </span>
      </div>
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
          console.log(op)
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
          ['Type', op.ops[1].type],
          ['Path', pathName],
          ['Stack', stackName],
          [t('topLeft'), pointCoords(op.topLeft)],
          [t('bottomRight'), pointCoords(op.bottomRight)],
          [t('width'), formatMm(op.width)],
          [t('height'), formatMm(op.height)],
          [t('length'), formatMm(op.length)],
        ]}
      />
    ),
    color: 'secondary',
  }

  return (
    <>
      {inspector.data.reveal[id] ? (
        <path d={op.d} className="stroke-3xl text-warning pulse-stroke" />
      ) : null}
      {op.ops[1].type === 'curve' ? <InspectCurveOp op={op} /> : null}
      <path
        d={op.d}
        className="opacity-0 stroke-3xl text-secondary hover:opacity-25 hover:cursor-pointer"
        onClick={(evt) => inspector.show(info)}
      />
    </>
  )
}

const InspectPath = ({ stackName, pathName, path, part, settings, t, inspector }) => {
  const classes = path.attributes.list.class
  if (typeof classes === 'string' && classes.includes('skip-inspector')) return null

  // Pull the instantiated path from the pattern
  const pathObj = [...inspector.pattern.stacks[stackName].parts][0].paths[pathName]
  const ops = pathObj.divide().map((p) => {
    const result = p.asRenderProps()
    result.length = p.length()
    const bbox = p.bbox()

    return {
      ...result,
      ...bbox,
      width: bbox.bottomRight.x - bbox.topLeft.x,
      height: bbox.bottomRight.y - bbox.topLeft.y,
    }
  })

  const id = utils.getId({ stackName, pathName, settings: { idPrefix: 'path-' } })
  const info = {
    id,
    title: (
      <div className="flex flex-row justify-between w-full">
        <span>
          <b>Path</b>: {pathName} | {stackName}
        </span>
        {path.ops.length} ops
      </div>
    ),
    openTitle: (
      <span>
        <b>Path</b>: {pathName} | {stackName}
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
          console.log(path)
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
      <>
        <KeyValTable
          rows={[
            [t('name'), pathName],
            ['Stack', stackName],
            [t('attributes'), <Attributes list={path.attributes.list} />],
            [t('topLeft'), pointCoords(path.topLeft)],
            [t('bottomRight'), pointCoords(path.bottomRight)],
            [t('width'), formatMm(path.width)],
            [t('height'), formatMm(path.height)],
            [t('length'), formatMm(pathObj.length())],
          ]}
        />
        <Ops ops={ops} path={path} />
      </>
    ),
    color: 'primary',
  }

  return (
    <g>
      {inspector.data.reveal[id] ? (
        <path d={path.d} className="stroke-3xl text-warning pulse-stroke" />
      ) : null}
      <path
        d={path.d}
        {...getProps(path)}
        className="opacity-0 stroke-5xl text-primary hover:opacity-25 hover:cursor-pointer"
        onClick={(evt) => inspector.show(info)}
        markerStart="none"
        markerEnd="none"
      />
      {ops.map((op, i) => (
        <InspectOp key={i} {...{ i, op, t, path, stackName, pathName, inspector }} />
      ))}
    </g>
  )
}

export const Path = ({
  stackName,
  pathName,
  part,
  path,
  settings,
  components,
  t,
  ui,
  update,
  inspector,
}) => (
  <>
    <ShowPath {...{ stackName, pathName, path, part, settings, components, t }} />
    <InspectPath {...{ stackName, pathName, path, part, settings, t, inspector }} />
  </>
)
