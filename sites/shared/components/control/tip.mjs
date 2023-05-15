import { Popout } from 'shared/components/popout.mjs'
import { PageLink } from 'shared/components/page-link.mjs'
import { useTranslation } from 'next-i18next'
import { RightIcon } from 'shared/components/icons.mjs'

export const ns = ['account']

export const ControlTip = () => {
  const { t } = useTranslation(ns)

  return (
    <Popout note>
      <h5>{t('account:control')}</h5>
      <p dangerouslySetInnerHTML={{ __html: t('controltip.d1') }} />
      <p>
        {t('controltip.d2')}
        <br />
        {t('controltip.d3')}
      </p>
      <div className="flex flex-row gap-1 items-center">
        <PageLink href="/account/" txt={t('account:account')} />
        <RightIcon className="w-4 h-4" />
        <PageLink href="/account/control/" txt={t('account:control')} />
      </div>
    </Popout>
  )
}
