import { useContext } from 'react'
import { Collapse } from 'shared/components/collapse.mjs'
import { MenuItemGroup } from './menu-item.mjs'
import { useTranslation } from 'next-i18next'
import { HelpIcon } from 'shared/components/icons.mjs'
import { ModalWrapper } from 'shared/components/wrappers/modal.mjs'
import { ModalContext } from 'shared/context/modal-context.mjs'

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
  children,
}) => {
  const { t } = useTranslation(ns)

  const loadDocs = useDocsLoader(DynamicDocs, getDocsPath, language)

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
    <Collapse
      bottom
      color="primary"
      title={
        <div className="w-full flex flex-row gap2 items-center justify-between">
          <span className="font-bold">{t(`${name}.t`)}</span>
          <Icon className="w-6 h-6 text-primary" />
        </div>
      }
      openTitle={t(`${name}.t`)}
      openButtons={openButtons}
    >
      {children || (
        <MenuItemGroup
          {...{
            collapsible: false,
            control,
            currentValues,
            structure: config,
            Item,
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
    </Collapse>
  )
}
