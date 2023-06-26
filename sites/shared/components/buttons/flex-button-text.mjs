import { validateEmail, validateTld } from 'shared/utils.mjs'
import { Spinner } from 'shared/components/spinner.mjs'
import { useTranslation } from 'next-i18next'
import { EmailIcon, RightIcon, WarningIcon } from 'shared/components/icons.mjs'

export const FlexButtonText = ({ children }) => (
  <div className="flex flex-row items-center justify-between w-full">{children}</div>
)

export const EmailValidButton = ({ email, app, validText, invalidText, btnProps = {} }) => {
  const { t } = useTranslation(['signup'])
  const emailValid = (validateEmail(email) && validateTld(email)) || false

  return (
    <button
      style={{
        backgroundColor: emailValid ? '' : 'hsl(var(--wa) / var(--tw-border-opacity))',
        opacity: emailValid ? 1 : 0.8,
      }}
      className={`btn mt-4 capitalize w-full
      ${emailValid ? (app.state.loading ? 'btn-accent' : 'btn-primary') : 'btn-warning'}`}
      tabIndex="-1"
      role="button"
      aria-disabled={!emailValid}
      {...btnProps}
    >
      <FlexButtonText>
        {emailValid ? (
          app.state.loading ? (
            <>
              <Spinner />
              <span>{t('processing')}</span>
              <Spinner />
            </>
          ) : (
            <>
              <EmailIcon />
              <span>{validText}</span>
              <RightIcon />
            </>
          )
        ) : (
          <>
            <EmailIcon />
            <span>{invalidText}</span>
            <WarningIcon />
          </>
        )}
      </FlexButtonText>
    </button>
  )
}
