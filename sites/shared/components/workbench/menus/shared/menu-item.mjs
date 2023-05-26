import { ClearIcon, HelpIcon, EditIcon } from 'shared/components/icons.mjs'
import { Collapse } from 'shared/components/collapse.mjs'
import { useState } from 'react'

export const wasChanged = (current, name, settingsConfig) => {
  if (typeof current === 'undefined') return false
  if (current === settingsConfig[name].dflt) return false

  return true
}

export const ItemTitle = ({ name, t, changed, current = null, open = false, emoji = '' }) => (
  <div className={`flex flex-row gap-1 items-center w-full ${open ? '' : 'justify-between'}`}>
    <span className="font-medium">
      <span role="img" className="pr-2">
        {emoji}
      </span>
      {t(`${name}.t`)}
      {open ? ':' : ''}
    </span>
    <span className="font-bold">{current}</span>
  </div>
)

export const MenuItem = ({
  name,
  config,
  current,
  updater,
  updatePath = [],
  t,
  passProps = {},
  changed,
  loadDocs,
  Input,
  Value,
  allowOverride = false,
}) => {
  const [override, setOverride] = useState(false)
  const drillProps = {
    name,
    config,
    current,
    updater,
    t,
    changed,
    updatePath,
    override,
    ...passProps,
  }

  const buttons = []
  const openButtons = []
  if (loadDocs)
    openButtons.push(
      <button
        className="btn btn-xs btn-ghost px-0"
        key="help"
        onClick={(evt) => loadDocs(evt, name)}
      >
        <HelpIcon className="w-4 h-4" />
      </button>
    )
  if (allowOverride)
    openButtons.push(
      <button
        key="edit"
        className="btn btn-xs btn-ghost px-0"
        onClick={(evt) => {
          evt.stopPropagation()
          setOverride(!override)
        }}
      >
        <EditIcon className={`w-6 h-6 ${override ? 'bg-base-100 text-accent rounded' : ''}`} />
      </button>
    )
  if (changed) {
    buttons.push(
      <button
        className="btn btn-accent"
        key="clear"
        onClick={(evt) => {
          evt.stopPropagation()
          updater([...updatePath, name], config.dflt)
        }}
      >
        <ClearIcon />
      </button>
    )
    openButtons.push(
      <button
        className="btn btn-ghost btn-xs px-0"
        key="clear"
        onClick={(evt) => {
          evt.stopPropagation()
          updater([...updatePath, name], config.dflt)
        }}
      >
        <ClearIcon />
      </button>
    )
  }

  const titleProps = { name, t, current: <Value {...drillProps} />, emoji: config.emoji }

  return (
    <Collapse
      color={changed ? 'accent' : 'secondary'}
      openTitle={<ItemTitle open {...titleProps} />}
      title={<ItemTitle {...titleProps} />}
      buttons={buttons}
      openButtons={openButtons}
    >
      <Input {...drillProps} />
    </Collapse>
  )
}

export const MenuItemGroup = ({
  wrapped = true,
  name,
  groupConfig,
  currents = {},
  items,
  Item = MenuItem,
  loadDocs,
  itemProps = {},
  emojis = {},
  t,
}) => {
  const content = Object.entries(items).map(([itemName, item]) => {
    if (typeof item === 'string')
      return (
        <Item
          key={itemName}
          {...{
            name: itemName,
            current: currents[itemName],
            config: groupConfig[itemName],
            changed: wasChanged(currents[itemName], itemName, groupConfig),
            t,
            loadDocs,
            ...itemProps,
          }}
        />
      )

    return (
      <MenuItemGroup
        key={itemName}
        {...{
          wrapped: true,
          name: itemName,
          groupConfig,
          currents,
          items: item,
          Item,
          loadDocs,
          itemProps,
          emojis,
          t,
        }}
      />
    )
  })

  return wrapped ? (
    <Collapse
      bottom
      color="secondary"
      title={
        <ItemTitle
          {...{
            name,
            t,
            emoji: emojis[name] || emojis.dflt,
          }}
        />
      }
      openTitle={t(name)}
    >
      {content}
    </Collapse>
  ) : (
    content
  )
}
