import { ClearIcon, HelpIcon, EditIcon } from 'shared/components/icons.mjs'
import { Collapse } from 'shared/components/collapse.mjs'
import { useState, useMemo } from 'react'
import { ListToggle } from './inputs.mjs'

/**
 * Check to see if a value is different from its default
 * @param  {Number|String|Boolean} current the current value
 * @param  {Object} config  configuration containing a dflt key
 * @return {Boolean}         was the value changed?
 */
export const wasChanged = (current, config) => {
  if (typeof current === 'undefined') return false
  if (current == config.dflt) return false

  return true
}
/**
 * A generic component to present the title of a menu item
 * @param  {String}  options.name    the name of the item, to act as its translation key
 * @param  {Function}  options.t       the translation function
 * @param  {String|React.Component}  options.current a  the current value, or a Value component to display it
 * @param  {Boolean} options.open    is the menu item open?
 * @param  {String}  options.emoji   the emoji icon of the menu item
 */
export const ItemTitle = ({ name, t, current = null, open = false, emoji = '', Icon = false }) => (
  <div className={`flex flex-row gap-1 items-center w-full ${open ? '' : 'justify-between'}`}>
    <span className="font-medium capitalize flex flex-row gap-2">
      <span className="shrink-0">{Icon ? <Icon /> : <span role="img">{emoji}</span>}</span>
      {t([`${name}.t`, name])}
    </span>
    <span className={`font-bold`}>{current}</span>
  </div>
)

/** @type {String} class to apply to buttons on open menu items */
const openButtonClass = 'btn-xs px-0 rounded'

/**
 * A generic component for handling a menu item.
 * Wraps the given input in a {@see Collapse} with the appropriate buttons
 * @param  {String}  options.name       the name of the item, for using as a key
 * @param  {Object}  options.config     the configuration for the input
 * @param  {Sting|Boolean|Number}  options.current    the current value of the item
 * @param  {Function}  options.updateFunc the function that will be called by event handlers to update the value
 * @param  {Function}  options.t          the translation function
 * @param  {Object}  options.passProps  props to pass to the Input component
 * @param  {Boolean}  changed            has the value changed from default?
 * @param  {Function}  loadDocs           a function to load documentation for the item into a modal
 * @param  {React.Component}  Input              the input component this menu item will use
 * @param  {React.Component}  Value              a value display component this menu item will use
 * @param  {Boolean} allowOverride      all a text input to be used to override the given input component
 * @param  {Number}  control            the user-defined control level
 */
export const MenuItem = ({
  name,
  config,
  current,
  updateFunc,
  t,
  passProps = {},
  changed,
  loadDocs,
  Input = () => {},
  Value = () => {},
  allowOverride = false,
  allowToggle = false,
  control = Infinity,
}) => {
  // state for knowing whether the override input should be shown
  const [override, setOverride] = useState(false)

  const color = changed ? 'accent' : 'secondary'
  const openButtonClasses = `${openButtonClass} btn-${color}`
  // generate properties to pass to the Input
  const drillProps = useMemo(
    () => ({
      name,
      config,
      control,
      current,
      updateFunc,
      t,
      changed,
      override,
      ...passProps,
    }),
    [name, config, current, updateFunc, t, changed, override, passProps, control]
  )

  // don't render if this item is more advanced than the user has chosen to see
  if (config.control && config.control > control) return null

  // get buttons for open and closed states
  const buttons = []
  const openButtons = []
  if (loadDocs)
    openButtons.push(
      <button className={openButtonClasses} key="help" onClick={(evt) => loadDocs(evt, name)}>
        <HelpIcon className="w-6 h-6" />
      </button>
    )
  if (allowOverride)
    openButtons.push(
      <button
        key="edit"
        className={openButtonClasses}
        onClick={(evt) => {
          evt.stopPropagation()
          setOverride(!override)
        }}
      >
        <EditIcon
          className={`w-6 h-6 ${override ? 'bg-base-100 text-base-content rounded' : ''}`}
        />
      </button>
    )
  const ResetButton = ({ open, disabled = false }) => (
    <button
      className={`${open ? openButtonClasses : 'btn btn-accent'} disabled:bg-opacity-0`}
      disabled={disabled}
      onClick={(evt) => {
        evt.stopPropagation()
        updateFunc([name])
      }}
    >
      <ClearIcon />
    </button>
  )

  if (changed && !allowToggle) {
    buttons.push(<ResetButton key="clear" />)
  }

  if (allowToggle) {
    buttons.push(<ListToggle key="toggle" {...{ config, changed, updateFunc, name, color }} />)
  } else {
    openButtons.push(<ResetButton open disabled={!changed} key="clear" />)
  }

  // props to pass to the ItemTitle
  const titleProps = {
    name,
    t,
    current: <Value {...drillProps} />,
    emoji: config.emoji,
    Icon: config.icon,
  }
  //changes left border of button
  return (
    <Collapse
      color={color}
      openTitle={<ItemTitle open {...titleProps} />}
      title={<ItemTitle {...titleProps} />}
      buttons={buttons}
      openButtons={openButtons}
    >
      <Input {...drillProps} />
    </Collapse>
  )
}

/**
 * A component for recursively displaying groups of menu items.
 * Accepts any object where menu item configurations are keyed by name
 * Items that are group headings are expected to have an isGroup: true property
 * @param  {Boolean} options.collapsible   Should this group be collapsible (use false for the top level of a menu)
 * @param  {Number}  options.control       the user-defined control level
 * @param  {String}  options.name          the name of the group or item
 * @param  {Object}  options.currentValues a map of current values for items in the group, keyed by name
 * @param  {Object}  structure             the configuration for the group.
 * @param  {React.Component}  Icon         the icon to display next to closed groups
 * @param  {React.Component}  Item         the component to use for menu items
 * @param  {Object}  values                a map of Value display components to be used by menu items in the group
 * @param  {Object}  inputs                a map of Input components to be used by menu items in the group
 * @param  {Function}  loadDocs            a function to load item documentation into a modal
 * @param  {Object}  passProps             properties to pass to Inputs within menu items
 * @param  {Object}  emojis                a map of emojis to use as icons for groups or items
 * @param  {Function}  updateFunc          the function called by change handlers on inputs within menu items
 * @param  {Boolean}  topLevel             is this group the top level group? false for nested
 * @param  {Function}  t                   translation function
 */
export const MenuItemGroup = ({
  collapsible = true,
  control,
  name,
  currentValues = {},
  structure,
  Icon,
  Item = MenuItem,
  values = {},
  inputs = {},
  loadDocs,
  passProps = {},
  emojis = {},
  updateFunc,
  topLevel = false,
  t,
}) => {
  // map the entries in the structure
  const content = Object.entries(structure).map(([itemName, item]) => {
    // if it's the isGroup property, or it is false, it shouldn't be shown
    if (itemName === 'isGroup' || item === false) return null

    // if the item is not a menu, it's an Item
    if (!item.isGroup)
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

    // otherwise, it's a group
    return (
      <MenuItemGroup
        key={itemName}
        {...{
          collapsible: true,
          // it's the top level if the previous level was top but not wrapped
          topLevel: topLevel && !collapsible,
          control,
          name: itemName,
          currentValues,
          structure: item,
          Icon,
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

  // if it should be wrapped in a collapsible
  if (collapsible) {
    // props to give to the group title
    const titleProps = {
      name,
      t,
      emoji: emojis[name] || emojis.groupDflt,
    }
    //colour here changes button borders
    return (
      <Collapse
        bottom
        color={topLevel ? 'primary' : 'secondary'}
        title={
          <ItemTitle
            {...titleProps}
            current={Icon ? <Icon className="w-6 h-6 text-primary" /> : ''}
          />
        }
        openTitle={<ItemTitle open {...titleProps} />}
      >
        {content}
      </Collapse>
    )
  }

  //otherwise just return the content
  return content
}
