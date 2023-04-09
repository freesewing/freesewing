import { SectionsMenu } from 'site/components/navigation/sections-menu.mjs'
import { useTranslation } from 'next-i18next'
import { ActiveSection, ns as primaryNs } from 'shared/components/navigation/primary.mjs'

export const ns = primaryNs

export const ModalMenu = ({ app }) => {
  const { t } = useTranslation(ns)

  return (
    <div className="px-4 lg:px-0 flex flex-col-reverse lg:flex-row flex-wrap gap-8 py-16 justify-between w-full max-w-6xl m-auto">
      <div className="w1/3">
        <h3>{t('mainSections')}</h3>
        <SectionsMenu app={app} />
      </div>
      <div className="w1/3">
        <h3>{t('currentSection')}</h3>
        <ActiveSection app={app} />
      </div>
    </div>
  )
}
