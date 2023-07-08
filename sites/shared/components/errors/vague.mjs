import { Robot } from 'shared/components/robot/index.mjs'
import Link from 'next/link'
import { HelpIcon } from 'shared/components/icons.mjs'
import { useTranslation } from 'next-i18next'

export const ns = ['account']

export const VagueError = ({ noTitle = false }) => {
  const { t } = useTranslation('account')

  return (
    <>
      {noTitle ? null : <h1>{t('account:politeOhCrap')}</h1>}
      <Robot pose="ohno" className="w-full" embed />
      <p className="mt-4 text-2xl">{t('account:vagueError')}</p>
      <div className="flex flex-row gap-4 items-center mt-4">
        <Link className="btn btn-primary btn-lg mt-4 pr-6" href="/support">
          <HelpIcon className="w-6 h-6 mr-4" /> {t('contactSupport')}
        </Link>
      </div>
    </>
  )
}
