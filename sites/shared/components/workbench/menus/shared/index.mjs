import { useContext } from 'react'
import { Collapse } from 'shared/components/collapse.mjs'
import { MenuItemGroup } from './menu-item.mjs'
import { useTranslation } from 'next-i18next'
import { HelpIcon } from 'shared/components/icons.mjs'
import { ModalWrapper } from 'shared/components/wrappers/modal.mjs'
import { ModalContext } from 'shared/context/modal-context.mjs'

/**
 * get a loadDocs method for a menu
 * @param  {DynamicDocs} DynamicDocs      the docs component to use
 * @param  {Function} getDocsPath         a function that accepts an item name and returns a path to its documentation
 * @param  {string} language              the language to get documentation in
 * @return {Function | false}             an event handler that loads does into a modal
 */
export const useDocsLoader = (DynamicDocs, getDocsPath, language) => {
  const { setModal } = useContext(ModalContext)
  return DynamicDocs
    ? (evt, name = false) => {
        evt.stopPropagation()
        const path = getDocsPath(name)
        setModal(
          <ModalWrapper>
            <div className="max-w-prose">
              <DynamicDocs path={path} language={language} />
            </div>
          </ModalWrapper>
        )
      }
    : false
}

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
  Icon,
  name,
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
  isFirst,
  children,
}) => {
  // get translation for the menu
  const { t } = useTranslation(ns)

  // get a documentation loader
  const loadDocs = useDocsLoader(DynamicDocs, getDocsPath, language)

  // get the appropriate buttons for the menu
  const openButtons = []
  if (loadDocs)
    openButtons.push(
      <button
        className="btn btn-xs btn-ghost px-0 z-10"
        key="help"
        onClick={(evt) => loadDocs(evt)}
      >
        <HelpIcon className="w-4 h-4" />
      </button>
    )

  return (
    <>
      <div className="px-2" key="header">
        {control > 4 ? (
          isFirst ? (
            ''
          ) : (
            <div className="border-t border-solid border-base-300 mx-36"></div>
          )
        ) : (
          <>
            <h5 className="flex flex-row gap-2 items-center">
              <Icon />
              <span>{t(`${name}`)}</span>
            </h5>
            <p>{t(`${name}.d`)}</p>
          </>
        )}
      </div>
      {children || (
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
            loadDocs,
            passProps,
            updateFunc,
            emojis,
            t,
          }}
        />
      )}
    </>
  )
}
