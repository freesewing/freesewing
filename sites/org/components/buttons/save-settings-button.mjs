import { Spinner } from 'shared/components/spinner.mjs'
import { useTranslation } from 'next-i18next'

export const SaveSettingsButton = ({ app, btnProps = {}, welcome = false, label = false }) => {
  const { t } = useTranslation(['account'])
  let classes = 'btn mt-4 capitalize '
  if (welcome) {
    classes += 'w-64 '
    if (app.loading) classes += 'btn-accent '
    else classes += 'btn-secondary '
  } else {
    classes += 'w-full '
    if (app.loading) classes += 'btn-accent '
    else classes += 'btn-primary '
  }

  return (
    <button className={classes} tabIndex="-1" role="button" {...btnProps}>
      <span className="flex flex-row items-center gap-2">
        {app.loading ? (
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
