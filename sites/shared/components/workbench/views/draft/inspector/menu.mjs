// Hooks
//import { useContext } from 'react'
import { useTranslation } from 'next-i18next'
// Context
//import { ModalContext } from 'shared/context/modal-context.mjs'
//Dependencies
//import { loadSettingsConfig } from './config.mjs'
// Components
//import { ModalWrapper } from 'shared/components/wrappers/modal.mjs'
import { WrenchIcon, ClearIcon, HelpIcon } from 'shared/components/icons.mjs'
import { Collapse } from 'shared/components/collapse.mjs'

export const ns = ['inspector']

export const Inspector = ({
  design,
  update,
  settings,
  patternConfig,
  language,
  DynamicDocs,
  control,
  ui,
  inspector,
}) => {
  // FIXME: Update this namespace
  const { t } = useTranslation(ns)

  return (
    <>
      <div className="px-2 mt-8">
        {control > 4 ? (
          <div className="border-t border-solid border-base-300 pb-2 mx-36"></div>
        ) : (
          <>
            <h5 className="flex flex-row gap-2 items-center">
              <WrenchIcon />
              <span>{t('inspector:inspector')}</span>
            </h5>
            <p>{t('inspector:inspector.d')}</p>
          </>
        )}
      </div>
      {Object.values(inspector.data.show).map((props) => (
        <Collapse {...props} />
      ))}
    </>
  )
}
