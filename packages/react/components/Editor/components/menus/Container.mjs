// Dependencies
import { menuValueWasChanged } from '../../lib/index.mjs'
import { designOptionType } from '@freesewing/utils'
// Hooks
import React, { useState, useMemo } from 'react'
// Components
import { SubAccordion } from '../Accordion.mjs'
import {
  EditIcon,
  GroupIcon,
  OptionsIcon,
  ResetIcon,
  TipIcon,
} from '@freesewing/react/components/Icon'
import { CoreSettingsMenu } from './CoreSettingsMenu.mjs'
import { FormControl } from '@freesewing/react/components/Input'

/** @type {String} class to apply to buttons on open menu items */
const iconButtonClass = 'tw-daisy-btn tw-daisy-btn-xs tw-daisy-btn-ghost tw-px-0 tw-text-accent'

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
 */
export const MenuItem = ({
  name,
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
  i18n,
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
        <EditIcon
          className={`tw-w-6 tw-h-6 ${
            override ? 'tw-bg-secondary tw-text-secondary-content tw-rounded' : 'tw-text-secondary'
          }`}
        />
      </button>
    )
  const ResetButton = ({ disabled = false }) => (
    <button
      className={`${iconButtonClass} disabled:tw-bg-opacity-0`}
      disabled={disabled}
      onClick={(evt) => {
        evt.stopPropagation()
        updateHandler([name], '__UNSET__')
      }}
    >
      <ResetIcon />
    </button>
  )

  buttons.push(<ResetButton open disabled={!changed} key="clear" />)

  return (
    <>
      <FormControl
        FIXME_REMOVED_label={
          <span className="tw-text-base tw-font-normal">
            {config.choiceTitles ? config.choiceTitles[current] : i18n.en.o[name].d}
          </span>
        }
        label={false}
        id={config.name}
        labelBR={<div className="tw-flex tw-flex-row tw-items-center tw-gap-2">{buttons}</div>}
        labelBL={
          <span
            className={`tw-text-base tw-font-medium tw--mt-2 tw-block ${changed ? 'tw-text-accent' : 'tw-opacity-50'}`}
          >
            {changed ? 'This is a custom value' : 'This is the default value'}
          </span>
        }
      >
        <Input {...drillProps} />
      </FormControl>
      {config.about ? (
        <div className="tw-flex tw-flex-row tw-border tw-border-success tw-rounded">
          <div className="tw-bg-success tw-text-success-content tw-p-1 tw-rounded-l tw-flex tw-flex-row tw-items-center">
            <TipIcon className="tw-w-6 tw-h-6 tw-text-success-content" />
          </div>
          <div className="tw-p-1 tw-text-sm tw-font-medium tw-bg-success/10 tw-grow tw-rounded-r">
            {config.about}
          </div>
        </div>
      ) : null}
    </>
  )
}

const coreLabels = {
  complete: 'Details',
  only: 'Included Parts',
  paperless: 'Paperless',
  sabool: 'Include Seam Allowance',
}

const getItemLabel = (i18n, name) => {
  if (Object.keys(coreLabels).includes(name)) return coreLabels[name]

  return i18n && i18n.en.o[name]?.t ? i18n.en.o[name].t : name
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
  state,
  i18n,
}) => {
  if (!Item) Item = MenuItem

  // map the entries in the structure
  const content = Object.entries(structure).map(([itemName, item]) => {
    // if it's the isGroup property, or it is false, it shouldn't be shown
    if (itemName === 'isGroup' || item === false) return null
    if (!item) return null
    if (item.ux && ux && item.ux > ux) return null

    const ItemIcon = item.icon
      ? item.icon
      : item.isGroup
        ? GroupIcon
        : Icon
          ? Icon
          : () => <span role="img">fixme-icon</span>
    const Value = item.isGroup
      ? () => (
          <div className="tw-flex tw-flex-row tw-gap-2 tw-items-center tw-font-medium">
            {Object.keys(item).filter((i) => i !== 'isGroup').length}
            <OptionsIcon className="tw-w-5 tw-h-5" />
          </div>
        )
      : isDesignOptionsGroup
        ? values[designOptionType(item)]
        : values[itemName]
          ? values[itemName]
          : () => <span>¯\_(ツ)_/¯</span>

    return [
      <div className="tw-flex tw-flex-row tw-items-center tw-justify-between tw-w-full" key="a">
        <div className="tw-flex tw-flex-row tw-items-center tw-gap-4 tw-w-full">
          <ItemIcon />
          <span className="tw-font-medium tw-capitalize">
            {item.title ? item.title : getItemLabel(i18n, itemName)}
          </span>
        </div>
        <div className="tw-font-bold">
          <Value
            current={currentValues[itemName]}
            config={item}
            changed={menuValueWasChanged(currentValues[itemName], item)}
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
            i18n,
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
            changed: menuValueWasChanged(currentValues[itemName], item),
            Value: values[itemName],
            Input: inputs[itemName],
            updateHandler,
            passProps,
            Design,
            i18n,
          }}
        />
      ),
      itemName,
    ]
  })

  return <SubAccordion items={content.filter((item) => item !== null)} dense />
}

/**
 * A generic component to present the title of a menu item
 * @param  {String}  options.name    the name of the item, to act as its translation key
 * @param  {Function}  options.t       the translation function
 * @param  {String|React.Component}  options.current a  the current value, or a Value component to display it
 * @param  {Boolean} options.open    is the menu item open?
 * @param  {String}  options.emoji   the emoji icon of the menu item
 */
export const MenuItemTitle = ({ name, current = null, open = false, emoji = '', Icon = false }) => (
  <div
    className={`tw-flex tw-flex-row tw-gap-1 tw-items-center tw-w-full ${open ? '' : 'tw-justify-between'}`}
  >
    <span className="tw-font-medium tw-capitalize tw-flex tw-flex-row tw-gap-2">
      {Icon ? <Icon /> : <span role="img">{emoji}</span>}
      fixme: {name}
    </span>
    <span className="tw-font-bold">{current}</span>
  </div>
)
