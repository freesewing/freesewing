import { validateEmail, validateTld } from 'site/utils.mjs'
import { Spinner } from 'shared/components/spinner.mjs'
import { useTranslation } from 'next-i18next'

export const EmailValidButton = ({ email, app, validText, btnProps = {} }) => {
  const { t } = useTranslation(['signup'])
  const emailValid = (validateEmail(email) && validateTld(email)) || false

  return (
    <button
      style={{
        backgroundColor: emailValid ? '' : 'hsl(var(--wa) / var(--tw-border-opacity))',
        opacity: emailValid ? 1 : 0.8,
      }}
      className={`btn mt-4 capitalize w-full
      ${emailValid ? (app.loading ? 'btn-accent' : 'btn-primary') : 'btn-warning'}`}
      tabIndex="-1"
      role="button"
      aria-disabled={!emailValid}
      {...btnProps}
    >
      {emailValid ? (
        <span className="flex flex-row items-center gap-2">
          {app.loading ? (
            <>
              <Spinner />
              <span>{t('processing')}</span>
            </>
          ) : (
            <span>{t('emailSignupLink')}</span>
          )}
        </span>
      ) : (
        <span className="text-warning-content">{validText}</span>
      )}
    </button>
  )
}
