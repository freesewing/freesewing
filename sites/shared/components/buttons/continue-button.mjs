//  __SDEFILE__ - This file is a dependency for the stand-alone environment
// Hooks
import { useContext } from 'react'
import { useTranslation } from 'next-i18next'
// Context
import { LoadingStatusContext } from 'shared/context/loading-status-context.mjs'
// Components
import { Spinner } from 'shared/components/spinner.mjs'
import Link from 'next/link'

export const ContinueButton = ({ btnProps = {}, link = false }) => {
  // Context
  const { loading } = useContext(LoadingStatusContext)

  // Hooks
  const { t } = useTranslation(['account'])

  let classes = 'btn mt-8 capitalize w-full '
  if (loading) classes += 'btn-accent '
  else classes += 'btn-primary '

  const children = (
    <span className="flex flex-row items-center gap-2">
      {loading ? (
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
