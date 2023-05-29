import { useContext } from 'react'
import { Collapse } from 'shared/components/collapse.mjs'
import { MenuItem, wasChanged } from './menu-item.mjs'
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
  updatePath = [],
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
  children,
}) => {
  const { t, i18n } = useTranslation(ns)

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
      <p>{t('core-settings:coreSettings.d')}</p>
      {children ||
        Object.keys(config)
          .filter((name) => config[name].control <= control)
          .map((name) => (
            <MenuItem
              key={name}
              {...{
                name,
                config: config[name],
                current: currentValues[name],
                updateFunc,
                updatePath,
                t,
                passProps,
                changed: wasChanged(currentValues[name], name, config),
                loadDocs,
                Input: inputs[name],
                Value: values[name],
                i18n: i18n,
              }}
            />
          ))}
    </Collapse>
  )
}
