import { Spinner } from 'shared/components/spinner.mjs'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'

export const ContinueButton = ({ app, btnProps = {}, link = false }) => {
  const { t } = useTranslation(['account'])
  let classes = 'btn mt-8 capitalize w-full '
  if (app.loading) classes += 'btn-accent '
  else classes += 'btn-primary '

  const children = (
    <span className="flex flex-row items-center gap-2">
      {app.loading ? (
        <>
          <Spinner />
          <span>{t('processing')}</span>
        </>
      ) : (
        <span>{t('continue')}</span>
      )}
    </span>
  )

  return link ? (
    <Link className={classes} tabIndex="-1" {...btnProps}>
      {children}
    </Link>
  ) : (
    <button className={classes} tabIndex="-1" role="button" {...btnProps}>
      {children}
    </button>
  )
}
