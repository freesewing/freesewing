import { SectionsMenu } from 'site/components/navigation/sections-menu.mjs'
import { useTranslation } from 'next-i18next'
import { ActiveSection, ns as primaryNs } from 'shared/components/navigation/primary.mjs'
import { ModalWrapper } from 'shared/components/wrappers/modal.mjs'

export const ns = primaryNs

export const ModalMenu = ({ app }) => {
  const { t } = useTranslation(ns)

  return (
    <ModalWrapper flex="col" justify="top lg:justify-center" slideFrom="left">
      <div className="max-w-full">
        <div
          className={`
        py-4 lg:py-16 w-full m-auto
        flex flex-col-reverse gap-0 flex-wrap justify-between
        lg:max-w-6xl lg:flex-nowrap lg:gap-8 lg:flex-row
      `}
        >
          <div className="w-full lg:w-1/2">
            <h3>{t('mainSections')}</h3>
            <SectionsMenu app={app} />
          </div>
          <div className="w-full lg:w-1/2">
            <h3>{t('currentSection')}</h3>
            <ActiveSection app={app} bare />
          </div>
        </div>
      </div>
    </ModalWrapper>
  )
}
