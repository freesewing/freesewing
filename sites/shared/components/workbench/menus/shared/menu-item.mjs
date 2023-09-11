import { ResetIcon, EditIcon } from 'shared/components/icons.mjs'
import { useState, useMemo } from 'react'
import { SubAccordion } from 'shared/components/accordion.mjs'
import { FormControl } from 'shared/components/inputs.mjs'
import { BoxIcon as GroupIcon, OptionsIcon } from 'shared/components/icons.mjs'
import { optionType } from 'shared/utils.mjs'

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
      {Icon ? <Icon /> : <span role="img">{emoji}</span>}
      {t([`${name}.t`, name])}
    </span>
    <span className="font-bold">{current}</span>
  </div>
)

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
  //loadDocs,
  Input = () => {},
  //Value = () => {},
  allowOverride = false,
  //allowToggle = false,
  control = Infinity,
  DynamicDocs,
  docsPath,
  language,
}) => {
  // state for knowing whether the override input should be shown
  const [override, setOverride] = useState(false)

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
        <EditIcon
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
        updateFunc([name])
      }}
    >
      <ResetIcon />
    </button>
  )

  buttons.push(<ResetButton open disabled={!changed} key="clear" />)

  return (
    <FormControl
      label={<span className="text-base font-normal">{t([`${name}.d`, name])}</span>}
      docs={<DynamicDocs path={docsPath} language={language} />}
      id={config.name}
      labelBR={<div className="flex flex-row items-center gap-2">{buttons}</div>}
      labelBL={
        <span
          className={`text-base font-medium -mt-2 block ${changed ? 'text-accent' : 'opacity-50'}`}
        >
          {t(`workbench:youUse${changed ? 'Default' : 'Custom'}Value`)}
        </span>
      }
    >
      <Input {...drillProps} />
    </FormControl>
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
 * @param  {Function}  getDocsPath         returns the path to the docs for the current item
 */
export const MenuItemGroup = ({
  collapsible = true,
  control,
  //name,
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
  DynamicDocs,
  language,
  getDocsPath,
  isDesignOptionsGroup = false,
  design,
}) => {
  // map the entries in the structure
  const content = Object.entries(structure).map(([itemName, item]) => {
    // if it's the isGroup property, or it is false, it shouldn't be shown
    if (itemName === 'isGroup' || item === false) return null
    if (!item) return null

    const ItemIcon = item.icon
      ? item.icon
      : item.isGroup
      ? GroupIcon
      : Icon
      ? Icon
      : () => <span role="img">fixme-icon</span>
    const Value = item.isGroup
      ? () => (
          <div className="flex flex-row gap-2 items-center font-medium">
            {Object.keys(item).filter((i) => i !== 'isGroup').length}
            <OptionsIcon className="w-5 h-5" />
          </div>
        )
      : isDesignOptionsGroup
      ? values[optionType(item)]
      : values[itemName]
      ? values[itemName]
      : () => <span>¯\_(ツ)_/¯</span>

    return [
      <div className="flex flex-row items-center justify-between w-full" key="a">
        <div className="flex flex-row items-center gap-4 w-full">
          <ItemIcon />
          <span className="font-medium">{t([`${itemName}.t`, itemName])}</span>
        </div>
        <div className="font-bold">
          <Value
            current={currentValues[itemName]}
            config={item}
            t={t}
            changed={wasChanged(currentValues[itemName], item)}
            design={design}
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
            DynamicDocs,
            language,
            getDocsPath,
            isDesignOptionsGroup,
            design,
          }}
        />
      ) : (
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
            DynamicDocs,
            docsPath: getDocsPath(itemName),
            language,
            design,
          }}
        />
      ),
    ]
  })

  return <SubAccordion items={content.filter((item) => item !== null)} />
}
