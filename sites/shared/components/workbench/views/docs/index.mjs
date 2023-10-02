//  __SDEFILE__ - This file is a dependency for the stand-alone environment
// Hooks
import { useTranslation } from 'next-i18next'
// Components
import { DesignInfo } from 'shared/components/designs/info.mjs'
import { Popout } from 'shared/components/popout/index.mjs'
import { PageLink } from 'shared/components/link.mjs'

export const ns = ['workbench', 'designs']

export const DocsView = ({ design }) => {
  // Hooks
  const { t } = useTranslation(ns)

  return (
    <div className="m-auto mt-8 max-w-7xl px-4 mb-8">
      <Popout tip compact>
        <PageLink txt={t('workbench:learnHowToUseEditor')} href="/docs/site/draft" />
      </Popout>
      <h2>{t(`designs:${design}.t`)}</h2>
      <DesignInfo design={design} workbench />
    </div>
  )
}
