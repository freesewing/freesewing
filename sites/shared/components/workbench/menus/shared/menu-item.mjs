import { ClearIcon, HelpIcon, EditIcon } from 'shared/components/icons.mjs'
import { Collapse } from 'shared/components/collapse.mjs'
import { useState, useMemo } from 'react'

export const wasChanged = (current, config) => {
  if (typeof current === 'undefined') return false
  if (current === config.dflt) return false

  return true
}

export const ItemTitle = ({ name, t, current = null, open = false, emoji = '' }) => (
  <div className={`flex flex-row gap-1 items-center w-full ${open ? '' : 'justify-between'}`}>
    <span className="font-medium">
      <span role="img" className="pr-2">
        {emoji}
      </span>
      {t(`${name}.t`)}
    </span>
    <span className="font-bold">{current}</span>
  </div>
)

const openButtonClass = 'btn btn-xs btn-ghost px-0'
export const MenuItem = ({
  name,
  config,
  current,
  updateFunc,
  t,
  passProps = {},
  changed,
  loadDocs,
  Input,
  Value,
  allowOverride = false,
  control = Infinity,
}) => {
  const [override, setOverride] = useState(false)
  const [reset, setReset] = useState(() => () => updateFunc(name))

  const drillProps = useMemo(
    () => ({
      name,
      config,
      current,
      updateFunc,
      t,
      changed,
      override,
      setReset,
      ...passProps,
    }),
    [name, config, current, updateFunc, t, changed, override, setReset, passProps]
  )

  if (config.control && config.control > control) return null

  const buttons = []
  const openButtons = []
  if (loadDocs)
    openButtons.push(
      <button className={openButtonClass} key="help" onClick={(evt) => loadDocs(evt, name)}>
        <HelpIcon className="w-4 h-4" />
      </button>
    )
  if (allowOverride)
    openButtons.push(
      <button
        key="edit"
        className={openButtonClass}
        onClick={(evt) => {
          evt.stopPropagation()
          setOverride(!override)
        }}
      >
        <EditIcon className={`w-6 h-6 ${override ? 'bg-base-100 text-accent rounded' : ''}`} />
      </button>
    )
  if (changed) {
    const ResetButton = ({ open }) => (
      <button
        className={open ? openButtonClass : 'btn btn-accent'}
        onClick={(evt) => {
          evt.stopPropagation()
          reset()
        }}
      >
        <ClearIcon />
      </button>
    )
    buttons.push(<ResetButton key="clear" />)
    openButtons.push(<ResetButton open key="clear" />)
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
  collapsible = true,
  control,
  name,
  currentValues = {},
  structure,
  Item = MenuItem,
  values = {},
  inputs = {},
  loadDocs,
  passProps = {},
  emojis = {},
  updateFunc,
  t,
}) => {
  const content = Object.entries(structure).map(([itemName, item]) => {
    if (itemName === 'isMenu' || item === false) return null
    if (!item.isMenu)
      return (
        <Item
          key={itemName}
          {...{
            name: itemName,
            current: currentValues[itemName],
            config: item,
            control,
            changed: wasChanged(currentValues[itemName], item),
            Value: values[itemName],
            Input: inputs[itemName],
            t,
            loadDocs,
            updateFunc,
            passProps,
          }}
        />
      )

    return (
      <MenuItemGroup
        key={itemName}
        {...{
          collapsible: true,
          control,
          name: itemName,
          currentValues,
          structure: item,
          Item,
          values,
          inputs,
          loadDocs,
          passProps,
          emojis,
          updateFunc,
          t,
        }}
      />
    )
  })

  const titleProps = {
    name,
    t,
    emoji: emojis[name] || emojis.dflt,
  }
  return collapsible ? (
    <Collapse
      bottom
      color="secondary"
      title={<ItemTitle {...titleProps} />}
      openTitle={<ItemTitle open {...titleProps} />}
    >
      {content}
    </Collapse>
  ) : (
    content
  )
}
