import { Stack as ShowStack, utils } from 'pkgs/react-components/src/index.mjs'
import { Attributes, pointCoords, KeyValTable } from './shared.mjs'
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

  const reveal = inspector.data.reveal[id] ? true : false

  return (
    <>
      <rect
        transform={stack.attributes.list.transform[0]}
        x={stack.topLeft.x}
        y={stack.topLeft.y}
        width={stack.width}
        height={stack.height}
        className={`stroke-secondary fill-secondary lashed
          ${reveal ? 'stroko-80 filo-5' : 'stroko-30 filo-0'}
          hover:stroko-90 hover:filo-5 hover:cursor-pointer hover:stroke-3xl `}
        style={{ illOpacity: reveal ? 0.3 : 0.1 }}
        onClick={(evt) => {
          inspector.reveal(id)
          inspector.show(stackInfo({ stackName, stack, inspector, id, t }))
        }}
      />
    </>
  )
}

export const Stack = ({ stackName, stack, settings, components, t, inspector }) => (
  <>
    <InspectStack {...{ stackName, stack, settings, components, t, inspector }} />
    <ShowStack {...{ stackName, stack, settings, components, t }} />
  </>
)
