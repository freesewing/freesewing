import { useState, useMemo } from 'react'

/** @type {String} class to apply to buttons on open menu items */
const iconButtonClass = 'btn btn-xs btn-ghost px-0 text-accent'

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
 * @param  {React.Component}  Input              the input component this menu item will use
 * @param  {React.Component}  Value              a value display component this menu item will use
 * @param  {Boolean} allowOverride      all a text input to be used to override the given input component
 * @param  {Number}  ux            the user-defined ux level
 * @param {object} props.Swizzled - An object holding swizzled code
 */
export const MenuItem = ({
  name,
  Swizzled,
  current,
  updateHandler,
  passProps = {},
  changed,
  Input = () => {},
  allowOverride = false,
  ux = 5,
  docs,
  config,
  Design,
}) => {
  // Local state - whether the override input should be shown
  const [override, setOverride] = useState(false)

  // generate properties to pass to the Input
  const drillProps = useMemo(
    () => ({
      name,
      config,
      ux,
      current,
      updateHandler,
      t: Swizzled.methods.t,
      changed,
      override,
      Design,
      ...passProps,
    }),
    [name, config, current, updateHandler, changed, override, passProps, ux]
  )

  if (!config) {
    console.log('no config in containers', { name, current, config })
    return null
  }

  // don't render if this item is more advanced than the user has chosen to see
  if (config.ux && config.ux > ux) return null

  // get buttons for open and closed states
  const buttons = []
  if (allowOverride)
    buttons.push(
      <button
        key="edit"
        className={iconButtonClass}
        onClick={(evt) => {
          evt.stopPropagation()
          setOverride(!override)
        }}
      >
        <Swizzled.components.EditIcon
          className={`w-6 h-6 ${
            override ? 'bg-secondary text-secondary-content rounded' : 'text-secondary'
          }`}
        />
      </button>
    )
  const ResetButton = ({ disabled = false }) => (
    <button
      className={`${iconButtonClass} disabled:bg-opacity-0`}
      disabled={disabled}
      onClick={(evt) => {
        evt.stopPropagation()
        updateHandler([name], '__UNSET__')
      }}
    >
      <Swizzled.components.ResetIcon />
    </button>
  )

  buttons.push(<ResetButton open disabled={!changed} key="clear" />)

  return (
    <Swizzled.components.FormControl
      label={<span className="text-base font-normal">{Swizzled.methods.t(`${name}.d`)}</span>}
      id={config.name}
      labelBR={<div className="flex flex-row items-center gap-2">{buttons}</div>}
      labelBL={
        <span
          className={`text-base font-medium -mt-2 block ${changed ? 'text-accent' : 'opacity-50'}`}
        >
          {Swizzled.methods.t(`pe:youAreUsing${changed ? 'ACustom' : 'TheDefault'}Value`)}
        </span>
      }
      docs={docs}
    >
      <Input {...drillProps} />
    </Swizzled.components.FormControl>
  )
}

/**
 * A component for recursively displaying groups of menu items.
 * Accepts any object where menu item configurations are keyed by name
 * Items that are group headings are expected to have an isGroup: true property
 * @param  {Boolean} options.collapsible   Should this group be collapsible (use false for the top level of a menu)
 * @param  {Number}  options.ux       the user-defined ux level
 * @param  {String}  options.name          the name of the group or item
 * @param  {Object}  options.currentValues a map of current values for items in the group, keyed by name
 * @param  {Object}  structure             the configuration for the group.
 * @param  {React.Component}  Icon         the icon to display next to closed groups
 * @param  {React.Component}  Item         the component to use for menu items
 * @param  {Object}  values                a map of Value display components to be used by menu items in the group
 * @param  {Object}  inputs                a map of Input components to be used by menu items in the group
 * @param  {Object}  passProps             properties to pass to Inputs within menu items
 * @param  {Object}  emojis                a map of emojis to use as icons for groups or items
 * @param  {Function}  updateHandler          the function called by change handlers on inputs within menu items
 * @param  {Boolean}  topLevel             is this group the top level group? false for nested
 * @param  {Function}  t                   translation function
 * @param {object} props.Swizzled - An object holding swizzled code

 */
export const MenuItemGroup = ({
  collapsible = true,
  ux,
  currentValues = {},
  structure,
  Icon,
  Item = false,
  inputs = {},
  values = {},
  passProps = {},
  updateHandler,
  topLevel = false,
  isDesignOptionsGroup = false,
  Design,
  Swizzled,
  state,
}) => {
  if (!Item) Item = Swizzled.components.MenuItem

  // map the entries in the structure
  const content = Object.entries(structure).map(([itemName, item]) => {
    // if it's the isGroup property, or it is false, it shouldn't be shown
    if (itemName === 'isGroup' || item === false) return null
    if (!item) return null
    if (item.ux && ux && item.ux > ux) return null

    const ItemIcon = item.icon
      ? item.icon
      : item.isGroup
        ? Swizzled.components.GroupIcon
        : Icon
          ? Icon
          : () => <span role="img">fixme-icon</span>
    const Value = item.isGroup
      ? () => (
          <div className="flex flex-row gap-2 items-center font-medium">
            {Object.keys(item).filter((i) => i !== 'isGroup').length}
            <Swizzled.components.OptionsIcon className="w-5 h-5" />
          </div>
        )
      : isDesignOptionsGroup
        ? values[Swizzled.methods.designOptionType(item)]
        : values[itemName]
          ? values[itemName]
          : () => <span>¯\_(ツ)_/¯</span>

    return [
      <div className="flex flex-row items-center justify-between w-full" key="a">
        <div className="flex flex-row items-center gap-4 w-full">
          <ItemIcon />
          <span className="font-medium">
            {Swizzled.methods.t([`pe:${itemName}.t`, `pe:${itemName}`])}
          </span>
        </div>
        <div className="font-bold">
          <Value
            current={currentValues[itemName]}
            config={item}
            t={Swizzled.methods.t}
            changed={Swizzled.methods.menuValueWasChanged(currentValues[itemName], item)}
            Design={Design}
          />
        </div>
      </div>,
      item.isGroup ? (
        <MenuItemGroup
          key={itemName}
          {...{
            collapsible: true,
            // it's the top level if the previous level was top but not wrapped
            topLevel: topLevel && !collapsible,
            state,
            name: itemName,
            currentValues,
            structure: item,
            Icon,
            Item,
            values,
            inputs,
            passProps,
            updateHandler,
            isDesignOptionsGroup,
            Design,
            Swizzled,
          }}
        />
      ) : (
        <Item
          key={itemName}
          {...{
            name: itemName,
            current: currentValues[itemName],
            config: item,
            state,
            changed: Swizzled.methods.menuValueWasChanged(currentValues[itemName], item),
            Value: values[itemName],
            Input: inputs[itemName],
            updateHandler,
            passProps,
            Design,
            Swizzled,
          }}
        />
      ),
      itemName,
    ]
  })

  return <Swizzled.components.SubAccordion items={content.filter((item) => item !== null)} />
}

/**
 * A generic component to present the title of a menu item
 * @param  {String}  options.name    the name of the item, to act as its translation key
 * @param  {Function}  options.t       the translation function
 * @param  {String|React.Component}  options.current a  the current value, or a Value component to display it
 * @param  {Boolean} options.open    is the menu item open?
 * @param  {String}  options.emoji   the emoji icon of the menu item
 */
export const MenuItemTitle = ({
  name,
  current = null,
  open = false,
  emoji = '',
  Icon = false,
  Swizzled,
}) => (
  <div className={`flex flex-row gap-1 items-center w-full ${open ? '' : 'justify-between'}`}>
    <span className="font-medium capitalize flex flex-row gap-2">
      {Icon ? <Icon /> : <span role="img">{emoji}</span>}
      {Swizzled.methods.t([`${name}.t`, name])}
    </span>
    <span className="font-bold">{current}</span>
  </div>
)
