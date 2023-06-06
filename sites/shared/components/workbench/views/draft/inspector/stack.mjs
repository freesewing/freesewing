import { Stack as ShowStack, utils } from 'pkgs/react-components/src/index.mjs'
import { Attributes, pointCoords, KeyValTable, PathBanner, bboxD } from './shared.mjs'
import { TrashIcon, PrintIcon, SearchIcon } from 'shared/components/icons.mjs'
import { formatMm } from 'shared/utils.mjs'

const { getId } = utils

export const stackInfo = ({ stackName, stack, inspector, id, t }) => ({
  id,
  title: (
    <div className="flex flex-row justify-between w-full">
      <span>
        <b className="capitalize">Stack</b>: {stackName}
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
        console.log(stack)
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
        ['Stack', stackName],
        [t('topLeft'), pointCoords(stack.topLeft)],
        [t('bottomRight'), pointCoords(stack.bottomRight)],
        [t('width'), formatMm(stack.width)],
        [t('height'), formatMm(stack.height)],
      ]}
    />
  ),
  color: 'secondary',
})

export const InspectStack = ({ stackName, stack, settings, t, inspector }) => {
  const id = utils.getId({ stackName, settings: { idPrefix: `stack-` } })
  const d = bboxD({ ...stack })

  return (
    <g transform={stack.attributes.list.transform[0]}>
      {inspector.data.reveal[id] ? (
        <path d={d} className="stroke-3xl text-warning pulse-stroke" />
      ) : null}
      <path
        d={d}
        id={id}
        className={`stroke-note lashed opacity-30 fill-fabric hover:opacity-90 hover:cursor-pointer hover:stroke-mark hover:stroke-3xl`}
        style={{ fillOpacity: 0 }}
        onClick={(evt) => inspector.show(stackInfo({ stackName, stack, inspector, id, t }))}
      />
      <PathBanner id={id} text={stackName} />
    </g>
  )
}

export const Stack = ({ stackName, stack, settings, components, t, inspector }) => (
  <>
    <InspectStack {...{ stackName, stack, settings, components, t, inspector }} />
    <ShowStack {...{ stackName, stack, settings, components, t }} />
  </>
)
