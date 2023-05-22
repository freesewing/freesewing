// Hooks
import { useContext } from 'react'
import { useTranslation } from 'next-i18next'
// Context
import { LoadingContext } from 'shared/context/loading-context.mjs'
// Components
import { Spinner } from 'shared/components/spinner.mjs'

export const SaveSettingsButton = ({ btnProps = {}, welcome = false, label = false }) => {
  const { loading } = useContext(LoadingContext)
  const { t } = useTranslation(['account'])
  let classes = 'btn mt-4 capitalize '
  if (welcome) {
    classes += 'w-64 '
    if (loading) classes += 'btn-accent '
    else classes += 'btn-secondary '
  } else {
    classes += 'w-full '
    if (loading) classes += 'btn-accent '
    else classes += 'btn-primary '
  }

  return (
    <button className={classes} tabIndex="-1" role="button" {...btnProps}>
      <span className="flex flex-row items-center gap-2">
        {loading ? (
          <>
            <Spinner />
            <span>{t('processing')}</span>
          </>
        ) : label ? (
          <span>{label}</span>
        ) : (
          <span>{t('save')}</span>
        )}
      </span>
    </button>
  )
}
