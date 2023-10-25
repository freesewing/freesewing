//  __SDEFILE__ - This file is a dependency for the stand-alone environment
import { Popout } from 'shared/components/popout/index.mjs'
import { PageLink } from 'shared/components/link.mjs'
import { useTranslation } from 'next-i18next'
import { RightIcon } from 'shared/components/icons.mjs'

export const ns = ['docs']

export const ControlTip = () => {
  const { t } = useTranslation(ns)

  return (
    <Popout note>
      <h5>{t('controltip.t')}</h5>
      <p dangerouslySetInnerHTML={{ __html: t('controltip.d1') }} />
      <p>
        {t('controltip.d2')}
        <br />
        {t('controltip.d3')}
      </p>
      <div className="flex flex-row gap-1 items-center">
        <PageLink href="/account/" txt={t('account')} />
        <RightIcon className="w-4 h-4" />
        <PageLink href="/account/control/" txt={t('controltip.t')} />
      </div>
    </Popout>
  )
}
