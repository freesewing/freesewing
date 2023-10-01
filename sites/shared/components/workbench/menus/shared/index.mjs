//  __SDEFILE__ - This file is a dependency for the stand-alone environment
import { MenuItemGroup } from './menu-item.mjs'
import { useTranslation } from 'next-i18next'

/**
 * A component for a collapsible sidebar menu in workbench views
 * @param  {Function}   options.updateFunc    a function the menu's inputs will use to update their values
 * @param  {String[]}   options.ns            namespaces used by this menu
 * @param  {React.Component}   options.Icon          the menu's icon
 * @param  {String}   options.name          the translation key for the menu's title
 * @param  {Object}   options.config        the structure of the menu's options
 * @param  {Number}   options.control       the user's control level setting
 * @param  {Object}   options.inputs        a map of input components to use, keyed by option name
 * @param  {Object}   options.values        a map of value components to use, keyed by option name
 * @param  {Object}   options.currentValues a map of the values of the menu's options
 * @param  {Object}   options.passProps     any additional properties to pass the the inputs
 * @param  {DynamicDocs | Boolean}  DynamicDocs           the docs component to use for loading documentation
 * @param  {Function} getDocsPath           a function that accepts an item name and returns a path to its documentation
 * @param  {string}   language              the language to use for the menu
 * @param  {Object}   emojis                a map of the emojis to use, keyed by option name
 * @param  {React.component}   Item                  the component to use for menu items
 * @return {[type]}                         [description]
 */
export const WorkbenchMenu = ({
  updateFunc,
  ns,
  Icon = () => null,
  config,
  control,
  inputs,
  values,
  currentValues,
  passProps = {},
  DynamicDocs = false,
  getDocsPath = () => {},
  language,
  emojis,
  Item,
  children,
  isDesignOptionsGroup,
  design,
}) => {
  // get translation for the menu
  const { t } = useTranslation(ns)

  return children ? (
    children
  ) : (
    <MenuItemGroup
      {...{
        collapsible: false,
        topLevel: true,
        control,
        currentValues,
        structure: config,
        Item,
        Icon,
        values,
        inputs,
        passProps,
        updateFunc,
        emojis,
        t,
        DynamicDocs,
        getDocsPath,
        language,
        isDesignOptionsGroup,
        design,
      }}
    />
  )
}
