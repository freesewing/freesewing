// Components
import { Path as ShowPath, utils } from 'pkgs/react-components/src/index.mjs'
import { Attributes, pointCoords, KeyValTable } from './shared.mjs'
import { formatMm } from 'shared/utils.mjs'
import { TrashIcon, PrintIcon, SearchIcon } from 'shared/components/icons.mjs'

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

export const pathInfo = ({ id, pathName, stackName, path, inspector, t }) => {
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

  return {
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
      <button key={1} className="btn btn-error" onClick={() => inspector.hide(id)}>
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
            [t('attributes'), <Attributes list={path.attributes.list} key="a" />],
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
}

const InspectPath = ({ stackName, pathName, path, t, inspector }) => {
  const classes = path.attributes.list.class
  if (typeof classes === 'string' && classes.includes('skip-inspector')) return null
  const id = utils.getId({ stackName, pathName, settings: { idPrefix: 'path-' } })

  return (
    <g>
      <path
        d={path.d}
        {...utils.getProps(path)}
        className={`hover:opacity-20 text-primary hover:cursor-pointer ${
          inspector.data.reveal[id] ? 'pulse-stroke stroke-3xl' : 'opacity-0 stroko-0 stroke-5xl'
        }`}
        onClick={() => inspector.show(pathInfo({ id, pathName, stackName, path, t, inspector }))}
        markerStart="none"
        markerEnd="none"
      />
    </g>
  )
}

export const Path = ({ stackName, pathName, part, path, settings, components, t, inspector }) => (
  <>
    <InspectPath {...{ stackName, pathName, path, part, settings, t, inspector }} />
    <ShowPath {...{ stackName, pathName, path, part, settings, components, t }} />
  </>
)
